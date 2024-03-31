import { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib/ErrorHandling/apiError.lib";
import { interviewEventsModel } from "../models/InterviewEvents.models";

export default class InterviewEventsService {
  CreateInterviewEvents = (newInterviewEvents: any) => {
    const interviewEvents = new interviewEventsModel(newInterviewEvents);

    interviewEvents
      .save()
    console.log(interviewEvents);
    return interviewEvents;
  };
  getAllInterviewsEvents = async (compId: string) => {
    
    const interviewEvents = await interviewEventsModel
      .find({ createdBy: compId })
      .populate({ path: "onlinePlatform", select: "-_id picture namePlatform" })
      .populate({ path: "candidateUsers", select: "-_id profilePic username " })
      .populate({ path: "jop", select: "-_id title " });
    console.log(interviewEvents);
    return interviewEvents;
  };
  getInterviewEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {};

  updateInterviewEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {};
  deleteInterviewEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {};
}
