"use client";

import { Bolt, Shield, Users } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerItem, StaggerList } from "@/components/motion/StaggerList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Users,
    title: "Multiplayer lobbies",
    description: "Create private or public rooms and invite friends with a 6-digit code.",
  },
  {
    icon: Bolt,
    title: "Speed scoring",
    description: "Answer faster to earn up to 100 points per question.",
  },
  {
    icon: Shield,
    title: "Fair play",
    description: "Synchronized questions and live scoreboards for every player.",
  },
];

export default function LandingFeatures() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <FadeIn>
        <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">Why Quiz Plaza?</h2>
      </FadeIn>
      <StaggerList className="grid gap-6 sm:grid-cols-3">
        {features.map((f) => (
          <StaggerItem key={f.title}>
            <Card className="h-full border-border/80 bg-card/60">
              <CardHeader>
                <f.icon className="mb-2 size-8 text-primary" />
                <CardTitle>{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerList>
    </section>
  );
}
