"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { usePerformanceTier } from "../hooks/usePerformanceTier";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();
  const perf = usePerformanceTier();

  useEffect(() => {
    // Disable smooth scroll on low-end devices or reduced motion
    if (reduced || perf === "low") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to framer-motion's useScroll
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced, perf]);

  return <>{children}</>;
}
