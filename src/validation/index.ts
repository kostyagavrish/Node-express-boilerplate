import { Validator } from "jsonschema";
import usersValidationSchemas from "./users";
import authValidationSchemas from "./auth";
import commonValidationSchemas from "./common";

const validator = new Validator();

[
  ...usersValidationSchemas,
  ...authValidationSchemas,
  ...commonValidationSchemas,
].forEach((schema) => validator.addSchema(schema));

export default validator;
