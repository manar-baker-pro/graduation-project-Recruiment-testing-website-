import { NextFunction, Request, Response } from "express";
import { RoleModel } from "../models/role.models"

export const getRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roles = await RoleModel.find({});
  return res.status(200).send(roles);
};
