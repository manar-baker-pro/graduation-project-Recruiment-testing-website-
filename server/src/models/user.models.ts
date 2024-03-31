import mongoose from "mongoose";
import { UserDB } from "../interfaces/user.interfaces";
const userSchema = new mongoose.Schema<UserDB>(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isConfirmedAccount: {
      type: Boolean,
      default: false,
    },
    role: { type: String, ref: "Role" },
    profilePic: { type: String },
    phoneNumber: {
      type: String,
    },
    country: {
      type: String,
    },
    gender: {
      type: String,
    },

    links: [
      {
        type: String,
      },
    ],
    cv: {
      type: String,
    },
    tests: [
      {
        test: {
          type: mongoose.Types.ObjectId,
          ref: "Test",
        },
        score: {
          type: Number,
        },
        date: {
          type: Date,
        },
      },
    ],
    socketId: { type: String },
  },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model<UserDB>("User", userSchema);
export default UserModel;
