import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/errors/api-error";

export const errorHandler = <T extends ApiError>(
  error: T,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message, status } = error;
  console.error(`\n\u001b[31m${message}\u001b[0m\n`);
  res.status(status).json({ message });
};
