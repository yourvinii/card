import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/authRoutes.js";
import cardRouter from "./routes/cardRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Working User card API");
});

app.use("/api/cards", cardRouter);

app.use("/api/auth", userRouter);

app.use("/api/admin", adminRouter);
export default app;
