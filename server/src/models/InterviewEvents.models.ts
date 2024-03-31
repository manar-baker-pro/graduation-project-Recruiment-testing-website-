import mongoose from "mongoose";
import { InterviewEvents } from "../interfaces/interviewEvents.interface";
const interviewEventsSchema = new mongoose.Schema<InterviewEvents>(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
    },
    jop: {
      type: mongoose.Types.ObjectId,
      ref: "Survey",
    },
    interviewer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    candidateUsers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    description: {
      type: String,
    },
    scheduledTimes: [
      {
        startTime: {
          type: Date,
        },
        endTime: {
          type: Date,
        },
        BookedBy: {
          type: mongoose.Types.ObjectId,
          default:null,
        },
      },
    ],
    onlinePlatform: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Interview_platform",
      },
    ],
    meetingLink: {
      type: String,
    },
    interviewResult: {
      type: String,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
export const interviewEventsModel = mongoose.model<InterviewEvents>(
  "Interview_events",
  interviewEventsSchema
);
