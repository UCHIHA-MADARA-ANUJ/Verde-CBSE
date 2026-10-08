"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "./Magnetic";

export default function Closing() {
  return (
    <section className="py-40 md:py-60 bg-[var(--void)] relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,135,0.14)_0%,transparent_62%)]" />

      <div className="mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display-xl t-mega mb-16 text-outline cursor-default"
        >
          CULTIVATE.
        </motion.h2>

        <Magnetic strength={0.6}>
          <a
            href="#tour"
            className="group inline-flex items-center gap-6 bg-[var(--grow)] text-black font-display-xl text-[clamp(24px,3.4vw,40px)] px-10 md:px-16 py-6 md:py-8 hover:bg-white transition-all duration-500 shadow-[0_0_80px_rgba(0,255,135,0.45)] hover:shadow-[0_0_130px_rgba(255,255,255,0.9)]"
          >
            Initialize Access
            <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10 group-hover:rotate-45 transition-transform duration-500" />
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
