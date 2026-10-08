"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import TextReveal from "./TextReveal";

const LINES = ["SOIL IS", "RUNNING", "OUT."];

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      id="manifesto"
      ref={ref}
      className="py-32 md:py-48 relative z-10 border-t border-white/10 bg-[var(--void)]"
    >
      <div className="mx-auto px-6 max-w-[90rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <h2
            className="font-display-xl t-giant text-white"
            style={{ perspective: 1000 }}
            aria-label="Soil is running out."
          >
            {LINES.map((l, i) => (
              <span key={l} className="block overflow-hidden">
                <motion.span
                  aria-hidden
                  className={`block ${i === 2 ? "c-acid drop-shadow-[0_0_30px_rgba(204,255,0,0.4)]" : ""}`}
                  style={{ transformStyle: "preserve-3d", transformOrigin: "bottom" }}
                  initial={{ y: 150, opacity: 0, rotateX: -90, skewY: 8 }}
                  whileInView={{ y: 0, opacity: 1, rotateX: 0, skewY: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 1.5, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h2>

          <div className="flex flex-col justify-center lg:border-l border-white/10 lg:pl-12">
            <TextReveal className="text-[22px] md:text-[30px] leading-[1.45] text-white/90 mono mb-10">
              Arable land shrinks. Water tables fall. Yet a third of what we grow never reaches a plate.
            </TextReveal>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="text-[16px] md:text-[18px] leading-relaxed text-white/40 mono mb-14 max-w-2xl"
            >
              VERDE is the counter-argument. A sealed, sensor-driven ecosystem that stacks
              twenty growing sites into the footprint of a bookshelf, recirculates every drop
              and decides for itself when to feed.
            </motion.p>
            <Magnetic>
              <a href="#tour" className="link-brut">
                <span>Read the system</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
