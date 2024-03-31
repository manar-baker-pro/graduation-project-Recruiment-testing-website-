import { CompanyActionTypes } from "../actionsTypes/companyActionType";
import { CompanyProfileType } from "../actionsTypes/companyProfile.actionsTypes";
import { Role } from "../reducers/roleReducer/roleReducer.interface";
export interface Company {
  _id: string;
  recruitmentOfficer: string;
  companyName: string;
  emailWork: string;
  isConfirmedAccount?: boolean;
  profilePic?: string;
  bio?: string;
  location?: string;
  phoneNumber?: string;
}
interface CompanyActionPending {
  type:
    | CompanyActionTypes.REQUEST_GET_COMPANIES_NOT_ACTIVE
    | CompanyActionTypes.REQUEST_ACTIVATE_COMPANY
    | CompanyProfileType.REQUEST_UPDATE_PROFILE_COMPANY
    | CompanyProfileType.REQUEST_GET_PROFILE_COMPANY;
}

interface SuccessGetCompNotActive {
  type: CompanyActionTypes.SUCCESS_GET_COMPANIES_NOT_ACTIVE;
  payload: Company[];
}
interface SuccessActivateComp {
  type: CompanyActionTypes.SUCCESS_ACTIVATE_COMPANY;
  payload: Company;
}
export interface SuccessUpdateProfile {
  type: CompanyProfileType.SUCCESS_UPDATE_PROFILE_COMPANY;
  payload: Company;
}
interface SuccessGetProfile {
  type: CompanyProfileType.SUCCESS_GET_PROFILE_COMPANY;
  payload: Company;
}
interface CompanyActionFail {
  type:
    | CompanyActionTypes.FAILED_GET_COMPANIES_NOT_ACTIVE
    | CompanyActionTypes.FAILED_ACTIVATE_COMPANY
    | CompanyProfileType.FAILED_UPDATE_PROFILE_COMPANY
    | CompanyProfileType.FAILED_GET_PROFILE_COMPANY;
  payload: any;
}

export type CompanyAction =
  | CompanyActionFail
  | SuccessGetCompNotActive
  | CompanyActionPending
  | SuccessActivateComp
  | SuccessUpdateProfile
  | SuccessGetProfile;
