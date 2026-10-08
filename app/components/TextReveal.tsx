"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

function Word({ w, range, p }: { w: string; range: [number, number]; p: MotionValue<number> }) {
  const opacity = useTransform(p, range, [0.12, 1]);
  const y = useTransform(p, range, [8, 0]);
  const blur = useTransform(p, range, ["blur(5px)", "blur(0px)"]);
  return (
    <span className="relative inline-block mr-[0.26em]">
      <motion.span style={{ opacity, y, filter: blur }} className="inline-block">
        {w}
      </motion.span>
    </span>
  );
}

/** Paragraph that illuminates word by word as it crosses the viewport. */
export default function TextReveal({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });
  const words = children.split(" ");

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return <Word key={i} w={w} range={[start, end]} p={scrollYProgress} />;
      })}
    </p>
  );
}
