import { Company } from "../../actions/company.Actions";
export interface SuccessGetProfile {
  _id: string;
  accesstoken: string;
  refreshtoken?: string;
  companyName: string;
  emailWork:string;
  recruitmentOfficer: string;
  profilePic: string;
  // role: Role;
  bio:string;
  location:string;
  phoneNumber:string;
}
export interface CompanyNotActiveState {
  CNAload: boolean;
  CNADa: Company[];
  CNAerr: any;
}
export interface CompanyProfileState {
  companyProfileload: boolean;
  compProfileDa?: Company;
  compProfileError: any;
}
