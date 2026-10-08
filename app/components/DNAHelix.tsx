"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useMemo } from "react";

interface DNAHelixProps {
  className?: string;
}

export default function DNAHelix({ className = "" }: DNAHelixProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Generate helix particles
  const helixPoints = useMemo(() => {
    const points: { x: number; y: number; z: number; strand: "green" | "cyan"; delay: number }[] = [];
    const numPoints = 80;
    const turns = 3;

    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * turns * Math.PI * 2;
      const progress = i / numPoints;
      const r = 30 + Math.sin(t * 2) * 5; // slight radius variation

      // Strand 1 (green)
      points.push({
        x: 50 + Math.cos(t) * r,
        y: 10 + progress * 80,
        z: Math.sin(t) * 10,
        strand: "green",
        delay: i * 0.02,
      });

      // Strand 2 (cyan) - offset by 180 degrees
      points.push({
        x: 50 + Math.cos(t + Math.PI) * r,
        y: 10 + progress * 80,
        z: Math.sin(t + Math.PI) * 10,
        strand: "cyan",
        delay: i * 0.02 + 0.1,
      });

      // Cross-bridge (rungs)
      if (i % 4 === 0) {
        points.push({
          x: 50 + (Math.cos(t) + Math.cos(t + Math.PI)) * r / 2,
          y: 10 + progress * 80,
          z: (Math.sin(t) + Math.sin(t + Math.PI)) * 5,
          strand: "green",
          delay: i * 0.02 + 0.05,
        });
      }
    }
    return points;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ minHeight: "400px" }}
    >
      {isInView && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ rotate: rotation }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full max-w-[300px] max-h-[400px]"
            preserveAspectRatio="xMidYMid meet"
            style={{ filter: "drop-shadow(0 0 8px rgba(34,197,94,0.15))" }}
          >
            {/* Background glow */}
            <ellipse
              cx="50"
              cy="50"
              rx="40"
              ry="45"
              fill="rgba(34,197,94,0.03)"
              filter="url(#glow)"
            />

            <defs>
              <filter id="helix-glow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Cross bridges (rungs) */}
            {helixPoints.filter((_, i) => i % 6 === 0).map((point, i) => {
              const progress = (point.y - 10) / 80;
              return (
                <motion.line
                  key={`bridge-${i}`}
                  x1={point.x}
                  y1={point.y}
                  x2={100 - point.x}
                  y2={point.y}
                  stroke="rgba(34,197,94,0.15)"
                  strokeWidth="0.3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{
                    duration: 2,
                    delay: progress * 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              );
            })}

            {/* Helix particles */}
            {helixPoints.map((point, i) => {
              const isGreen = point.strand === "green";
              const color = isGreen ? "#22c55e" : "#22d3ee";
              const glowColor = isGreen ? "rgba(34,197,94,0.3)" : "rgba(34,211,238,0.3)";

              return (
                <motion.circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r={isGreen ? 1.2 : 1.0}
                  fill={color}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0.3, 0.8],
                    scale: [0, 1, 0.7, 1],
                  }}
                  transition={{
                    duration: 3,
                    delay: point.delay,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  filter="url(#helix-glow)"
                />
              );
            })}

            {/* Central axis glow */}
            <motion.line
              x1="50"
              y1="5"
              x2="50"
              y2="95"
              stroke="rgba(34,197,94,0.06)"
              strokeWidth="0.5"
              strokeDasharray="2 4"
            />

            {/* Labels */}
            <text
              x="50"
              y="98"
              textAnchor="middle"
              fill="rgba(34,197,94,0.3)"
              fontSize="1.5"
              fontFamily="monospace"
              letterSpacing="2"
            >
              CHLOROPHYLL ⟷ SILICON
            </text>
          </svg>
        </motion.div>
      )}
    </div>
  );
}
