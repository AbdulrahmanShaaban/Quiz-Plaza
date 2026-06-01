"use client";

import { motion } from "framer-motion";
import { Crown, Zap, Target } from "lucide-react";
import Avatar from "@/components/shared/Avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { slideInBottom } from "@/lib/motion-variants";
import type { PlayerAnswerRecord } from "@/types/game";
import type { RoomPlayer } from "@/types/room";

interface ResultsCardProps {
  rank: number;
  userId: string;
  score: number;
  answers: PlayerAnswerRecord[];
  player?: RoomPlayer;
  isWinner?: boolean;
}

export default function ResultsCard({
  rank,
  score,
  answers,
  player,
  isWinner,
}: ResultsCardProps) {
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const fastest = answers.reduce<null | PlayerAnswerRecord>((best, a) => {
    if (!a.isCorrect) return best;
    if (!best || a.timeRemaining > best.timeRemaining) return a;
    return best;
  }, null);

  return (
    <motion.div variants={slideInBottom}>
      <Card
        className={`border-border/80 ${isWinner ? "ring-2 ring-accent bg-accent/5" : "bg-card/80"}`}
      >
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-muted font-bold">
            {isWinner ? <Crown className="size-5 text-accent" /> : rank}
          </div>
          <Avatar src={player?.avatar} name={player?.name ?? "Player"} />
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{player?.name ?? "Player"}</p>
            <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Target className="size-3" />
                {correctCount} correct
              </span>
              {fastest && (
                <span className="flex items-center gap-1">
                  <Zap className="size-3" />
                  Best: {fastest.timeRemaining.toFixed(1)}s left
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-accent">{score}</p>
            {isWinner && (
              <Badge className="mt-1 bg-accent text-accent-foreground">Winner</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
