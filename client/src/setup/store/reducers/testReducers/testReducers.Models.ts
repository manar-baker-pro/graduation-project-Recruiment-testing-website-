import { Technology } from "../technologyReducers/technologyReducerModels";
import { User } from "../userReducers/userReducer.interface";
interface Option {
  optionText: string;
  isTrue: boolean;
}
export interface QuestionTest {
  questionText: string;
  options: Option[];
  points: number;
}

export interface Test {
  _id?: string;
  technology: Technology;
  createdBy?: User;
  questionsTest: QuestionTest[];
  successRate: number;
  duration:number;
  userComments?: string[];
}
export interface TestState {
  tests: Test[];
  loading: boolean;
  error: any;
}
