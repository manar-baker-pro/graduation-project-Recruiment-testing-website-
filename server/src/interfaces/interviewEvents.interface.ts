import mongoose from "mongoose";
import { Company } from "./company.interface";
import { User } from "./user.interfaces";
import { Survey } from "./survey.interface";
import { InterviewPlatform } from "./interviewPlatform.interface";
export enum InterviewResult {
  Accepted = "Accepted",
  Rejected = "Rejected",
}
export interface ScheduledTimes {
  date: Date;
  startTime: Date;
  endTime: Date;
  BookedBy: User;
}

export interface InterviewEvents {
  _id: mongoose.Types.ObjectId;
  createdBy: Company;
  jop: Survey;
  description: string;
  // onlinePlatform: InterviewPlatform[];
  onlinePlatform: InterviewPlatform[];
  meetingLink: string;
  candidateUsers: User[];
  scheduledTimes: ScheduledTimes[];
  isComplete: boolean;
  interviewer: User;
  interviewResult: InterviewResult;
}
