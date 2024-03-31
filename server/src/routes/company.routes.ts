import express from "express";
import { body } from "express-validator";
import { corsConfig } from "../configs/CORS";
import { authorizationMiddleware } from "../middlewares/authorization.middlewares";
import { accessMiddleware } from "../middlewares/authentication.middlewares";
import { ComponentName } from "../interfaces/role.interfaces";
import CompanyController from "../controllers/company.controllers";
export default class CompanyRoutes {
  companyController: CompanyController = new CompanyController();
  path = "/company";
  public router = express.Router();
  constructor() {
    this.intializeRoutes();
  }
  intializeRoutes = () => {
    this.router.get(
      "/notActive",
      corsConfig,
      // accessMiddleware,
      // authorizationMiddleware(ComponentName.adminDash),
      this.companyController.GetCompaniesNotActiveController
    );
    this.router.put(
      "/activate/:id",
      corsConfig,
      // accessMiddleware,
      // authorizationMiddleware(ComponentName.adminDash),
      this.companyController.activateCompController
    );

    this.router.get(
      "/profile/:id",
      corsConfig,
      // accessMiddleware,
      // authorizationMiddleware(ComponentName.adminDash),
      this.companyController.getProfileCompany
    );
    this.router.put(
      "/profile/:id",
      corsConfig,
      // accessMiddleware,
      // authorizationMiddleware(ComponentName.adminDash),
      this.companyController.UpdateProfileCompany
    );
  };
}
