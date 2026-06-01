import express, { Router } from "express";
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  seedQuestions,
} from "../controllers/questionsController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router: Router = express.Router();

// Public routes
router.get("/", getQuestions);

// Admin routes
router.post("/", authMiddleware, roleMiddleware("admin"), createQuestion);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateQuestion);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteQuestion);
router.post("/seed", authMiddleware, roleMiddleware("admin"), seedQuestions);

export default router;
