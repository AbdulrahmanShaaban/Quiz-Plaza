import { Request, Response } from "express";
import { z } from "zod/v4";
import Room from "../models/Room.js";
import { CATEGORIES, DIFFICULTIES } from "../models/Question.js";
import {
  NotEnoughQuestionsError,
  pickQuestionsForRoom,
} from "../utils/questionPool.js";

// --------------- Validation Schemas ---------------

const createRoomSchema = z.object({
  category: z.enum(CATEGORIES),
  difficulty: z.enum(DIFFICULTIES),
  questionsCount: z.number().int().min(5).max(20),
  isPublic: z.boolean().default(true),
});

const updateRoomSchema = z.object({
  category: z.enum(CATEGORIES),
  difficulty: z.enum(DIFFICULTIES),
  questionsCount: z.number().int().min(5).max(20),
  isPublic: z.boolean(),
});

// --------------- Helpers ---------------

const generateRoomCode = async (): Promise<string> => {
  let code: string;
  let exists = true;

  while (exists) {
    code = Math.floor(100000 + Math.random() * 900000).toString();
    exists = !!(await Room.findOne({ code }));
  }

  return code!;
};

// --------------- Controllers ---------------

export const createRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, difficulty, questionsCount, isPublic } = createRoomSchema.parse(req.body);

    const questionIds = await pickQuestionsForRoom(category, difficulty, questionsCount);

    const code = await generateRoomCode();

    const room = await Room.create({
      code,
      host: req.user!._id,
      players: [
        {
          user: req.user!._id,
          score: 0,
          answers: [],
        },
      ],
      category,
      difficulty,
      questionsCount,
      questions: questionIds,
      status: "waiting",
      isPublic,
    });

    await room.populate("players.user", "name avatar");

    res.status(201).json({
      message: "Room created successfully.",
      room,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.issues[0].message });
      return;
    }
    if (error instanceof NotEnoughQuestionsError) {
      res.status(503).json({ message: error.message });
      return;
    }
    console.error("Create room error:", error);
    res.status(500).json({ message: "Server error creating room." });
  }
};

export const getPublicRooms = async (_req: Request, res: Response): Promise<void> => {
  try {
    const rooms = await Room.find({ isPublic: true, status: "waiting" })
      .select("code category difficulty questionsCount players status")
      .populate("host", "name")
      .lean();

    const roomsWithPlayerCount = rooms.map((room) => ({
      ...room,
      playerCount: room.players.length,
      players: undefined,
    }));

    res.json({ rooms: roomsWithPlayerCount, total: rooms.length });
  } catch (error) {
    console.error("Get public rooms error:", error);
    res.status(500).json({ message: "Server error fetching rooms." });
  }
};

export const getRoomByCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code } = req.params;

    const room = await Room.findOne({ code })
      .populate("players.user", "name avatar")
      .populate("host", "name");

    if (!room) {
      res.status(404).json({ message: "Room not found." });
      return;
    }

    res.json({ room });
  } catch (error) {
    console.error("Get room by code error:", error);
    res.status(500).json({ message: "Server error fetching room." });
  }
};

export const updateRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code } = req.params;
    const { category, difficulty, questionsCount, isPublic } = updateRoomSchema.parse(req.body);

    const room = await Room.findOne({ code });

    if (!room) {
      res.status(404).json({ message: "Room not found." });
      return;
    }

    if (room.host.toString() !== req.user!._id.toString()) {
      res.status(403).json({ message: "Only room host can update the room." });
      return;
    }

    if (room.status !== "waiting") {
      res.status(400).json({ message: "Can only update room settings while in waiting state." });
      return;
    }

    // Get new question IDs if category or difficulty changed
    let newQuestions = room.questions;
    if (category !== room.category || difficulty !== room.difficulty || questionsCount !== room.questionsCount) {
      newQuestions = await pickQuestionsForRoom(category, difficulty, questionsCount);
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      room._id,
      {
        category,
        difficulty,
        questionsCount,
        questions: newQuestions,
        isPublic,
      },
      { new: true }
    ).populate("players.user", "name avatar");

    res.json({
      message: "Room updated successfully.",
      room: updatedRoom,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.issues[0].message });
      return;
    }
    if (error instanceof NotEnoughQuestionsError) {
      res.status(503).json({ message: error.message });
      return;
    }
    console.error("Update room error:", error);
    res.status(500).json({ message: "Server error updating room." });
  }
};

export const deleteRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code } = req.params;

    const room = await Room.findOne({ code });

    if (!room) {
      res.status(404).json({ message: "Room not found." });
      return;
    }

    if (room.host.toString() !== req.user!._id.toString()) {
      res.status(403).json({ message: "Only room host can delete the room." });
      return;
    }

    await Room.deleteOne({ code });

    res.json({ message: "Room deleted successfully." });
  } catch (error) {
    console.error("Delete room error:", error);
    res.status(500).json({ message: "Server error deleting room." });
  }
};
