import { CompanyAction } from "../../actions/company.Actions";
import { CompanyActionTypes } from "../../actionsTypes/companyActionType";
import { CompanyNotActiveState } from "./companyReducer.interface";
import { Company } from "../../actions/company.Actions";
export const companyReducer = (
  state: CompanyNotActiveState = {
    CNAload: false,
    CNADa: [],
    CNAerr: {},
  },
  action: CompanyAction
) => {
  switch (action.type) {
    case CompanyActionTypes.REQUEST_GET_COMPANIES_NOT_ACTIVE:
      return { ...state, CNAload: true };
    case CompanyActionTypes.SUCCESS_GET_COMPANIES_NOT_ACTIVE:
      return { ...state, CNADa: action.payload, CNAload: false };
    case CompanyActionTypes.FAILED_GET_COMPANIES_NOT_ACTIVE:
      return { ...state, CNAerr: action.payload, CNAload: false };
    case CompanyActionTypes.REQUEST_ACTIVATE_COMPANY:
      return { ...state, CNAload: true };
    case CompanyActionTypes.SUCCESS_ACTIVATE_COMPANY:
      return {
        ...state,
        CNADa: state.CNADa.filter((comp: Company) => {
          return action.payload._id !== comp._id;
        }),
        CNAload: false,
      };
    case CompanyActionTypes.FAILED_ACTIVATE_COMPANY:
      return { ...state, CNAerr: action.payload, CNAload: false };
    // case CompanyActionTypes.REQUEST_UPDATE_PROFILE_COMPANY:
    //   return { ...state, CNAload: true };
    // case CompanyActionTypes.SUCCESS_UPDATE_PROFILE_COMPANY:
    //   return { ...state, CNADa: action.payload, CNAload: false };
    // case CompanyActionTypes.FAILED_UPDATE_PROFILE_COMPANY:
    //   return { ...state, CNAerr: action.payload, CNAload: false };
    default:
      return state;
  }
};
