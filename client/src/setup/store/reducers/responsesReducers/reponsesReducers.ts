import { ResponsesActions } from "../../actions/responsesActions";
import { ResponsesActionTypes } from "../../actionsTypes/response.actionsTypes";
import { ResponsesState } from "./responsesReducer.interface";

const initialState: ResponsesState = {
  loading: false,
  error: null,
  responses: [],
};

const responseReducer = (
  state = initialState,
  action: ResponsesActions
): ResponsesState => {
  switch (action.type) {
    case ResponsesActionTypes.REQUEST_ADD_RESPONSE_SURVEY:
    case ResponsesActionTypes.REQUEST_GET_RESPONSES_SURVEY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ResponsesActionTypes.SUCCESS_ADD_RESPONSE_SURVEY:
      return {
        ...state,
        loading: false,
        error: null,
        responses: [...state.responses, action.payload],
      };
    case ResponsesActionTypes.SUCCESS_GET_RESPONSES_SURVEY:
      return {
        ...state,
        loading: false,
        error: null,
        responses: action.payload,
      };
    case ResponsesActionTypes.FAILED_ADD_RESPONSE_SURVEY:
    case ResponsesActionTypes.FAILED_GET_RESPONSES_SURVEY:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default responseReducer;
