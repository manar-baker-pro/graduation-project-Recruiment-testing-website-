import mongoose from "mongoose";
import QuestionModel from "../models/question.models";


export default class QuestionService {
  getPoints =  (
    questionId:string
  ) => {
    const question =  QuestionModel.findOne({ _id: questionId }).select(
        "points questionType"
      ).lean();
      return question;
  };
}
