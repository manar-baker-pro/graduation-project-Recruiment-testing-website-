import { Dispatch } from "react";
import { ActionSurvey } from "../../actions/surveyActions";
import { RootState } from "../../store";
import { SurveyActionTypes } from "../../actionsTypes/survey.actionTypes";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export const getSurveyDetails = (surveyId: string) => {
  return async (
    dispatch: Dispatch<ActionSurvey>,
    getState: () => RootState
  ) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();

      dispatch({ type: SurveyActionTypes.REQUEST_GET_GLOBAL_SURVEY_INFO });
      const { data } = await axios.get<any>(
        `http://localhost:5000/survey/surveyDetails/${surveyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: userInfo ? userInfo.accesstoken : "",
          },
        }
      );

      if (data) {
        const formattedDate = dayjs(data.survey.createdAt).format("LLL ");
        const formattedExpireDate = dayjs(data.survey.expireDate).format(
          "LLL "
        );
        const formattedSurvey = {
          ...data.survey,
          createdAt: formattedDate,
          expireDate: formattedExpireDate,
        };
        dispatch({
          type: SurveyActionTypes.SUCCESS_GET_GLOBAL_SURVEY_INFO,
          payload: formattedSurvey,
        });
        toast.success("Survey details loaded successfully");
      }
    } catch (err: any) {
      toast.dismiss();

      if (err.response) {
        if (err.response.status === 403) {
          toast.error("You are not allowed to access the survey details");
        } else {
          toast.error("Failed to load survey details");
        }

        dispatch({
          type: SurveyActionTypes.FAILURE_GET_GLOBAL_SURVEY_INFO,
          payload: err.response.data,
        });
      } else {
        toast.error(err.message);
        dispatch({
          type: SurveyActionTypes.FAILURE_GET_GLOBAL_SURVEY_INFO,
          payload: err,
        });
      }
    }
  };
};
