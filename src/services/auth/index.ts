import { AuthService } from "./service";
import databaseManager from "../../db";
import userService from "../users";

const authService = new AuthService(databaseManager, userService);

export default authService;
