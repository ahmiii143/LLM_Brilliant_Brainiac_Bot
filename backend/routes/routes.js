// routes.js
import express from "express";
import { geminiController } from "../controllers/controller.js";

const router = express.Router();

router.post("/gemini", geminiController);

export default router;
