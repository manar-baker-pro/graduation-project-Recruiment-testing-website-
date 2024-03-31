import { Dispatch } from "react";
import { userAction } from "../../actions/userActions";
import { RootState } from "../../store";
import axios from "axios";
import { userProfileType } from "../../actionsTypes/userProfile.actionType";
import { User } from "../../reducers/userReducers/userReducer.interface";
export const GetProfile = () => {
  return async (dispatch: Dispatch<userAction>, getState: () => RootState) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();

      dispatch({ type: userProfileType.REQUEST_GET_PROFILE_USER });
      const { data } = await axios.get<User>(
        `http://localhost:5000/user/profile/${userInfo?._id}`,

        {
          headers: {
            "Content-Type": "application/json",
            authorization: userInfo ? userInfo.accesstoken : "",
          },
        }
      );
      dispatch({
        type: userProfileType.SUCCESS_GET_PROFILE_USER,
        payload: data,
      });
    } catch (err: any) {
      dispatch({
        type: userProfileType.FAILED_GET_PROFILE_USER,
        payload: err.message,
      });
    }
  };
};
export const UpdateProfile = (newDataProfile: User) => {
  return async (dispatch: Dispatch<userAction>, getState: () => RootState) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();

      dispatch({ type: userProfileType.REQUEST_UPDATE_PROFILE_USER });
      const { data } = await axios.put<User>(
        `http://localhost:5000/user/profile/${userInfo?._id}`,
        newDataProfile,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: userInfo ? userInfo.accesstoken : "",
          },
        }
      );
      dispatch({
        type: userProfileType.SUCCESS_UPDATE_PROFILE_USER,
        payload: data,
      });
      localStorage.setItem(
        "UserData",
        JSON.stringify({ ...userInfo, profileUser: data })
      );
    } catch (err: any) {
      dispatch({
        type: userProfileType.FAILED_UPDATE_PROFILE_USER,
        payload: err.message,
      });
    }
  };
};
