import { Request, Response, NextFunction } from "express";
import CompanyServices from "../services/companyServices";

export default class CompanyController {
  companyServices: CompanyServices = new CompanyServices();
  GetCompaniesNotActiveController = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.companyServices.findCompanyNotActive(req, res, next);
  };
  activateCompController = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.companyServices.activateComp(req, res, next);
  };
  getProfileCompany = (req: Request, res: Response, next: NextFunction) => {
    this.companyServices.findCompanyProfile(req, res, next);
  };
  UpdateProfileCompany = (req: Request, res: Response, next: NextFunction) => {
    this.companyServices.updateCompanyProfile(req, res, next);
  };
}
