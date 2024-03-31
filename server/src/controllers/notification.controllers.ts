import express, { Request, Response, NextFunction } from "express";
export default class NotificationController {
  notiController = (req: Request, res: Response, next: NextFunction) => {
    res.send("HELLO TO notiController ..!");
  };
}
