import mongoose from "mongoose";
import { CompanyDB } from "../interfaces/company.interface";
const companySchema = new mongoose.Schema<CompanyDB>(
  {
    recruitmentOfficer: {
      type: String,
    },
    companyName: {
      type: String,
      unique: true,
    },
    emailWork: {
      type: String,
      unique: true,
      required: true,
    },
    companyPassword: {
      type: String,
      required: true,
    },
    isConfirmedAccount: {
      type: Boolean,
      default: false,
    },
    role: { type: String, ref: "Role" },
    license: { type: String },
    profilePic: { type: String },
    bio: { type: String },
    location: { type: String },
    phoneNumber: { type: String },
    socketId: { type: String },
  },
  {
    timestamps: true,
  }
);

const CompanyModel = mongoose.model<CompanyDB>("Company", companySchema);
export default CompanyModel;
