import express from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";

const app = express();

config({
  path: ".env",
});

//!Middleware
app.use(express.json());
app.use(cookieParser());

//!Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
