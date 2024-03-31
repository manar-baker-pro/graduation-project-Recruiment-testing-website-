import mongoose from "mongoose";
import {UserDB} from"./user.interfaces"
import { Question } from "./question.interface";
import{ Survey } from "./survey.interface"
export type Answer = {
  questionId: Question;
  answer: string | string[];
  pointsGiven:number;
  // points?:number
};
export interface Response {
  _id: mongoose.Types.ObjectId;
  user:UserDB;
  Survey:Survey;
  response:Answer[];
  isQualified:boolean;
  createdAt:Date;
}
