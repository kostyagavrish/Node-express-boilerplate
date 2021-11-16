import { AuthController } from "./controller";
import authService from "../../services/auth";
import loggerService from "../../services/logger";

const authController = new AuthController(authService, loggerService);

export default authController;
