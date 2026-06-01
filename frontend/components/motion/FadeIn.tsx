"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeIn } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
