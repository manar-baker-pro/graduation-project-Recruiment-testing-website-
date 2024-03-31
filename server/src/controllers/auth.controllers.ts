import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import AuthServices from "../services/auth.services";
import { TryCatch } from "../middlewares/tryCatch";
export default class AuthControllers {
  authService: AuthServices = new AuthServices();
  //===== register controller====
  registerController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username, email, password } = req?.body;
    console.log(username, email, password);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
      return res.status(400).json({ errors: errors.array() });
    }
 
    TryCatch(this.authService.createNewUser(req, res, next));
  };
  // ===== confirmedController =====
  confirmedController = (req: Request, res: Response, next: NextFunction) => {
    this.authService.confirmSer(req, res, next);
  };
  confirmedCompController = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.authService.confirmCompSer(req, res, next);
  };

  loginController = (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role } = req?.body;
    console.log(role+"nnn");
    if (role===true) {
      this.authService.findAuthenComp(email, password, res, next);
    } else {
      this.authService.findAuthenUser(email, password, res, next);
    }
  };
  registerCompController = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { recruitmentOfficer, companyName, emailWork, companyPassword } =
      req?.body;
    console.log(recruitmentOfficer, companyName, emailWork, companyPassword);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
      return res.status(400).json({ errors: errors.array() });
    }
    this.authService.createNewCompany(req, res, next);
  };
  logoutController = (req: Request, res: Response, next: NextFunction) => {
    this.authService.logout(req, res, next);
  };
}
