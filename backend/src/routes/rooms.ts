import express, { Router } from "express";
import {
  createRoom,
  getPublicRooms,
  getRoomByCode,
  deleteRoom,
} from "../controllers/roomsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router: Router = express.Router();

// Public routes
router.get("/", getPublicRooms);
router.get("/:code", getRoomByCode);

// Protected routes
router.post("/", authMiddleware, createRoom);
router.delete("/:code", authMiddleware, deleteRoom);

export default router;
