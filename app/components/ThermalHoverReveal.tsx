"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ThermalHoverRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function ThermalHoverReveal({
  children,
  className = "",
}: ThermalHoverRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  // Compute distance from center (0 = center, 1 = edge)
  const distance = useTransform(
    [springX, springY],
    ([vx, vy]) => {
      const dist = Math.sqrt(((vx as number) - 0.5) ** 2 + ((vy as number) - 0.5) ** 2) * 2;
      return Math.min(dist, 1);
    }
  );

  // Thermal filter: hue-rotate from green (normal) to red (hot)
  const filterStyle = useTransform(distance, (d) => {
    const hue = 120 - d * 120;
    return `hue-rotate(${hue - 120}deg) saturate(${1 + d}) brightness(${1 - d * 0.2})`;
  });

  // Thermal overlay background
  const thermalBg = useTransform(
    [springX, springY, distance],
    ([vx, vy, d]) => {
      if ((d as number) < 0.05) return "transparent";
      return `radial-gradient(circle at ${(vx as number) * 100}% ${(vy as number) * 100}%, 
        rgba(255,0,0,${(d as number) * 0.3}), 
        rgba(255,165,0,${(d as number) * 0.2}), 
        rgba(255,255,0,${(d as number) * 0.1}), 
        transparent)`;
    }
  );

  const thermalOpacity = useTransform(distance, [0, 0.1, 1], [0, 0.5, 1]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0.5);
    y.set(0.5);
  }, [x, y]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden group ${className}`}
    >
      {/* Thermal overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay"
        style={{
          background: thermalBg,
          opacity: thermalOpacity,
        }}
      />

      {/* Filtered content */}
      <motion.div
        className="relative z-0"
        style={{ filter: filterStyle }}
      >
        {children}
      </motion.div>

      {/* Thermal scale indicator */}
      <div className="absolute bottom-2 left-2 right-2 h-1 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #0000ff, #00ff00, #ffff00, #ff0000)",
          }}
        />
        <motion.div
          className="absolute top-0 h-full w-1 bg-white rounded-full"
          style={{ left: useTransform(distance, [0, 1], ["0%", "100%"]) }}
        />
      </div>
    </div>
  );
}
