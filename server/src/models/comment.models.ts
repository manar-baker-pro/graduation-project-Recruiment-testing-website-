import mongoose from "mongoose";
import { Comment } from "../interfaces/comment.interface";
const commentSchema = new mongoose.Schema<Comment>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    comments: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const commentModel = mongoose.model<Comment>("Comment", commentSchema);
export default commentModel;
