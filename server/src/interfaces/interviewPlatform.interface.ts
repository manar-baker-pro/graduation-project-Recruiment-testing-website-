import mongoose from "mongoose";

export interface InterviewPlatform {
  _id: mongoose.Types.ObjectId;
  description: string;
  urlPlatform: string;
  namePlatform: string;
  picture: string;
}
