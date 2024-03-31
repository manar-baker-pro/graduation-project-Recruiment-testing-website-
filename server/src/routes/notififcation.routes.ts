import express from "express";
import { accessMiddleware } from "../middlewares/authentication.middlewares";
import { init } from "../middlewares/init.middleware";
import { getRoles } from "../services/role.service";
import { authorizationMiddleware } from "../middlewares/authorization.middlewares";
import { ComponentName } from "../interfaces/role.interfaces";
export class NotificationRoutes {
  public path = "/notification";
  public router = express.Router();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.get(
      "/",
    //   [accessMiddleware, authorizationMiddleware(ComponentName.Role)],
    //   init(getRoles)
    );
  }
}
