import { Request, Response } from "express";
import { z } from "zod/v4";
import Question, {
  QUESTION_TOPICS,
  DIFFICULTIES,
  type QuestionTopic,
  type Difficulty,
} from "../models/Question.js";

// --------------- Validation Schemas ---------------

const questionSchema = z.object({
  text: z.string().min(10, "Question must be at least 10 characters"),
  options: z.array(z.string().min(1)).length(4, "Exactly 4 options required"),
  correctAnswer: z.number().int().min(0).max(3),
  category: z.enum(QUESTION_TOPICS),
  difficulty: z.enum(DIFFICULTIES),
});

// --------------- Default Questions Seed Data ---------------

const seedData = [
  // Sports
  {
    text: "Which country has won the most FIFA World Cups?",
    options: ["Germany", "Brazil", "Argentina", "France"],
    correctAnswer: 1,
    category: "sports" as QuestionTopic,
    difficulty: "easy" as Difficulty,
  },
  {
    text: "In which year did Michael Jordan retire from the NBA for the first time?",
    options: ["1993", "1998", "2001", "2003"],
    correctAnswer: 0,
    category: "sports" as QuestionTopic,
    difficulty: "hard" as Difficulty,
  },
  {
    text: "Which tennis player has won the most Grand Slam titles as of 2024?",
    options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Margaret Court"],
    correctAnswer: 2,
    category: "sports" as QuestionTopic,
    difficulty: "medium" as Difficulty,
  },
  {
    text: "What is the maximum score in a single frame of professional snooker?",
    options: ["100", "120", "147", "180"],
    correctAnswer: 2,
    category: "sports" as QuestionTopic,
    difficulty: "hard" as Difficulty,
  },
  {
    text: "How many players are on a basketball team on the court at one time?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 1,
    category: "sports" as QuestionTopic,
    difficulty: "easy" as Difficulty,
  },

  // Food
  {
    text: "Which country is the origin of pizza?",
    options: ["Greece", "Italy", "Spain", "France"],
    correctAnswer: 1,
    category: "food" as QuestionTopic,
    difficulty: "easy" as Difficulty,
  },
  {
    text: "What is the main ingredient in hummus?",
    options: ["Lentils", "Chickpeas", "Beans", "Peas"],
    correctAnswer: 1,
    category: "food" as QuestionTopic,
    difficulty: "medium" as Difficulty,
  },
  {
    text: "Which spice is the most expensive in the world by weight?",
    options: ["Vanilla", "Saffron", "Cardamom", "Cinnamon"],
    correctAnswer: 1,
    category: "food" as QuestionTopic,
    difficulty: "hard" as Difficulty,
  },
  {
    text: "What type of pasta is shaped like little ears?",
    options: ["Penne", "Orecchiette", "Rigatoni", "Ravioli"],
    correctAnswer: 1,
    category: "food" as QuestionTopic,
    difficulty: "medium" as Difficulty,
  },
  {
    text: "Which fruit is known as the 'king of fruits'?",
    options: ["Mango", "Durian", "Pineapple", "Papaya"],
    correctAnswer: 0,
    category: "food" as QuestionTopic,
    difficulty: "easy" as Difficulty,
  },

  // Technology
  {
    text: "In what year was the World Wide Web invented?",
    options: ["1989", "1991", "1995", "1998"],
    correctAnswer: 0,
    category: "technology" as QuestionTopic,
    difficulty: "hard" as Difficulty,
  },
  {
    text: "Who is known as the father of computers?",
    options: ["Alan Turing", "Charles Babbage", "Stephen Hawking", "Bill Gates"],
    correctAnswer: 1,
    category: "technology" as QuestionTopic,
    difficulty: "medium" as Difficulty,
  },
  {
    text: "What does GPU stand for?",
    options: ["General Processing Unit", "Graphics Processing Unit", "Global Programming Utility", "Graphics Performance Update"],
    correctAnswer: 1,
    category: "technology" as QuestionTopic,
    difficulty: "medium" as Difficulty,
  },
  {
    text: "Which programming language is known for web development?",
    options: ["Python", "JavaScript", "C++", "Rust"],
    correctAnswer: 1,
    category: "technology" as QuestionTopic,
    difficulty: "easy" as Difficulty,
  },
  {
    text: "What year was the first iPhone released?",
    options: ["2005", "2007", "2009", "2011"],
    correctAnswer: 1,
    category: "technology" as QuestionTopic,
    difficulty: "easy" as Difficulty,
  },

  // Movies
  {
    text: "Which movie won the Academy Award for Best Picture in 2020?",
    options: ["1917", "Parasite", "Joker", "Irishman"],
    correctAnswer: 1,
    category: "movies" as QuestionTopic,
    difficulty: "medium" as Difficulty,
  },
  {
    text: "Who directed 'The Shawshank Redemption'?",
    options: ["Martin Scorsese", "Steven Spielberg", "Frank Darabont", "Christopher Nolan"],
    correctAnswer: 2,
    category: "movies" as QuestionTopic,
    difficulty: "medium" as Difficulty,
  },
  {
    text: "In which year was the first 'Star Wars' movie released?",
    options: ["1975", "1977", "1980", "1983"],
    correctAnswer: 1,
    category: "movies" as QuestionTopic,
    difficulty: "easy" as Difficulty,
  },
  {
    text: "What is the highest-grossing film of all time?",
    options: ["Avengers: Endgame", "Avatar", "Titanic", "Avatar: The Way of Water"],
    correctAnswer: 3,
    category: "movies" as QuestionTopic,
    difficulty: "hard" as Difficulty,
  },
  {
    text: "Who plays Iron Man in the Marvel Cinematic Universe?",
    options: ["Chris Evans", "Robert Downey Jr.", "Tom Holland", "Mark Ruffalo"],
    correctAnswer: 1,
    category: "movies" as QuestionTopic,
    difficulty: "easy" as Difficulty,
  },

  // Geography
  {
    text: "What is the capital of France?",
    options: ["Lyon", "Marseille", "Paris", "Nice"],
    correctAnswer: 2,
    category: "geography" as QuestionTopic,
    difficulty: "easy" as Difficulty,
  },
  {
    text: "Which is the largest country in the world by area?",
    options: ["Canada", "United States", "Russia", "China"],
    correctAnswer: 2,
    category: "geography" as QuestionTopic,
    difficulty: "easy" as Difficulty,
  },
  {
    text: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    correctAnswer: 1,
    category: "geography" as QuestionTopic,
    difficulty: "medium" as Difficulty,
  },
  {
    text: "Which mountain is the tallest in the world?",
    options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
    correctAnswer: 1,
    category: "geography" as QuestionTopic,
    difficulty: "easy" as Difficulty,
  },
  {
    text: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correctAnswer: 2,
    category: "geography" as QuestionTopic,
    difficulty: "medium" as Difficulty,
  },

  // Music
  {
    text: "Which band released the album 'The Dark Side of the Moon'?",
    options: ["The Beatles", "Pink Floyd", "Led Zeppelin", "The Rolling Stones"],
    correctAnswer: 1,
    category: "music" as QuestionTopic,
    difficulty: "medium" as Difficulty,
  },
  {
    text: "Who is known as the 'King of Pop'?",
    options: ["Prince", "Michael Jackson", "Elvis Presley", "David Bowie"],
    correctAnswer: 1,
    category: "music" as QuestionTopic,
    difficulty: "easy" as Difficulty,
  },
  {
    text: "In what year did The Beatles break up?",
    options: ["1968", "1969", "1970", "1971"],
    correctAnswer: 2,
    category: "music" as QuestionTopic,
    difficulty: "hard" as Difficulty,
  },
  {
    text: "Which instrument has 88 keys?",
    options: ["Organ", "Keyboard", "Piano", "Synthesizer"],
    correctAnswer: 2,
    category: "music" as QuestionTopic,
    difficulty: "medium" as Difficulty,
  },
  {
    text: "Who composed the 'Moonlight Sonata'?",
    options: ["Wolfgang Mozart", "Ludwig van Beethoven", "Johann Bach", "Pyotr Tchaikovsky"],
    correctAnswer: 1,
    category: "music" as QuestionTopic,
    difficulty: "medium" as Difficulty,
  },
];

