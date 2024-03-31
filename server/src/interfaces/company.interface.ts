import mongoose from "mongoose";
import { Role } from "./role.interfaces";
export interface CompanyDB {
  _id: mongoose.Types.ObjectId;
  recruitmentOfficer: string;
  companyName: string;
  emailWork: string;
  companyPassword: string;
  isConfirmedAccount: boolean;
  role: Role;
  license?:string;
  profilePic?: string;
  bio?:string;
  location?:string;
  phoneNumber?:string;
  socketId:string;
}

export interface Company {
  _id: mongoose.Types.ObjectId;
  recruitmentOfficer: string;
  companyName: string;
  emailWork: string;
  isConfirmedAccount: boolean;
}
