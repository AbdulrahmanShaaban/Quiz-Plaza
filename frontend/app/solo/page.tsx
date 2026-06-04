"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SoloQuizIcon } from "@/components/icons/SoloQuizIcon";
import { ShadowNinjaIcon } from "@/components/icons/ShadowNinjaIcon";
import { EliteNinjaIcon } from "@/components/icons/EliteNinjaIcon";
import { SkilledNinjaIcon } from "@/components/icons/SkilledNinjaIcon";
import { ApprenticeNinjaIcon } from "@/components/icons/ApprenticeNinjaIcon";
import { RookieNinjaIcon } from "@/components/icons/RookieNinjaIcon";
import { getRandomQuestions, getQuestionsByCategory, OfflineQuestion } from "@/lib/questions";

const CATEGORIES = ["random", "sports", "food", "technology", "movies", "geography", "music"] as const;
const DIFFICULTIES = ["easy", "medium", "hard"] as const;
const QUESTION_COUNTS = [5, 10, 15, 20];

type Rank = "S" | "A" | "B" | "C" | "F";

interface RankInfo {
  rank: Rank;
  name: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  minScore: number;
  color: string;
}

const RANKS: RankInfo[] = [
  { rank: "S", name: "Shadow Ninja", icon: ShadowNinjaIcon, minScore: 100, color: "#FFD700" },
  { rank: "A", name: "Elite Ninja", icon: EliteNinjaIcon, minScore: 80, color: "#E74C3C" },
  { rank: "B", name: "Skilled Ninja", icon: SkilledNinjaIcon, minScore: 60, color: "#3498DB" },
  { rank: "C", name: "Apprentice Ninja", icon: ApprenticeNinjaIcon, minScore: 40, color: "#27AE60" },
  { rank: "F", name: "Rookie Ninja", icon: RookieNinjaIcon, minScore: 0, color: "#95A5A6" }
];

type GameState = "menu" | "playing" | "results";

