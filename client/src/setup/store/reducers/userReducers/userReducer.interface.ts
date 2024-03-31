import { Role } from "../roleReducer/roleReducer.interface";
import { Technology } from "../technologyReducers/technologyReducerModels";

export interface User {
  username: string;
  email: string;
  profilePic: string;
  phoneNumber?: string;
  country?: string;
  gender?: string;
  links?:string [];
  cv?: string;
  experience?: [
    {
      technology: Technology;
      score: number;
    }
  ];
}
export interface SuccessGetProfile {
  _id: string;
  username: string;
  email: string;
  profilePic: string;
  role?: Role;
}
export interface UserProfileState {
  userProfileload: boolean;
  userProfileDa?: User;
  userProfileError: any;
}
