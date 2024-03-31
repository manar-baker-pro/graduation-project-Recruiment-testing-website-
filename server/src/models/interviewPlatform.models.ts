import mongoose from "mongoose";

const interviewPlatformSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: false,
    },
    urlPlatform: {
      type: String,
      required: true,
    },
    namePlatform: {
      type: String,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const InterviewPlatformModel = mongoose.model(
  "Interview_platform",
  interviewPlatformSchema
);
