import { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib/ErrorHandling/apiError.lib";
import { InterviewPlatformModel } from "../models/interviewPlatform.models";
import { InterviewPlatform } from "../interfaces/interviewPlatform.interface";

export default class InterviewPlatformService {
  CreateInterviewPlatform = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("from CreateInterviewPlatform services");
    console.log(req.body);
    const pExist = await InterviewPlatformModel.findOne({
      urlPlatform: req.body.urlPlatform,
    });
    console.log(pExist);
    if (pExist)
      return next(
        ApiError.Forbidden({ message: "interviewPlatforms already Exist " })
      );
    const interviewPlatform = new InterviewPlatformModel({
      name: req.body.name,
      description: req.body.description,
      urlPlatform: req.body.urlPlatform,
      namePlatform:req.body.namePlatform,
      picture:req.body.picture,
    });
    await interviewPlatform.save();
    console.log(interviewPlatform);

    return res.status(200).send(interviewPlatform);
  };

  getAllInterviewPlatforms = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const interviewPlatforms: InterviewPlatform[] = await InterviewPlatformModel.find(
        {},
        { createdAt: 0 }
      );
      console.log(interviewPlatforms);
      return res.status(200).json(interviewPlatforms);
    } catch (err) {
      console.error(err);
      return next(
        ApiError.InternalServerError({
          message: "Failed  Get TeinterviewPlatformschnology ",
        })
      );
    }
  };
  getInterviewPlatforms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const interviewPlatforms: InterviewPlatform | null = await InterviewPlatformModel.findById(
        req.params.id
      );
      if (!interviewPlatforms)
        return next(
          ApiError.BadRequest({ message: "interviewPlatforms Not Found" })
        );
      res.status(200).json(interviewPlatforms);
    } catch (err) {
      console.error(err);
      return next(
        ApiError.InternalServerError({
          message: "Failed  Get All interviewPlatforms ",
        })
      );
    }
  };

  updateInterviewPlatform = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name, description, url } = req.body;

    try {
      const interviewPlatforms: InterviewPlatform | null = await InterviewPlatformModel.findByIdAndUpdate(
        req.params.id,
        { name, description, url },
        { new: true }
      );
      if (!interviewPlatforms)
        return next(
          ApiError.BadRequest({ message: "interviewPlatforms Not Found" })
        );
      return res
        .status(200)
        .json(interviewPlatforms)
        .send({ message: "interviewPlatforms created successfully" });
    } catch (err) {
      console.error(err);
      return next(
        ApiError.InternalServerError({
          message: "Failed  Update interviewPlatforms ",
        })
      );
    }
  };
  deleteInterviewPlatform = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {}
//     try {
//       const interviewPlatforms: InterviewPlatform | null = await InterviewPlatformModel.findByIdAndRemove(
//         req.params.id
//       );
//       if (!interviewPlatforms) {
//         return next(
//           ApiError.BadRequest({ message: "interviewPlatforms Not Found" })
//         );
//       }
//       return res
//         .status(200)
//         .json(interviewPlatforms)
//         .send({ message: "interviewPlatforms deleted successfully" });
//     } catch (err) {
//       console.error(err);
//       return next(
//         ApiError.InternalServerError({
//           message: "Failed to delete interviewPlatforms",
//         })
//       );
//     }
//   };
}
