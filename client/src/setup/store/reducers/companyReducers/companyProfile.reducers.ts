import { CompanyAction } from "../../actions/company.Actions";
import { CompanyProfileType } from "../../actionsTypes/companyProfile.actionsTypes";
import { CompanyProfileState } from "./companyReducer.interface";

export const companyProfileReducer = (
  state: CompanyProfileState = {
    companyProfileload: false,
    compProfileDa: undefined,
    compProfileError: {},
  },
  action: CompanyAction
) => {
  switch (action.type) {
    case CompanyProfileType.REQUEST_GET_PROFILE_COMPANY:
      return { ...state, companyProfileload: true };
    case CompanyProfileType.SUCCESS_GET_PROFILE_COMPANY:
      return { ...state, compProfileDa: action.payload, companyProfileload: false };
    case CompanyProfileType.FAILED_GET_PROFILE_COMPANY:
      return { ...state, compProfileError: action.payload, companyProfileload: false };
    case CompanyProfileType.REQUEST_UPDATE_PROFILE_COMPANY:
      return { ...state, CNAload: true };
    case CompanyProfileType.SUCCESS_UPDATE_PROFILE_COMPANY:
      return { ...state, compProfileDa: action.payload, companyProfileload: false };
    case CompanyProfileType.FAILED_UPDATE_PROFILE_COMPANY:
      return { ...state, compProfileError: action.payload, companyProfileload: false };
    default:
      return state;
  }
};
