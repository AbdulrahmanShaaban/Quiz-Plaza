"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DailyChallengeIcon } from "@/components/icons/DailyChallengeIcon";
import { FlameIcon } from "@/components/icons/FlameIcon";
import { getDailyQuestions, OfflineQuestion } from "@/lib/questions";

type GameState = "menu" | "playing" | "results";

export default function DailyPage() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const lastPlayed = localStorage.getItem("dailyLastPlayed");
    const today = new Date().toDateString();
    return lastPlayed === today ? "results" : "menu";
  });
  const [questions, setQuestions] = useState<OfflineQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() => {
    const lastPlayed = localStorage.getItem("dailyLastPlayed");
    const today = new Date().toDateString();
    if (lastPlayed === today) {
      const savedAnswers = localStorage.getItem("dailyAnswers");
      return savedAnswers ? JSON.parse(savedAnswers) : [];
    }
    return [];
  });
  const [showExplanation, setShowExplanation] = useState(false);
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("dailyStreak");
    return saved ? parseInt(saved) : 0;
  });
  const [lastPlayedDate, setLastPlayedDate] = useState(() => {
    return localStorage.getItem("dailyLastPlayed");
  });
  const dailyNumber = (() => {
    const referenceDate = new Date("2024-01-01");
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - referenceDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  })();

  const canPlayToday = () => {
    const today = new Date().toDateString();
    return lastPlayedDate !== today;
  };

  const startGame = () => {
    if (!canPlayToday()) return;
    
    const dailyQuestions = getDailyQuestions();
    setQuestions(dailyQuestions);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
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
        setShowExplanation(false);
      } else {
        // Game complete
        completeGame(newAnswers);
      }
    }, 2000);
  };

  const completeGame = (finalAnswers: number[]) => {
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Update streak
    let newStreak = streak;
    if (lastPlayedDate === yesterday.toDateString()) {
      newStreak = streak + 1;
    } else if (lastPlayedDate !== today) {
      newStreak = 1;
    }
    
    setStreak(newStreak);
    setLastPlayedDate(today);
    
    // Save to localStorage
    localStorage.setItem("dailyStreak", newStreak.toString());
    localStorage.setItem("dailyLastPlayed", today);
    localStorage.setItem("dailyAnswers", JSON.stringify(finalAnswers));
    
    setGameState("results");
  };

  const shareResult = () => {
    const correctCount = answers.reduce((count, ans, idx) => {
      return count + (ans === questions[idx].correctAnswer ? 1 : 0);
    }, 0);
    
    const text = `Quiz Plaza Daily #${dailyNumber} — ${correctCount}/10 🔥 ${streak} day streak!`;
    
    if (navigator.share) {
      navigator.share({
        title: "Quiz Plaza Daily Challenge",
        text: text
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text);
      alert("Result copied to clipboard!");
    }
  };

  const getScoreMessage = (score: number) => {
    if (score === 10) return "Perfect! 🎉";
    if (score >= 8) return "Amazing! 🌟";
    if (score >= 6) return "Good job! 👍";
    if (score >= 4) return "Keep practicing! 💪";
    return "Try again tomorrow! 📚";
  };

  if (gameState === "menu") {
    const canPlay = canPlayToday();
    
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-2xl"
        >
          <DailyChallengeIcon size={100} className="mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-[#7B2FBE] mb-4" style={{ fontFamily: "Bangers, cursive" }}>
            Daily Challenge
          </h1>
          
          <div className="mb-6">
            <p className="text-[#FFD700] text-2xl font-bold mb-2" style={{ fontFamily: "Bangers, cursive" }}>
              Daily #{dailyNumber}
            </p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <FlameIcon size={32} />
              <span className="text-[#E74C3C] text-3xl font-bold" style={{ fontFamily: "Bangers, cursive" }}>
                {streak} Day Streak
              </span>
            </div>
          </div>
          
          <p className="text-[#BDC3C7] text-lg mb-8" style={{ fontFamily: "Nunito, sans-serif" }}>
            {canPlay 
              ? "Same 10 questions for everyone today. One attempt per day!"
              : "You've already completed today's challenge. Come back tomorrow!"
            }
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            disabled={!canPlay}
            className="bg-[#7B2FBE] text-white px-12 py-4 rounded-full text-xl font-bold hover:bg-[#6B24A8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "Bangers, cursive" }}
          >
            {canPlay ? "Start Challenge" : "Already Played"}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (gameState === "results") {
    const correctCount = answers.reduce((count, ans, idx) => {
      return count + (ans === questions[idx].correctAnswer ? 1 : 0);
    }, 0);
    const scoreMessage = getScoreMessage(correctCount);
    
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-2xl"
        >
          <DailyChallengeIcon size={80} className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#7B2FBE] mb-2" style={{ fontFamily: "Bangers, cursive" }}>
            Daily #{dailyNumber} Complete!
          </h1>
          <p className="text-[#FFD700] text-6xl font-bold mb-2" style={{ fontFamily: "Bangers, cursive" }}>
            {correctCount}/10
          </p>
          <p className="text-[#BDC3C7] text-2xl mb-4" style={{ fontFamily: "Nunito, sans-serif" }}>
            {scoreMessage}
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-8">
            <FlameIcon size={32} />
            <span className="text-[#E74C3C] text-2xl font-bold" style={{ fontFamily: "Bangers, cursive" }}>
              {streak} Day Streak
            </span>
          </div>
          
          <div className="flex gap-4 justify-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareResult}
              className="bg-[#3498DB] text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-[#2980B9] transition-colors"
              style={{ fontFamily: "Bangers, cursive" }}
            >
              Share Result
            </motion.button>
          </div>
          
          <p className="text-[#BDC3C7] text-sm" style={{ fontFamily: "Nunito, sans-serif" }}>
            Come back tomorrow for a new challenge!
          </p>
        </motion.div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  if (!question) return null;

  return (
    <div className="min-h-screen bg-[#0a1628] p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-[#FFD700] font-bold" style={{ fontFamily: "Bangers, cursive" }}>
              Daily #{dailyNumber}
            </p>
            <div className="flex items-center gap-2">
              <FlameIcon size={20} />
              <span className="text-[#E74C3C] font-bold" style={{ fontFamily: "Bangers, cursive" }}>
                {streak}
              </span>
            </div>
          </div>
          <p className="text-[#7B2FBE] font-bold" style={{ fontFamily: "Bangers, cursive" }}>
            Question {currentQuestion + 1} / 10
          </p>
        </div>

        {/* Question */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#1a2744] rounded-2xl p-6 mb-6 border-4 border-[#7B2FBE]"
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
            let borderColor = "border-[#7B2FBE]";
            
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
              className="bg-[#1a2744] border-2 border-[#7B2FBE] rounded-xl p-4 mb-6"
            >
              <p className="text-[#7B2FBE] font-bold mb-2" style={{ fontFamily: "Bangers, cursive" }}>
                Explanation
              </p>
              <p className="text-white" style={{ fontFamily: "Nunito, sans-serif" }}>
                {question.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
