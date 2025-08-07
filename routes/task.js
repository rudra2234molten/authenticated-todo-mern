import express from "express";
import { createTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/createtask", isAuthenticated, createTask);

export default router;
