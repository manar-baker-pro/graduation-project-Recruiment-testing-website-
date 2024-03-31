import mongoose from "mongoose";
import { Technology } from "./technology.interfaces";
import { Question } from "./question.interface";
import { Company } from "./company.interface";
import { User } from "./user.interfaces";
export interface Survey {
  _id: mongoose.Types.ObjectId;
  createdBy:Company;
  // typeSurvey:String;
  title: string;
  description: string;
  requiredExperiences?: RequiredTechnologies[];
  questions: Question[];
  finished:boolean;
  expireDate?:Date;
  createdAt?:Date;
  updatedAt?:Date;
}
export interface RequiredTechnologies {
  technology:Technology;
  experienceLevel:string;
}
export interface TechWithExpLevel{
  techName:string;
  experienceLevel:string

}
