import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/authRoutes.js";

const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Working User card API");
});

app.use("/api/auth", userRouter);
export default app;
