import { UserService } from "./service";
import databaseManager from "../../db";

const userService = new UserService(databaseManager);

export default userService;
