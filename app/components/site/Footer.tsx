"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const COLS = [
  {
    h: "System",
    l: [
      ["Manifesto", "#manifesto"],
      ["The loop", "#loop"],
      ["Guided tour", "#tour"],
      ["Live console", "#console"],
    ],
  },
  {
    h: "Engineering",
    l: [
      ["Telemetry", "#telemetry"],
      ["Hardware", "#hardware"],
      ["Specifications", "#specs"],
      ["Build log", "#build"],
    ],
  },
  {
    h: "Project",
    l: [
      ["Against the ground", "#versus"],
      ["Questions", "#faq"],
      ["Team", "#team"],
      ["Repository", "https://github.com/UCHIHA-MADARA-ANUJ/Verde-CBSE"],
    ],
  },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const o = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  return (
    <footer
      ref={ref}
      className="relative z-10 bg-black border-t border-white/10 overflow-hidden"
    >
      {/* link columns */}
      <div className="mx-auto px-6 max-w-[90rem] pt-20 md:pt-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 pb-16 border-b border-white/10">
          <div className="col-span-2 md:col-span-1">
            <div className="mono text-[10px] tracking-[0.3em] uppercase c-grow mb-5">
              ● Tower 01 online
            </div>
            <p className="text-white/40 text-[15px] leading-relaxed max-w-[30ch]">
              Precision-grown living. An autonomous four-tier hydroponic system,
              designed and built in Delhi.
            </p>
            <div className="mono text-[10px] tracking-[0.24em] text-white/25 mt-6">
              28.6139° N · 77.2090° E
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.h}>
              <div className="mono text-[10px] tracking-[0.3em] uppercase text-white/25 mb-5">
                {c.h}
              </div>
              <ul className="flex flex-col gap-3">
                {c.l.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group inline-flex items-center gap-2 text-white/55 hover:text-[var(--grow)] transition-colors text-[15px]"
                    >
                      <span className="w-0 group-hover:w-4 h-px bg-[var(--grow)] transition-all duration-300" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* colossal wordmark */}
      <motion.div
        style={{ y, opacity: o }}
        className="px-4 md:px-6 pt-10 select-none pointer-events-none"
      >
        <div
          className="font-display-xl text-white/[0.07] leading-[0.78] text-center"
          style={{ fontSize: "min(26vw, 460px)" }}
        >
          VERDE
        </div>
      </motion.div>

      <div className="mx-auto px-6 max-w-[90rem] pb-10 -mt-4 flex flex-wrap items-center justify-between gap-4 mono text-[10px] tracking-[0.26em] uppercase text-white/25">
        <span>© {new Date().getFullYear()} Verde · CBSE Science Exhibition</span>
        <span className="c-grow">Chlorophyll meets silicon</span>
        <a href="#top" className="hover:text-white transition-colors">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
