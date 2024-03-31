import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.models";
import { UserDB, User } from "../interfaces/user.interfaces";
import NodeMailerConfig from "../configs/nodemailer";
import JwtConfig from "../configs/JWT";
import cookie from "cookie";
import CompanyModel from "../models/company.models";
import { CompanyDB } from "../interfaces/company.interface";
import { ApiError } from "../lib/ErrorHandling/apiError.lib";
import { RoleModel } from "../models/role.models";
export default class AuthServices {
  jwtConfig: JwtConfig = new JwtConfig();
  createNewUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id, username, email, password } = req?.body;
      const existUser = await UserModel.findOne({ username });
      if (existUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        role: "User",
      });
  
      await newUser.save();
      res.status(200).send(newUser);
    } catch (error) {
      console.error("Error creating new user:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  confirmSer = async (req: Request, res: Response, next: NextFunction) => {
    const emailDe = this.jwtConfig.jwtVerifyEmailToken(req.query.token);
    // console.log(emailDe + "from destructiot");
    if (!emailDe) {
      next(console.log("ApiError.Forbidden('Access denied')"));
    }
    const user = await UserModel.findOne({ email: emailDe });

    if (user?.isConfirmedAccount) {
      return next('ApiError.badRequest({ message: "Already Confirmed" }');
    }

    await UserModel.findOneAndUpdate(
      { email: emailDe },
      { $set: { isConfirmedAccount: true } }
    );

    return res.redirect("http://localhost:3000/auth/login");
  };
  confirmCompSer = async (req: Request, res: Response, next: NextFunction) => {
    const emailDe = this.jwtConfig.jwtVerifyEmailToken(req.query.token);
    // console.log(emailDe + "from destructiot");
    if (!emailDe) {
      next(console.log("ApiError.Forbidden('Access denied')"));
    }
    const comp = await CompanyModel.findOne({ email: emailDe });

    if (comp?.isConfirmedAccount) {
      return next('ApiError.badRequest({ message: "Already Confirmed" }');
    }

    await CompanyModel.findOneAndUpdate(
      { emailWork: emailDe },
      { $set: { isConfirmedAccount: true } }
    );

    return res.redirect("http://localhost:3000/auth/login");
  };
  findAuthenUser = async (
    email: string,
    password: string,
    res: Response,
    next: NextFunction
  ) => {
    
    const user = await UserModel.findOne({ email: email }).populate(
      "role",
      "-_id"
    );
    if (!user) {
      // console.log("user not found");
      return next(ApiError.BadRequest({ email: "Email/Password invalid" }));
    }

    if (!user.isConfirmedAccount) {
      // console.log("not confirm");
      return next(
        ApiError.Unauthorized({
          email: "Confirm your email",
          confirm: true,
          _id: user._id,
          handel: user.email,
        })
      );
    }
    const match = await bcrypt.compare(password, user.password);
    console.log("before access token ");

    if (!match) {
      // console.log("not match");
      return next(ApiError.BadRequest({ email: "Email/Password invalid" }));
    }
    const accessToken = this.jwtConfig.jwtSignAccessToken(
      `${user?._id}`,
      user.role,
      user.username
    );
    const refreshToken = this.jwtConfig.jwtSignRefreshToken(`${user?._id}`);
    console.log(accessToken);
    const serializeRefreshToken = cookie.serialize(
      "refreshToken",
      refreshToken,
      {
        sameSite: "strict",
        httpOnly: true,
      }
    );
    res.setHeader("Set-Cookie", serializeRefreshToken);
    const result = {
      _id: user._id,
      accesstoken: accessToken,
      profileUser: {
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      },
      role: user.role,
    };
    // console.log(user.role + "hello from role");
    return res.status(200).send(result);
  };
  findAuthenComp = async (
    email: string,
    password: string,
    res: Response,
    next: NextFunction
  ) => {
    // console.log(email ,"from company manr")
    const company = await CompanyModel.findOne({ emailWork: email }).populate(
      "role",
      "-_id"
    );
    if (!company) {
      // console.log("from c not found");
      return next(ApiError.BadRequest({ email: "Email/Password invalid" }));
    }

    if (!company.isConfirmedAccount) {
      // console.log("from c not confirm" + company.isConfirmedAccount);

      return next(
        ApiError.Unauthorized({
          email: "Confirm your email",
          confirm: true,
          _id: company._id,
          handel: company.emailWork,
        })
      );
    }
    const match = await bcrypt.compare(password, company.companyPassword);

    if (!match) {
      return next(ApiError.BadRequest({ email: "Email/Password invalid" }));
    }

    const accessToken = this.jwtConfig.jwtSignAccessToken(
      `${company?._id}`,
      company.role,
      company.companyName
    );
    const refreshToken = this.jwtConfig.jwtSignRefreshToken(`${company?._id}`);
    // console.log(accessToken);
    const serializeRefreshToken = cookie.serialize(
      "refreshToken",
      refreshToken,
      {
        httpOnly: true,
      }
    );
    res.setHeader("Set-Cookie", serializeRefreshToken);
    const result = {
      _id: company._id,
      accesstoken: accessToken,
      profileCompany: {
        companyName: company.companyName,
        recruitmentOfficer: company.recruitmentOfficer,
        emailWork: company.emailWork,
        location: company.location,
        bio: company.bio,
        phoneNumber: company.phoneNumber,
        profilePic: company.profilePic,
      },
      role: company.role,
    };

    return res.status(200).send(result);
  };
  // ====================
  findUserByIdAuthen = (id: string, cb: any) => {
    UserModel.findOne({ _id: id }, (err: mongoose.Error, user: UserDB) => {
      const userInformation = {
        id: user._id,
        username: user.username,
        email: user.email,
      };
      cb(err, userInformation);
    });
  };
  createNewCompany = (req: Request, res: Response, next: NextFunction) => {
    const { _id, recruitmentOfficer, companyName, emailWork, companyPassword,license } =
      req?.body;
    CompanyModel.findOne(
      { companyName },
      async (err: mongoose.Error, existComp: CompanyDB) => {
        if (err) {
          // console.log("error find Company");
          throw err;
        }
        if (existComp) {
          // console.log("Company already exist");
          // return res.status(409).send("User Already Exist. Please Login");
        }
        if (!existComp) {
          const hashedPassword = await bcrypt.hash(companyPassword, 10);
          const newCompany = new CompanyModel({
            recruitmentOfficer,
            companyName,
            emailWork,
            license,
            companyPassword: hashedPassword,
            role: "CompanyNotActive",
          });

          await newCompany.save();
          res.status(200).send(newCompany);
          // console.log("success to insert Company");
        }
      }
    );
  };
  logout = (req: Request, res: Response, next: NextFunction) => {
    const serializeRefreshToken = cookie.serialize("refreshToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.setHeader("Set-Cookie", serializeRefreshToken);
    res.status(200).send({ message: "Logged out successfully" });
  };
}
