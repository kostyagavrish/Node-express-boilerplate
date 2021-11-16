import validator from "../validation";
const config = require("../../config");
const configSchema = require("../../config.sample");

const isValidConfig = validator.validate(config, configSchema).valid;
if (!isValidConfig) {
  console.error("Error: Config isn't valid.");
  process.exit(1);
}
