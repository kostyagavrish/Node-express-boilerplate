import userRouters from "./users";
import { Router } from "express";
import authRouters from "./auth";

const router = Router();
userRouters("users", router);
authRouters(router);

export default router;
