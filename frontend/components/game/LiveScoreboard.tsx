"use client";

import { motion, animate } from "framer-motion";
import { useEffect, useState } from "react";
import Avatar from "@/components/shared/Avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RoomPlayer } from "@/types/room";

function AnimatedScore({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const controls = animate(display, value, {
      duration: 0.45,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- animate from previous display
  }, [value]);

  return <span className="font-bold tabular-nums text-accent">{display}</span>;
}

interface LiveScoreboardProps {
  players: RoomPlayer[];
  answeredUserIds: Set<string>;
  currentUserId?: string;
}

export default function LiveScoreboard({
  players,
  answeredUserIds,
  currentUserId,
}: LiveScoreboardProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const uniquePlayers = Array.from(
    new Map(sorted.map(p => [p.userId, p])).values()
  );

  return (
    <Card className="border-border/80 bg-card/80">
      <CardHeader>
        <CardTitle className="text-base">Live scores</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {uniquePlayers.map((player, i) => (
          <motion.div
            key={`${player.userId}-${i}`}
            layout
            className="flex items-center justify-between gap-2 rounded-lg border border-border/50 px-3 py-2"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
              <Avatar src={player.avatar} name={player.name} size="sm" />
              <span className="truncate text-sm font-medium">
                {player.name}
                {player.userId === currentUserId && (
                  <span className="text-muted-foreground"> (you)</span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {answeredUserIds.has(player.userId) && (
                <span className="text-xs text-success">✓</span>
              )}
              <AnimatedScore value={player.score} />
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
