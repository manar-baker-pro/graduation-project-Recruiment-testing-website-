import express from "express";
import InterviewPlatformController from "../controllers/interviewPlatform.controller";

export class InterviewPlatformRoutes {
  public path = "/interviewPlatform";
  public router = express.Router();
  interviewPlatformController: InterviewPlatformController = new InterviewPlatformController();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.get(
      "/",
      // [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      this.interviewPlatformController.getAllInterviewPlatforms
    );
    this.router.get(
      "/:id",
      //   [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      this.interviewPlatformController.getInterviewPlatforms
    );
    this.router.post(
      "/",
      // [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      this.interviewPlatformController.CreateInterviewPlatform
    );
    this.router.put(
      "/:id",
      // [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      this.interviewPlatformController.updateInterviewPlatform
    );
    this.router.delete(
      "/:id",
      // [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      this.interviewPlatformController.deleteInterviewPlatform
    );
  }
}
