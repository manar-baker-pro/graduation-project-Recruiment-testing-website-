import { Role } from "../roleReducer/roleReducer.interface";

export interface SuccessSignUp {
  _id: string;
  email: string;
}
export interface CompanyProfile{
    companyName: string;
    emailWork: string;
    recruitmentOfficer: string;
    profilePic: string;
    bio: string;
    location: string;
    phoneNumber: string;
}
export interface UserProfile{
  username: string;
  email: string;
  profilePic: string;
}
export interface SuccessSignIn {
  _id: string;
  accesstoken: string;
  profileCompany: CompanyProfile;
  role: Role;
}
export interface SuccessSignInUser {
  _id?: string;
  accesstoken: string;
  profileUser:UserProfile,
  role: Role;
}
export interface SuccessSignUpCompany {
  _id: string;
  emailWork: string;
}
export interface UserTryRegister {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
export interface SignupState {
  message?: SuccessSignUp | SuccessSignUpCompany;
  loadup: boolean;
  success: boolean;
  errorup?: any;
}
export interface CompanyTryRegister {
  recruitmentOfficer: string;
  companyName: string;
  emailWork: string;
  license:string;
  companyPassword: string;
  companyPasswordConfirm: string;
}
export interface SignupState {
  message?: SuccessSignUp | SuccessSignUpCompany;
  loadup: boolean;
  success: boolean;
  errorup?: any;
}
export interface SigninState {
  userInfo?: SuccessSignIn | SuccessSignInUser;
  loadin: boolean;
  errorin: any;
  success: boolean;
}
export interface UserAnyRoleTrySign {
  email: string;
  password: string;
  role: boolean;
}