// --------------- Controllers ---------------

export const getQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, difficulty } = req.query;

    const filter: Record<string, unknown> = {};
    if (category && QUESTION_TOPICS.includes(category as QuestionTopic)) {
      filter.category = category;
    }
    if (difficulty && DIFFICULTIES.includes(difficulty as any)) {
      filter.difficulty = difficulty;
    }

    const questions = await Question.find(filter);
    res.json({ questions, total: questions.length });
  } catch (error) {
    console.error("Get questions error:", error);
    res.status(500).json({ message: "Server error fetching questions." });
  }
};

export const createQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = questionSchema.parse(req.body);
    const question = await Question.create(data);
    res.status(201).json({ message: "Question created successfully.", question });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.issues[0].message });
      return;
    }
    console.error("Create question error:", error);
    res.status(500).json({ message: "Server error creating question." });
  }
};

export const updateQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = questionSchema.partial().parse(req.body);

    const question = await Question.findByIdAndUpdate(id, data, { new: true });

    if (!question) {
      res.status(404).json({ message: "Question not found." });
      return;
    }

    res.json({ message: "Question updated successfully.", question });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.issues[0].message });
      return;
    }
    console.error("Update question error:", error);
    res.status(500).json({ message: "Server error updating question." });
  }
};

export const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      res.status(404).json({ message: "Question not found." });
      return;
    }

    res.json({ message: "Question deleted successfully." });
  } catch (error) {
    console.error("Delete question error:", error);
    res.status(500).json({ message: "Server error deleting question." });
  }
};

export const seedQuestions = async (_req: Request, res: Response): Promise<void> => {
  res.status(410).json({
    message:
      "Static seeding is disabled. Questions are generated automatically via Gemini when a room is created.",
  });
};
