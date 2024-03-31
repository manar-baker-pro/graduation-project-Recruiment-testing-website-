import mongoose from "mongoose";
import { Technology } from "./technology.interfaces";
import { User } from "./user.interfaces";
interface Option {
  optionText: string;
  isTrue: boolean;
}
export interface QuestionTest {
  questionText: string;
  options: Option[];
  quesDuration: number;
  points: number;
}
export interface Test {
  _id: mongoose.Types.ObjectId;
  technology: Technology;
  createdBy: User;
  questionsTest: QuestionTest[];
  successRate: number;
  userComments: string[];
  duration: {
    num: number;
    unit: string;
  };
}
