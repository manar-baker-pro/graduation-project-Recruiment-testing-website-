import { Router } from "express";
import SurveyController from "../controllers/survey.controllers";
import { corsConfig } from "../configs/CORS";
import { accessMiddleware } from "../middlewares/authentication.middlewares";
import { authorizationMiddleware } from "../middlewares/authorization.middlewares";
import { ComponentName } from "../interfaces/role.interfaces";
import { body } from "express-validator";
import { validateSurvey } from "../middlewares/surveyValidator";
export class SurveyRoutes {
  surveyController: SurveyController = new SurveyController();
  path = "/survey";
  public router = Router();
  constructor() {
    this.initialRoutes();
  }
  initialRoutes() {
    this.router.get(
      "/:createdBy",
      // corsConfig,
      // accessMiddleware,
      // authorizationMiddleware(ComponentName.Survey),
      this.surveyController.getSurveysController
    );
    // this.router.get(
    //   "/:id",
    //   corsConfig,
    //   // accessMiddleware,
    //   // authorizationMiddleware(ComponentName.Survey),
    //   this.surveyController.getOneSurveyController
    // );
    this.router.post(
      "/",
      // corsConfig,
      // accessMiddleware,
      // authorizationMiddleware(ComponentName.Survey),
      // validateSurvey,
      this.surveyController.addNewSurveyController
    );
    this.router.put(
      "/:id",
      corsConfig,
      // accessMiddleware,
      // authorizationMiddleware(ComponentName.Survey),
      // validateSurvey,
      this.surveyController.updateSurveysController
    );
    this.router.put(
      "/finish/:id",
      // corsConfig,
      // accessMiddleware,
      // authorizationMiddleware(ComponentName.Survey),
      // validateSurvey,
      this.surveyController.finishSurveysController
    );
    this.router.delete(
      "/:id",
      // corsConfig,
      // accessMiddleware,
      // authorizationMiddleware(ComponentName.Survey),
      this.surveyController.deleteSurveysController
    );
    this.router.get(
      "/recents/:createdBy",
      // corsConfig,
      // accessMiddleware,
      // authorizationMiddleware(ComponentName.Survey),
      this.surveyController.getRecentsController
    );
    
    // this.router.get(
    //   "/availbleSurvey",
    //   corsConfig,
    //   // accessMiddleware,
    //   // authorizationMiddleware(ComponentName.Survey),
    //   this.surveyController.getAvailbleSurveysController
    // );
    this.router.get(
      "/surveyDetails/:id",
      // corsConfig,
      this.surveyController.getSurveyDetailsController
    );
  }
}
