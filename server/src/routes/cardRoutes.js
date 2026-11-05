import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createCard,
  deleteCard,
  getMyCard,
  getMyHistory,
  updateCard,
} from "../controllers/cardController.js";

const cardRouter = Router();

cardRouter.route("/").post(protect, createCard);
cardRouter.route("/my").get(protect, getMyCard);
cardRouter.route("/history").get(protect, getMyHistory);
cardRouter.route("/:id").patch(protect, updateCard);
cardRouter.route("/:id").delete(protect, deleteCard);

export default cardRouter;
