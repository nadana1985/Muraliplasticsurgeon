"use client";

import { useEffect, useRef, useState } from "react";

interface UseAnimatedCounterOptions {
  end: number;
  duration?: number;
  startOnView?: boolean;
  isInView?: boolean;
}

export function useAnimatedCounter({
  end,
  duration = 2000,
  startOnView = true,
  isInView = true,
}: UseAnimatedCounterOptions) {
  const [count, setCount] = useState(0);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (startOnView && !isInView) return;
    if (hasStartedRef.current) return;

    hasStartedRef.current = true;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function - ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startOnView, isInView]);

  return count;
}
