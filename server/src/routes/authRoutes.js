import { Router } from "express";
import { login, register } from "../controllers/authController.js";

const userRouter = Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
export default userRouter;
