import { ActionSurvey } from "../../actions/surveyActions";
import { SurveyDetailsStata } from "./surveyReducerModels";
import { SurveyActionTypes } from "../../actionsTypes/survey.actionTypes";
export const surveyDetailsReducer = (
  state: SurveyDetailsStata = {
    surveyload: false,
    surveyDetData:null,
    surveyerr: {},
  },
  action: ActionSurvey
) => {
  switch (action.type) {
    case SurveyActionTypes.REQUEST_GET_GLOBAL_SURVEY_INFO:
      return { ...state, surveyload: true, surveyDetData:null};

    case SurveyActionTypes.SUCCESS_GET_GLOBAL_SURVEY_INFO:
      return {
        ...state,
        surveyload: false,
        surveyDetData: action.payload,
        surveyerr: {},
      };

    case SurveyActionTypes.FAILURE_GET_GLOBAL_SURVEY_INFO:
      return { ...state, surveyload: false, surveyerr: action.payload };
    default: {
      return state;
    }
  }
};

