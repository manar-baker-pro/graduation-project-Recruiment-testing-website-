import express from "express";
import { body } from "express-validator";
import { corsConfig } from "../configs/CORS";
import { authorizationMiddleware } from "../middlewares/authorization.middlewares";
import { accessMiddleware } from "../middlewares/authentication.middlewares";
import { ComponentName } from "../interfaces/role.interfaces";
import UserController from "../controllers/user.controllers";
import { ApiErrorHandler } from "../lib/ErrorHandling/handleErrors";
import SurveyController from "../controllers/survey.controllers";

export default class UserRoutes {
  userController: UserController = new UserController();
  surveyController: SurveyController = new SurveyController();

  path = "/user";
  public router = express.Router();
  constructor() {
    this.intializeRoutes();
  }
  intializeRoutes = () => {
    this.router.get(
      "/profile/:id",
      corsConfig,
      // accessMiddleware,
      // authorizationMiddleware(ComponentName.adminDash),
      this.userController.getProfileUser
    );
    this.router.get(
      "/tests/:id",
      corsConfig,
      // accessMiddleware,
      // authorizationMiddleware(ComponentName.adminDash),
      this.userController.getTestsForUserIdController
    );
    this.router.put(
      "/profile/:id",
      corsConfig,
      // accessMiddleware,
      // authorizationMiddleware(ComponentName.adminDash),
      this.userController.UpdateProfileUser
    );
    this.router.put(
      "/:id/tests",
      corsConfig,
      // accessMiddleware,
      // authorizationMiddleware(ComponentName.adminDash),
      this.userController.addNewTest
      // ApiErrorHandler,
    );
    this.router.get(
      "/availbleSurvey/:id",
      corsConfig,
      // accessMiddleware,
      // authorizationMiddleware(ComponentName.Survey),
      this.surveyController.getAvailbleSurveysController
    );
    this.router.get(
      "/interviewEvents/:userId",
      corsConfig,
      // accessMiddleware,
      // authorizationMiddleware(ComponentName.Survey),
      this.userController.getInterviewEventsForUser
    );
  };
}
