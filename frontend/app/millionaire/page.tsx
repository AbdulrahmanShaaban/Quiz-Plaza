"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MillionaireIcon } from "@/components/icons/MillionaireIcon";
import { FiftyFiftyIcon } from "@/components/icons/FiftyFiftyIcon";
import { PhoneFriendIcon } from "@/components/icons/PhoneFriendIcon";
import { AudienceIcon } from "@/components/icons/AudienceIcon";
import { getRandomQuestions, OfflineQuestion } from "@/lib/questions";

const PRIZE_LADDER = [
  1000, 2000, 3000, 5000, 10000, 20000, 50000, 75000, 150000, 250000,
  500000, 1000000, 2000000, 4000000, 8000000
];

const SAFE_CHECKPOINTS = [4, 9]; // 0-indexed (questions 5 and 10)

type GameState = "menu" | "playing" | "thinking" | "correct" | "wrong" | "walked" | "gameover";

export default function MillionairePage() {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<OfflineQuestion[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentPrize, setCurrentPrize] = useState(0);
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    phoneFriend: true,
    audience: true
  });
  const [removedAnswers, setRemovedAnswers] = useState<number[]>([]);
  const [audienceResults, setAudienceResults] = useState<number[] | null>(null);
  const [friendHint, setFriendHint] = useState<string | null>(null);
  const [showPrizeLadder, setShowPrizeLadder] = useState(true);

  const startGame = () => {
    const shuffled = getRandomQuestions(15);
    // Sort by difficulty to match prize ladder
    const sorted = shuffled.sort((a, b) => {
      const diffOrder = { easy: 0, medium: 1, hard: 2 };
      return diffOrder[a.difficulty] - diffOrder[b.difficulty];
    });
    setQuestions(sorted.slice(0, 15));
    setCurrentQuestion(0);
    setCurrentPrize(0);
    setSelectedAnswer(null);
    setLifelines({ fiftyFifty: true, phoneFriend: true, audience: true });
    setRemovedAnswers([]);
    setAudienceResults(null);
    setFriendHint(null);
    setGameState("playing");
  };

  const handleAnswer = (answerIndex: number) => {
    if (gameState !== "playing" || selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setGameState("thinking");
    
    setTimeout(() => {
      const question = questions[currentQuestion];
      if (answerIndex === question.correctAnswer) {
        setGameState("correct");
        const newPrize = PRIZE_LADDER[currentQuestion];
        setCurrentPrize(newPrize);
        
        setTimeout(() => {
          if (currentQuestion === 14) {
            setGameState("gameover");
          } else {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setRemovedAnswers([]);
            setAudienceResults(null);
            setFriendHint(null);
            setGameState("playing");
          }
        }, 2000);
      } else {
        setGameState("wrong");
        // Calculate final prize based on checkpoints
        let finalPrize = 0;
        if (currentQuestion >= 10) {
          finalPrize = PRIZE_LADDER[9]; // 250,000
        } else if (currentQuestion >= 5) {
          finalPrize = PRIZE_LADDER[4]; // 10,000
        }
        setCurrentPrize(finalPrize);
        
        setTimeout(() => {
          setGameState("gameover");
        }, 2000);
      }
    }, 2000);
  };

  const useFiftyFifty = () => {
    if (!lifelines.fiftyFifty || gameState !== "playing") return;
    
    const question = questions[currentQuestion];
    const correct = question.correctAnswer;
    const wrongAnswers = [0, 1, 2, 3].filter(i => i !== correct);
    const toRemove = wrongAnswers.sort(() => Math.random() - 0.5).slice(0, 2);
    
    setRemovedAnswers(toRemove);
    setLifelines(prev => ({ ...prev, fiftyFifty: false }));
  };

  const usePhoneFriend = () => {
    if (!lifelines.phoneFriend || gameState !== "playing") return;
    
    const question = questions[currentQuestion];
    const correct = question.correctAnswer;
    const letters = ["A", "B", "C", "D"];
    
    // 70% chance to give correct answer
    const isCorrect = Math.random() < 0.7;
    const suggested = isCorrect ? correct : Math.floor(Math.random() * 4);
    
    setFriendHint(`I'm ${Math.floor(Math.random() * 30) + 70}% sure it's ${letters[suggested]}!`);
    setLifelines(prev => ({ ...prev, phoneFriend: false }));
  };

  const useAudience = () => {
    if (!lifelines.audience || gameState !== "playing") return;
    
    const question = questions[currentQuestion];
    const correct = question.correctAnswer;
    
    // Generate audience poll with bias toward correct answer
    const percentages = [0, 0, 0, 0];
    const correctPercent = Math.floor(Math.random() * 30) + 40; // 40-70%
    percentages[correct] = correctPercent;
    
    let remaining = 100 - correctPercent;
    for (let i = 0; i < 4; i++) {
      if (i !== correct) {
        const percent = i === 3 ? remaining : Math.floor(Math.random() * remaining);
        percentages[i] = percent;
        remaining -= percent;
      }
    }
    
    setAudienceResults(percentages);
    setLifelines(prev => ({ ...prev, audience: false }));
  };

  const walkAway = () => {
    setGameState("walked");
  };

  const resetGame = () => {
    setGameState("menu");
    setCurrentQuestion(0);
    setCurrentPrize(0);
    setSelectedAnswer(null);
    setLifelines({ fiftyFifty: true, phoneFriend: true, audience: true });
    setRemovedAnswers([]);
    setAudienceResults(null);
    setFriendHint(null);
  };

  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-2xl"
        >
          <MillionaireIcon size={120} className="mx-auto mb-8" />
          <h1 className="text-5xl font-bold text-[#FFD700] mb-4" style={{ fontFamily: "Bangers, cursive" }}>
            Who Wants to Be a Millionaire?
          </h1>
          <p className="text-[#BDC3C7] text-lg mb-8" style={{ fontFamily: "Nunito, sans-serif" }}>
            Answer 15 questions to win the grand prize! Use your lifelines wisely.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="bg-[#E94560] text-white px-12 py-4 rounded-full text-xl font-bold hover:bg-[#C0392B] transition-colors"
            style={{ fontFamily: "Bangers, cursive" }}
          >
            Start Game
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (gameState === "gameover" || gameState === "walked") {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-2xl"
        >
          <MillionaireIcon size={100} className="mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-[#FFD700] mb-4" style={{ fontFamily: "Bangers, cursive" }}>
            {gameState === "walked" ? "You Walked Away!" : "Game Over"}
          </h1>
          <p className="text-[#BDC3C7] text-2xl mb-8" style={{ fontFamily: "Nunito, sans-serif" }}>
            Final Prize: ${currentPrize.toLocaleString()}
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
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Main game area */}
        <div className="flex-1">
          {/* Question number */}
          <div className="text-center mb-4">
            <span className="text-[#FFD700] text-xl font-bold" style={{ fontFamily: "Bangers, cursive" }}>
              Question {currentQuestion + 1} of 15
            </span>
          </div>

          {/* Question */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[#1a2744] rounded-2xl p-6 mb-6 border-4 border-[#FFD700]"
          >
            <p className="text-white text-xl md:text-2xl text-center" style={{ fontFamily: "Nunito, sans-serif" }}>
              {question.text}
            </p>
          </motion.div>

          {/* Answer buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {["A", "B", "C", "D"].map((letter, index) => {
              const isRemoved = removedAnswers.includes(index);
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              
              let bgColor = "bg-[#1a2744]";
              let borderColor = "border-[#3498DB]";
              
              if (isRemoved) {
                bgColor = "bg-[#0a1628]";
                borderColor = "border-transparent";
              } else if (gameState === "thinking" && isSelected) {
                bgColor = "bg-[#F39C12]";
                borderColor = "border-[#E67E22]";
              } else if (gameState === "correct" && isCorrect) {
                bgColor = "bg-[#27AE60]";
                borderColor = "border-[#1E8449]";
              } else if (gameState === "wrong" && isSelected) {
                bgColor = "bg-[#E74C3C]";
                borderColor = "border-[#C0392B]";
              } else if (gameState === "wrong" && isCorrect) {
                bgColor = "bg-[#27AE60]";
                borderColor = "border-[#1E8449]";
              }
              
              return (
                <motion.button
                  key={letter}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={!isRemoved && gameState === "playing" ? { scale: 1.02 } : {}}
                  whileTap={!isRemoved && gameState === "playing" ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswer(index)}
                  disabled={isRemoved || gameState !== "playing"}
                  className={`${bgColor} border-4 ${borderColor} rounded-xl p-4 text-left transition-all ${isRemoved ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <span className="text-[#FFD700] font-bold text-lg mr-3" style={{ fontFamily: "Bangers, cursive" }}>
                    {letter}:
                  </span>
                  <span className="text-white text-lg" style={{ fontFamily: "Nunito, sans-serif" }}>
                    {question.options[index]}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Lifelines */}
          <div className="flex justify-center gap-4 mb-6">
            <motion.button
              whileHover={lifelines.fiftyFifty ? { scale: 1.05 } : {}}
              whileTap={lifelines.fiftyFifty ? { scale: 0.95 } : {}}
              onClick={useFiftyFifty}
              disabled={!lifelines.fiftyFifty || gameState !== "playing"}
              className={`p-4 rounded-xl border-2 ${lifelines.fiftyFifty ? "bg-[#1a2744] border-[#FFD700] cursor-pointer" : "bg-[#0a1628] border-[#34495E] opacity-50 cursor-not-allowed"}`}
            >
              <FiftyFiftyIcon size={40} />
            </motion.button>
            <motion.button
              whileHover={lifelines.phoneFriend ? { scale: 1.05 } : {}}
              whileTap={lifelines.phoneFriend ? { scale: 0.95 } : {}}
              onClick={usePhoneFriend}
              disabled={!lifelines.phoneFriend || gameState !== "playing"}
              className={`p-4 rounded-xl border-2 ${lifelines.phoneFriend ? "bg-[#1a2744] border-[#FFD700] cursor-pointer" : "bg-[#0a1628] border-[#34495E] opacity-50 cursor-not-allowed"}`}
            >
              <PhoneFriendIcon size={40} />
            </motion.button>
            <motion.button
              whileHover={lifelines.audience ? { scale: 1.05 } : {}}
              whileTap={lifelines.audience ? { scale: 0.95 } : {}}
              onClick={useAudience}
              disabled={!lifelines.audience || gameState !== "playing"}
              className={`p-4 rounded-xl border-2 ${lifelines.audience ? "bg-[#1a2744] border-[#FFD700] cursor-pointer" : "bg-[#0a1628] border-[#34495E] opacity-50 cursor-not-allowed"}`}
            >
              <AudienceIcon size={40} />
            </motion.button>
          </div>

          {/* Lifeline results */}
          <AnimatePresence>
            {friendHint && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#1a2744] border-2 border-[#3498DB] rounded-xl p-4 mb-4 text-center"
              >
                <p className="text-[#3498DB] font-bold mb-2" style={{ fontFamily: "Bangers, cursive" }}>
                  Phone a Friend
                </p>
                <p className="text-white" style={{ fontFamily: "Nunito, sans-serif" }}>
                  {friendHint}
                </p>
              </motion.div>
            )}
            
            {audienceResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#1a2744] border-2 border-[#3498DB] rounded-xl p-4 mb-4"
              >
                <p className="text-[#3498DB] font-bold mb-3 text-center" style={{ fontFamily: "Bangers, cursive" }}>
                  Ask the Audience
                </p>
                <div className="space-y-2">
                  {["A", "B", "C", "D"].map((letter, index) => (
                    <div key={letter} className="flex items-center gap-2">
                      <span className="text-[#FFD700] font-bold w-6" style={{ fontFamily: "Bangers, cursive" }}>
                        {letter}
                      </span>
                      <div className="flex-1 bg-[#0a1628] rounded-full h-4 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${audienceResults[index]}%` }}
                          className="bg-[#3498DB] h-full"
                        />
                      </div>
                      <span className="text-white w-12 text-right" style={{ fontFamily: "Nunito, sans-serif" }}>
                        {audienceResults[index]}%
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Walk away button */}
          {currentQuestion > 0 && gameState === "playing" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={walkAway}
              className="w-full bg-[#27AE60] text-white py-3 rounded-xl font-bold hover:bg-[#1E8449] transition-colors"
              style={{ fontFamily: "Bangers, cursive" }}
            >
              Walk Away with ${currentPrize.toLocaleString()}
            </motion.button>
          )}
        </div>

        {/* Prize ladder */}
        <div className={`${showPrizeLadder ? "block" : "hidden"} md:block w-full md:w-64`}>
          <div className="bg-[#1a2744] rounded-2xl p-4 border-4 border-[#FFD700]">
            <h3 className="text-[#FFD700] text-xl font-bold mb-4 text-center" style={{ fontFamily: "Bangers, cursive" }}>
              Prize Ladder
            </h3>
            <div className="space-y-1">
              {PRIZE_LADDER.map((prize, index) => {
                const isCurrent = index === currentQuestion;
                const isSafe = SAFE_CHECKPOINTS.includes(index);
                const isPassed = index < currentQuestion;
                
                return (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-2 rounded-lg ${
                      isCurrent ? "bg-[#FFD700] text-[#0a1628]" : isSafe ? "bg-[#F39C12] text-[#0a1628]" : isPassed ? "bg-[#27AE60] text-white" : "text-[#BDC3C7]"
                    }`}
                  >
                    <span className="text-sm font-bold" style={{ fontFamily: "Bangers, cursive" }}>
                      {15 - index}
                    </span>
                    <span className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif" }}>
                      ${prize.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile prize ladder toggle */}
      <button
        onClick={() => setShowPrizeLadder(!showPrizeLadder)}
        className="md:hidden fixed bottom-4 right-4 bg-[#FFD700] text-[#0a1628] p-3 rounded-full shadow-lg"
      >
        💰
      </button>
    </div>
  );
}
