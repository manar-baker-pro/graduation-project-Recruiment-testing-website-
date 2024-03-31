import express from "express";
import { corsConfig } from "../configs/CORS";
import ResponsesController from "../controllers/responses.controller";
export default class ResponsesRoutes {
  responsesController: ResponsesController = new ResponsesController();
  path = "/responses";
  public router = express.Router();
  constructor() {
    this.intializeRoutes();
  }
  intializeRoutes = () => {
    this.router.get("/", corsConfig);
    this.router.get(
      "/:id",
      corsConfig,
      this.responsesController.getAllResponsesBySurveyIdController
    );
    this.router.get(
      "/surveyAndUser/:id",
      corsConfig,
      this.responsesController.getResponseBySurveyIdAndUserIdController
    );
    this.router.post(
      "/",
      corsConfig,
      this.responsesController.saveResponseController
    );
    this.router.put(
      "/:id",
      corsConfig,
      this.responsesController.correctAnswerController
    );
    this.router.put(
      "/AcceptUserResponse/:id",
      corsConfig,
      this.responsesController.AcceptResponseController
    );
    this.router.get(
      "/acceptanceUsers/:surveyId",
      corsConfig,
      this.responsesController.getAcceptanceUsersController
    );
  };
}
