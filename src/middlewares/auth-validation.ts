import { NextFunction, Request, Response } from "express";
import { Unauthorized } from "../utils/errors/unauthorized";

export const authValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.userId) {
    throw new Unauthorized(`To make this request you should be authorized!`);
  }
  next();
};
