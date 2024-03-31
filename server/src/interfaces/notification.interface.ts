import mongoose from "mongoose";
import { User } from "./user.interfaces";
import { Company } from "./company.interface";

export interface Notification {
  _id: mongoose.Types.ObjectId;
  recipientId:User|Company;
  recipientType:string;
  message:any;
}
