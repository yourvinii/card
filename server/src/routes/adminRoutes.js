import { Router } from "express";
import { authorizeRole, protect } from "../middleware/authMiddleware.js";
import {
  adminDeleteCard,
  adminUpdateCard,
  getAllCards,
  getAllHistory,
} from "../controllers/cardController.js";

const adminRouter = Router();

adminRouter.use(protect, authorizeRole("admin"));

adminRouter.route("/cards").get(getAllCards);
adminRouter.route("/history").get(getAllHistory);
adminRouter.route("/cards/:id").patch(adminUpdateCard);
adminRouter.route("/cards/:id").delete(adminDeleteCard);

export default adminRouter;
