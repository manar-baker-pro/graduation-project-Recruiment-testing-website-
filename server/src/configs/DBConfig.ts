import mongoose from "mongoose";
import dotenv from "dotenv";
import { RoleModel, initroles } from "../models/role.models";
dotenv.config();
const dbConfig = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.DB_URI!, {
   
    } as mongoose.ConnectOptions)
    .then(() => {
      // seedRoles();
      console.log("connected to MongoDB ^-^");
    })
    .catch((error) => console.log("sommthing is wrong" + error));
};
export const seedRoles = async () => {
  await RoleModel.create(initroles);
};
export default dbConfig;
