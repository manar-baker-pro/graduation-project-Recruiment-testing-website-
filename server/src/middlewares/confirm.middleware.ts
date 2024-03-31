import { NextFunction, Request, Response } from "express";
import JwtConfig from "../configs/JWT";
import NodeMailerConfig from "../configs/nodemailer";
export const confirmMiddle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body.username);
  const email = req.body.email;
  const username = req.body.username;
  const jwtConfig: JwtConfig = new JwtConfig();
  const emailToken = jwtConfig.jwtSignEmailToken(email, username);
  const nodeMailerConfig: NodeMailerConfig = new NodeMailerConfig();
  const host = req.headers.host;
  const role="confirmedOk";
 nodeMailerConfig.sendMail(role,username, email, emailToken, host);
};
