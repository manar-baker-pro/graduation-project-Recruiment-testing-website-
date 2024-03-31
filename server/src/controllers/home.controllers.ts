import express, { Request, Response, NextFunction } from "express";
export default class HomeController {
  static homeController = (req: Request, res: Response, next: NextFunction) => {
    res.send("HELLO TO BUZZHIRE ..!");
    res.redirect("http://localhost:3000/");
  };
}
