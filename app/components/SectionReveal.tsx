"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
  amount?: number;
  duration?: number;
  distance?: number;
  scale?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
  as?: "div" | "section" | "article" | "span";
  noClip?: boolean;
}

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
  amount = 0.15,
  duration = 0.7,
  distance = 40,
  scale = false,
  stagger = false,
  staggerDelay = 0.08,
  as: Tag = "div",
  noClip = true,
}: SectionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { y: 0, x: -distance },
    right: { y: 0, x: distance },
    none: { y: 0, x: 0 },
  };

  const initial = {
    opacity: 0,
    ...directions[direction],
    ...(scale ? { scale: 0.9 } : {}),
    ...(noClip ? {} : { clipPath: "inset(0 0 100% 0)" }),
  };

  const animate = {
    opacity: 1,
    y: 0,
    x: 0,
    ...(scale ? { scale: 1 } : {}),
    ...(noClip ? {} : { clipPath: "inset(0 0 0% 0)" }),
  };

  const transition = {
    duration,
    delay,
    ease: [0.16, 1, 0.3, 1],
    ...(stagger
      ? {
          staggerChildren: staggerDelay,
          delayChildren: delay,
        }
      : {}),
  };

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : {}}
      transition={transition}
      className={className}
      style={{ position: "relative" }}
    >
      {children}
    </motion.div>
  );
}

// Staggered child item variant
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
