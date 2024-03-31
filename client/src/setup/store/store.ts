import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { userSignUp } from "./reducers/authReducers/userSignUp.reducers";
import { ActionAuth } from "./actions/authActions";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";
import { userSignIn } from "./reducers/authReducers/userSignIn.reducers";
import { surveyReducer } from "./reducers/surveyReducer/surveyReducer";
import { companyReducer } from "./reducers/companyReducers/company.reducers";
import { companyProfileReducer } from "./reducers/companyReducers/companyProfile.reducers";
import { technologyReducer } from "./reducers/technologyReducers/technologiesReducer";
import { userProfileReducer } from "./reducers/userReducers/userPorfileReducer";
import testReducer from "./reducers/testReducers/testReducers";
import { surveyDetailsReducer } from "./reducers/surveyReducer/surveyDetailsReducer";
import responseReducer from "./reducers/responsesReducers/reponsesReducers";
const check = localStorage.getItem("UserData");
const initSurveyUser = localStorage.getItem("surveyDataUser");
if (typeof check === "string") {
  var userInfo: any = JSON.parse(localStorage.getItem("UserData") || "");
}
if (typeof initSurveyUser === "string") {
  var surveyData: any = JSON.parse(
    localStorage.getItem("surveyDataUser") || ""
  );
}
const initialstate: any = {
  userSignIn: { userInfo },
  userSignUp: {},
  companyReducer: {},
  surveyReducer: {surveyData},
  companyProfileReducer: {},
  technologyReducer: {},
  userProfileReducer: {},
  testReducer: {},
  surveyDetailsReducer:{},
  responseReducer:{}
};

const reducer = combineReducers({
  userSignUp: userSignUp,
  userSignIn: userSignIn,
  companyReducer: companyReducer,
  companyProfileReducer: companyProfileReducer,
  surveyReducer: surveyReducer,
  technologyReducer: technologyReducer,
  userProfileReducer: userProfileReducer,
  testReducer:testReducer,
  surveyDetailsReducer:surveyDetailsReducer,
  responseReducer:responseReducer,
});
const rootReducer = (state: any, action: any) => {
  if (action.type === "SUCCESS_SIGNOUT") {
    state = undefined;
  }
  return reducer(state, action);
};
const config = {
  predicate: (action: ActionAuth) =>
    action.type === "REQUEST_RIGISTER" ||
    action.type === "REQUEST_SIGN" ||
    action.type === "REQUEST_CONFIRMED" ||
    action.type === "SUCCESS_RIGISTER" ||
    action.type === "SUCCESS_SIGN" ||
    action.type === "SUCCESS_SIGNOUT" ||
    action.type === "SUCCESS_CONFIRMED" ||
    action.type === "CLEAR_SIGN_IN_FLAG" ||
    action.type === "FAILED_CONFIRMED" ||
    action.type === "FAILED_RIGISTER" ||
    action.type === "FAILED_SIGN",
};
const middlewares:any = [createStateSyncMiddleware(config)];
export const Store =
  rootReducer &&
  createStore(
    rootReducer,
    initialstate,
    composeWithDevTools(applyMiddleware(thunk,...middlewares))
  );
initMessageListener(Store);

export type RootState = ReturnType<typeof rootReducer>;
