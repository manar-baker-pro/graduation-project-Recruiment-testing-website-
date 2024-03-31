import { ApiError } from "../lib/ErrorHandling/apiError.lib";
import ResponsesServices from "../services/responses.services";
import { Request, Response, NextFunction } from "express";

export default class ResponsesController {
  responsesServices: ResponsesServices = new ResponsesServices();
  saveResponseController = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("from response controller save");
    this.responsesServices.saveResponse(req, res, next);
  };
  getAcceptanceUsersController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("getAcceptanceUsersController");
    const { surveyId } = req.params;
    try {
      const acceptanceUsers = await this.responsesServices.getAcceptanceUsersServices(
        surveyId
      );
      const acceptanceUsersDa = acceptanceUsers.map((u) => {
        let totalPoints = 0;
        u.response.map((res) => {
          if (res.pointsGiven != -1) {
            totalPoints += res.pointsGiven;
          }
        });
        return {
          _id:u.user._id,
          username: u.user.username,
          title: u.Survey.title,
          totalPoints: totalPoints,
          profilePic:u.user.profilePic
        };
      });
      console.log(acceptanceUsersDa);
      res.status(200).json({
        message: "get Acceptance Users successfully",
        acceptanceUsers: acceptanceUsersDa,
      });
    } catch (err) {
      return next(
        ApiError.InternalServerError({
          message: "Failed to get  acceptanceUsers",
        })
      );
    }
  };
  correctAnswerController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("correctAnswerController");
    const { id } = req.params;
    const { questionId, isCorrect } = req.body;
    try {
      const response = await this.responsesServices.correctAnswerServices(
        id,
        questionId,
        isCorrect
      );
      res.status(200).json({
        message: "get surveys with responses successfully",
        response: response,
      });
    } catch (err) {
      console.log(err);
      return next(
        ApiError.InternalServerError({
          message: "Failed to retrieve responses",
        })
      );
    }
  };
  getAllResponsesBySurveyIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    try {
      const responses = await this.responsesServices.getAllResponsesBySurveyId(
        id
      );
      const r = responses?.map((res) => {
        let totalPoints = 0;
        let neetToCorrectPoints = 0;
        const pointsAdd = res.response.map((resUser) => {
          if (
            resUser?.pointsGiven === 0 &&
            resUser.questionId.questionType !== "radio" &&
            resUser.questionId.questionType !== "checkBox"
          ) {
            neetToCorrectPoints += 1;
          }
          if (resUser.pointsGiven !== -1) {
            totalPoints += resUser.pointsGiven;
          }
        });
        return {
          _id: res._id,
          Survey: res.Survey,
          user: res.user,
          createdAt: res.createdAt,
          response: res.response,
          neetToCorrectPoints: neetToCorrectPoints,
          totalPoints: totalPoints,
          isQualified: res.isQualified,
        };
      });
      console.log(r + "000000000000000000000");
      res.status(200).json({
        message: "get surveys with responses successfully",
        responses: r,
      });
    } catch (error) {
      console.log(error);

      return next(
        ApiError.InternalServerError({
          message: "Failed to retrieve responses",
        })
      );
    }
  };
  getResponseBySurveyIdAndUserIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    // console.log(id);
    try {
      const response = await this.responsesServices.getResponseBySurveyIdAndUserId(
        id
      );
      console.log(response + "==============");

      res.status(200).json({
        message: "get surveys with responses successfully",
        response: response,
      });
    } catch (error) {
      console.log(error);

      return next(
        ApiError.InternalServerError({
          message: "Failed to retrieve responses",
        })
      );
    }
  };
  AcceptResponseController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("from response controller save");
    const { id } = req.params;
    try {
      const response = await this.responsesServices.AcceptRespons(id);
      res.status(200).json({
        message: "Accept User Response Successfully",
        response: response,
      });
      console.log(response);
    } catch (error) {
      return next(
        ApiError.InternalServerError({
          message: "Failed to Accept User Response",
        })
      );
    }
  };
}

// AcceptResponseController =async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { id } = req.params;
//   try {
//   //  const usersAcceptance= await this.responsesServices.AcceptRespons(id);
//   //  let totalPoints=0
//   //  usersAcceptance?.map((res)=>{

//   //  })
//     // res.response?.map((r)=>{
//     //   if()
//     // })
//   //  const usersAcceptanceForm={
//   // Survey:usersAcceptance.Survey,
//   //   username:usersAcceptance.username,
//   //   totalpoints:
//   //  }
//   //   res.status(200).json({
//   //     message: "get surveys with responses successfully",
//   //     usersAcceptance: response,
//   //   });
//   } catch (error) {
//     return next(
//       ApiError.InternalServerError({
//         message: "Failed to retrieve responses",
//       })
//     );
//   }
// };
