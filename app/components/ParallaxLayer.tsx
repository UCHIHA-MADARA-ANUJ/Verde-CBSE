"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { usePerformanceTier } from "../hooks/usePerformanceTier";

interface ParallaxLayerProps {
  children?: ReactNode;
  speed?: number;
  className?: string;
  as?: "div" | "span" | "section";
  zIndex?: number;
  opacity?: [number, number];
  scale?: [number, number];
}

export default function ParallaxLayer({
  children,
  speed = 0.5,
  className = "",
  as: Tag = "div",
  zIndex = 0,
  opacity,
  scale,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const perf = usePerformanceTier();
  const isDisabled = reduced || perf === "low";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] as any,
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const opacityTransform = useTransform(scrollYProgress, [0, 1], opacity ?? [1, 1]);
  const scaleTransform = useTransform(scrollYProgress, [0, 1], scale ?? [1, 1]);

  if (isDisabled) {
    return (
      <Tag ref={ref} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity: opacity ? opacityTransform : undefined,
        scale: scale ? scaleTransform : undefined,
        zIndex,
        willChange: "transform",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
