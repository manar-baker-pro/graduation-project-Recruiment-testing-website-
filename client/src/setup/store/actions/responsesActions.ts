import { ResponsesActionTypes } from "../actionsTypes/response.actionsTypes";
import { Response } from "../reducers/responsesReducers/responsesReducer.interface";
interface ResponsesActionPending {
  type:
    | ResponsesActionTypes.REQUEST_ADD_RESPONSE_SURVEY
    | ResponsesActionTypes.REQUEST_GET_RESPONSES_SURVEY;
}

export interface SuccessAddRESPONSE {
  type: ResponsesActionTypes.SUCCESS_ADD_RESPONSE_SURVEY;
  payload: Response;
}
interface SuccessGetRESPONSES {
  type: ResponsesActionTypes.SUCCESS_GET_RESPONSES_SURVEY;
  payload: Response[];
}
interface ResponsesActionFail {
  type:
    | ResponsesActionTypes.FAILED_ADD_RESPONSE_SURVEY
    | ResponsesActionTypes.FAILED_GET_RESPONSES_SURVEY;
  payload: any;
}

export type ResponsesActions =
  | ResponsesActionFail
  | SuccessAddRESPONSE
  | ResponsesActionPending
  | SuccessGetRESPONSES;
