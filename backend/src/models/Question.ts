import mongoose, { Schema, Document } from "mongoose";

/** Topics used for individual questions (stored in DB). */
export const QUESTION_TOPICS = [
  "sports",
  "food",
  "technology",
  "movies",
  "geography",
  "music",
] as const;

/** Room / UI categories — includes "mixed" for cross-topic games. */
export const CATEGORIES = [...QUESTION_TOPICS, "mixed"] as const;

export const DIFFICULTIES = ["easy", "medium", "hard"] as const;

export type QuestionTopic = (typeof QUESTION_TOPICS)[number];
export type Category = (typeof CATEGORIES)[number];
export type Difficulty = (typeof DIFFICULTIES)[number];

export interface IQuestion extends Document {
  text: string;
  options: string[];
  correctAnswer: number;
  category: QuestionTopic;
  difficulty: Difficulty;
  createdAt: Date;
}

const questionSchema = new Schema<IQuestion>(
  {
    text: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
    },
    options: {
      type: [String],
      required: [true, "Options are required"],
      validate: {
        validator: (val: string[]) => val.length === 4,
        message: "Exactly 4 options are required",
      },
    },
    correctAnswer: {
      type: Number,
      required: [true, "Correct answer index is required"],
      min: [0, "Correct answer must be between 0 and 3"],
      max: [3, "Correct answer must be between 0 and 3"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: QUESTION_TOPICS,
        message: "Invalid category: {VALUE}",
      },
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty is required"],
      enum: {
        values: DIFFICULTIES,
        message: "Invalid difficulty: {VALUE}",
      },
    },
  },
  {
    timestamps: true,
  }
);

questionSchema.index({ category: 1, difficulty: 1 });

const Question = mongoose.model<IQuestion>("Question", questionSchema);

export default Question;
