"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-in" | "slide-up" | "slide-in-left" | "slide-in-right";
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  animation = "slide-up",
  delay = 0,
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = {
    hidden: {
      opacity: 0,
      y: animation === "slide-up" ? 30 : 0,
      x: animation === "slide-in-left" ? -30 : animation === "slide-in-right" ? 30 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 120,
        delay: delay / 1000, // convert ms to seconds
      },
    },
  };

  const shouldAnimate = !prefersReducedMotion;

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
