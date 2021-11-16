import { Request, Response, NextFunction } from "express";
import validator from "../validation";
import { BadRequest } from "../utils/errors/bad-request";
export const requestValidation =
  (validationScript: Record<string, string>) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!validationScript || !Object.keys(validationScript).length) {
      console.error(
        `\u001b[31mValidation script isn't valid at the ValidateRequest function.\u001b[0m`
      );
      process.exit(1);
    }
    for (const property in validationScript) {
      const data = req[property];
      const schemaId = validationScript[property];
      const validatorResult = validator.validate(data, {
        $ref: `/${schemaId}`,
      });
      const isValidData = validatorResult.valid;
      if (!isValidData) {
        const { path, message } = validatorResult.errors[0];
        const error = `${property}.${path[0]} ${message}.`;
        throw new BadRequest(error);
      }
    }
    next();
  };
