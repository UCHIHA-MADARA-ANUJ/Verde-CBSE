"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ScrambleText from "./ScrambleText";

type Line = { t: string; msg: string; kind: "ok" | "warn" | "act" | "ai" };

const POOL: Omit<Line, "t">[] = [
  { msg: "tier_02 soil moisture 31% → below floor (35%)", kind: "warn" },
  { msg: "pump.engage(tier=02, ml=420, duration=11s)", kind: "act" },
  { msg: "reservoir 82.4% · 16.5L remaining", kind: "ok" },
  { msg: "canopy_v4 inference 38ms · leaf_health 0.94", kind: "ai" },
  { msg: "npk probe → N 142 · P 61 · K 188 ppm", kind: "ok" },
  { msg: "dht22 air 24.1°C / rh 63%", kind: "ok" },
  { msg: "led array tier_01..04 → pwm 72%", kind: "act" },
  { msg: "openweather: rain probability 0.71 → defer cycle", kind: "warn" },
  { msg: "whatsapp dispatch → +91 ••••• 4412 [HI]", kind: "act" },
  { msg: "ph drift 6.21 → within band", kind: "ok" },
  { msg: "canopy_v4 inference 41ms · chlorosis 0.02", kind: "ai" },
  { msg: "firebase rtdb sync 1.2KB · 94ms", kind: "ok" },
  { msg: "flow sensor 2.34 L/min · nominal", kind: "ok" },
  { msg: "tier_04 ultrasonic 11.2cm → headroom ok", kind: "ok" },
  { msg: "watchdog heartbeat · uptime 41d 06h", kind: "ok" },
];

const COLOR = {
  ok: "text-white/40",
  warn: "c-acid",
  act: "c-grow",
  ai: "text-white",
} as const;

const TAG = { ok: "INFO", warn: "WARN", act: "EXEC", ai: " AI " } as const;

function stamp() {
  return new Date().toLocaleTimeString("en-GB", {
    hour12: false,
    timeZone: "Asia/Kolkata",
  });
}

export default function LiveTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const box = useRef<HTMLDivElement>(null);
  const i = useRef(0);

  useEffect(() => {
    const seed = Array.from({ length: 7 }, () => {
      const p = POOL[i.current++ % POOL.length];
      return { ...p, t: stamp() };
    });
    setLines(seed);

    const id = setInterval(() => {
      const p = POOL[i.current++ % POOL.length];
      setLines((l) => [...l.slice(-28), { ...p, t: stamp() }]);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  return (
    <section
      id="console"
      className="py-24 md:py-40 bg-black border-t border-white/10 relative z-10"
    >
      <div className="mx-auto px-6 max-w-[90rem]">
        <div className="sec-index">05 — Live console</div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="font-display-xl t-big text-white mb-8">
              <span className="block text-outline-static">IT TALKS</span>
              <span className="block c-grow">TO ITSELF.</span>
            </h2>
            <p className="text-white/40 text-[16px] leading-relaxed mb-8 max-w-md">
              Every decision the tower makes is written to a log before it is acted on.
              This is the real event stream — sensor reads, model inferences, relay
              actuations and the messages it chooses to send you.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 mono text-[10px] tracking-[0.24em] uppercase">
              <span className="c-grow">● EXEC — actuation</span>
              <span className="c-acid">● WARN — threshold</span>
              <span className="text-white/40">● INFO — telemetry</span>
              <span className="text-white">● AI — inference</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="border border-white/10 bg-[#050907] relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 mono text-[10px] tracking-[0.24em] uppercase text-white/30">
              <ScrambleText text="verde@tower-01:~/core" className="c-grow" />
              <span className="flex items-center gap-2">
                <span className="w-[6px] h-[6px] rounded-full bg-[var(--grow)] animate-pulse" />
                streaming
              </span>
            </div>

            <div
              ref={box}
              className="h-[380px] md:h-[440px] overflow-y-auto px-5 py-5 mono text-[11px] md:text-[12px] leading-[1.95]"
            >
              {lines.map((l, n) => (
                <motion.div
                  key={`${l.t}-${n}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex gap-3"
                >
                  <span className="text-white/20 shrink-0">{l.t}</span>
                  <span
                    className={`shrink-0 ${COLOR[l.kind]} opacity-70`}
                  >{`[${TAG[l.kind]}]`}</span>
                  <span className={COLOR[l.kind]}>{l.msg}</span>
                </motion.div>
              ))}
            </div>

            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#050907] to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
