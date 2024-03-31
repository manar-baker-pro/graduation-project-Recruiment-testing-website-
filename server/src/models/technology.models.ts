import mongoose from "mongoose";
import { Technology } from "../interfaces/technology.interfaces";
const technologySchema = new mongoose.Schema<Technology>(
  {
    TechnologyName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const TechnologyModel = mongoose.model<Technology>(
  "Technology",
  technologySchema
);
export default TechnologyModel;