export default function SoloPage() {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [selectedCategory, setSelectedCategory] = useState<"random" | "sports" | "food" | "technology" | "movies" | "geography" | "music" | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<(typeof DIFFICULTIES)[number] | null>(null);
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const [questions, setQuestions] = useState<OfflineQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [showExplanation, setShowExplanation] = useState(false);
  const [bestScores, setBestScores] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem("soloBestScores");
    return saved ? JSON.parse(saved) : {};
  });
  const timeUpHandledRef = useRef(false);

  const saveBestScore = useCallback((category: string, score: number) => {
    setBestScores(prev => {
      const newBestScores = { ...prev };
      if (!newBestScores[category] || score > newBestScores[category]) {
        newBestScores[category] = score;
        localStorage.setItem("soloBestScores", JSON.stringify(newBestScores));
      }
      return newBestScores;
    });
  }, []);

  const startGame = () => {
    if (!selectedCategory || !selectedDifficulty || !selectedCount) return;
    
    let categoryQuestions: OfflineQuestion[];
    
    if (selectedCategory === "random") {
      categoryQuestions = getRandomQuestions(selectedCount * 2); // Get more to filter
    } else {
      categoryQuestions = getQuestionsByCategory(selectedCategory);
    }
    
    // Filter by difficulty if not mixed
    const filtered = selectedDifficulty === "medium" 
      ? categoryQuestions 
      : categoryQuestions.filter(q => q.difficulty === selectedDifficulty);
    
    const shuffled = filtered.sort(() => Math.random() - 0.5).slice(0, selectedCount);
    setQuestions(shuffled);
    setCurrentQuestion(0);
    setAnswers([]);
    setTimeLeft(20);
    setShowExplanation(false);
    timeUpHandledRef.current = false;
    setGameState("playing");
  };

  const handleAnswer = (answerIndex: number) => {
    if (gameState !== "playing") return;
    
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    setShowExplanation(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setTimeLeft(20);
        setShowExplanation(false);
      } else {
        // Game complete
        const correctCount = newAnswers.reduce((count, ans, idx) => {
          return count + (ans === questions[idx].correctAnswer ? 1 : 0);
        }, 0);
        const score = Math.round((correctCount / questions.length) * 100);
        saveBestScore(selectedCategory!, score);
        setGameState("results");
      }
    }, 3000);
  };

  const getRank = (score: number): RankInfo => {
    for (const rank of RANKS) {
      if (score >= rank.minScore) return rank;
    }
    return RANKS[RANKS.length - 1];
  };

  const resetGame = () => {
    setGameState("menu");
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setSelectedCount(null);
    setQuestions([]);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "playing" && !showExplanation && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, showExplanation, timeLeft]);

  // Handle time's up separately
  useEffect(() => {
    if (timeLeft === 0 && gameState === "playing" && !showExplanation && !timeUpHandledRef.current) {
      timeUpHandledRef.current = true;
      const newAnswers = [...answers, -1];
      setAnswers(newAnswers);
      setShowExplanation(true);
      
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setTimeLeft(20);
          setShowExplanation(false);
          timeUpHandledRef.current = false;
        } else {
          const correctCount = newAnswers.reduce((count, ans, idx) => {
            return count + (ans === questions[idx].correctAnswer ? 1 : 0);
          }, 0);
          const score = Math.round((correctCount / questions.length) * 100);
          saveBestScore(selectedCategory!, score);
          setGameState("results");
        }
      }, 3000);
    }
  }, [timeLeft, gameState, showExplanation, currentQuestion, questions, answers, selectedCategory, saveBestScore]);

  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-2xl w-full"
        >
          <SoloQuizIcon size={100} className="mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-[#E94560] mb-4" style={{ fontFamily: "Bangers, cursive" }}>
            Solo Quiz
          </h1>
          <p className="text-[#BDC3C7] text-lg mb-8" style={{ fontFamily: "Nunito, sans-serif" }}>
            Test your knowledge and earn your ninja rank!
          </p>

          {/* Category selection */}
          <div className="mb-6">
            <h3 className="text-[#FFD700] text-xl font-bold mb-3" style={{ fontFamily: "Bangers, cursive" }}>
              Select Category
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {CATEGORIES.map(cat => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat)}
                  className={`p-3 rounded-xl border-2 capitalize ${
                    selectedCategory === cat 
                      ? "bg-[#E94560] border-[#E94560] text-white" 
                      : "bg-[#1a2744] border-[#3498DB] text-[#BDC3C7] hover:border-[#E94560]"
                  }`}
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Difficulty selection */}
          <div className="mb-6">
            <h3 className="text-[#FFD700] text-xl font-bold mb-3" style={{ fontFamily: "Bangers, cursive" }}>
              Select Difficulty
            </h3>
            <div className="flex justify-center gap-3">
              {DIFFICULTIES.map(diff => (
                <motion.button
                  key={diff}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-6 py-3 rounded-xl border-2 capitalize ${
                    selectedDifficulty === diff 
                      ? "bg-[#E94560] border-[#E94560] text-white" 
                      : "bg-[#1a2744] border-[#3498DB] text-[#BDC3C7] hover:border-[#E94560]"
                  }`}
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {diff}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Question count selection */}
          <div className="mb-8">
            <h3 className="text-[#FFD700] text-xl font-bold mb-3" style={{ fontFamily: "Bangers, cursive" }}>
              Number of Questions
            </h3>
            <div className="flex justify-center gap-3">
              {QUESTION_COUNTS.map(count => (
                <motion.button
                  key={count}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCount(count)}
                  className={`px-6 py-3 rounded-xl border-2 ${
                    selectedCount === count 
                      ? "bg-[#E94560] border-[#E94560] text-white" 
                      : "bg-[#1a2744] border-[#3498DB] text-[#BDC3C7] hover:border-[#E94560]"
                  }`}
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {count}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Best scores */}
          {selectedCategory && bestScores[selectedCategory] && (
            <p className="text-[#FFD700] mb-4" style={{ fontFamily: "Nunito, sans-serif" }}>
              Best Score in {selectedCategory}: {bestScores[selectedCategory]}%
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            disabled={!selectedCategory || !selectedDifficulty || !selectedCount}
            className="bg-[#E94560] text-white px-12 py-4 rounded-full text-xl font-bold hover:bg-[#C0392B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "Bangers, cursive" }}
          >
            Start Quiz
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (gameState === "results") {
    const correctCount = answers.reduce((count, ans, idx) => {
      return count + (ans === questions[idx].correctAnswer ? 1 : 0);
    }, 0);
    const score = Math.round((correctCount / questions.length) * 100);
    const rank = getRank(score);
    const RankIcon = rank.icon;

    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-2xl"
        >
          <RankIcon size={120} className="mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "Bangers, cursive", color: rank.color }}>
            {rank.name}
          </h1>
          <p className="text-[#FFD700] text-6xl font-bold mb-4" style={{ fontFamily: "Bangers, cursive" }}>
            {rank.rank} Rank
          </p>
          <p className="text-[#BDC3C7] text-2xl mb-2" style={{ fontFamily: "Nunito, sans-serif" }}>
            Score: {score}%
          </p>
          <p className="text-[#BDC3C7] text-lg mb-8" style={{ fontFamily: "Nunito, sans-serif" }}>
            {correctCount} / {questions.length} correct
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="bg-[#E94560] text-white px-12 py-4 rounded-full text-xl font-bold hover:bg-[#C0392B] transition-colors"
            style={{ fontFamily: "Bangers, cursive" }}
          >
            Play Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  if (!question) return null;

  return (
    <div className="min-h-screen bg-[#0a1628] p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#FFD700] font-bold" style={{ fontFamily: "Bangers, cursive" }}>
              Question {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-[#E94560] font-bold" style={{ fontFamily: "Bangers, cursive" }}>
              {timeLeft}s
            </span>
          </div>
          <div className="w-full bg-[#1a2744] rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: `${(timeLeft / 20) * 100}%` }}
              className={`h-full ${timeLeft <= 5 ? "bg-[#E74C3C]" : "bg-[#3498DB]"}`}
            />
          </div>
        </div>

        {/* Question */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#1a2744] rounded-2xl p-6 mb-6 border-4 border-[#E94560]"
        >
          <p className="text-white text-xl md:text-2xl text-center" style={{ fontFamily: "Nunito, sans-serif" }}>
            {question.text}
          </p>
        </motion.div>

        {/* Answer buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {question.options.map((option, index) => {
            const isSelected = answers[currentQuestion] === index;
            const isCorrect = index === question.correctAnswer;
            const showResult = showExplanation;
            
            let bgColor = "bg-[#1a2744]";
            let borderColor = "border-[#3498DB]";
            
            if (showResult) {
              if (isCorrect) {
                bgColor = "bg-[#27AE60]";
                borderColor = "border-[#1E8449]";
              } else if (isSelected && !isCorrect) {
                bgColor = "bg-[#E74C3C]";
                borderColor = "border-[#C0392B]";
              }
            }
            
            return (
              <motion.button
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={!showResult ? { scale: 1.02 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`${bgColor} border-4 ${borderColor} rounded-xl p-4 text-left transition-all ${showResult ? "cursor-default" : "cursor-pointer"}`}
              >
                <span className="text-white text-lg" style={{ fontFamily: "Nunito, sans-serif" }}>
                  {option}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && question.explanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#1a2744] border-2 border-[#3498DB] rounded-xl p-4 mb-6"
            >
              <p className="text-[#3498DB] font-bold mb-2" style={{ fontFamily: "Bangers, cursive" }}>
                Explanation
              </p>
              <p className="text-white" style={{ fontFamily: "Nunito, sans-serif" }}>
                {question.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Time's up message */}
        {timeLeft === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[#E74C3C] font-bold text-xl mb-4"
            style={{ fontFamily: "Bangers, cursive" }}
          >
Time&apos;s Up!
          </motion.div>
        )}
      </div>
    </div>
  );
}
