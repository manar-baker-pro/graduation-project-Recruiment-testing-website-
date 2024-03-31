import { Dispatch } from "react";
import {
  Company,
  CompanyAction,
} from "../../actions/company.Actions";
import { RootState } from "../../store";
import axios from "axios";
import { CompanyActionTypes } from "../../actionsTypes/companyActionType";

export const GetCNA = (names?: string) => {
  return async (
    dispatch: Dispatch<CompanyAction>,
    getState: () => RootState
  ) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();
      dispatch({ type: CompanyActionTypes.REQUEST_GET_COMPANIES_NOT_ACTIVE });
      const { data } = await axios.get<Company[]>(
        `http://localhost:5000/company/notActive`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: userInfo ? userInfo.accesstoken : "",
          },
        }
      );
      dispatch({
        type: CompanyActionTypes.SUCCESS_GET_COMPANIES_NOT_ACTIVE,
        payload: data,
      });
    } catch (err: any) {
      dispatch({
        type: CompanyActionTypes.FAILED_GET_COMPANIES_NOT_ACTIVE,
        payload: err.message,
      });
    }
  };
};
export const ActivateCompany = (id:string) => {
  return async (
    dispatch: Dispatch<CompanyAction>,
    getState: () => RootState
  ) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();

      dispatch({ type: CompanyActionTypes.REQUEST_ACTIVATE_COMPANY });
      const { data } = await axios.put<Company>(
        `http://localhost:5000/company/activate/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: userInfo ? userInfo.accesstoken : "",
          },
        }
      );
      console.log(data);
      dispatch({
        type: CompanyActionTypes.SUCCESS_ACTIVATE_COMPANY,
        payload: data,
      });
    } catch (err: any) {
      dispatch({
        type: CompanyActionTypes.FAILED_ACTIVATE_COMPANY,
        payload: err.message,
      });
    }
  };
};

