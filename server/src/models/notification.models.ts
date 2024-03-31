import mongoose from "mongoose";
import { Notification } from "../interfaces/notification.interface";

const notificationSchema = new mongoose.Schema<Notification>(
  {
    recipientId: {
      type: mongoose.Types.ObjectId,
      required: true,
      refPath: "recipientType", 
    },
    recipientType: {
      type: String,
      required: true,
      enum: ["User", "Company"],
    },
    message: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const notificaionModel = mongoose.model<Notification>(
  "Notificaion",
  notificationSchema
);

export default notificaionModel;
