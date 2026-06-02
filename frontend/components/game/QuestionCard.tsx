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
      <Card className="border-2 border-border bg-white rounded-2xl shadow-md">
        <CardHeader>
          <p className="text-sm font-heading text-accent tracking-wide">
            Question {questionIndex + 1} / {totalQuestions}
          </p>
          <CardTitle className="text-xl leading-snug sm:text-2xl font-sans font-bold text-text">{question.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-text/70 font-sans font-bold">Choose the best answer</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
