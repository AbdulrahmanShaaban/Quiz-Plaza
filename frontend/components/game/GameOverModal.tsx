"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Crown, Trophy, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Avatar from "@/components/shared/Avatar";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/lib/store/gameStore";
import type { FinalResultPlayer } from "@/types/game";

interface GameOverModalProps {
  open: boolean;
  results: FinalResultPlayer[];
  currentUserId?: string;
}

export default function GameOverModal({
  open,
  results,
  currentUserId,
}: GameOverModalProps) {
  const router = useRouter();
  const resetGame = useGameStore((state) => state.resetGame);
  const sorted = [...results].sort((a, b) => b.score - a.score);
  const winner = sorted[0];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl shadow-primary/10"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
          >
            {/* Header glow */}
            <div className="relative overflow-hidden px-6 pt-8 pb-4 text-center">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/15 via-primary/5 to-transparent" />

              {/* Confetti particles */}
              {[...Array(10)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute size-1.5 rounded-full"
                  style={{
                    left: `${8 + (i * 9) % 84}%`,
                    top: `${10 + (i * 13) % 50}%`,
                    backgroundColor: i % 3 === 0 ? "var(--accent)" : i % 3 === 1 ? "var(--primary)" : "var(--success)",
                  }}
                  animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1 + i * 0.15, delay: i * 0.08 }}
                />
              ))}

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 }}
              >
                <Trophy className="mx-auto size-10 text-accent" />
              </motion.div>

              <motion.h2
                className="relative mt-3 text-2xl font-bold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Game Over!
              </motion.h2>

              {winner && (
                <motion.p
                  className="relative mt-1 text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="font-semibold text-accent">{winner.name}</span>{" "}
                  wins with {winner.score} pts!
                </motion.p>
              )}
            </div>

            {/* Players list */}
            <div className="max-h-64 overflow-y-auto px-6 pb-2">
              <div className="space-y-2">
                {sorted.map((player, i) => (
                  <motion.div
                    key={`${player.userId}-${i}`}
                    className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
                      i === 0
                        ? "border-accent/40 bg-accent/10"
                        : "border-border/50 bg-card/60"
                    } ${
                      player.userId === currentUserId
                        ? "ring-1 ring-primary/40"
                        : ""
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.35 }}
                  >
                    {/* Rank */}
                    <div className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      i === 0
                        ? "bg-accent text-accent-foreground"
                        : i === 1
                        ? "bg-muted text-foreground"
                        : i === 2
                        ? "bg-muted text-foreground"
                        : "bg-muted/60 text-muted-foreground"
                    }`}>
                      {i === 0 ? <Crown className="size-3.5" /> : i + 1}
                    </div>

                    {/* Avatar + Name */}
                    <Avatar
                      src={player.avatar}
                      name={player.name || "Player"}
                      size="sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {player.name || "Player"}
                        {player.userId === currentUserId && (
                          <span className="ml-1 text-xs text-muted-foreground">(you)</span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {player.answers.filter((a) => a.isCorrect).length} correct
                      </p>
                    </div>

                    {/* Score */}
                    <motion.span
                      className={`text-lg font-bold tabular-nums ${
                        i === 0 ? "text-accent" : "text-foreground"
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.7 + i * 0.1 }}
                    >
                      {player.score}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-4">
              <Button
                onClick={() => {
                  resetGame();
                  router.push("/dashboard");
                }}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                size="lg"
              >
                Back to Home
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
