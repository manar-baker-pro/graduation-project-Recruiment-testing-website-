import { Request, Response, NextFunction } from "express";
import UserServices from "../services/user.services";
import { ApiError } from "../lib/ErrorHandling/apiError.lib";
import TestServices from "../services/test.services";

export default class UserController {
  testServices: TestServices = new TestServices();
  userServices: UserServices = new UserServices();
  getProfileUser = (req: Request, res: Response, next: NextFunction) => {
    console.log("UserController");
    this.userServices.findUserProfile(req, res, next);
  };
  UpdateProfileUser = (req: Request, res: Response, next: NextFunction) => {
    this.userServices.updateUserProfile(req, res, next);
  };
  getTestsForUserIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log("from getTestsForUserIdController");
      const { id } = req.params;
      console.log(id);
      const tests = await this.userServices.getTestsForUserId(id);
      return res.status(200).send(tests);
    } catch (error) {
      next(ApiError.InternalServerError({ message: "Failed to get test" }));
    }
  };

  addNewTest = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    console.log(id + "id is ");
    const { testId, userAnswers } = req.body;
    const totalScore = await this.testServices.calculateScore(
      testId,
      userAnswers,
      res,
      next
    );
    if (typeof totalScore === "number") {
      const user = await this.userServices.addNewTestSer(
        id,
        testId,
        totalScore,
        res,
        next
      );
    }
  };

  getInterviewEventsForUser = async(
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req.params;
    console.log(userId+"==================================")
    try {
      const interviewEventsRetr = await this.userServices.getInterviewEventstSer(userId);
      return res.status(200).send(interviewEventsRetr);
    } catch (err) {
      return next(
        ApiError.InternalServerError({
          message: "Failed  Add  interviewEvents ",
        })
      );
    }
  };
}
