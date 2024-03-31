import { TestAction } from "../../actions/testActions";
import { TestActionType } from "../../actionsTypes/test.actionsTypes";
import { TestState } from "./testReducers.Models";

const initialState: TestState = {
    tests: [],
    loading: false,
    error: null,
  };
  
  const testReducer = (state = initialState, action: TestAction): TestState => {
    switch (action.type) {
      case TestActionType.REQUEST_GET_TESTS:
      case TestActionType.REQUEST_UPDATE_TEST:
      case TestActionType.REQUEST_DELETE_TEST:
      case TestActionType.REQUEST_CREATE_TEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case TestActionType.SUCCESS_GET_TESTS:
        return {
          ...state,
          tests: action.payload,
          loading: false,
          error: null,
        };
      case TestActionType.SUCCESS_CREATE_TEST:
        return {
          ...state,
          tests: [...state.tests, action.payload],
          loading: false,
          error: null,
        };
      case TestActionType.SUCCESS_DELETE_TEST:
        return {
          ...state,
          tests: state.tests.filter((test) => test._id !== action.payload),
          loading: false,
          error: null,
        };
      case TestActionType.SUCCESS_UPDATE_TEST:
        return {
          ...state,
          tests: state.tests.map((test) =>
            test._id === action.payload._id ? action.payload : test
          ),
          loading: false,
          error: null,
        };
      case TestActionType.FAILED_GET_TESTS:
      case TestActionType.FAILED_UPDATE_TEST:
      case TestActionType.FAILED_DELETE_TEST:
      case TestActionType.FAILED_CREATE_TEST:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default testReducer;