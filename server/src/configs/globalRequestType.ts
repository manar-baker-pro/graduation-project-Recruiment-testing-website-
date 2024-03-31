import { Express, Request } from "express";
import { UserDecoded } from "../interfaces/role.interfaces";

declare global {
  namespace Express {
    interface Request {
      user?: UserDecoded;
      privalType: string;
    }
  }
}
