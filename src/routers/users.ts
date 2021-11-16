import { Router } from "express";
import userController from "../controllers/users";
import { authValidation, requestValidation } from "../middlewares";

const userRouters = (route: string, router: Router) => {
  router.post(
    `/${route}`,
    [requestValidation({ body: "CreateUserData" })],
    userController.create.bind(userController)
  );
  router.get(
    `/${route}`,
    [requestValidation({ query: "FindUser" }), authValidation],
    userController.get.bind(userController)
  );
  router.put(
    `/${route}`,
    [
      requestValidation({ query: "FindUser", body: "UpdateUserData" }),
      authValidation,
    ],
    userController.update.bind(userController)
  );
  router.delete(
    `/${route}`,
    [requestValidation({ query: "FindUser" }), authValidation],
    userController.delete.bind(userController)
  );
};
export default userRouters;
