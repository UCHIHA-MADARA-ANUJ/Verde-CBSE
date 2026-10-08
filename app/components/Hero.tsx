"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import NeuralField from "./NeuralField";
import ScrambleText from "./ScrambleText";
import Magnetic from "./Magnetic";

/**
 * SSR-safe ticker. The server and the client must agree on the FIRST paint, so
 * we render a fixed placeholder and only start generating values after mount.
 */
function useTicker(fn: () => string, ms = 1000, initial = "—") {
  const [v, setV] = useState(initial);

  useEffect(() => {
    setV(fn());
    const id = setInterval(() => setV(fn()), ms);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ms]);

  return v;
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

  const flow = useTicker(() => (2.1 + Math.random() * 0.5).toFixed(2), 900, "2.34");
  const uptime = useTicker(
    () =>
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Kolkata",
      }),
    1000,
    "--:--:--"
  );

  return (
    <section
      id="top"
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

      {/* vertical side labels */}
      <div className="hidden lg:block absolute left-9 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div
          className="hud-read whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          EST. 2025 — DELHI, IN
        </div>
      </div>
      <div className="hidden lg:block absolute right-9 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div
          className="hud-read whitespace-nowrap c-grow"
          style={{ writingMode: "vertical-rl" }}
        >
          CLOSED LOOP HYDROPONICS
        </div>
      </div>

      {/* floating telemetry cards */}
      <motion.div
        style={{ opacity }}
        className="hidden md:flex absolute bottom-[12vh] inset-x-0 justify-center gap-px z-20 pointer-events-none"
      >
        {[
          ["WATER", "21.4°C"],
          ["pH", "6.21"],
          ["RESERVOIR", "82%"],
          ["CANOPY", "0.94"],
        ].map(([k, v], i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-black/70 backdrop-blur-sm border border-white/10 px-6 py-3 text-center"
          >
            <div className="mono text-[9px] tracking-[0.28em] text-white/30 mb-1">{k}</div>
            <div className="mono text-[13px] c-grow">{v}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        <ScrambleText
          text="SCROLL"
          trigger="mount"
          className="hud-read"
        />
        <div className="w-px h-10 bg-white/15 overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-1/2 bg-[var(--grow)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
