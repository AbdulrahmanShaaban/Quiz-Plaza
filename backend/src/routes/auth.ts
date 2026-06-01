import express, { Router } from "express";
import {
  register,
  verifyEmail,
  login,
  logout,
  getMe,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router: Router = express.Router();

// Public routes
router.post("/register", register);
router.post("/verify", verifyEmail);
router.post("/login", login);
router.post("/logout", logout);

// Protected routes
router.get("/me", authMiddleware, getMe);

export default router;
