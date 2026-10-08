"use client";

import { motion } from "framer-motion";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  delay?: number;
  fill?: boolean;
}

export default function Sparkline({ data, width = 120, height = 40, color = "#22c55e", delay = 0, fill = true }: SparklineProps) {
  if (!data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * height,
  }));
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      {fill && (
        <motion.path
          d={areaD}
          fill={`${color}15`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.5 }}
        />
      )}
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay, duration: 1.2, ease: "easeOut" }}
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      />
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={2}
          fill={color}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + (i / points.length) * 0.8, duration: 0.2 }}
        />
      ))}
    </svg>
  );
}
