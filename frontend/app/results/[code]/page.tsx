"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import PageTransition from "@/components/motion/PageTransition";
import { staggerContainer } from "@/lib/motion-variants";
import ResultsCard from "@/components/results/ResultsCard";
import CreateRoomModal from "@/components/rooms/CreateRoomModal";
import { useGameStore } from "@/lib/store/gameStore";
import { Target, Zap } from "lucide-react";
import Panda from "@/components/characters/Panda";

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
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      <PageTransition className="mx-auto max-w-2xl px-4 py-8 relative">
        {/* Floating Panda mascot */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -right-4 top-0 hidden lg:block z-0 opacity-50"
        >
          <Panda className="w-24 h-24" />
        </motion.div>

        <div className="mb-8 text-center relative z-10">
          <motion.h1
            className="text-5xl font-heading text-primary tracking-wide"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
          >
            Game Over!
          </motion.h1>
          <p className="mt-2 text-text/70 font-sans text-lg font-bold">Room {code}</p>
        </div>

        {winner && (
          <motion.div
            whileHover={{ y: -4 }}
            className="relative mb-8 overflow-hidden rounded-2xl border-2 border-accent/40 bg-gradient-to-b from-accent/15 to-transparent p-6 text-center shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-30"
              animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
              transition={{ repeat: Infinity, duration: 4, repeatType: "reverse" }}
            />
            <p className="text-sm font-heading uppercase tracking-widest text-accent">Winner</p>
            <p className="mt-2 text-3xl font-sans font-bold">{winner.player?.name ?? "Player"}</p>
            <p className="text-4xl font-numbers font-extrabold text-primary">{winner.score} pts</p>
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

        <div className="mb-6 grid gap-3 sm:grid-cols-2 relative z-10">
          {fastest && (
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-xl border-2 border-border bg-white p-4 text-sm shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="flex items-center gap-1 font-heading text-accent">
                <Zap className="size-4" /> Fastest answer
              </p>
              <p className="text-text/70 font-sans font-bold">{fastest.name} — {fastest.time.toFixed(1)}s left</p>
            </motion.div>
          )}
          {mostCorrect && (
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-xl border-2 border-border bg-white p-4 text-sm shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="flex items-center gap-1 font-heading text-success">
                <Target className="size-4" /> Most correct
              </p>
              <p className="text-text/70 font-sans font-bold">
                {mostCorrect.player?.name} — {mostCorrect.answers.filter((a) => a.isCorrect).length} right
              </p>
            </motion.div>
          )}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-3 relative z-10"
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
          <p className="text-center text-text/70 font-sans font-bold py-8 relative z-10">No results available.</p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center relative z-10">
          <CreateRoomModal
            trigger={
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => resetGame()}
                className="px-6 py-3 bg-accent text-primary font-heading tracking-widest text-xl rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                Play again
              </motion.button>
            }
          />
          <Link href="/" onClick={() => resetGame()}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-secondary text-white font-heading tracking-widest text-xl rounded-xl shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
            >
              Back to home
            </motion.button>
          </Link>
        </div>
      </PageTransition>
    </div>
  );
}
