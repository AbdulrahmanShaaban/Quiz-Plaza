"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { QUESTION_DURATION_SECONDS } from "@/types/game";

interface TimerProps {
  duration?: number;
  onExpire?: () => void;
  resetKey: number;
  paused?: boolean;
}

export default function Timer({
  duration = QUESTION_DURATION_SECONDS,
  onExpire,
  resetKey,
  paused = false,
}: TimerProps) {
  const [remaining, setRemaining] = useState(duration);

  useEffect(() => {
    setRemaining(duration);
  }, [resetKey, duration]);

  useEffect(() => {
    if (paused || remaining <= 0) return;

    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          onExpire?.();
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [remaining, paused, onExpire]);

  const circumference = 2 * Math.PI * 45;
  const progress = remaining / duration;
  const offset = circumference * (1 - progress);
  const urgent = remaining <= 5;

  return (
    <div className="relative flex size-28 items-center justify-center">
      <svg className="-rotate-90 size-28" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-border/30"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          className={urgent ? "text-destructive" : "text-secondary"}
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </svg>
      <span
        className={`absolute text-3xl font-numbers font-bold tabular-nums ${urgent ? "text-destructive" : "text-primary"}`}
      >
        {remaining}
      </span>
    </div>
  );
}
