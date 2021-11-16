import { Router } from "express";
import authController from "../controllers/auth";
import { requestValidation } from "../middlewares";

const authRouters = (router: Router) => {
  router.post(
    "/login",
    [requestValidation({ body: "LoginData" })],
    authController.login.bind(authController)
  );
  router.post("/logout", authController.logout.bind(authController));
};
export default authRouters;
