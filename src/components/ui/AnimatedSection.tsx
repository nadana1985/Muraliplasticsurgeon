"use client";

import { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

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
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const animationClasses = {
    "fade-in": "opacity-0",
    "slide-up": "opacity-0 translate-y-8",
    "slide-in-left": "opacity-0 -translate-x-8",
    "slide-in-right": "opacity-0 translate-x-8",
  };

  const visibleClasses = {
    "fade-in": "opacity-100",
    "slide-up": "opacity-100 translate-y-0",
    "slide-in-left": "opacity-100 translate-x-0",
    "slide-in-right": "opacity-100 translate-x-0",
  };

  // Skip animation if user prefers reduced motion
  const shouldAnimate = !prefersReducedMotion;

  return (
    <div
      ref={ref}
      className={`${
        shouldAnimate
          ? `transition-all duration-700 ease-out ${
              isInView ? visibleClasses[animation] : animationClasses[animation]
            }`
          : ""
      } ${className}`}
      style={shouldAnimate ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
