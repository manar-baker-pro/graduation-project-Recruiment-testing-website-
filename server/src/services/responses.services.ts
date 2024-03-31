import { ApiError } from "../lib/ErrorHandling/apiError.lib";
import { NextFunction, Request, Response } from "express";
import ResponseModel from "../models/response.models";
import SurveyModel from "../models/survey.models";
import { Server } from "socket.io";
import UserModel from "../models/user.models";
import NotificationService from "./notification.services";
import QuestionModel from "../models/question.models";
import QuestionService from "./question.services";
export default class ResponsesServices {
  notificationService: NotificationService = new NotificationService();
  questionService: QuestionService = new QuestionService();
  saveResponse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, survey, response } = req.body;
      const foundSurvey = await SurveyModel.findOne({ _id: survey });
      if (!foundSurvey) {
        return next(
          ApiError.NotFound({
            message: "This Survey Not",
          })
        );
      }

      const newResp = await Promise.all(
        response?.map(async (res: any) => {
          const ques = await QuestionModel.findOne({ _id: res.questionId });
          if (ques) {
            const truth = ques.options
              ?.map((o) => {
                if (o.isTrue === true) {
                  return o.optionText;
                }
              })
              .filter(Boolean);
            const truthTrans =
              truth?.length === 1 ? truth[0]?.toString() : truth;
            const pointsGiven =
              JSON.stringify(truthTrans) === JSON.stringify(res.answer)
                ? ques.points
                : 0;
            return { ...res, pointsGiven };
          }
        })
      );

      if (foundSurvey?.finished == false) {
        const newResponse = new ResponseModel({
          user,
          Survey: survey,
          response: newResp,
        });

        await newResponse.save();
        const userAdRes = await UserModel.findOne({ _id: user });
        const io: Server = req.app.get("socketio");
        const newResponseMessageInfo = {
          userNameRes: userAdRes?.username,
          profilePicUser: userAdRes?.profilePic,
          surveyTitle: foundSurvey?.title,
          // createdAt: newResponse?.createdAt,
        };
        console.log(foundSurvey.createdBy);
        io.emit(`newResponse${foundSurvey.createdBy}`, newResponseMessageInfo);
        this.notificationService.createNotic(
          foundSurvey?.createdBy,
          "Company",
          newResponseMessageInfo
        );
        res.status(201).json({ message: "Saved response successfully" });
      } else {
        return next(
          ApiError.BadRequest({
            message: "This Survey is Finished",
          })
        );
      }
    } catch (error) {
      console.log(error);
      return next(
        ApiError.InternalServerError({
          message: "Failed to save response",
        })
      );
    }
  };

  getResponsesWithSurveys = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const responses = await ResponseModel.find()
        .populate("Survey")
        .populate("user");
      res.status(200).json({
        message: "get surveys with responses successfully",
        responses: responses,
      });
    } catch (error) {
      return next(
        ApiError.InternalServerError({
          message: "Failed to retrieve responses with surveys",
        })
      );
    }
  };
  getAllResponsesBySurveyId = (surveyId: string) => {
    const responses = ResponseModel.find({ Survey: surveyId })
      .populate({
        path: "user",
        select:
          "-password -_id -isConfirmedAccount -createdAt -updatedAt -role -socketId",
        populate: {
          path: "tests.test",
          select: "-_id -createdAt -updatedAt",
          populate: {
            path: "technology",
            select: "TechnologyName picture -_id",
          },
        },
      })
      .populate({
        path: "response.questionId",
        select: "points _id questionType questionText options",
      })
      .sort({ createdAt: -1 });

    return responses;
  };
  getResponseBySurveyIdAndUserId = (responseId: string) => {
    console.log(responseId);
    const response = ResponseModel.findOne({ _id: responseId }).populate({
      path: "response.questionId",
      select: "-options.isTrue",
    });

    return response;
  };
  correctAnswerServices = async (
    responseId: string,
    questionId: string,
    isCorrect: boolean
  ) => {
    const question = await this.questionService.getPoints(questionId);
    console.log(question + "000000000000000000000000000");
    if (
      question?.questionType !== "radio" &&
      question?.questionType !== "chackBox"
    ) {
      if (isCorrect) {
        const responseUpdated = await ResponseModel.findOneAndUpdate(
          { _id: responseId, "response.questionId": questionId },
          { $set: { "response.$.pointsGiven": question?.points } },
          { new: true }
        ).populate({
          path: "response.questionId",
          select: "-options.isTrue",
        });
        return responseUpdated;
      }
      const responseUpdated = await ResponseModel.findOneAndUpdate(
        { _id: responseId, "responses.questionId": questionId },
        { $set: { "responses.$.pointsGiven": -1 } },
        { new: true }
      ).populate({
        path: "response.questionId",
        select: "-options.isTrue",
      });
      return responseUpdated;
    }
  };
  AcceptRespons =  (responseId: string) => {
    console.log(responseId+"============")
    const responseUpdated =  ResponseModel.findOneAndUpdate(
      { _id: responseId },
      { $set: { isQualified: true } },
      { new: true }
    );
    return responseUpdated;
  };
  getAcceptanceUsersServices =  (surveyId: string) => {
    const usersAcceptance =  ResponseModel.find(
      { Survey: surveyId },
    ).populate({
      path: "user",
      select: "username profilePic",
    }).populate({
      path: "Survey",
      select: "title",
  }).select("response").lean();
    return usersAcceptance;
  };
}
