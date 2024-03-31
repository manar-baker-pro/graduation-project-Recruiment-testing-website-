import { TechnologiesActionType } from "../actionsTypes/technologyActionType";
import { Technology } from "../reducers/technologyReducers/technologyReducerModels";
interface TechnologyActionPending {
  type:
    | TechnologiesActionType.REQUEST_GET_TECHNOLOGIES
    | TechnologiesActionType.REQUEST_UPDATE_TECHNOLOGY
    | TechnologiesActionType.REQUEST_DELETE_TECHNOLOGY
    | TechnologiesActionType.REQUEST_CREATE_TECHNOLOGY;
}
interface GetTechnologiesAction {
  type: TechnologiesActionType.SUCCESS_GET_TECHNOLOGIES;
  payload: Technology[];
}
interface AddTechnologyAction {
  type: TechnologiesActionType.SUCCESS_CREATE_TECHNOLOGY;

  payload: Technology;
}
interface DeleteTechnologyAction {
  type: TechnologiesActionType.SUCCESS_DELETE_TECHNOLOGY;
  payload: string;
}

interface UpdateTechnologyAction {
  type: TechnologiesActionType.SUCCESS_UPDATE_TECHNOLOGY;
  payload: Technology;
}

interface SurveyActionFail {
  type:
    | TechnologiesActionType.FAILED_GET_TECHNOLOGIES
    | TechnologiesActionType.FAILED_UPDATE_TECHNOLOGY
    | TechnologiesActionType.FAILED_DELETE_TECHNOLOGY
    | TechnologiesActionType.FAILED_CREATE_TECHNOLOGY;
  payload: any;
}

export type TechnologyAction =
  | TechnologyActionPending
  | SurveyActionFail
  | GetTechnologiesAction
  | AddTechnologyAction
  | DeleteTechnologyAction
  | UpdateTechnologyAction;
