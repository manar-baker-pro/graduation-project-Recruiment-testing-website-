import mongoose from "mongoose";
import { User } from "./user.interfaces";
export interface Comment {
  _id: mongoose.Types.ObjectId;
  user: User;
  comments: String[];
}
