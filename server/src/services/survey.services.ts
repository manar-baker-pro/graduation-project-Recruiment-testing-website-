import { NextFunction, Request, Response } from "express";
import QuestionModel from "../models/question.models";
import SurveyModel from "../models/survey.models";
import {
  RequiredTechnologies,
  Survey,
  TechWithExpLevel,
} from "../interfaces/survey.interface";
import { ApiError } from "../lib/ErrorHandling/apiError.lib";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import mongoose from "mongoose";
import customParseFormat from "dayjs/plugin/customParseFormat";
import TechnologyModel from "../models/technology.models";
import { Question } from "../interfaces/question.interface";
import ResponseModel from "../models/response.models";
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);
export default class SurveyService {
  createNewSurvey = async (req: Request, res: Response, next: NextFunction) => {
    const expireDate = req.body.expireDate
      ? dayjs(req.body.expireDate, "YYYY-MM-DD HH:mm")
          .utc()
          .format()
      : null;
    try {
      const {
        createdBy,
        title,
        description,
        requiredExperiences,
        questions,
        expireDate,
      } = req?.body;
      console.log(req?.body);
      const requiredExperiencesCo = requiredExperiences;
      const technologies: RequiredTechnologies[] = await Promise.all(
        requiredExperiencesCo.map(async (experience: RequiredTechnologies) => {
          const tech = await TechnologyModel.findOne({
            TechnologyName: experience.technology.TechnologyName,
          });
          if (tech) {
            console.log(tech);
            const item: RequiredTechnologies = {
              technology: tech,
              experienceLevel: experience.experienceLevel,
            };
            console.log(item);
            return item;
          } else {
            return ApiError.BadRequest({
              message: "cannot find technology ",
            });
          }
        })
      );
      console.log(technologies);
      const createdQuestions = await QuestionModel.insertMany(questions);
      console.log(createdQuestions);
      const survey = new SurveyModel({
        createdBy,
        title,
        description,
        requiredExperiences: technologies,
        expireDate: expireDate,
        questions: createdQuestions,
      });
      await survey.save();
      return res.status(200).send(survey);
    } catch (err) {
      return next(
        ApiError.InternalServerError({
          message: "Failed in created survey ",
        })
      );
    }
  };
  getOneSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const survey = (await SurveyModel.findOne({
        _id: req.params.id,
      }).populate(
        "requiredExperiences.technology questions createdBy"
      )) as Survey;
      if (!survey) {
        return next(
          ApiError.NotFound({
            message: "this survey is not available",
          })
        );
      }
      const formattedSurvey = {
        ...survey,
        expireDate: dayjs.utc(survey.expireDate).local(),
        createdAt: dayjs.utc(survey.createdAt).local(),
      };
      return res.status(200).json({
        message: "Survey retrieved successfully",
        surveys: formattedSurvey,
      });
    } catch (err) {
      return next(
        ApiError.InternalServerError({
          message: "Failed to retrieve survey",
        })
      );
    }
  };
  getRecents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("recent");
      const sevenDaysAgo = dayjs()
        .subtract(7, "day")
        .utc()
        .format();
      const surveys = await SurveyModel.find({
        createdAt: { $gte: sevenDaysAgo },
        createdBy: req.params.createdBy
      });
      console.log(surveys);
      const formattedSurveys = surveys.map((survey: any) => ({
        ...survey.toJSON(),
        createdAt: dayjs.utc(survey.createdAt).local(),
      }));
      console.log(surveys);

      return res.status(200).json({
        message: "Recents Surveys retrieved successfully",
        surveys: formattedSurveys,
      });
    } catch (err) {
      return next(
        ApiError.InternalServerError({
          message: "Failed to retrieve Recent surveys",
        })
      );
    }
  };
  deleteSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("===========form delete survey");
      const id = req.params.id;
      const SurveysResponses = await ResponseModel.find({
        Survey: id,
      });
      if (SurveysResponses.length === 0) {
        const deletedSurvey = await SurveyModel.findByIdAndDelete({ _id: id });
        if (!deletedSurvey) {
          return res.status(404).json({ message: "Survey Not Found" });
        }
        await QuestionModel.deleteMany({
          _id: {
            $in: deletedSurvey.questions,
          },
        });

        return res.status(200).json({
          message: "delete survey succcessfully completed ",
          deletedSurvey: deletedSurvey,
        });
      } else {
        console.log("fom oth----------");

        return next(
          ApiError.BadRequest({
            message: `This  survey  has ${SurveysResponses.length}Response you can not delete it  `,
          })
        );
      }
    } catch (err) {
      console.log(err);
      return next(
        ApiError.InternalServerError({
          message: "delete survey  Failed",
        })
      );
    }
  };
  finishSurvey = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const updatedSurvey = await SurveyModel.findOneAndUpdate(
        { _id: id },
        { finished: true },
        { new: true }
      ).populate({
        path: "requiredExperiences.technology",
        select: "TechnologyName picture -_id",
      });
      return res.status(200).json({
        message: "Survey Finishing successfully",
        updatedSurvey: updatedSurvey,
      });
    } catch (err) {
      console.log(err);
      return next(
        ApiError.InternalServerError({
          message: "Failed to finishing the survey",
        })
      );
    }
  };
  updateSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      console.log(id);
      const {
        createdBy,
        title,
        description,
        requiredExperiences,
        questions,
        expireDate,
      } = req?.body;
      const SurveysResponses = await ResponseModel.find({
        Survey: id,
      });
      if (SurveysResponses.length === 0) {
        let UpdateQuestion: Question[] = [];
        for (const question of questions) {
          if (!question._id) {
            question._id = new mongoose.Types.ObjectId();
          }
          const afterUp = await QuestionModel.findOneAndUpdate(
            { _id: question._id },
            question,
            {
              upsert: true,
            }
          );
        }
        const questionIdsUp = questions?.map(
          (question: Question) => question._id
        );
        const surveyForDeleteQues = await SurveyModel.findById(id);
        const questionsForDelete = surveyForDeleteQues
          ? surveyForDeleteQues.questions
          : [];

        const questionsDelete = questionsForDelete.filter(
          (questionId: any) => !questionIdsUp.includes(questionId.toString())
        );
        console.log(questionIdsUp + "questionIdsUp");
        console.log(questionsDelete);
        await QuestionModel.deleteMany({ _id: { $in: questionsDelete } });

        // console.log("Deleted questions:", questionsDelete);

        const updatedSurvey = await SurveyModel.findOneAndUpdate(
          { _id: id },
          { ...req.body, questions: questionIdsUp },
          { new: true }
        ).populate({
          path: "requiredExperiences.technology",
          select: "TechnologyName picture -_id",
        });

        // console.log(updatedSurvey);

        if (!updatedSurvey) {
          return res.status(404).json({ message: "Survey not found" });
        }

        return res.status(200).json({
          message: "Survey updated successfully",
          updatedSurvey: updatedSurvey,
        });
      } else {
        return next(
          ApiError.BadRequest({
            message: `This  survey  has ${SurveysResponses.length}Response you can not update it  `,
          })
        );
      }
    } catch (err) {
      console.log(err);
      return next(
        ApiError.InternalServerError({
          message: "Failed to update the survey",
        })
      );
    }
  };
  getAvailbleSurveys = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      console.log(id);
      const utcDate = dayjs()
        .utc()
        .format();
      console.log(utcDate + "utcDate");
      const userResponses = await ResponseModel.find({ user: id })
        .select("Survey -_id")
        .lean();
      const userResponsesSpilt = userResponses?.map((r) => {
        return r.Survey;
      });
      console.log(userResponsesSpilt);
      const surveys = await SurveyModel.find({
        _id: { $nin: userResponsesSpilt },
        finished: false,
        $or: [{ expireDate: { $gt: utcDate } }, { expireDate: { $eq: null } }],
      })
        .populate("requiredExperiences.technology questions createdBy")
        .select("-id ");
      console.log(surveys + "mmmmmmmmmm");
      const formattedSurveys = surveys.map((survey: any) => ({
        ...survey.toJSON(),
        createdAt: dayjs.utc(survey.createdAt).local(),
        expireDate: dayjs.utc(survey.expireDate).local(),
      }));
      // console.log(formattedSurveys);
      return res.status(200).json({
        message: "surveys retrieved successfully",
        surveys: formattedSurveys,
      });
    } catch (err) {
      console.log(err);
      return next(
        ApiError.InternalServerError({
          message: "Failed to retrieve surveys",
        })
      );
    }
  };

  getSurveysWithResponses = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const filter = req.query.filter;
    const { createdBy } = req.params;
    console.log(createdBy + "==============");
    const utcDate = dayjs()
      .utc()
      .toDate();
    let matchStage: object = {};
    if (filter === "expired") {
      matchStage = {
        expireDate: { $lte: utcDate },
      };
    } else if (filter === "available") {
      matchStage = {
        $or: [{ expireDate: { $gt: utcDate } }, { expireDate: { $eq: null } }],
      };
    } else if (filter === "finished") {
      matchStage = {
        finished: true,
        
      };
    }
    try {
      const surveys = await SurveyModel.aggregate([
       
        {
          $lookup: {
            from: "technologies",
            localField: "requiredExperiences.technology",
            foreignField: "_id",
            as: "experiences",
          },
        },

        {
          $lookup: {
            from: "responses",
            localField: "_id",
            foreignField: "Survey",
            as: "responses",
          },
        },
        {
          $lookup: {
            from: "questions",
            localField: "questions",
            foreignField: "_id",
            as: "questions",
          },
        },
        {
          $match: { createdBy:  new mongoose.Types.ObjectId(createdBy) },
        },
        {
          $project: {
            expireDate: 1,
            title: 1,
            description: 1,
            questions: 1,
            requiredExperiences: {
              $map: {
                input: "$requiredExperiences",
                as: "reqExp",
                in: {
                  $mergeObjects: [
                    "$$reqExp",
                    {
                      technology: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$experiences",
                              cond: {
                                $eq: ["$$this._id", "$$reqExp.technology"],
                              },
                            },
                          },
                          0,
                        ],
                      },
                    },
                  ],
                },
              },
            },
            responseCount: { $size: "$responses" },
            finished: 1,
          },
        },
        {
          $match: matchStage,
        },
      ]);
      console.log(surveys[0]);
      return res.status(200).json({
        message: "surveys retrieved successfully",
        surveys: surveys,
      });
    } catch (error) {
      console.log(error);
      return next(
        ApiError.InternalServerError({ message: "Failed to retrieve surveys" })
      );
    }
  };

  updateSurveyStatus = async () => {
    // try {
    //   const now = new Date();
    //   const surveysEx = await SurveyModel.find({ expireDate: { $lt: now }, status: 'available' });
    //   surveysEx.forEach(async (survey) => {
    //     survey.status = 'expired';
    //     await survey.save();
    //   });
    // } catch (err) {
    //   console.error('Error updating survey status:', err);
    // }
  };
  getSurveyDetailsGlobalInfo = (id: string) => {
    const utcDate = dayjs()
      .utc()
      .toDate();
    let sur = new mongoose.Types.ObjectId(id as string);
    console.log(sur);

    const matchStage = {
      _id: sur,
    };

    const survey = SurveyModel.aggregate([
      {
        $lookup: {
          from: "responses",
          localField: "_id",
          foreignField: "Survey",
          as: "responses",
        },
      },

      {
        $lookup: {
          from: "technologies",
          localField: "requiredExperiences.technology",
          foreignField: "_id",
          as: "experiences",
        },
      },
      {
        $lookup: {
          from: "questions",
          localField: "questions",
          foreignField: "_id",
          as: "questions",
        },
      },
      {
        $match: matchStage,
      },
      {
        $limit: 1,
      },
      {
        $lookup: {
          from: "responses",
          let: { surveyId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$Survey", "$$surveyId"] },
              },
            },
            {
              $sort: { createdAt: -1 },
            },
            {
              $limit: 1,
            },
          ],
          as: "lastResponse",
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          expireDate: {
            $ifNull: [
              {
                $dateToString: {
                  date: {
                    $toDate: {
                      $subtract: [{ $toDate: "$expireDate" }, { $toLong: 0 }],
                    },
                  },
                  format: "%Y-%m-%d %H:%M:%S",
                  timezone: dayjs().format("Z"),
                },
              },
              "",
            ],
          },
          createdAt: {
            $dateToString: {
              date: {
                $toDate: {
                  $subtract: [{ $toDate: "$createdAt" }, { $toLong: 0 }],
                },
              },
              format: "%Y-%m-%d %H:%M:%S",
              timezone: dayjs().format("Z"),
            },
          },
          requiredExperiences: {
            $map: {
              input: "$requiredExperiences",
              as: "reqExp",
              in: {
                $mergeObjects: [
                  "$$reqExp",
                  {
                    technology: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$experiences",
                            cond: {
                              $eq: ["$$this._id", "$$reqExp.technology"],
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
          responseCount: { $size: "$responses" },
          questionCount: { $size: "$questions" },
          requiredQuestionCount: {
            $size: {
              $filter: {
                input: "$questions",
                cond: { $eq: ["$$this.required", true] },
              },
            },
          },
          status: {
            $cond: [
              {
                $or: [
                  { $eq: ["$expireDate", null] },
                  { $gt: ["$expireDate", utcDate] },
                ],
              },
              "available",
              "expired",
            ],
          },
          lastResponse: {
            $arrayElemAt: ["$lastResponse", 0],
          },
          lastResponseCreatedAt: {
            $let: {
              vars: {
                lastResponse: { $arrayElemAt: ["$lastResponse", 0] },
              },
              in: {
                $dateToString: {
                  date: {
                    $toDate: {
                      $subtract: [
                        { $toDate: "$$lastResponse.createdAt" },
                        { $toLong: 0 },
                      ],
                    },
                  },
                  format: "%Y-%m-%d %H:%M:%S",
                  timezone: dayjs().format("Z"),
                },
              },
            },
          },
        },
      },
    ]);
    console.log(survey);
    return survey;
  };
}
