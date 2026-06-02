import express, { Router } from "express";
import passport from "passport";
import {
  register,
  verifyEmail,
  login,
  logout,
  getMe,
  oauthSuccess,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router: Router = express.Router();

// Public routes
router.post("/register", register);
router.post("/verify", verifyEmail);
router.post("/login", login);
router.post("/logout", logout);

// OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), oauthSuccess);
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", { session: false }), oauthSuccess);

// Protected routes
router.get("/me", authMiddleware, getMe);

export default router;
