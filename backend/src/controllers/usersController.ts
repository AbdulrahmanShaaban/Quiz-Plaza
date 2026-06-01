import { Request, Response } from "express";
import { z } from "zod/v4";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

// --------------- Validation Schemas ---------------

const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
});

// --------------- Controllers ---------------

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = updateProfileSchema.parse(req.body);

    const user = await User.findByIdAndUpdate(
      req.user!._id,
      { name },
      { new: true }
    );

    res.json({
      message: "Profile updated successfully.",
      user,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.issues[0].message });
      return;
    }
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error updating profile." });
  }
};

export const uploadAvatar = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded." });
      return;
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "quiz-app/avatars",
        public_id: `avatar_${req.user!._id}`,
        overwrite: true,
        resource_type: "auto",
      }
    );

    // Update user avatar URL
    const user = await User.findByIdAndUpdate(
      req.user!._id,
      { avatar: result.secure_url },
      { new: true }
    );

    res.json({
      message: "Avatar uploaded successfully.",
      user,
    });
  } catch (error) {
    console.error("Upload avatar error:", error);
    res.status(500).json({ message: "Server error uploading avatar." });
  }
};

export const getLeaderboard = async (_req: Request, res: Response): Promise<void> => {
  try {
    const leaderboard = await User.find({ isVerified: true })
      .select("name avatar stats.totalScore stats.gamesPlayed stats.wins stats.bestScore")
      .sort({ "stats.totalScore": -1 })
      .limit(10)
      .lean();

    const formattedLeaderboard = leaderboard.map((user, index) => ({
      rank: index + 1,
      userId: user._id,
      name: user.name,
      avatar: user.avatar,
      stats: user.stats,
    }));

    res.json({ leaderboard: formattedLeaderboard });
  } catch (error) {
    console.error("Get leaderboard error:", error);
    res.status(500).json({ message: "Server error fetching leaderboard." });
  }
};
