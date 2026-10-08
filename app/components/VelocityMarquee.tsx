"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  wrap,
} from "framer-motion";

/**
 * Marquee whose speed, direction and skew are driven by scroll velocity.
 * Scroll down and it accelerates; scroll up and it reverses.
 */
export default function VelocityMarquee({
  items,
  baseVelocity = 2.4,
  outline = true,
}: {
  items: string[];
  baseVelocity?: number;
  outline?: boolean;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const skew = useTransform(smooth, [-2000, 0, 2000], [8, 0, -8], { clamp: true });
  const skewSpring = useSpring(skew, { damping: 30, stiffness: 220 });

  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_t, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) dir.current = -1;
    else if (factor.get() > 0) dir.current = 1;
    move += dir.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  const row = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/10 py-6 md:py-9 bg-black select-none">
      <motion.div
        style={{ x, skewX: skewSpring }}
        className="flex w-max will-change-transform"
      >
        {row.map((t, i) => (
          <span
            key={i}
            className={`font-display-xl text-[clamp(44px,9vw,9rem)] leading-none pr-[0.4em] whitespace-nowrap ${
              i % 2 === 0 ? (outline ? "text-outline-static" : "text-white") : "c-grow"
            }`}
          >
            {t}
            <span className="c-acid px-[0.22em]">/</span>
          </span>
        ))}
      </motion.div>
      <div className="absolute inset-y-0 left-0 w-20 md:w-52 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-52 bg-gradient-to-l from-black to-transparent pointer-events-none" />
    </div>
  );
}
