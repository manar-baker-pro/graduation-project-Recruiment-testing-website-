import { NextFunction, Request, Response } from "express";
import InterviewPlatformService from "../services/interviewPlatform.services";

export default class InterviewPlatformController {
    interviewPlatformService: InterviewPlatformService = new InterviewPlatformService();
    CreateInterviewPlatform = (req: Request, res: Response, next: NextFunction) => {
      this.interviewPlatformService.CreateInterviewPlatform(req, res, next);
    };
    getAllInterviewPlatforms = (req: Request, res: Response, next: NextFunction) => {
      this.interviewPlatformService.getAllInterviewPlatforms(req, res, next);
    };
    updateInterviewPlatform = (req: Request, res: Response, next: NextFunction) => {
      this.interviewPlatformService.updateInterviewPlatform(req, res, next);
    };
    deleteInterviewPlatform = (req: Request, res: Response, next: NextFunction) => {
      this.interviewPlatformService.deleteInterviewPlatform(req, res, next);
    };
    getInterviewPlatforms = (req: Request, res: Response, next: NextFunction) => {
      this.interviewPlatformService.getInterviewPlatforms(req, res, next);
    };
  }