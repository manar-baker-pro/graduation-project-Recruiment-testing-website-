import { ActionSurvey } from "../../actions/surveyActions";
import { SurveyState } from "./surveyReducerModels";
import { SurveyActionTypes } from "../../actionsTypes/survey.actionTypes";
export const surveyReducer = (
  state: SurveyState = {
    surveyload: false,
    surveyData: [],
    surveyerr: {},
  },
  action: ActionSurvey
) => {
  switch (action.type) {
    case SurveyActionTypes.REQUEST_CREATE_SURVEY:
      return { ...state, surveyload: true };
    case SurveyActionTypes.REQUEST_LOAD_SURVEYS:
      return { ...state, surveyload: true, surveyData: [] };
    case SurveyActionTypes.REQUEST_GET_RECENT_SURVEYS:
      return { ...state, surveyload: true, surveyData: [] };
    case SurveyActionTypes.REQUEST_GET_AVAILABLE_SURVEYS:
      return { ...state, surveyload: true, surveyData: [] };

    case SurveyActionTypes.SUCCESS_CREATE_SURVEY:
      return {
        ...state,
        surveyload: false,
        surveyData: [...state.surveyData, action.payload],
        surveyerr: {},
      };
    case SurveyActionTypes.SUCCESS_GET_RECENT_SURVEYS:
      return {
        ...state,
        surveyload: false,
        surveyData: action.payload,
        surveyerr: {},
      };
    case SurveyActionTypes.SUCCESS_GET_AVAILABLE_SURVEYS:
      return {
        ...state,
        surveyload: false,
        surveyData: action.payload,
        surveyerr: {},
      };
    case SurveyActionTypes.SUCCESS_LOAD_SURVEYS:
      return {
        ...state,
        surveyload: false,
        surveyData: action.payload,
        surveyerr: {},
      };

    case SurveyActionTypes.FAILURE_CREATE_SURVEY:
      return { ...state, surveyload: false, surveyerr: action.payload };
    case SurveyActionTypes.FAILURE_LOAD_SURVEYS:
      return { ...state, surveyload: false, surveyerr: action.payload };
    case SurveyActionTypes.FAILURE_GET_RECENT_SURVEYS:
      return { ...state, surveyload: false, surveyerr: action.payload };
    case SurveyActionTypes.FAILURE_GET_AVAILABLE_SURVEYS:
      return { ...state, surveyload: false, surveyerr: action.payload };

    default: {
      return state;
    }
  }
};
