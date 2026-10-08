"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import NeuralField from "./NeuralField";
import Magnetic from "./Magnetic";

function useTicker(fn: () => string, ms = 1000) {
  const [v, setV] = useState(fn);
  useEffect(() => {
    const id = setInterval(() => setV(fn()), ms);
    return () => clearInterval(id);
  }, [fn, ms]);
  return v;
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

  const flow = useTicker(() => (2.1 + Math.random() * 0.5).toFixed(2), 900);
  const uptime = useTicker(
    () =>
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Kolkata",
      }),
    1000
  );

  return (
    <section
      ref={ref}
      className="relative h-[100svh] flex items-center justify-center overflow-hidden"
    >
      <NeuralField />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,#000_100%)] pointer-events-none" />

      {/* ---------------- HUD frame ---------------- */}
      <div className="hud-frame hidden md:flex flex-col justify-between p-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2 hud-read">
            <span className="c-grow animate-pulse">SYS.OPERATIONAL</span>
            <span>LAT: 28.6139° N</span>
            <span>LON: 77.2090° E</span>
            <span>TOWER_01 / DELHI</span>
          </div>
          <div className="flex flex-col gap-2 hud-read text-right">
            <span>FLOW: {flow} L/MIN</span>
            <span>TIER_COUNT: 04</span>
            <span>SITES: 020</span>
            <span className="c-acid">{uptime} IST</span>
          </div>
        </div>

        <div className="flex justify-between items-end hud-read">
          <span>SCROLL TO INITIATE SEQUENCE</span>
          <div className="flex flex-col items-end gap-2">
            <span>AUTONOMOUS AGRICULTURE V3.0</span>
            <div className="w-16 h-px bg-white/20" />
          </div>
        </div>
      </div>

      {/* corner ticks */}
      <div className="absolute top-1/3 left-[14%] w-4 h-4 border-l border-t border-[var(--grow)]/40 pointer-events-none z-10" />
      <div className="absolute bottom-1/3 right-[14%] w-4 h-4 border-r border-b border-[var(--grow)]/40 pointer-events-none z-10" />

      {/* ---------------- headline ---------------- */}
      <motion.div
        style={{ y, opacity, filter: blur }}
        className="relative z-20 text-center px-5 w-full flex flex-col items-center mix-blend-screen"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, filter: "blur(24px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display-xl t-mega text-white">
            <span className="block text-outline">WE GROW</span>
            <span className="block glow-grow">THE FUTURE.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mono text-[11px] md:text-[12px] tracking-[0.32em] uppercase text-white/45 mt-10 max-w-[620px]"
        >
          Four tiers · twenty sites · zero human intervention
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-wrap gap-5 justify-center pointer-events-auto"
        >
          <Magnetic strength={0.45}>
            <a href="#tour" className="link-brut">
              <span>Initiate the tour</span>
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
