import axios from "axios";
import { Dispatch } from "react";
import {
  SuccessSignIn,
  SuccessSignInUser,
  UserAnyRoleTrySign,
} from "../../reducers/authReducers/auth.reducers.interfaces";
import { ActionAuth } from "../../actions/authActions";
import "react-toastify/dist/ReactToastify.css";
import { AuthActionTypes } from "../../actionsTypes/auth.actionsTypes";
import { toast } from "react-toastify";;
export const SignIn = (user: UserAnyRoleTrySign) => {

  return async (dispatch: Dispatch<ActionAuth>) => {

    try {
      dispatch({ type: AuthActionTypes.REQUEST_SIGN });
      const res = await axios.post<SuccessSignIn|SuccessSignInUser>(
        "http://localhost:5000/auth/login",
        user,
        {
          withCredentials: true,
        }
      );
      const { data } = res;
      localStorage.setItem("UserData", JSON.stringify(data));
      dispatch({ type: AuthActionTypes.SUCCESS_SIGN, payload: data });
     
    } catch (err: any) {
      toast.dismiss();
      if (err.response) {
        if (err.response.data.confirm) {
          let message = {
            _id: err.response.data._id,
            email: err.response.data.handel,
          };
          toast.error("Confirm your email");
          dispatch({ type: AuthActionTypes.CLEAR_USER_PAGE });
        } else {
          toast.error(err.response.data.email);
          dispatch({
            type: AuthActionTypes.FAILED_SIGN,
            payload: err.response.data,
          });
        }
      } else {
        toast.error(err.message);
        dispatch({ type: AuthActionTypes.FAILED_SIGN, payload: err.message });
      }
    }
  };
};
export const Logout = () => {
  return async (dispatch: Dispatch<ActionAuth>) => {
    try {
      dispatch({ type: AuthActionTypes.REQUEST_SIGNOUT });
      await axios.post("http://localhost:5000/auth/logout", null, {
        withCredentials: true,
      });
      // Cookies.remove("refreshToken");
      localStorage.removeItem("UserData");
      localStorage.removeItem("surveyDataUser");
      dispatch({ type: AuthActionTypes.SUCCESS_SIGNOUT });
      toast.success("Logged out successfully");
    } catch (err: any) {
      toast.error(err.message);
      dispatch({ type: AuthActionTypes.FAILED_SIGNOUT, payload: err.message });
    }
  };
};