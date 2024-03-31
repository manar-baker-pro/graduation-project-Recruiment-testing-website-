import mongoose from "mongoose";
import { Survey } from "../interfaces/survey.interface";

const surveySchema = new mongoose.Schema<Survey>(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    requiredExperiences: [
      {
        _id: false,
        technology: {
          type: mongoose.Types.ObjectId,
          ref: "Technology",
        },
        experienceLevel: {
          type: String,
          required: false,
        },
      },
    ],
    questions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Question",
      },
    ],
    expireDate: {
      type: Date,
      default:null,
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const SurveyModel = mongoose.model<Survey>("Survey", surveySchema);

export default SurveyModel;
