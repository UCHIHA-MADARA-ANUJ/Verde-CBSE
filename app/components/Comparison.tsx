"use client";

import { motion } from "framer-motion";
import TextReveal from "./TextReveal";

const ROWS = [
  { k: "WATER PER CYCLE", soil: 100, verde: 5, su: "18.0 L", vu: "0.9 L" },
  { k: "FLOOR AREA / 20 PLANTS", soil: 100, verde: 11, su: "4.2 m²", vu: "0.46 m²" },
  { k: "TIME TO HARVEST", soil: 100, verde: 62, su: "61 days", vu: "38 days" },
  { k: "HUMAN INTERVENTIONS / WK", soil: 100, verde: 3, su: "14", vu: "0.4" },
  { k: "NUTRIENT RUNOFF LOST", soil: 100, verde: 0, su: "100%", vu: "0%" },
];

export default function Comparison() {
  return (
    <section id="versus" className="py-24 md:py-40 bg-black border-t border-white/10 relative z-10">
      <div className="mx-auto px-6 max-w-[90rem]">
        <div className="sec-index">07 — Against the ground</div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-24 mb-16">
          <h2 className="font-display-xl t-big text-white">
            <span className="block text-outline-static">DIRT</span>
            <span className="block c-grow">LOSES.</span>
          </h2>
          <TextReveal className="text-white/55 text-[17px] md:text-[21px] leading-relaxed max-w-[52ch] self-end mono">
            Measured against an equivalent open soil bed growing the same twenty plants, over three full cycles, in the same Delhi conditions.
          </TextReveal>
        </div>

        <div className="border-t border-white/10">
          {ROWS.map((r, i) => (
            <motion.div
              key={r.k}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4 md:gap-10 py-7 md:py-9 border-b border-white/10 group"
            >
              <div className="mono text-[10px] md:text-[11px] tracking-[0.24em] uppercase text-white/35 pt-1 group-hover:text-white/70 transition-colors">
                {String(i + 1).padStart(2, "0")} — {r.k}
              </div>

              <div className="flex flex-col gap-3">
                {/* soil */}
                <div className="flex items-center gap-4">
                  <span className="mono text-[10px] tracking-[0.2em] uppercase text-white/25 w-14 shrink-0">
                    SOIL
                  </span>
                  <div className="flex-1 h-[10px] bg-white/[0.04] overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: r.soil / 100 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.3, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      style={{ originX: 0 }}
                      className="h-full bg-white/20"
                    />
                  </div>
                  <span className="mono text-[11px] text-white/35 w-20 text-right shrink-0">
                    {r.su}
                  </span>
                </div>

                {/* verde */}
                <div className="flex items-center gap-4">
                  <span className="mono text-[10px] tracking-[0.2em] uppercase c-grow w-14 shrink-0">
                    VERDE
                  </span>
                  <div className="flex-1 h-[10px] bg-white/[0.04] overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: Math.max(r.verde / 100, 0.006) }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.3, delay: 0.3 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      style={{ originX: 0 }}
                      className="h-full bg-[var(--grow)] shadow-[0_0_20px_#00ff87]"
                    />
                  </div>
                  <span className="mono text-[11px] c-grow w-20 text-right shrink-0">
                    {r.vu}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
