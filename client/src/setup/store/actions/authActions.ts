// import { AuthActionTypes } from "../actionsTypes/auth.actionsTypes";
// import {
//   SuccessSignIn,
//   SuccessSignUp,
//   SuccessSignUpCompany,
// } from "../reducers/authReducers/auth.reducers.interfaces";
// interface ActionPendingUser {
//   type:
//     | AuthActionTypes.REQUEST_SIGN
//     | AuthActionTypes.REQUEST_RIGISTER
//     | AuthActionTypes.REQUEST_GET_USERS
//     | AuthActionTypes.REQUEST_GET_USERS_PAGE
//     | AuthActionTypes.CLEAR_SIGN_IN_FLAG
//     | AuthActionTypes.SUCCESS_SIGNOUT
//     | AuthActionTypes.CLEAR_USER_PAGE
//     | AuthActionTypes.REQUEST_CONFIRMED
//     | AuthActionTypes.FAILED_CONFIRMED
//     | AuthActionTypes.FAILED_RIGISTER;
// }

// interface Signup {
//   type: AuthActionTypes.SUCCESS_RIGISTER;
//   payload: SuccessSignUp | SuccessSignUpCompany;
// }
// interface SuccesConfirmed {
//   type: AuthActionTypes.SUCCESS_CONFIRMED;
//   payload: boolean;
// }
// interface Signin {
//   type: "SUCCESS_SIGN";
//   payload: SuccessSignIn;
// }
// // interface ActionFailed {
// //   type: "FAILED_SIGN" | "FAILED_RIGISTER" | "FAILED_GET_USERS";
// //   payload: any;
// // }
// export type ActionAuth =
//   | SuccesConfirmed
//   | Signup
//   | ActionPendingUser
//   | Signin
//   | ActionFailed;

import { AuthActionTypes } from "../actionsTypes/auth.actionsTypes";
import {
  SuccessSignIn,
  SuccessSignInUser,
  SuccessSignUp,
  SuccessSignUpCompany,
} from "../reducers/authReducers/auth.reducers.interfaces";
interface ActionPendingUser {
  type:
    | AuthActionTypes.REQUEST_SIGN
    | AuthActionTypes.REQUEST_SIGNOUT
    | AuthActionTypes.REQUEST_RIGISTER
    | AuthActionTypes.REQUEST_GET_USERS
    | AuthActionTypes.REQUEST_GET_USERS_PAGE
    | AuthActionTypes.CLEAR_SIGN_IN_FLAG
    | AuthActionTypes.SUCCESS_SIGNOUT
    | AuthActionTypes.CLEAR_USER_PAGE
    | AuthActionTypes.REQUEST_CONFIRMED
    | AuthActionTypes.FAILED_CONFIRMED
    | AuthActionTypes.FAILED_RIGISTER;
}

interface Signup {
  type: AuthActionTypes.SUCCESS_RIGISTER;
  payload: SuccessSignUp | SuccessSignUpCompany;
}
interface SuccesConfirmed {
  type: AuthActionTypes.SUCCESS_CONFIRMED;
  payload: boolean;
}
interface Signin {
  type: AuthActionTypes.SUCCESS_SIGN | AuthActionTypes.SUCCESS_SIGNOUT;
  payload: SuccessSignIn|SuccessSignInUser;
}
interface ActionFailed {
  type:
    | AuthActionTypes.FAILED_CONFIRMED
    | AuthActionTypes.FAILED_SIGNOUT
    | AuthActionTypes.FAILED_SIGN
    | AuthActionTypes.FAILED_RIGISTER|AuthActionTypes.FAILED_GET_USERS;
  payload: any;
}
export type ActionAuth =
  | SuccesConfirmed
  | Signup
  | ActionPendingUser
  | Signin
  | ActionFailed;
