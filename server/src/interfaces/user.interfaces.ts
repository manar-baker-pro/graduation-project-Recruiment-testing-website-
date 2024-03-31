import mongoose from "mongoose";
import { Role } from "./role.interfaces";
import { Technology } from "./technology.interfaces";
import { Test } from "./test.interface";
export interface UserDB {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: Role;
  phoneNumber?: string;
  country?: string;
  gender?: string;
  links?: [string];
  profilePic?: string;
  cv?: string;
  tests?: [
    {
      test: Test;
      score: number;
      date:Date;
    }
  ];
  isConfirmedAccount: boolean;
  socketId: String

}
export interface User {
  id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  isConfirmedAccount: boolean;
  role: Role;
  phoneNumber?: string;
  country?: string;
  gender?: string;
  links?: [string];
  profilePic?: string;
  cv?: string;
  tests?: [
    {
      test: Test;
      score: number;
      date:Date;

    }
  ];
}
