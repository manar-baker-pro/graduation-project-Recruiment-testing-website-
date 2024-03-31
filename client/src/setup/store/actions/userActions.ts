import { userProfileType } from "../actionsTypes/userProfile.actionType";
import { User } from "../reducers/userReducers/userReducer.interface";

interface userActionPending {
  type:
    | userProfileType.REQUEST_GET_PROFILE_USER
    | userProfileType.REQUEST_UPDATE_PROFILE_USER;
}

export interface SuccessUpdateProfile {
  type: userProfileType.SUCCESS_UPDATE_PROFILE_USER;
  payload: User;
}
interface SuccessGetProfile {
  type: userProfileType.SUCCESS_GET_PROFILE_USER;
  payload: User;
}
interface userActionFail {
  type:
    | userProfileType.FAILED_GET_PROFILE_USER
    | userProfileType.FAILED_UPDATE_PROFILE_USER;
  payload: any;
}

export type userAction =
  | userActionFail
  | userActionPending
  | SuccessUpdateProfile
  | SuccessGetProfile;
