import mongoose, { Schema, Document, Types } from "mongoose";
import { Category, Difficulty } from "./Question.js";

export interface IPlayerAnswer {
  questionIndex: number;
  answerIndex: number;
  timeRemaining: number;
  isCorrect: boolean;
}

export interface IRoomPlayer {
  user: Types.ObjectId;
  score: number;
  answers: IPlayerAnswer[];
}

export interface IRoom extends Document {
  code: string;
  host: Types.ObjectId;
  players: IRoomPlayer[];
  category: Category;
  difficulty: Difficulty;
  questionsCount: number;
  questions: Types.ObjectId[];
  status: "waiting" | "playing" | "finished";
  isPublic: boolean;
  createdAt: Date;
}

const playerAnswerSchema = new Schema<IPlayerAnswer>(
  {
    questionIndex: { type: Number, required: true },
    answerIndex: { type: Number, required: true },
    timeRemaining: { type: Number, required: true },
    isCorrect: { type: Boolean, required: true },
  },
  { _id: false }
);

const roomPlayerSchema = new Schema<IRoomPlayer>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    answers: {
      type: [playerAnswerSchema],
      default: [],
    },
  },
  { _id: false }
);

const roomSchema = new Schema<IRoom>(
  {
    code: {
      type: String,
      required: [true, "Room code is required"],
      unique: true,
      length: 6,
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Host is required"],
    },
    players: {
      type: [roomPlayerSchema],
      default: [],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty is required"],
    },
    questionsCount: {
      type: Number,
      required: [true, "Questions count is required"],
      min: [1, "At least 1 question is required"],
      max: [20, "Maximum 20 questions allowed"],
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    status: {
      type: String,
      enum: ["waiting", "playing", "finished"],
      default: "waiting",
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-delete rooms after 24 hours
roomSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

// Index for querying public waiting rooms
roomSchema.index({ status: 1, isPublic: 1 });

const Room = mongoose.model<IRoom>("Room", roomSchema);

export default Room;
