import mongoose from "mongoose";
export interface Option {
    optionText: string;
    isTrue: boolean;
  }
  export interface Question {
    _id:mongoose.Types.ObjectId;
    questionText: string;
    questionType: string;
    required: boolean;
    points?: number;
    options?: Option[];
  }