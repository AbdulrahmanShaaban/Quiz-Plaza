import type { Types } from "mongoose";
import Question, { QUESTION_TOPICS, type Category, type Difficulty } from "../models/Question.js";

export const NOT_ENOUGH_QUESTIONS_MESSAGE =
  "Not enough questions, please try again later";

export class NotEnoughQuestionsError extends Error {
  constructor() {
    super(NOT_ENOUGH_QUESTIONS_MESSAGE);
    this.name = "NotEnoughQuestionsError";
  }
}

function poolFilter(category: Category, difficulty: Difficulty): Record<string, unknown> {
  if (category === "mixed") {
    return { difficulty, category: { $in: QUESTION_TOPICS } };
  }
  return { category, difficulty };
}

export async function countPool(category: Category, difficulty: Difficulty): Promise<number> {
  return Question.countDocuments(poolFilter(category, difficulty));
}

/** Pick random question IDs for a room from the DB only (no Gemini). */
export async function pickQuestionsForRoom(
  category: Category,
  difficulty: Difficulty,
  count: number
): Promise<Types.ObjectId[]> {
  const filter = poolFilter(category, difficulty);
  const poolSize = await countPool(category, difficulty);

  if (poolSize < count) {
    throw new NotEnoughQuestionsError();
  }

  const sampled = await Question.aggregate<{ _id: Types.ObjectId }>([
    { $match: filter },
    { $sample: { size: count } },
    { $project: { _id: 1 } },
  ]);

  return sampled.map((q) => q._id);
}
