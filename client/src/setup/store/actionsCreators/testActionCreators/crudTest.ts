import axios from "axios";
import { Dispatch } from "redux";
import { TestAction } from "../../actions/testActions";
import { RootState } from "../../store";
import { TestActionType } from "../../actionsTypes/test.actionsTypes";
import { Test } from "../../reducers/testReducers/testReducers.Models";

export const getTests =
  () =>
  async (dispatch: Dispatch<TestAction>, getState: () => RootState) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();
      dispatch({
        type: TestActionType.REQUEST_GET_TESTS,
      });
      const res = await axios.get<Test[]>("http://localhost:5000/tests", {
        headers: {
          "Content-Type": "application/json",
          authorization: userInfo ? userInfo.accesstoken : "",
        },
      });
      dispatch({
        type: TestActionType.SUCCESS_GET_TESTS,
        payload: res.data,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
      dispatch({
        type: TestActionType.FAILED_GET_TESTS,
        payload: err,
      });
    }
  };

export const createTest =
  (testData: Test) =>
  async (dispatch: Dispatch<TestAction>, getState: () => RootState) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();
      dispatch({
        type: TestActionType.REQUEST_CREATE_TEST,
      });
      console.log(testData);
      const res = await axios.post(
        "http://localhost:5000/tests",
        {...testData,createdBy:userInfo?._id},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: userInfo ? userInfo.accesstoken : "",
          },
        }
      );
      dispatch({
        type: TestActionType.SUCCESS_CREATE_TEST,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: TestActionType.FAILED_CREATE_TEST,
        payload: err,
      });
    }
  };

export const updateTest =
  (testId: string, updatedData: Partial<Test>) =>
  async (dispatch: Dispatch<TestAction>, getState: () => RootState) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();
      dispatch({
        type: TestActionType.REQUEST_UPDATE_TEST,
      });
      const res = await axios.put(
        `http://localhost:5000/tests/${testId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: userInfo ? userInfo.accesstoken : "",
          },
        }
      );
      dispatch({
        type: TestActionType.SUCCESS_UPDATE_TEST,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: TestActionType.FAILED_UPDATE_TEST,
        payload: err,
      });
    }
  };

export const deleteTest =
  (testId: string) =>
  async (dispatch: Dispatch<TestAction>, getState: () => RootState) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();
      dispatch({
        type: TestActionType.REQUEST_DELETE_TEST,
      });
      await axios.delete(`http://localhost:5000/tests/${testId}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: userInfo ? userInfo.accesstoken : "",
        },
      });
      dispatch({
        type: TestActionType.SUCCESS_DELETE_TEST,
        payload: testId,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: TestActionType.FAILED_DELETE_TEST,
        payload: err,
      });
    }
  };
