import mongoose from "mongoose";
import { Response } from "../interfaces/response.interface";
const responseSchema = new mongoose.Schema<Response>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    Survey: {
      type: mongoose.Types.ObjectId,
      ref: "Survey",
    },
    response: [
      {
        questionId: {
          type: mongoose.Types.ObjectId,
          ref: "Question",
        },
        answer: {
          type: mongoose.Schema.Types.Mixed,
        },
        pointsGiven: {
          type: Number,
        },
      },
    ],
    isQualified: {
      type: Boolean,
      default:false,
    },
  },
  {
    timestamps: true,
  }
);
const ResponseModel = mongoose.model("Response", responseSchema);
export default ResponseModel;
