import { TestActionType } from "../actionsTypes/test.actionsTypes";
import { Test } from "../reducers/testReducers/testReducers.Models";

interface TestActionPending {
  type:
    | TestActionType.REQUEST_GET_TESTS
    | TestActionType.REQUEST_UPDATE_TEST
    | TestActionType.REQUEST_DELETE_TEST
    | TestActionType.REQUEST_CREATE_TEST;
}
interface GetTestAction {
  type: TestActionType.SUCCESS_GET_TESTS;
  payload: Test[];
}
interface AddTestAction {
  type: TestActionType.SUCCESS_CREATE_TEST;

  payload: Test;
}
interface DeleteTestAction {
  type: TestActionType.SUCCESS_DELETE_TEST;
  payload: string;
}

interface UpdateTestAction {
  type: TestActionType.SUCCESS_UPDATE_TEST;
  payload: Test;
}

interface SurveyActionFail {
  type:
    | TestActionType.FAILED_GET_TESTS
    | TestActionType.FAILED_UPDATE_TEST
    | TestActionType.FAILED_DELETE_TEST
    | TestActionType.FAILED_CREATE_TEST;
  payload: any;
}

export type TestAction =
  | TestActionPending
  | SurveyActionFail
  | GetTestAction
  | AddTestAction
  | DeleteTestAction
  | UpdateTestAction;
