"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Magnetic from "./Magnetic";

const line1 = "A little space.".split(" ");
const line2 = "A lot of life.".split(" ");

const word = {
  hidden: { opacity: 0, y: "0.6em", rotateX: -38 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: 0.25 + i * 0.075, duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function HeroCopy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className="max-w-[580px]">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 mb-7"
      >
        <span className="chip">
          <i className="dot animate-pulse" /> System online
        </span>
        <span className="eyebrow hidden sm:inline">Tower 01 · Delhi</span>
      </motion.div>

      <h1
        className="display text-[clamp(44px,7vw,86px)] mb-7"
        style={{ perspective: 800 }}
        aria-label="A little space. A lot of life."
      >
        {[line1, line2].map((line, li) => (
          <span key={li} className="block overflow-hidden">
            {line.map((w, i) => (
              <motion.span
                key={w + i}
                custom={li * 3 + i}
                variants={word}
                initial="hidden"
                animate="show"
                className="inline-block mr-[0.26em]"
                style={{ transformOrigin: "bottom" }}
              >
                {li === 1 && i === line.length - 1 ? <span className="accent">{w}</span> : w}
              </motion.span>
            ))}
          </span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="lede mb-10 max-w-[450px]"
      >
        Four levels. Twenty plants. A closed water loop, a handful of sensors and enough
        judgement to look after itself.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.88, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap gap-3 items-center"
      >
        <Magnetic>
          <a href="#tour" className="btn btn-solid">
            Take the tour
          </a>
        </Magnetic>
        <Magnetic>
          <a href="#telemetry" className="btn btn-ghost">
            See it running
          </a>
        </Magnetic>
        <span className="eyebrow ml-2 hidden lg:inline">
          or press <kbd className="accent">⌘K</kbd>
        </span>
      </motion.div>
    </motion.div>
  );
}
