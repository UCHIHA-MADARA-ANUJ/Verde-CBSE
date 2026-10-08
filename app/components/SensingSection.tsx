"use client";

import { motion } from "framer-motion";
import { SceneSlot } from "./ScenePreloader";
import SplitText from "./SplitText";

const reads = [
  { k: "Moisture", v: "68%", s: "optimal" },
  { k: "Root temp", v: "20.9°C", s: "steady" },
  { k: "Last fed", v: "41m ago", s: "on cycle" },
];

export default function SensingSection() {
  return (
    <section id="sensing" className="py-20 md:py-28 border-y border-[var(--line-soft)]">
      <div className="wrap grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow mb-4">Down at plant level</div>
          <SplitText
            text="One seedling, continuously understood."
            className="font-display-xl t-big mb-7 max-w-[540px]"
            accentLast={1}
          />
          <p className="lede mb-9 max-w-[470px]">
            Every site is measured on its own. A two-prong probe reads moisture in the root
            zone and reports to a board the size of a stamp — which decides whether this
            particular plant is thirsty, not whether the shelf is.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-[470px] mb-8">
            {reads.map((r, i) => (
              <motion.div
                key={r.k}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
                className="card p-4"
              >
                <div className="eyebrow mb-2">{r.k}</div>
                <div className="display text-[21px] mb-1">{r.v}</div>
                <div className="mono text-[10px] accent">{r.s}</div>
              </motion.div>
            ))}
          </div>

          <p className="eyebrow">Drag the model to inspect it</p>
        </motion.div>

        <SceneSlot id="pod" className="h-[430px] md:h-[580px]" />
      </div>
    </section>
  );
}
