import axios from "axios";
import { Dispatch } from "redux";
import { ResponsesActionTypes } from "../../actionsTypes/response.actionsTypes";
import { ResponsesActions } from "../../actions/responsesActions";
import { RootState } from "../../store";

export const getResponsesSurvey = (surveyId: string) => {
  return async (
    dispatch: Dispatch<ResponsesActions>,
    getState: () => RootState
  ) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();

      dispatch({ type: ResponsesActionTypes.REQUEST_GET_RESPONSES_SURVEY });

      const { data } = await axios.get<any>(
        `http://localhost:5000/responses/${surveyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: userInfo ? userInfo.accesstoken : "",
          },
        }
      );

      if (data) {
        dispatch({
          type: ResponsesActionTypes.SUCCESS_GET_RESPONSES_SURVEY,
          payload: data.responses,
        });
      }
    } catch (err: any) {
      dispatch({
        type: ResponsesActionTypes.FAILED_GET_RESPONSES_SURVEY,
        payload: err,
      });
    }
  };
};

export const addResponseSurvey = (surveyId: string, response: any) => {
  return async (
    dispatch: Dispatch<ResponsesActions>,
    getState: () => RootState
  ) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();

      dispatch({ type: ResponsesActionTypes.REQUEST_ADD_RESPONSE_SURVEY });

      const { data } = await axios.post<any>(
        `http://localhost:5000/responses`,
        {
          user: userInfo?._id,
          survey: surveyId,
          response: response,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: userInfo ? userInfo.accesstoken : "",
          },
        }
      );

      if (data) {
        dispatch({
          type: ResponsesActionTypes.SUCCESS_ADD_RESPONSE_SURVEY,
          payload: data.response,
        });
      }
    } catch (err: any) {
      dispatch({
        type: ResponsesActionTypes.FAILED_ADD_RESPONSE_SURVEY,
        payload: err,
      });
    }
  };
};
