"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { pulseOnSuccess, shakeOnError, scaleOnHover } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";

interface AnswerButtonProps {
  label: string;
  index: number;
  selected: boolean;
  disabled: boolean;
  state?: "idle" | "correct" | "wrong" | "reveal-correct";
  onSelect: (index: number) => void;
}

const labels = ["A", "B", "C", "D"];

export default function AnswerButton({
  label,
  index,
  selected,
  disabled,
  state = "idle",
  onSelect,
}: AnswerButtonProps) {
  const isCorrect = state === "correct" || state === "reveal-correct";
  const isWrong = state === "wrong";

  return (
    <motion.div
      whileHover={!disabled ? scaleOnHover : undefined}
      animate={isWrong ? "shake" : isCorrect ? "pulse" : undefined}
      variants={isWrong ? shakeOnError : isCorrect ? pulseOnSuccess : undefined}
      className="w-full"
    >
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        onClick={() => onSelect(index)}
        className={cn(
          "h-auto min-h-12 w-full justify-start gap-3 py-3 text-left whitespace-normal",
          selected && state === "idle" && "border-primary bg-primary/10",
          isCorrect && "border-success bg-success/15 text-success",
          isWrong && "border-destructive bg-destructive/15 text-destructive",
          state === "reveal-correct" && !selected && "border-success/60 bg-success/5"
        )}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted font-semibold">
          {labels[index]}
        </span>
        <span className="flex-1">{label}</span>
      </Button>
    </motion.div>
  );
}
