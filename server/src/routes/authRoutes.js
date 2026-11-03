import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { protect, authorizeRole } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);

userRouter.route("/me").get(protect, (req, res) => {
  res.status(200).json({
    message: "Authenticated Successful",
    user: req.user,
  });
});

userRouter
  .route("/admin-test")
  .get(protect, authorizeRole("admin"), (req, res) => {
    res.status(200).json({
      message: "welcome admin",
    });
  });

export default userRouter;
