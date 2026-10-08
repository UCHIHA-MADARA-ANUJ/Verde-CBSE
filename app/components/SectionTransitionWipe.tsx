"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface SectionTransitionWipeProps {
  variant?: "circuit" | "vine" | "scanline" | "glitch";
  className?: string;
}

function CircuitVariant({ progress }: { progress: MotionValue<number> }) {
  const pathOpacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 0.3, 0.5, 0]);
  const v0op = useTransform(progress, [0, 0.15], [0, 0.6]);
  const v1op = useTransform(progress, [0.15, 0.25], [0, 0.6]);

  return (
    <svg viewBox="0 0 200 40" className="w-full h-full max-w-[400px]" preserveAspectRatio="xMidYMid meet">
      <motion.path
        d="M0 20 L30 20 L40 10 L80 10 L90 20 L120 20 L130 30 L170 30 L180 20 L200 20"
        fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="8 4"
        style={{ pathLength: progress, opacity: pathOpacity }}
      />
      <motion.circle cx={0} cy={20} r="1.5" fill="#22c55e" style={{ opacity: v0op }} />
      <motion.circle cx={30} cy={10} r="1.5" fill="#22c55e" style={{ opacity: v0op }} />
      <motion.circle cx={80} cy={10} r="1.5" fill="#22c55e" style={{ opacity: v1op }} />
      <motion.circle cx={120} cy={20} r="1.5" fill="#22c55e" style={{ opacity: v1op }} />
      <motion.circle cx={170} cy={30} r="1.5" fill="#22c55e" style={{ opacity: v0op }} />
      <motion.circle cx={200} cy={20} r="1.5" fill="#22c55e" style={{ opacity: useTransform(progress, [0.9, 1], [0, 0.6]) }} />
    </svg>
  );
}

function VineVariant({ progress }: { progress: MotionValue<number> }) {
  const vineOpacity = useTransform(progress, [0, 0.5, 1], [0, 0.4, 0]);
  const v0op = useTransform(progress, [0, 0.15], [0, 0.5]);
  const v1op = useTransform(progress, [0.2, 0.35], [0, 0.5]);
  const v2op = useTransform(progress, [0.4, 0.55], [0, 0.5]);
  const v3op = useTransform(progress, [0.6, 0.75], [0, 0.5]);

  return (
    <svg viewBox="0 0 200 40" className="w-full h-full max-w-[400px]" preserveAspectRatio="xMidYMid meet">
      <motion.path
        d="M0 35 Q30 25 50 30 Q70 15 90 25 Q110 10 130 20 Q150 5 170 15 Q180 10 200 20"
        fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"
        style={{ pathLength: progress, opacity: vineOpacity }}
      />
      <motion.ellipse cx={30} cy={27} rx="4" ry="2" fill="#22c55e" opacity={0.4} style={{ opacity: v0op, rotate: "-10deg" }} />
      <motion.ellipse cx={70} cy={18} rx="4" ry="2" fill="#22c55e" opacity={0.4} style={{ opacity: v1op, rotate: "10deg" }} />
      <motion.ellipse cx={110} cy={13} rx="4" ry="2" fill="#22c55e" opacity={0.4} style={{ opacity: v2op, rotate: "-30deg" }} />
      <motion.ellipse cx={150} cy={8} rx="4" ry="2" fill="#22c55e" opacity={0.4} style={{ opacity: v3op, rotate: "20deg" }} />
    </svg>
  );
}

function ScanlineVariant({ progress }: { progress: MotionValue<number> }) {
  const leftOpacity = useTransform(progress, [0.5, 1], [0, 1]);
  const dotOpacity = useTransform(progress, [0.7, 0.8, 1], [0, 0.6, 0]);
  const dotScale = useTransform(progress, [0.7, 0.8, 1], [0, 1.2, 0]);

  return (
    <div className="flex items-center gap-4 w-full max-w-[300px]">
      <motion.div
        className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-primary/20"
        style={{ scaleX: progress, transformOrigin: "left", opacity: leftOpacity }}
      />
      <motion.div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" style={{ opacity: dotOpacity, scale: dotScale }} />
      <motion.div
        className="h-px flex-1 bg-gradient-to-r from-primary/20 via-primary/40 to-transparent"
        style={{ scaleX: progress, transformOrigin: "right", opacity: leftOpacity }}
      />
    </div>
  );
}

function GlitchVariant({ progress }: { progress: MotionValue<number> }) {
  const w1 = useTransform(progress, [0, 1], [0, 200]);
  const w2 = useTransform(progress, [0, 1], [0, 150]);
  const w3 = useTransform(progress, [0, 1], [0, 100]);
  const o1 = useTransform(progress, [0.5, 1], [0, 0.6]);
  const o2 = useTransform(progress, [0.6, 1], [0, 0.4]);
  const o3 = useTransform(progress, [0.7, 1], [0, 0.3]);
  const x2 = useTransform(progress, [0, 1], [0, 25]);
  const x3 = useTransform(progress, [0, 1], [0, 50]);

  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div className="h-[1px] bg-primary/30" style={{ width: w1, opacity: o1 }} />
      <motion.div className="h-[1px] bg-primary/20" style={{ width: w2, opacity: o2, x: x2 }} />
      <motion.div className="h-[1px] bg-primary/10" style={{ width: w3, opacity: o3, x: x3 }} />
    </div>
  );
}

export default function SectionTransitionWipe({
  variant = "circuit",
  className = "",
}: SectionTransitionWipeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const progress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);

  return (
    <div
      ref={ref}
      className={`relative h-32 md:h-40 overflow-hidden ${className}`}
      style={{ pointerEvents: "none" }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity }}
      >
        {variant === "circuit" && <CircuitVariant progress={progress} />}
        {variant === "vine" && <VineVariant progress={progress} />}
        {variant === "scanline" && <ScanlineVariant progress={progress} />}
        {variant === "glitch" && <GlitchVariant progress={progress} />}
      </motion.div>
    </div>
  );
}
