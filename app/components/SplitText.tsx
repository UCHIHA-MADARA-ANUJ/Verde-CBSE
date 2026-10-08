"use client";

import { motion } from "framer-motion";

/** Heading that animates in word by word when it enters the viewport. */
export default function SplitText({
  text,
  className = "",
  accentLast = 0,
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  /** how many trailing words to paint in the accent colour */
  accentLast?: number;
  delay?: number;
  as?: React.ElementType;
}) {
  const words = text.split(" ");
  const MotionTag = motion(Tag as "h2") as React.ElementType;

  return (
    <MotionTag
      className={className}
      style={{ perspective: 800 }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            aria-hidden
            className={`inline-block mr-[0.24em] ${
              accentLast && i >= words.length - accentLast ? "accent" : ""
            }`}
            style={{ transformOrigin: "bottom" }}
            variants={{
              hidden: { y: "0.85em", opacity: 0, rotateX: -34 },
              show: {
                y: 0,
                opacity: 1,
                rotateX: 0,
                transition: {
                  delay: delay + i * 0.055,
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
