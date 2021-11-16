import { UserController } from "./controller";
import userService from "../../services/users";
import loggerService from "../../services/logger";

const userController = new UserController(userService, loggerService);

export default userController;
