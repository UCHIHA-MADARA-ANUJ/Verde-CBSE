"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleEffectProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  duration?: number;
}

export default function RippleEffect({
  children,
  className = "",
  color = "rgba(34,197,94,0.3)",
  duration = 0.6,
}: RippleEffectProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);
  const reduced = useReducedMotion();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;
      const id = idRef.current++;
      setRipples((prev) => [...prev, { id, x, y, size }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, duration * 1000);
    },
    [duration, reduced]
  );

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
