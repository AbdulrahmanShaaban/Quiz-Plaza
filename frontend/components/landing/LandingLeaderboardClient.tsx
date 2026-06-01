"use client";

import FadeIn from "@/components/motion/FadeIn";
import { StaggerItem, StaggerList } from "@/components/motion/StaggerList";
import Avatar from "@/components/shared/Avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LeaderboardEntry } from "@/components/landing/LandingLeaderboard";

interface Props {
  leaderboard: LeaderboardEntry[];
}

export default function LandingLeaderboardClient({ leaderboard }: Props) {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-20">
      <FadeIn>
        <Card className="border-border/80 bg-card/70">
          <CardHeader>
            <CardTitle className="text-center">Top players</CardTitle>
          </CardHeader>
          <CardContent>
            {leaderboard.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">
                No rankings yet — be the first champion!
              </p>
            ) : (
              <StaggerList className="space-y-3">
                {leaderboard.map((entry) => (
                  <StaggerItem key={entry.userId}>
                    <div className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2">
                      <div className="flex items-center gap-3">
                        <span className="w-6 text-center font-bold text-accent">#{entry.rank}</span>
                        <Avatar src={entry.avatar} name={entry.name} size="sm" />
                        <span className="font-medium">{entry.name}</span>
                      </div>
                      <span className="font-semibold text-primary">
                        {entry.stats.totalScore} pts
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerList>
            )}
          </CardContent>
        </Card>
      </FadeIn>
    </section>
  );
}
