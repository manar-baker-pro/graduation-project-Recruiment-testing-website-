import axios from "axios";
import { Dispatch } from "react";
import { RootState } from "../../store";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  Survey,
  SurveyRecived,
} from "../../reducers/surveyReducer/surveyReducerModels";
import { ActionSurvey } from "../../actions/surveyActions";
import { SurveyActionTypes } from "../../actionsTypes/survey.actionTypes";
// import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/en";
import dayjs from "dayjs";
export const createSurvey = (survey: Survey) => {
  return async (
    dispatch: Dispatch<ActionSurvey>,
    getState: () => RootState
  ) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();
      // let id = survey.title;
      let newSurvey = { ...survey, createdBy: userInfo?._id };
      dispatch({ type: SurveyActionTypes.REQUEST_CREATE_SURVEY });
      const { data } = await axios.post<SurveyRecived>(
        `http://localhost:5000/survey`,
        newSurvey,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: userInfo ? userInfo.accesstoken : "",
          },
        }
      );
      if (data) {
        dispatch({
          type: SurveyActionTypes.SUCCESS_CREATE_SURVEY,
          payload: data,
        });
        toast.success("Survey created successfully");
      }
    } catch (err: any) {
      toast.dismiss();

      if (err.response) {
        if (err.response.status === 403) {
          toast.error(
            "You are not allowed to add survey to the selected Technologies"
          );
        } else toast.error("Failed to add  survey");

        dispatch({
          type: SurveyActionTypes.FAILURE_CREATE_SURVEY,
          payload: err.response.data,
        });
      } else {
        toast.error(err.message);
        dispatch({
          type: SurveyActionTypes.FAILURE_CREATE_SURVEY,
          payload: err,
        });
      }
    }
  };
};
export const getSurveys = (filter?: string) => {
  return async (
    dispatch: Dispatch<ActionSurvey>,
    getState: () => RootState
  ) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();

      dispatch({ type: SurveyActionTypes.REQUEST_LOAD_SURVEYS });
      const { data } = await axios.get<any>(
        `http://localhost:5000/survey`,

        {
          params: {
            filter: filter,
          },
          headers: {
            "Content-Type": "application/json",
            authorization: userInfo ? userInfo.accesstoken : "",
          },
        }
      );
      if (data) {
        const formattedSurveys = data.surveys.map((item: any) => {
          const formattedDate = dayjs(item.createdAt).format("LLL ");
          return { ...item, createdAt: formattedDate };
        });

        dispatch({
          type: SurveyActionTypes.SUCCESS_LOAD_SURVEYS,
          payload: formattedSurveys,
        });
        toast.success("Survey Loaded successfully");
      }
    } catch (err: any) {
      toast.dismiss();

      if (err.response) {
        if (err.response.status === 403) {
          toast.error("You are not allowed to laod Surveys");
        } else toast.error("Failed to load  survey");

        dispatch({
          type: SurveyActionTypes.FAILURE_LOAD_SURVEYS,
          payload: err.response.data,
        });
      } else {
        toast.error(err.message);
        dispatch({
          type: SurveyActionTypes.FAILURE_CREATE_SURVEY,
          payload: err,
        });
      }
    }
  };
};
export const getRecents = () => {
  return async (
    dispatch: Dispatch<ActionSurvey>,
    getState: () => RootState
  ) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();

      dispatch({ type: SurveyActionTypes.REQUEST_GET_RECENT_SURVEYS });
      const { data } = await axios.get<any>(
        `http://localhost:5000/survey/recents`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: userInfo ? userInfo.accesstoken : "",
          },
        }
      );

      if (data) {
        const formattedSurveys = data.surveys.map((item: any) => {
          const formattedDate = dayjs(item.createdAt).format("LLL ");
          return { ...item, createdAt: formattedDate };
        });

        dispatch({
          type: SurveyActionTypes.SUCCESS_GET_RECENT_SURVEYS,
          payload: formattedSurveys,
        });
      }
    } catch (err: any) {
      dispatch({
        type: SurveyActionTypes.FAILURE_GET_RECENT_SURVEYS,
        payload: err,
      });
    }
  };
};
export const getAvailbleSurvey = () => {
  return async (
    dispatch: Dispatch<ActionSurvey>,
    getState: () => RootState
  ) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();

      dispatch({ type: SurveyActionTypes.REQUEST_GET_AVAILABLE_SURVEYS });
      const { data } = await axios.get<any>(
        `http://localhost:5000/survey/availbleSurvey`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: userInfo ? userInfo.accesstoken : "",
          },
        }
      );

      if (data) {
        const formattedSurveys = data.surveys.map((item: any) => {
          const formattedDate = dayjs(item.createdAt).format("LLL ");
          return { ...item, createdAt: formattedDate };
        });
        localStorage.setItem(
          "surveyDataUser",
          JSON.stringify(formattedSurveys)
        );
        dispatch({
          type: SurveyActionTypes.SUCCESS_GET_AVAILABLE_SURVEYS,
          payload: formattedSurveys,
        });
      }
    } catch (err: any) {
      dispatch({
        type: SurveyActionTypes.FAILURE_GET_AVAILABLE_SURVEYS,
        payload: err,
      });
    }
  };
};

// export const Getques = (language: string) => {
//   return async (dispatch: Dispatch<ActionQues>, getState: () => RootState) => {
//     try {
//       const {
//         userSign: { userInfo },
//       } = getState();
//       dispatch({ type: "REQUEST_GET_QUESTIONS" });
//       const { data } = await axios.get<Question[]>(
//         `http://localhost:4010/question/all/${language}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             authorization: userInfo ? userInfo.accesstoken : "",
//           },
//         }
//       );
//       dispatch({ type: "SUCCESS_GET_QUESTIONS", payload: data });
//     } catch (err: any) {
//       if (err.response) {
//         dispatch({
//           type: "FAILED_CREATE_QUESTION",
//           payload: err.response.data,
//         });
//       } else {
//         dispatch({ type: "FAILED_CREATE_QUESTION", payload: err });
//       }
//     }
//   };
// };

// export const Getoptions = (
//   language: string,
//   quesId: string,
//   optionId: string
// ) => {
//   return async (dispatch: Dispatch<ActionQues>, getState: () => RootState) => {
//     try {
//       const {
//         userSign: { userInfo },
//       } = getState();
//       dispatch({ type: "REQUEST_GET_OPTIONS" });
//       const { data } = await axios.get<{ success: boolean; option: string }>(
//         `http://localhost:4010/question/answer?lang=${language}&optionId=${optionId}&quesId=${quesId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             authorization: userInfo ? userInfo.accesstoken : "",
//           },
//         }
//       );
//       dispatch({ type: "SUCCESS_ANSWER_QUESTION", payload: data });
//     } catch (err: any) {
//       if (err.response) {
//         dispatch({
//           type: "FAILED_CREATE_QUESTION",
//           payload: err.response.data,
//         });
//       } else {
//         dispatch({ type: "FAILED_CREATE_QUESTION", payload: err });
//       }
//     }
//   };
// };
// export const ClearAnswer = () => {
//   return (dispatch: Dispatch<ActionQues>) => {
//     dispatch({ type: "CLEAR_ANSWER" });
//   };
// };
