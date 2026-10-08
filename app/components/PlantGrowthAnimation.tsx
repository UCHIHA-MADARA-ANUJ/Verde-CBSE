"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useMemo } from "react";

interface PlantGrowthAnimationProps {
  className?: string;
}

export default function PlantGrowthAnimation({ className = "" }: PlantGrowthAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Growth transforms - all at top level, one per variable
  const growProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const stemProgress = useTransform(growProgress, [0, 0.7], [0, 1]);
  const bloomScale = useTransform(growProgress, [0.6, 1], [0, 1]);
  const bloomOpacity = useTransform(growProgress, [0.6, 1], [0, 1]);
  const rootProgress = useTransform(growProgress, [0, 0.5], [0, 1]);
  const mainOpacity = useTransform(growProgress, [0, 0.1, 0.2], [0, 0.3, 1]);
  const stemOpacity = useTransform(growProgress, [0.1, 0.2], [0, 1]);
  const dropletOpacity = useTransform(growProgress, [0.4, 0.45, 0.5], [0, 1, 0]);
  const rootOpacity = useTransform(growProgress, [0, 0.5], [0, 1]);
  const rootSecondary = useTransform(growProgress, [0.1, 0.5], [0, 1]);
  const rootTertiary = useTransform(growProgress, [0.2, 0.5], [0, 1]);
  const sparkleOpacity = useTransform(growProgress, [0.5, 1], [0, 0.6]);
  const bloomGlowOpacity = useTransform(growProgress, [0.7, 1], [0, 0.15]);
  const stageOpacity = useTransform(growProgress, [0, 0.15], [0, 1]);
  const irrOpacity = useTransform(growProgress, [0.5, 0.7], [0, 0.5]);

  // Leaf visibility transforms - each one at top level (not inside .map() to satisfy hooks rules)
  const leafVis0 = useTransform(growProgress, [0.2, 0.28], [0, 1]);
  const leafVis1 = useTransform(growProgress, [0.28, 0.36], [0, 1]);
  const leafVis2 = useTransform(growProgress, [0.36, 0.44], [0, 1]);
  const leafVis3 = useTransform(growProgress, [0.44, 0.52], [0, 1]);
  const leafVis4 = useTransform(growProgress, [0.52, 0.6], [0, 1]);
  const leafVis5 = useTransform(growProgress, [0.6, 0.68], [0, 1]);
  const leafScl0 = useTransform(growProgress, [0.2, 0.28], [0, 1]);
  const leafScl1 = useTransform(growProgress, [0.28, 0.36], [0, 1]);
  const leafScl2 = useTransform(growProgress, [0.36, 0.44], [0, 1]);
  const leafScl3 = useTransform(growProgress, [0.44, 0.52], [0, 1]);
  const leafScl4 = useTransform(growProgress, [0.52, 0.6], [0, 1]);
  const leafScl5 = useTransform(growProgress, [0.6, 0.68], [0, 1]);

  const leafVisibilities = [leafVis0, leafVis1, leafVis2, leafVis3, leafVis4, leafVis5];
  const leafScales = [leafScl0, leafScl1, leafScl2, leafScl3, leafScl4, leafScl5];

  const stageLabel = useTransform(growProgress, [0, 0.3, 0.6, 1], ["SEED", "SPROUT", "GROWING", "BLOOM"]);

  // Leaf positions (pairs along the stem)
  const leafPairs = useMemo(() => [
    { side: -1, y: 0.25, rot: -30 },
    { side: 1, y: 0.35, rot: 30 },
    { side: -1, y: 0.5, rot: -25 },
    { side: 1, y: 0.6, rot: 25 },
    { side: -1, y: 0.75, rot: -20 },
    { side: 1, y: 0.85, rot: 20 },
  ], []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ minHeight: "400px" }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: mainOpacity }}
      >
        <svg
          viewBox="0 0 200 400"
          className="w-full h-full max-w-[200px] max-h-[400px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="bloomGlow">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="1" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soil/ground */}
          <rect x="0" y="320" width="200" height="80" fill="#1a3a1a" rx="4" />
          <rect x="0" y="320" width="200" height="3" fill="#22c55e" opacity={0.3} />

          {/* Roots */}
          <motion.g style={{ opacity: rootOpacity }}>
            <motion.path d="M100 320 Q90 350 85 380" stroke="#22c55e" strokeWidth="2" fill="none" opacity={0.4} style={{ pathLength: rootProgress }} />
            <motion.path d="M100 320 Q110 345 115 375" stroke="#22c55e" strokeWidth="1.5" fill="none" opacity={0.3} style={{ pathLength: rootSecondary }} />
            <motion.path d="M100 320 Q95 340 80 360" stroke="#22c55e" strokeWidth="1" fill="none" opacity={0.2} style={{ pathLength: rootTertiary }} />
          </motion.g>

          {/* Main Stem */}
          <motion.path d="M100 320 Q95 240 100 140" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" style={{ pathLength: stemProgress, opacity: stemOpacity }} />

          {/* Leaves */}
          {leafPairs.map((leaf, i) => (
            <motion.g key={i} style={{ opacity: leafVisibilities[i], scale: leafScales[i], transformOrigin: `100 ${320 - leaf.y * 180}` }}>
              <motion.path d={`M${100 + leaf.side * 10} ${320 - leaf.y * 180} Q${100 + leaf.side * 40} ${320 - leaf.y * 180 - 20} ${100 + leaf.side * 35} ${320 - leaf.y * 180 - 5}`} fill="#22c55e" opacity={0.7} style={{ rotate: `${leaf.rot}deg` }} />
              <motion.path d={`M${100 + leaf.side * 10} ${320 - leaf.y * 180} Q${100 + leaf.side * 25} ${320 - leaf.y * 180 - 10} ${100 + leaf.side * 33} ${320 - leaf.y * 180 - 5}`} stroke="#4ade80" strokeWidth="0.5" fill="none" opacity={0.5} />
            </motion.g>
          ))}

          {/* Bloom/Flower at top */}
          <motion.g style={{ opacity: bloomOpacity, scale: bloomScale, transformOrigin: "100 140" }}>
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.ellipse key={i} cx={100 + Math.cos((angle * Math.PI) / 180) * 20} cy={140 + Math.sin((angle * Math.PI) / 180) * 20} rx="12" ry="6" fill={i % 2 === 0 ? "#22c55e" : "#4ade80"} opacity={0.8} style={{ rotate: `${angle}deg`, transformOrigin: "100 140" }} />
            ))}
            <circle cx="100" cy="140" r="8" fill="#86efac" />
            <circle cx="100" cy="140" r="4" fill="#22c55e">
              <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="140" r="20" fill="#22c55e" opacity={0.15}>
              <animate attributeName="r" values="18;25;18" dur="3s" repeatCount="indefinite" />
            </circle>
          </motion.g>

          {/* Water droplets */}
          <motion.g style={{ opacity: dropletOpacity }}>
            {[0, 1, 2].map((i) => (
              <motion.circle key={i} cx={80 + i * 20} cy={310} r="2" fill="#22d3ee">
                <animate attributeName="cy" values="310;340" dur={`${0.5 + i * 0.2}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.3;0" dur={`${0.5 + i * 0.2}s`} repeatCount="indefinite" />
              </motion.circle>
            ))}
          </motion.g>

          {/* Sparkle effects */}
          <motion.g style={{ opacity: sparkleOpacity }}>
            {[0, 1, 2].map((i) => (
              <motion.circle key={`sparkle-${i}`} cx={130 + Math.cos(i * 2) * 15} cy={120 + Math.sin(i * 2) * 15} r="1.5" fill="#86efac">
                <animate attributeName="opacity" values="0;1;0" dur={`${1 + i * 0.5}s`} repeatCount="indefinite" />
                <animate attributeName="r" values="1;2.5;1" dur={`${1 + i * 0.5}s`} repeatCount="indefinite" />
              </motion.circle>
            ))}
          </motion.g>

          {/* Bloom glow */}
          <motion.circle cx="100" cy="140" r={60} fill="url(#bloomGlow)" style={{ opacity: bloomGlowOpacity }} />
        </svg>
      </motion.div>

      {/* Growth indicator labels */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
        <motion.div className="flex items-center gap-2 justify-center" style={{ opacity: stageOpacity }}>
          <motion.span className="font-mono text-[8px] text-primary/60 uppercase tracking-wider">{stageLabel}</motion.span>
          <motion.div className="w-1 h-1 rounded-full bg-primary" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </motion.div>
        <motion.div className="font-mono text-[7px] text-white/20 mt-1" style={{ opacity: irrOpacity }}>IRRIGATION OPTIMAL</motion.div>
      </div>
    </div>
  );
}
