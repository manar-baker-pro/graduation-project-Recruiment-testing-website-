import { ActionAuth } from "../../actions/authActions";
import { CompanyAction } from "../../actions/company.Actions";
import { userAction } from "../../actions/userActions";
import { AuthActionTypes } from "../../actionsTypes/auth.actionsTypes";
import { CompanyProfileType } from "../../actionsTypes/companyProfile.actionsTypes";
import { userProfileType } from "../../actionsTypes/userProfile.actionType";
import {
  CompanyProfile,
  SigninState,
  UserProfile,
} from "./auth.reducers.interfaces";

export const userSignIn = (
  state: SigninState = {
    loadin: false,
    errorin: "",
    userInfo: undefined,
    success: false,
  },
  action: ActionAuth | userAction|CompanyAction
) => {
  switch (action.type) {
    case AuthActionTypes.REQUEST_SIGN:
      return { ...state, loadin: true };
    case AuthActionTypes.SUCCESS_SIGN:
      return {
        ...state,
        loadin: false,
        userInfo: action.payload,
        errorin: "",
        success: true,
      };
    case AuthActionTypes.CLEAR_SIGN_IN_FLAG:
      return { ...state, loadin: false, success: false };
    case AuthActionTypes.FAILED_SIGN:
      return { ...state, loadin: false, errorin: action.payload };
    case AuthActionTypes.REQUEST_SIGNOUT:
      return { ...state, loadin: true };
    case AuthActionTypes.SUCCESS_SIGNOUT:
      return { ...state, loadin: false, userInfo: undefined, success: false };
    case AuthActionTypes.FAILED_SIGNOUT:
      return { ...state, loadin: false, errorin: action.payload };
    case userProfileType.SUCCESS_UPDATE_PROFILE_USER:
      if (state.userInfo && "profileUser" in state.userInfo) {
        const updatedUserInfo = {
          ...state,
          loadin: false,
          userInfo: {
            ...state.userInfo,
            profileUser: action.payload as UserProfile,
          },
        };

        return updatedUserInfo;
      } else {
        return state;
      }
    case CompanyProfileType.SUCCESS_UPDATE_PROFILE_COMPANY:
      if (state.userInfo && "profileCompany" in state.userInfo) {
        const updatedCompanyInfo = {
          ...state,
          loadin: false,
          userInfo: {
            ...state.userInfo,
            profileCompany: action.payload as CompanyProfile,
          },
        };

        return updatedCompanyInfo;
      } else {
        return state;
      }
    default: {
      return state;
    }
  }
};
