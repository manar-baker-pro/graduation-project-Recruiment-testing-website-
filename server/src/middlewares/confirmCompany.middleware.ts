import { NextFunction, Request, Response } from "express";
import JwtConfig from "../configs/JWT";
import NodeMailerConfig from "../configs/nodemailer";
export const confirmCompMiddle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const emailWork = req.body.emailWork;
  console.log(emailWork);
  const companyName = req.body.companyName;
  const jwtConfig: JwtConfig = new JwtConfig();
  const emailToken = jwtConfig.jwtSignEmailToken(emailWork, companyName);
  const nodeMailerConfig: NodeMailerConfig = new NodeMailerConfig();
  const host = req.headers.host;
  const route="confirmedCompOk"
  nodeMailerConfig.sendMail(route,companyName, emailWork, emailToken, host);
};
