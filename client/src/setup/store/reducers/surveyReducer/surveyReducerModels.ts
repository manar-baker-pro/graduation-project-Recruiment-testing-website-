import { Company } from "../../actions/company.Actions";
import { Technology } from "../technologyReducers/technologyReducerModels";
import { User } from "../userReducers/userReducer.interface";

export interface techWithExpLevel {
  techName: string;
  experienceLevel: string;
}
export interface Question {
  _id?: string;
  questionText: string;
  questionType: string;
  options: { optionText: string; isTrue: boolean }[];
  points: number;
  open: boolean;
  required: boolean;
}
export interface Survey {
  title: string;
  description: string;
  requiredExperiences: RequiredTechnologies[];
  expireDate?: Date;
  questions: Question[];
}
export interface SurveyRecived {
  _id?: string;
  createdBy: Company | User;
  title: string;
  description: string;
  requiredExperiences?: RequiredTechnologies[];
  questions: Question[];
  expireDate?: Date;
}
export interface SurveyDetailsRecived {
  _id?: string;
  title: string;
  description: string;
  requiredExperiences: RequiredTechnologies[];
  expireDate?: string;
  createdAt?: string;
  responseCount: number;
  questionCount: number;
  requiredQuestionCount: number;
  status:string;
  lastResponseCreatedAt:string;
}
export interface RequiredTechnologies {
  technology: Technology;
  experienceLevel: string;
  successRate?: number;
}
export interface SurveyState {
  surveyload: boolean;
  surveyData: SurveyRecived[];
  surveyerr: any;
}
export interface SurveyDetailsStata {
  surveyload: boolean;
  surveyDetData: SurveyDetailsRecived | null;
  surveyerr: any;
}
