import { SurveyDetailsRecived, SurveyRecived } from "../reducers/surveyReducer/surveyReducerModels";
import { SurveyActionTypes } from "../actionsTypes/survey.actionTypes";
interface SurveyActionPending {
  type:
    | SurveyActionTypes.REQUEST_CREATE_SURVEY
    | SurveyActionTypes.REQUEST_LOAD_SURVEYS
    | SurveyActionTypes.REQUEST_UPDATE_SURVEY
    | SurveyActionTypes.REQUEST_DELETE_SURVEY
    | SurveyActionTypes.REQUEST_GET_RECENT_SURVEYS
    | SurveyActionTypes.REQUEST_GET_AVAILABLE_SURVEYS
    | SurveyActionTypes.REQUEST_GET_GLOBAL_SURVEY_INFO;
}
interface SurveySuccessCreating {
  type: SurveyActionTypes.SUCCESS_CREATE_SURVEY;
  payload: SurveyRecived;
}
interface SurveySuccessUpdating {
  type: SurveyActionTypes.SUCCESS_UPDATE_SURVEY;
  payload: SurveyRecived;
}
interface SurveySuccessDeleting {
  type: SurveyActionTypes.SUCCESS_DELETE_SURVEY;
  payload: SurveyRecived;
}
interface SurveySuccessGetDetails {
  type: SurveyActionTypes.SUCCESS_GET_GLOBAL_SURVEY_INFO;
  payload: SurveyDetailsRecived;
}

interface SurveysSuccessLoad {
  type: SurveyActionTypes.SUCCESS_LOAD_SURVEYS;
  payload: SurveyRecived[];
}
interface GetRecentsSuccessAction {
  type: SurveyActionTypes.SUCCESS_GET_RECENT_SURVEYS;
  payload: SurveyRecived[];
}
interface GetAvailableSuccessAction {
  type: SurveyActionTypes.SUCCESS_GET_AVAILABLE_SURVEYS;
  payload: SurveyRecived[];
}
interface SurveyActionFail {
  type:
    | SurveyActionTypes.FAILURE_CREATE_SURVEY
    | SurveyActionTypes.FAILURE_DELETE_SURVEY
    | SurveyActionTypes.FAILURE_LOAD_SURVEYS
    | SurveyActionTypes.FAILURE_UPDATE_SURVEY
    | SurveyActionTypes.FAILURE_GET_RECENT_SURVEYS
    | SurveyActionTypes.FAILURE_GET_AVAILABLE_SURVEYS
    | SurveyActionTypes.FAILURE_GET_GLOBAL_SURVEY_INFO;

  payload: any;
}

export type ActionSurvey =
  | SurveyActionFail
  | SurveySuccessCreating
  | SurveysSuccessLoad
  | SurveySuccessDeleting
  | SurveyActionPending
  | SurveySuccessUpdating
  | GetRecentsSuccessAction
  | GetAvailableSuccessAction
  | SurveySuccessGetDetails;
