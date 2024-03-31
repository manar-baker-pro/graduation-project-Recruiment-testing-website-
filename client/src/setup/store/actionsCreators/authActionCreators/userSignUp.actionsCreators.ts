import axios from "axios";
import { Dispatch } from "redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SuccessSignUp,
  UserTryRegister,
  CompanyTryRegister,
  SuccessSignUpCompany,
  //   UserOrig,
} from "../../reducers/authReducers/auth.reducers.interfaces";
import { ActionAuth } from "../../actions/authActions";
import { AuthActionTypes } from "../../actionsTypes/auth.actionsTypes";
import { RootState } from "../../store";
export const userSignUpActionCreator = (
  userInfo: UserTryRegister | CompanyTryRegister
) => {
  toast.dismiss();
  return async (dispatch: Dispatch<ActionAuth>) => {
    try {
      dispatch({ type: AuthActionTypes.REQUEST_RIGISTER });
      const { data } = await axios.post<SuccessSignUp|SuccessSignUpCompany>(
        `${
          "recruitmentOfficer" in userInfo
            ? "http://localhost:5000/auth/registerComp"
            : "http://localhost:5000/auth/register"
        }`,
        userInfo
      );
      if (data) toast.success("Confirm your email");
      console.log(data+"from userSign creator");
      dispatch({ type: AuthActionTypes.SUCCESS_RIGISTER, payload: data });
    } catch (err: any) {
      toast.error("Failed Rigister");
      if (err.response) {
        dispatch({
          type: AuthActionTypes.FAILED_RIGISTER,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: AuthActionTypes.FAILED_RIGISTER,
          payload: err.message,
        });
      }
    }
  };
};
export const ConfirmAccount = () => {
  return async (dispatch: Dispatch<ActionAuth>, getState: () => RootState) => {
    toast.dismiss();
    try {
      const {
        userSignUp: { message },
      } = getState();
      console.log(message);
      dispatch({ type: AuthActionTypes.REQUEST_CONFIRMED });
      if (message) {
        const { data } = await axios.put<{ success: boolean }>(
          `${
            "emailWork" in message
              ? "http://localhost:5000/auth/confirmedComp"
              : "http://localhost:5000/auth/confirmed"
          }`,
          message
        );
        if (data.success) toast.success("Check your email for confirmation");
        dispatch({
          type: AuthActionTypes.SUCCESS_CONFIRMED,
          payload: data.success,
        });
      }
    } catch (err: any) {
      toast.error("Confirm Failed");
      dispatch({ type: AuthActionTypes.FAILED_CONFIRMED });
    }
  };
};

