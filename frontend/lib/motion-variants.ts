import type { Variants } from "framer-motion";

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.25 } },
};

export const slideInBottom: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export const scaleOnHover = {
  scale: 1.05,
  transition: { type: "spring" as const, stiffness: 400, damping: 17 },
};

export const shakeOnError: Variants = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  },
};

export const pulseOnSuccess: Variants = {
  pulse: {
    scale: [1, 1.08, 1],
    boxShadow: [
      "0 0 0 0 rgba(16, 185, 129, 0)",
      "0 0 0 8px rgba(16, 185, 129, 0.35)",
      "0 0 0 0 rgba(16, 185, 129, 0)",
    ],
    transition: { duration: 0.6 },
  },
};

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};
