import { Request, Response, NextFunction } from "express";
export function init(handler: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (err: any) {
      next(err);
    }
  };
}
