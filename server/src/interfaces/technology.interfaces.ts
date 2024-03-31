import mongoose from "mongoose";
export interface Technology {
  _id: mongoose.Types.ObjectId;
  TechnologyName: string;
  description: string;
  picture?: string;
}
