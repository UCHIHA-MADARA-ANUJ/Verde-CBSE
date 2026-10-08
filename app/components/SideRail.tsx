"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "top", n: "00", label: "Index" },
  { id: "manifesto", n: "01", label: "Manifesto" },
  { id: "system", n: "02", label: "System" },
  { id: "loop", n: "03", label: "Loop" },
  { id: "tour", n: "04", label: "Tour" },
  { id: "console", n: "05", label: "Console" },
  { id: "telemetry", n: "06", label: "Telemetry" },
  { id: "hardware", n: "07", label: "Hardware" },
  { id: "specs", n: "08", label: "Specs" },
  { id: "build", n: "09", label: "Build" },
  { id: "faq", n: "10", label: "FAQ" },
];

export default function SideRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean
    ) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6, 1] }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section index"
      className="hidden xl:flex fixed left-7 top-1/2 -translate-y-1/2 z-[70] flex-col gap-3 pointer-events-auto"
    >
      {SECTIONS.map((s) => {
        const on = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3"
            aria-current={on ? "true" : undefined}
          >
            <motion.span
              animate={{
                width: on ? 30 : 12,
                backgroundColor: on ? "#00ff87" : "rgba(255,255,255,0.22)",
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="h-[2px] block shrink-0"
            />
            <motion.span
              animate={{ opacity: on ? 1 : 0, x: on ? 0 : -6 }}
              transition={{ duration: 0.4 }}
              className="mono text-[9px] tracking-[0.28em] uppercase c-grow whitespace-nowrap group-hover:opacity-100"
            >
              {s.n} {s.label}
            </motion.span>
          </a>
        );
      })}
    </nav>
  );
}
