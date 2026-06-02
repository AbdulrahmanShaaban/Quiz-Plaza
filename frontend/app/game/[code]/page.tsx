"use client";

import { AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import AnswerButton from "@/components/game/AnswerButton";
import GameOverModal from "@/components/game/GameOverModal";
import LiveScoreboard from "@/components/game/LiveScoreboard";
import QuestionCard from "@/components/game/QuestionCard";
import Timer from "@/components/game/Timer";
import PageTransition from "@/components/motion/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/lib/store/authStore";
import { useGameStore } from "@/lib/store/gameStore";
import { getSocket } from "@/lib/socket";
import { QUESTION_DURATION_SECONDS } from "@/types/game";
import Panda from "@/components/characters/Panda";
import { motion } from "framer-motion";

export default function GamePage() {
  const params = useParams();
  const code = params.code as string;
  const { user } = useAuthStore();
  const {
    currentQuestion,
    questionIndex,
    totalQuestions,
    players,
    phase,
    correctAnswer,
    hasSubmittedAnswer,
    selectedAnswerIndex,
    answeredUserIds,
    finalResults,
    submitAnswerSocket,
    registerSocketListeners,
    setRoomCode,
  } = useGameStore();

  const questionStartRef = useRef(Date.now());
  const [timerKey, setTimerKey] = useState(0);
  const [showGameOver, setShowGameOver] = useState(false);

  useEffect(() => {
    setRoomCode(code);
    const cleanup = registerSocketListeners();
    const socket = getSocket();

    const onGameOver = () => {
      setShowGameOver(true);
    };
    socket?.on("game_over", onGameOver);

    return () => {
      cleanup?.();
      socket?.off("game_over", onGameOver);
    };
  }, [code, registerSocketListeners, setRoomCode]);

  useEffect(() => {
    questionStartRef.current = Date.now();
    setTimerKey((k) => k + 1);
  }, [questionIndex, currentQuestion?.text]);

  const getTimeRemaining = useCallback(() => {
    const elapsed = (Date.now() - questionStartRef.current) / 1000;
    return Math.max(0, QUESTION_DURATION_SECONDS - elapsed);
  }, []);

  const handleSelect = (index: number) => {
    if (hasSubmittedAnswer || phase !== "playing" || !currentQuestion) return;
    submitAnswerSocket({
      code,
      answerIndex: index,
      timeRemaining: getTimeRemaining(),
    });
  };

  const getButtonState = (index: number) => {
    if (phase !== "revealing" && phase !== "finished") {
      return selectedAnswerIndex === index ? "idle" : "idle";
    }
    if (correctAnswer === null) return "idle";
    if (index === correctAnswer) {
      return selectedAnswerIndex === index ? "correct" : "reveal-correct";
    }
    if (selectedAnswerIndex === index) return "wrong";
    return "idle";
  };

  if (!currentQuestion && !showGameOver) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="mx-auto max-w-4xl p-8">
          <Skeleton className="mb-4 h-32 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  const disabled = hasSubmittedAnswer || phase === "revealing";

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      <PageTransition className="mx-auto max-w-6xl px-4 py-6 relative">
        {/* Floating Panda mascot */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -right-4 top-0 hidden lg:block z-0 opacity-50"
        >
          <Panda className="w-24 h-24" />
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="mb-4 bg-white rounded-2xl p-4 shadow-md border-2 border-border flex items-center justify-between relative z-10"
        >
          <Badge variant="outline" className="font-numbers text-lg border-accent text-accent font-bold">
            Room {code}
          </Badge>
          {phase === "revealing" && (
            <Badge className="bg-success/20 text-success font-sans font-bold border-success">Results</Badge>
          )}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] relative z-10">
          <div className="space-y-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex shrink-0 justify-center sm:justify-start">
                <Timer
                  resetKey={timerKey}
                  paused={phase === "revealing" || hasSubmittedAnswer}
                />
              </div>
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {currentQuestion && (
                    <QuestionCard
                      question={currentQuestion}
                      questionIndex={questionIndex}
                      totalQuestions={totalQuestions}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {currentQuestion?.options.map((option, index) => (
                <AnswerButton
                  key={`${questionIndex}-${index}`}
                  label={option}
                  index={index}
                  selected={selectedAnswerIndex === index}
                  disabled={disabled}
                  state={getButtonState(index)}
                  onSelect={handleSelect}
                />
              ))}
            </div>

            {hasSubmittedAnswer && phase === "playing" && (
              <p className="text-center text-lg text-text/70 font-sans font-bold">
                Answer locked in — waiting for other players…
              </p>
            )}
          </div>

          <LiveScoreboard
            players={players}
            answeredUserIds={answeredUserIds}
            currentUserId={user?._id}
          />
        </div>

        {/* Bug 5: Game Over modal overlay */}
        <GameOverModal
          open={showGameOver}
          results={finalResults}
          currentUserId={user?._id}
        />
      </PageTransition>
    </div>
  );
}
