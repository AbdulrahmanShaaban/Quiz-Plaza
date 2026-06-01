"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import PageTransition from "@/components/motion/PageTransition";
import { staggerContainer } from "@/lib/motion-variants";
import ResultsCard from "@/components/results/ResultsCard";
import CreateRoomModal from "@/components/rooms/CreateRoomModal";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/lib/store/gameStore";
import { Target, Zap } from "lucide-react";

export default function ResultsPage() {
  const params = useParams();
  const code = params.code as string;
  const { finalResults, players, resetGame } = useGameStore();

  const ranked = useMemo(() => {
    return [...finalResults]
      .sort((a, b) => b.score - a.score)
      .map((r, i) => ({
        ...r,
        rank: i + 1,
        player: players.find((p) => p.userId === r.userId),
      }));
  }, [finalResults, players]);

  const winner = ranked[0];
  const mostCorrect = [...ranked].sort(
    (a, b) => b.answers.filter((x) => x.isCorrect).length - a.answers.filter((x) => x.isCorrect).length
  )[0];
  const fastest = [...ranked]
    .flatMap((r) =>
      r.answers
        .filter((a) => a.isCorrect)
        .map((a) => ({ userId: r.userId, name: r.player?.name, time: a.timeRemaining }))
    )
    .sort((a, b) => b.time - a.time)[0];

  return (
    <PageTransition className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 text-center">
        <motion.h1
          className="text-3xl font-bold"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
        >
          Game over!
        </motion.h1>
        <p className="mt-2 text-muted-foreground">Room {code}</p>
      </div>

      {winner && (
        <motion.div
          className="relative mb-8 overflow-hidden rounded-xl border border-accent/40 bg-gradient-to-b from-accent/15 to-transparent p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-30"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ repeat: Infinity, duration: 4, repeatType: "reverse" }}
          />
          <p className="text-sm font-medium uppercase tracking-widest text-accent">Winner</p>
          <p className="mt-2 text-2xl font-bold">{winner.player?.name ?? "Player"}</p>
          <p className="text-3xl font-extrabold text-primary">{winner.score} pts</p>
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute size-2 rounded-full bg-accent"
              style={{
                left: `${10 + (i * 7) % 80}%`,
                top: `${15 + (i * 11) % 60}%`,
              }}
              animate={{ y: [0, -12, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.2 + i * 0.1, delay: i * 0.05 }}
            />
          ))}
        </motion.div>
      )}

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        {fastest && (
          <div className="rounded-lg border border-border/60 p-3 text-sm">
            <p className="flex items-center gap-1 font-medium text-accent">
              <Zap className="size-4" /> Fastest answer
            </p>
            <p className="text-muted-foreground">{fastest.name} — {fastest.time.toFixed(1)}s left</p>
          </div>
        )}
        {mostCorrect && (
          <div className="rounded-lg border border-border/60 p-3 text-sm">
            <p className="flex items-center gap-1 font-medium text-success">
              <Target className="size-4" /> Most correct
            </p>
            <p className="text-muted-foreground">
              {mostCorrect.player?.name} — {mostCorrect.answers.filter((a) => a.isCorrect).length} right
            </p>
          </div>
        )}
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {ranked.map((entry, i) => (
          <motion.div
            key={entry.userId}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
          >
            <ResultsCard
              rank={entry.rank}
              userId={entry.userId}
              score={entry.score}
              answers={entry.answers}
              player={entry.player}
              isWinner={i === 0}
            />
          </motion.div>
        ))}
      </motion.div>

      {ranked.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No results available.</p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <CreateRoomModal
          trigger={
            <Button
              onClick={() => resetGame()}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Play again
            </Button>
          }
        />
        <Link href="/" onClick={() => resetGame()}>
          <Button variant="outline" className="w-full sm:w-auto">
            Back to home
          </Button>
        </Link>
      </div>
    </PageTransition>
  );
}
