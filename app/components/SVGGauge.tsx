"use client";

import { motion } from "framer-motion";

interface SVGGaugeProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  suffix?: string;
  color?: string;
  delay?: number;
}

export default function SVGGauge({
  value,
  max = 100,
  size = 100,
  strokeWidth = 8,
  label,
  suffix = "%",
  color = "#22c55e",
  delay = 0,
}: SVGGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percent = Math.min(value / max, 1);
  const dash = percent * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            animate={{ strokeDashoffset: circumference - dash }}
            transition={{ duration: 1.5, delay, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <motion.span
            className="text-xl font-black font-heading tracking-tighter"
            style={{ color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.5, duration: 0.5 }}
          >
            {value}
            <span className="text-[10px] ml-0.5 opacity-60">{suffix}</span>
          </motion.span>
        </div>
      </div>
      {label && (
        <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">{label}</span>
      )}
    </div>
  );
}
