"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { slideInRight } from "@/lib/motion-variants";
import type { QuestionPayload } from "@/types/game";

interface QuestionCardProps {
  question: QuestionPayload;
  questionIndex: number;
  totalQuestions: number;
}

export default function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
}: QuestionCardProps) {
  return (
    <motion.div
      key={`${questionIndex}-${question.text}`}
      variants={slideInRight}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Card className="border-border/80 bg-card/90">
        <CardHeader>
          <p className="text-sm font-medium text-accent">
            Question {questionIndex + 1} / {totalQuestions}
          </p>
          <CardTitle className="text-lg leading-snug sm:text-xl">{question.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Choose the best answer</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
