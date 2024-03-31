import { Request, Response, NextFunction } from "express";
import { ApiError } from "../lib/ErrorHandling/apiError.lib";
import { Components } from "../interfaces/role.interfaces";
export function authorizationMiddleware(resource: Components) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    const method = req.method;
    if (
      method === "POST" ||
      method === "GET" ||
      method === "DELETE" ||
      method === "PUT"
    ) {
      if (role && role[resource][method].given) {
        req.privalType = role[resource][method].type;
        next();
      } else {
        next(ApiError.Forbidden({ message: "Access Denied" }));
      }
    } else {
      next(ApiError.Forbidden({ message: "Get out of this server!" }));
    }
  };
}
