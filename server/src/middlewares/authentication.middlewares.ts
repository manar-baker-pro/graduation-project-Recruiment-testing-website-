import { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib/ErrorHandling/apiError.lib";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { UserDecoded } from "../interfaces/role.interfaces";
export function accessMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const { authorization } = req.headers;

  if (!authorization || authorization === undefined) {
    next(ApiError.Unauthorized({ message: "Unauthenticated" }));
  } else {
    jwt.verify(
      authorization,
      process.env.ACCESSTOKEN_KEY ? process.env.ACCESSTOKEN_KEY : "secretkey",
      (err, decoded) => {
        if (err) {
          next(ApiError.Forbidden({ message: "access denied" }));
        }
        req.user = decoded as UserDecoded;
        console.log("from access Mddle")
        next();
      }
    );
  }
}
