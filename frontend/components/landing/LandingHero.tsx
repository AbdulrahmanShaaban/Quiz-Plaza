"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/motion/FadeIn";

export default function LandingHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-16 sm:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-4xl text-center">
        <FadeIn>
          <motion.p
            className="mb-4 text-sm font-medium uppercase tracking-widest text-accent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            Real-time multiplayer
          </motion.p>
        </FadeIn>
        <motion.h1
          className="text-4xl font-extrabold tracking-tight sm:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Welcome to{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Quiz Plaza
          </span>
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          Battle friends in fast-paced trivia. Create a room, share your code, and climb the
          leaderboard — all in real time.
        </motion.p>
      </div>
    </section>
  );
}
