import { Dispatch } from "react";
import {
  Company,
  CompanyAction,
} from "../../actions/company.Actions";
import { RootState } from "../../store";
import axios from "axios";
import { CompanyProfileType } from "../../actionsTypes/companyProfile.actionsTypes";
export const GetProfile = () => {
  return async (
    dispatch: Dispatch<CompanyAction>,
    getState: () => RootState
  ) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();

      dispatch({ type: CompanyProfileType.REQUEST_GET_PROFILE_COMPANY });
      const { data } = await axios.get<Company>(
        `http://localhost:5000/company/profile/${userInfo?._id}`,

        {
          headers: {
            "Content-Type": "application/json",
            authorization: userInfo ? userInfo.accesstoken : "",
          },
        }
      );
      dispatch({
        type: CompanyProfileType.SUCCESS_GET_PROFILE_COMPANY,
        payload: data,
      });
    } catch (err: any) {
      dispatch({
        type: CompanyProfileType.SUCCESS_GET_PROFILE_COMPANY,
        payload: err.message,
      });
    }
  };
};
export const UpdateProfile = (newDataProfile: Company) => {
  return async (
    dispatch: Dispatch<CompanyAction>,
    getState: () => RootState
  ) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();

      dispatch({ type: CompanyProfileType.REQUEST_UPDATE_PROFILE_COMPANY });
      const { data } = await axios.put<Company>(
        `http://localhost:5000/company/profile/${userInfo?._id}`,
        newDataProfile,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: userInfo ? userInfo.accesstoken : "",
          },
        }
      );
      dispatch({
        type: CompanyProfileType.SUCCESS_UPDATE_PROFILE_COMPANY,
        payload: data,
      });
      localStorage.setItem(
        "UserData",
        JSON.stringify({ ...userInfo, profileCompany: data })
      );
    } catch (err: any) {
      dispatch({
        type: CompanyProfileType.FAILED_UPDATE_PROFILE_COMPANY,
        payload: err.message,
      });
    }
  };
};
