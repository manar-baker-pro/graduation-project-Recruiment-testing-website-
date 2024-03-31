import { userAction } from "../../actions/userActions";
import { userProfileType } from "../../actionsTypes/userProfile.actionType";
import { UserProfileState } from "./userReducer.interface";

export const userProfileReducer = (
  state: UserProfileState = {
    userProfileload: false,
    userProfileDa: undefined,
    userProfileError: {},
  },
  action: userAction
) => {
  switch (action.type) {
    case userProfileType.REQUEST_GET_PROFILE_USER:
      return { ...state, userProfileload: true };
    case userProfileType.SUCCESS_GET_PROFILE_USER:
      return {
        ...state,
        userProfileDa: action.payload,
        userProfileload: false,
      };
    case userProfileType.FAILED_GET_PROFILE_USER:
      return {
        ...state,
        userProfileError: action.payload,
        userProfileload: false,
      };
    case userProfileType.REQUEST_UPDATE_PROFILE_USER:
      return { ...state, CNAload: true };
    case userProfileType.SUCCESS_UPDATE_PROFILE_USER:
      return {
        ...state,
        userProfileDa: action.payload,
        userProfileload: false,
      };
    case userProfileType.FAILED_UPDATE_PROFILE_USER:
      return {
        ...state,
        userProfileError: action.payload,
        userProfileload: false,
      };
    default:
      return state;
  }
};
