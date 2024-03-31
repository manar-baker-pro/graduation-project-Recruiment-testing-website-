import express from "express";
import { accessMiddleware } from "../middlewares/authentication.middlewares";
import { init } from "../middlewares/init.middleware";
import { getRoles } from "../services/role.service";
import { authorizationMiddleware } from "../middlewares/authorization.middlewares";
import { ComponentName } from "../interfaces/role.interfaces";
import TechnologyController from "../controllers/technology.controllers";

export class TechnologyRoutes {
  public path = "/technologies";
  public router = express.Router();
  technologyController: TechnologyController = new TechnologyController();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.get(
      "/",
      // [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      this.technologyController.getAllTechnologies
    );
    this.router.get(
      "/:id",
      [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      init(this.technologyController.getTechnology)
    );
    this.router.post(
      "/",
      // [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      this.technologyController.CreateTechnology
    );
    this.router.put(
      "/:id",
      // [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      init(this.technologyController.updateTechnology)
    );
    this.router.delete(
      "/:id",
      // [accessMiddleware, authorizationMiddleware(ComponentName.technology)],
      this.technologyController.deleteTechnology
    );
  }
}
