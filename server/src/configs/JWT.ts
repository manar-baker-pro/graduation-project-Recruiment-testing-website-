import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../interfaces/user.interfaces";
import { Role } from "../interfaces/role.interfaces";
dotenv.config();
export default class JwtConfig {
  jwtSignEmailToken = (email: string, username: string): string => {
    const token = jwt.sign({ email: email }, `${process.env.EMAILTOKEN_KEY}`, {
      expiresIn: process.env.EMAILTOKEN_EXPIREIN,
    });
    return token;
  };
  jwtVerifyEmailToken = (token: any) => {
    const decoded = jwt.verify(token, `${process.env.EMAILTOKEN_KEY}`) as User;
    const { email } = decoded;
    return email;
  };
  jwtSignAccessToken = (id: string, role: Role, username: string): string => {
    const token = jwt.sign(
      { user_id: id, role: role, username: username },
      `${process.env.ACCESSTOKEN_KEY}`,
      {
        expiresIn: process.env.ACCESSTOKEN_EXPIREIN,
      }
    );
    return token;
  };
  jwtVerifyAccessToken = (token: any) => {
    const decoded = jwt.verify(token, `${process.env.ACCESSTOKEN_KEY}`) as User;
    const { id } = decoded;
    return id;
  };
  jwtSignRefreshToken = (id: string): string => {
    const token = jwt.sign({ user_id: id }, `${process.env.REFRESHTOKEN_KEY}`, {
      expiresIn: process.env.REFRESHTOKEN_EXPIREIN,
    });
    return token;
  };
  jwtVerifyRefreshToken = (token: any) => {
    const decoded = jwt.verify(
      token,
      `${process.env.REFRESHTOKEN_KEY}`
    ) as User;
    const { id } = decoded;
    return id;
  };
}
