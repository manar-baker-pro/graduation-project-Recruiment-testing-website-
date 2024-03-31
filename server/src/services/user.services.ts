import mongoose from "mongoose";
import { ApiError } from "../lib/ErrorHandling/apiError.lib";
import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.models";
import TestModel from "../models/test.models";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import { interviewEventsModel } from "../models/InterviewEvents.models";

dayjs.extend(utc);
dayjs.extend(duration);
export default class UserServices {
  findUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.params.id);
      const id = req.params.id;
      const user = await UserModel.findOne(
        {
          _id: id,
        },
        { password: 0, createdAt: 0, updatedAt: 0 }
      )
        .populate({
          path: "tests.test",
          select: "technology",
          populate: {
            path: "technology",
            select: "TechnologyName picture",
          },
        })
        .populate({
          path: "role",
          select: "-_id",
        });
      console.log(user);
      res.status(200).send(user);
    } catch (error) {
      return next(
        ApiError.InternalServerError({
          message: "Failed Get User",
        })
      );
    }
  };
  updateUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("from updateuserProfile service");
    const { id } = req.params;
    const {
      userrname,
      profilePic,
      country,
      cv,
      phoneNumber,
      gender,
      links,
      experience,
    } = req.body;
    try {
      let userAfterUpdateProfile = await UserModel.findOneAndUpdate(
        { _id: id },
        {
          username: userrname,
          profilePic: profilePic,
          country: country,
          cv: cv,
          phoneNumber: phoneNumber,
          gender: gender,
          links: links,
          experience: experience,
        },
        {
          new: true,
          projection: {
            password: 0,
            _id: 0,
            isConfirmedAccount: 0,
            createdAt: 0,
            updatedAt: 0,
          },
        }
      );
      if (!userAfterUpdateProfile) {
        return next(
          ApiError.NotFound({
            message: "user Selected Not Found",
          })
        );
      }
      res
        .status(200)

        .send(userAfterUpdateProfile);
    } catch (error) {
      return next(
        ApiError.InternalServerError({
          message: "Failed update profile of user",
        })
      );
    }
  };
  getTestsForUserId = (userId: any) => {
    console.log(userId);
    const currentDate = dayjs().utc();
    const twoWeeksAgo = currentDate.subtract(2, "week").toDate();

    const tests = TestModel.aggregate([
      {
        $lookup: {
          from: "technologies",
          localField: "technology",
          foreignField: "_id",
          as: "technology",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "tests.test",
          as: "users",
        },
      },
      {
        $addFields: {
          submissionNotAllowed: {
            $and: [
              {
                $in: [
                  true,
                  {
                    $map: {
                      input: "$users.tests.test",
                      as: "tests",
                      in: { $in: ["$_id", "$$tests"] },
                    },
                  },
                ],
              },
              {
                $lte: ["$users.tests.date", twoWeeksAgo],
              },
            ],
          },
          score: {
            $map: {
              input: "$users.tests",
              as: "test",
              in: {
                $cond: [
                  { $in: ["$_id", "$$test.test"] },
                  {
                    $arrayElemAt: [
                      "$$test.score",
                      { $indexOfArray: ["$$test.test", "$_id"] },
                    ],
                  },
                  null,
                ],
              },
            },
          },
          technology: { $arrayElemAt: ["$technology", 0] },
        },
      },
      {
        $project: {
          _id: 1,
          TechnologyName: "$technology.TechnologyName",
          picture: "$technology.picture",
          numberOfQuestions: { $size: "$questionsTest" },
          successRate: 1,
          userComments: 1,
          duration: 1,
          submissionNotAllowed: 1,
          success: {
            $cond: {
              if: { $gt: [{ $arrayElemAt: ["$score", 0] }, "$successRate"] },
              then: true,
              else: false,
            },
          },
        },
      },
    ]);

    // tests.exec((err, data) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.log(data);
    //   }
    // });

    return tests;
  };

  addNewTestSer = async (
    userId: string,
    newTest: any,
    score: number,
    res: Response,
    next: NextFunction
  ) => {
    const testNew = { test: newTest, score: score };
    console.log(testNew);
    const submissionDate = dayjs()
      .utc()
      .toISOString();
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return next(ApiError.NotFound({ message: "User Not found" }));
      }
      const f = user.tests?.find((t: any) => {
        console.log(t.test + "compare" + testNew.test);
        return t.test == testNew.test;
      });
      const reattemptDate = dayjs(f?.date)
        .add(2, "week")
        .toISOString();
      if (f && dayjs(submissionDate).isBefore(reattemptDate)) {
        const e = ApiError.BadRequest({
          message: "You can only submit a test once every two weeks.",
        });
        return next(e);
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $push: { tests: { ...testNew, date: submissionDate } } },
        { new: true }
      ).select("-password -createdAt -updatedAt -isConfirmedAccount");

      return res.status(200).send(updatedUser);
    } catch (error) {
      return next(
        ApiError.InternalServerError({ message: "Failed to add test" })
      );
    }
  };

  getInterviewEventstSer = async (userId: string) => {
    const submissionDate = dayjs().utc().toISOString();
    const transUserId = new mongoose.Types.ObjectId(userId);
    
    const interviewEvents = await interviewEventsModel.aggregate([
      {
        $match: {
          candidateUsers: {
            $in: [transUserId], 
          },
        },
      },  
      {
        $lookup: {
          from: "companies", 
          localField: "createdBy", 
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $lookup: {
          from: "surveys", 
          localField: "jop", 
          foreignField: "_id",
          as: "jop",
        },
      },
      {
        $lookup: {
          from: "interview_platforms", 
          localField: "onlinePlatform", 
          foreignField: "_id",
          as: "onlinePlatform",
        },
      },
      {
        $unwind: "$createdBy"
      },
      {
        $unwind: "$jop"
      },
      {
        $project: {
          _id: 1,
          onlinePlatform: 1,
          scheduledTimes: 1,
          "createdBy.companyName": 1,
          "createdBy.profilePic": 1,
          "jop.title": 1,
          booked: {
            $anyElementTrue: {
              $map: {
                input: "$scheduledTimes",
                as: "scheduledTime",
                in: {
                  $eq: ["$$scheduledTime.BookedBy", transUserId]
                }
              }
            }
          }
        },
      },
    ]);
  
    console.log(interviewEvents);
    return interviewEvents;
  };
  
  
}
