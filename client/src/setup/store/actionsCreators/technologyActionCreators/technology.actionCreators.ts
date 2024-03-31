import axios from "axios";
import { Dispatch } from "redux";
import { TechnologyAction } from "../../actions/technologyActions";
import { TechnologiesActionType } from "../../actionsTypes/technologyActionType";
import { Technology } from "../../reducers/technologyReducers/technologyReducerModels";
import { RootState } from "../../store";
export const getTechnologies =
  () =>
  async (dispatch: Dispatch<TechnologyAction>, getState: () => RootState) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();
      dispatch({
        type: TechnologiesActionType.REQUEST_GET_TECHNOLOGIES,
      });
      const res = await axios.get<Technology[]>("http://localhost:5000/technologies", {
        headers: {
          "Content-Type": "application/json",
          authorization: userInfo ? userInfo.accesstoken : "",
        },
      });
      dispatch({
        type: TechnologiesActionType.SUCCESS_GET_TECHNOLOGIES,
        payload: res.data,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
      dispatch({
        type: TechnologiesActionType.FAILED_GET_TECHNOLOGIES,
        payload: err,
      });
    }
  };
export const addTechnology =
  (technology: Technology) =>
  async (dispatch: Dispatch<TechnologyAction>, getState: () => RootState) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();
      dispatch({
        type: TechnologiesActionType.REQUEST_CREATE_TECHNOLOGY,
      });
      const res = await axios.post(
        "http://localhost:5000/technologies",
        technology,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: userInfo ? userInfo.accesstoken : "",
          },
        }
      );

      dispatch({
        type: TechnologiesActionType.SUCCESS_CREATE_TECHNOLOGY,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: TechnologiesActionType.FAILED_CREATE_TECHNOLOGY,
        payload: err,
      });
    }
  };
export const deleteTechnology =
  (id: string) =>
  async (dispatch: Dispatch<TechnologyAction>, getState: () => RootState) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();
      dispatch({
        type: TechnologiesActionType.REQUEST_DELETE_TECHNOLOGY,
      });
      await axios.delete(`http://localhost:5000/technologies/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: userInfo ? userInfo.accesstoken : "",
        },
      });

      dispatch({
        type: TechnologiesActionType.SUCCESS_DELETE_TECHNOLOGY,
        payload: id,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: TechnologiesActionType.FAILED_DELETE_TECHNOLOGY,
        payload: err,
      });
    }
  };
export const updateTechnology =
  (technology: Technology) =>
  async (dispatch: Dispatch<TechnologyAction>, getState: () => RootState) => {
    try {
      const {
        userSignIn: { userInfo },
      } = getState();
      dispatch({
        type: TechnologiesActionType.REQUEST_UPDATE_TECHNOLOGY,
      });

      const res = await axios.put(
        `http://localhost:5000/technologies/${technology._id}`,
        technology,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: userInfo ? userInfo.accesstoken : "",
          },
        }
      );

      dispatch({
        type: TechnologiesActionType.SUCCESS_UPDATE_TECHNOLOGY,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);

      dispatch({
        type: TechnologiesActionType.FAILED_DELETE_TECHNOLOGY,
        payload: err,
      });
    }
  };
