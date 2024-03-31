import { Request, Response, NextFunction } from "express";
import ProfileServices from "../services/companyServices";
import TechnologyService from "../services/technology.services";

export default class TechnologyController {
  technologyService: TechnologyService = new TechnologyService();
  CreateTechnology = (req: Request, res: Response, next: NextFunction) => {
    console.log("from getProfileCompany");
    this.technologyService.CreateTechnology(req, res, next);
  };
  getAllTechnologies = (req: Request, res: Response, next: NextFunction) => {
    console.log("from getAllTechnologies");
    this.technologyService.getAllTechnologies(req, res, next);
  };
  updateTechnology = (req: Request, res: Response, next: NextFunction) => {
    console.log("from updateCompanyProfile");
    this.technologyService.updateTechnology(req, res, next);
  };
  getTechnology = (req: Request, res: Response, next: NextFunction) => {
    console.log("from updateCompanyProfile");
    this.technologyService.getTechnology(req, res, next);
  };
  deleteTechnology = (req: Request, res: Response, next: NextFunction) => {
    console.log("from updateCompanyProfile");
    this.technologyService.deleteTechnology(req, res, next);
  };
}
