import { User } from "../userReducers/userReducer.interface";

 export type Answer = {
    questionId: string;
    answer: string | string[];
    points?:number
  };
export interface Response{
    user:User;
    Survey:string;
    response:Answer[];
}
export interface ResponsesState {
    loading: boolean;
    error: any;
    responses:Response[]; 
  }