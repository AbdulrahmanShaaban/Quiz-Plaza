"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export default function StatsCard({ title, value, icon: Icon }: StatsCardProps) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.02 }} className="h-full">
      <Card className="h-full border-2 border-border bg-card rounded-2xl shadow-sm transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-sans font-bold text-text/70">{title}</CardTitle>
          {/* Golden accent icon background */}
          <div className="rounded-xl p-2 bg-accent/20 text-accent">
            <Icon className="w-5 h-5" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-score text-primary tracking-wide">{value}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
