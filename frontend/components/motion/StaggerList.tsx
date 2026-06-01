"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";

interface StaggerListProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}

export function StaggerList({
  children,
  className,
  as = "div",
}: StaggerListProps) {
  const Component = motion[as];

  return (
    <Component
      className={cn(className)}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {children}
    </Component>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}

export function StaggerItem({ children, className, as = "div" }: StaggerItemProps) {
  const Component = motion[as];

  return (
    <Component className={cn(className)} variants={staggerItem}>
      {children}
    </Component>
  );
}

export default StaggerList;
