import mongoose from "mongoose";
import CompanyModel from "../models/company.models";
import { ApiError } from "../lib/ErrorHandling/apiError.lib";
import { NextFunction, Request, Response } from "express";
export default class CompanyServices {
  findCompanyNotActive = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const companiesNotActive = await CompanyModel.find(
        {
          role: "CompanyNotActive",
          isConfirmedAccount: true,
        },
        { companyPassword: 0, createdAt: 0 }
      );
      console.log(companiesNotActive);
      res.status(200).send(companiesNotActive);
    } catch (error) {
      return next(
        ApiError.InternalServerError({
          message: "Failed Get Companies Not Active",
        })
      );
    }
  };
  activateComp = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      let companyAfterActivate = await CompanyModel.findOneAndUpdate(
        { _id: id },
        { role: "CompanyActive" },
        { new: true }
      );
      if (!companyAfterActivate) {
        return next(
          ApiError.NotFound({
            message: "Company Selected Not Found",
          })
        );
      }
      res
        .status(200)
        // .json({ message: "Get Companies successfully" })
        .send(companyAfterActivate);
    } catch (error) {
      return next(
        ApiError.InternalServerError({
          message: "Failed  Activate Company",
        })
      );
    }
  };
  findCompanyProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log(req.params.id);
      const company = await CompanyModel.findOne(
        {
          _id: req.params.id,
        },
        { companyPassword: 0, createdAt: 0, role: 0, updatedAt: 0 }
      );
      console.log(company);
      res
        .status(200)
        // .json({ message: "Get Companies successfully" })
        .send(company);
    } catch (error) {
      return next(
        ApiError.InternalServerError({
          message: "Failed Get Companies Not Active",
        })
      );
    }
  };
  updateCompanyProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("from updateCompanyProfile service");
    const { id } = req.params;
    const { recruitmentOfficer, location, bio, profilePic, phoneNumber } =
      req.body;
    try {
      let companyAfterUpdateProfile = await CompanyModel.findOneAndUpdate(
        { _id: id },
        {
          recruitmentOfficer: recruitmentOfficer,
          location: location,
          bio: bio,
          phoneNumber: phoneNumber,
          profilePic: profilePic,
        },
        { new: true }
      );
      if (!companyAfterUpdateProfile) {
        return next(
          ApiError.NotFound({
            message: "Company Selected Not Found",
          })
        );
      }
      res
        .status(200)

        .send(companyAfterUpdateProfile);
    } catch (error) {
      return next(
        ApiError.InternalServerError({
          message: "Failed  Activate Company",
        })
      );
    }
  };
}
