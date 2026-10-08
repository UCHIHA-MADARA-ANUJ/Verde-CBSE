"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollProgressRing() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const rotation = useTransform(smoothProgress, [0, 1], [0, 360]);

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-[60] w-14 h-14 hidden md:flex items-center justify-center cursor-pointer group"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
      aria-label="Scroll to top — shows reading progress"
    >
      {/* Background ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
        <circle
          cx="28"
          cy="28"
          r="24"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="2"
        />
        <motion.circle
          cx="28"
          cy="28"
          r="24"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 24}
          style={{ strokeDashoffset: useTransform(smoothProgress, [0, 1], [2 * Math.PI * 24, 0]) }}
          className="drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]"
        />
      </svg>
      {/* Inner content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.span
          className="text-[8px] font-mono font-bold text-primary"
          style={{ rotate: rotation }}
        >
          ↑
        </motion.span>
      </div>
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
    </motion.button>
  );
}
