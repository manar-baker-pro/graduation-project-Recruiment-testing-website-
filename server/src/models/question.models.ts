import mongoose from "mongoose";
import { Question } from "../interfaces/question.interface";
const questionSchema = new mongoose.Schema<Question>(
  {
    questionText: { type: String },
    questionType: { type: String },
    required: { type: Boolean },
    points: { type: Number },
    options: [
      {
        optionText: { type: String },
        isTrue: { type: Boolean },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const QuestionModel = mongoose.model("Question", questionSchema);
export default QuestionModel;
