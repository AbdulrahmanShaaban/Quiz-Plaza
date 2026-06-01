import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod/v4";
import {
  DIFFICULTIES,
  QUESTION_TOPICS,
  type Category,
  type Difficulty,
  type QuestionTopic,
} from "../models/Question.js";

const generatedQuestionSchema = z.object({
  text: z.string().min(10),
  options: z.array(z.string().min(1)).length(4),
  correctAnswer: z.number().int().min(0).max(3),
  category: z.enum(QUESTION_TOPICS),
  difficulty: z.enum(DIFFICULTIES),
});

const generatedQuestionsSchema = z.array(generatedQuestionSchema).min(1);

export type GeneratedQuestionInput = z.infer<typeof generatedQuestionSchema>;

function buildPrompt(
  count: number,
  category: Category | QuestionTopic,
  difficulty: Difficulty
): string {
  const topicsList = QUESTION_TOPICS.join(", ");

  if (category === "mixed") {
    return `Generate ${count} multiple choice quiz questions with ${difficulty} difficulty.
Use a random mix of topics from: ${topicsList}. Each question should be from a different topic when possible.
Return ONLY a JSON array with this exact format:
[{
  "text": "question text",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": 0,
  "category": "sports",
  "difficulty": "${difficulty}"
}]
For each question, set "category" to one of: ${topicsList} (never use "mixed").
No explanation, no markdown, just the JSON array.`;
  }

  return `Generate ${count} multiple choice quiz questions about ${category} with ${difficulty} difficulty.
Return ONLY a JSON array with this exact format:
[{
  "text": "question text",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": 0,
  "category": "${category}",
  "difficulty": "${difficulty}"
}]
No explanation, no markdown, just the JSON array.`;
}

function extractJsonArray(raw: string): string {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }
  const start = trimmed.indexOf("[");
  const end = trimmed.lastIndexOf("]");
  if (start !== -1 && end !== -1 && end > start) {
    return trimmed.slice(start, end + 1);
  }
  return trimmed;
}

function normalizeQuestions(
  questions: GeneratedQuestionInput[],
  difficulty: Difficulty
): GeneratedQuestionInput[] {
  return questions.map((q) => ({
    ...q,
    difficulty,
    options: q.options.map((o) => o.trim()),
    text: q.text.trim(),
  }));
}

export async function generateQuestionsWithGemini(
  count: number,
  category: Category | QuestionTopic,
  difficulty: Difficulty
): Promise<GeneratedQuestionInput[]> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in backend/.env");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = buildPrompt(count, category, difficulty);

  const result = await model.generateContent(prompt);
  const rawText = result.response.text();

  if (!rawText) {
    throw new Error("Gemini returned an empty response");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(extractJsonArray(rawText));
  } catch {
    throw new Error("Failed to parse questions JSON from Gemini");
  }

  const validated = generatedQuestionsSchema.safeParse(parsed);
  if (!validated.success) {
    console.error("Gemini question validation failed:", validated.error.issues);
    throw new Error("Gemini returned invalid question format");
  }

  if (validated.data.length < count) {
    throw new Error(
      `Gemini returned ${validated.data.length} questions but ${count} were requested`
    );
  }

  return normalizeQuestions(validated.data.slice(0, count), difficulty);
}
