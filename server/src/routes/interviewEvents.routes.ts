import express from "express";
import InterviewEventsController from "../controllers/interviewEventsController";

export class InterviewEventsRoutes {
  public path = "/interviewEvents";
  public router = express.Router();
  interviewEventsController: InterviewEventsController = new InterviewEventsController();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.get(
      "/all/:compId",
      // [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      this.interviewEventsController.getAllInterviewEvents
    );
    this.router.get(
      "/:id",
      //   [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      this.interviewEventsController.getInterviewEvents
    );
    this.router.post(
      "/",
      // [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      this.interviewEventsController.CreateInterviewEvents
    );
    this.router.put(
      "/:id",
      // [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      this.interviewEventsController.updateInterviewEvents
    );
    this.router.delete(
      "/:id",
      // [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      this.interviewEventsController.deleteInterviewEvents
    );
  }
}
