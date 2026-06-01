import express, { Router } from "express";
import multer from "multer";
import {
  updateProfile,
  uploadAvatar,
  getLeaderboard,
} from "../controllers/usersController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router: Router = express.Router();

// Multer configuration for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Only accept image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Public routes
router.get("/leaderboard", getLeaderboard);

// Protected routes
router.put("/profile", authMiddleware, updateProfile);
router.post("/avatar", authMiddleware, upload.single("avatar"), uploadAvatar);

export default router;
