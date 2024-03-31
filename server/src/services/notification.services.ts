import mongoose from "mongoose";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";
import notificaionModel from "../models/notification.models";
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);
export default class NotificationService {
  createNotic = async (
      recipientId: any,
      recipientType: string,
      message: any,
  ) => {
    const newNotic = new notificaionModel({
      recipientId: recipientId,
      recipientType: recipientType,
      message: message,
    });
    await newNotic.save();
  };
}
