import { Request, Response, NextFunction } from "express";
import SurveyService from "../services/survey.services";
import { body, validationResult } from "express-validator";
import { ApiError } from "../lib/ErrorHandling/apiError.lib";
export default class SurveyController {
  surveyService: SurveyService = new SurveyService();
  addNewSurveyController = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        ApiError.BadRequest({
          message: errors.array(),
        })
      );
    }
    this.surveyService.createNewSurvey(req, res, next);
  };
  getSurveysController = (req: Request, res: Response, next: NextFunction) => {
    this.surveyService.getSurveysWithResponses(req, res, next);
  };
  updateSurveysController = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("updateSurveysController");
    this.surveyService.updateSurvey(req, res, next);
  };
  finishSurveysController = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("finishSurveysController");
    this.surveyService.finishSurvey(req, res, next);
  };
  deleteSurveysController = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.surveyService.deleteSurvey(req, res, next);
  };
  getRecentsController = (req: Request, res: Response, next: NextFunction) => {
    this.surveyService.getRecents(req, res, next);
  };
  getAvailbleSurveysController = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("from surveyController");
    this.surveyService.getAvailbleSurveys(req, res, next);
  };
  getOneSurveyController = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.surveyService.getOneSurvey(req, res, next);
  };
  getSurveyDetailsController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    try {
      const survey = await this.surveyService.getSurveyDetailsGlobalInfo(id);
      const singleSurvey = survey.shift();

      console.log(singleSurvey);
      return res.status(200).json({
        message: "surveys retrieved successfully",
        survey: singleSurvey,
      });
    } catch (error) {
      console.log(error);
      return next(
        ApiError.InternalServerError({ message: "Failed to retrieve surveys" })
      );
    }
  };
}
