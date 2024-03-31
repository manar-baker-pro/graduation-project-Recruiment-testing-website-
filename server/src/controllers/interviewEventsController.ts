import { NextFunction, Request, Response } from "express";
import InterviewEventsService from "../services/interviewEvents.services";
import { ApiError } from "../lib/ErrorHandling/apiError.lib";
import UserModel from "../models/user.models";
import SurveyModel from "../models/survey.models";
import CompanyModel from "../models/company.models";
import NodeMailerConfig from "../configs/nodemailer";
import dayjs from "dayjs";
import { Server } from "socket.io";

export default class InterviewEventsController {
  nodeMailerConfig: NodeMailerConfig = new NodeMailerConfig();
  interviewEventsService: InterviewEventsService = new InterviewEventsService();
  CreateInterviewEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {
      jop,
      createdBy,
      scheduledTimes,
      candidateUsers,
      onlinePlatform,
    } = req.body;
    const interviewEvents = {
      jop: jop,
      createdBy: createdBy,
      scheduledTimes: scheduledTimes,
      candidateUsers: candidateUsers,
      onlinePlatform: onlinePlatform,
    };
    try {
      const interviewEventsRetr = this.interviewEventsService.CreateInterviewEvents(
        interviewEvents
      );
      if (interviewEventsRetr) {
        const candidateUserIds = interviewEventsRetr.candidateUsers;
        const jopAv = interviewEventsRetr.jop;
        const company = interviewEventsRetr.createdBy;
        const users = await UserModel.find({
          _id: { $in: candidateUserIds },
        }).select("email username -_id");
        const emails = users.map((u) => {
          return u.email;
        });
        const jop = await SurveyModel.findOne({ _id: jopAv }).select(
          "title -_id"
        );
        const companyName = await CompanyModel.findOne({ _id: company }).select(
          "companyName profilePic -_id"
        );
        console.log(interviewEventsRetr);
        console.log("===========" + users + jop + companyName);
        const companyNameString = companyName?.companyName ?? "Unknown Company";
        const profilePic = companyName?.profilePic ?? " ";
        const jopString = jop?.title ?? "Unknown jop";
        const userTimeZone = dayjs.tz.guess();
        const formattedScheduledTimes = scheduledTimes.map((time: any) => {
          const localDate = dayjs(time.date)
            .locale("en")
            .format("MMMM D, YYYY");
          const localStartTime = dayjs(time.startTime)
            .locale("en")
            .format("h:mm A");
          const localEndTime = dayjs(time.endTime)
            .locale("en")
            .format("h:mm A");
       

          return `In date :${localDate},from:${localStartTime} to ${localEndTime} in timeZone :${userTimeZone}`;
        });

        this.nodeMailerConfig.sendMailForInterview(
          companyNameString,
          jopString,
          formattedScheduledTimes,
          emails
        );
        const io: Server = req.app.get("socketio");
        candidateUsers.forEach((userId: string) => {
          io.emit(`newInterview${userId}`, {
            companyName: companyNameString,
            jobTitle: jopString,
            profilePic: profilePic,
          });
        });
        return res.status(200).send(interviewEventsRetr);
      }
    } catch (err) {
      return next(
        ApiError.InternalServerError({
          message: "Failed  Add  interviewEvents ",
        })
      );
    }
  };
  getAllInterviewEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { compId } = req.params;
    console.log(compId);
    try {
      const interviewEventsRetr = await this.interviewEventsService.getAllInterviewsEvents(
        compId
      );
      return res.status(200).send(interviewEventsRetr);
    } catch (err) {
      return next(
        ApiError.InternalServerError({
          message: "Failed  Add  interviewEvents ",
        })
      );
    }
  };
  updateInterviewEvents = (req: Request, res: Response, next: NextFunction) => {
    this.interviewEventsService.updateInterviewEvents(req, res, next);
  };
  deleteInterviewEvents = (req: Request, res: Response, next: NextFunction) => {
    this.interviewEventsService.deleteInterviewEvents(req, res, next);
  };
  getInterviewEvents = (req: Request, res: Response, next: NextFunction) => {
    this.interviewEventsService.getInterviewEvents(req, res, next);
  };
}
