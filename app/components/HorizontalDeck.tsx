"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";

const CARDS = [
  {
    n: "01",
    t: "SENSE",
    d: "Twelve channels sample the bed, the air and the reservoir every two seconds. Capacitive soil probes, an RS485 NPK spear, a DHT22 and an ultrasonic level gauge.",
    k: "12 CHANNELS · 0.5 Hz",
    m: [["CH", "12"], ["RATE", "0.5Hz"], ["BUS", "I2C+485"]],
  },
  {
    n: "02",
    t: "SEE",
    d: "An OV2640 photographs the canopy hourly. A quantised TensorFlow Lite model runs on the device itself and scores leaf health, chlorosis and pest damage.",
    k: "TFLITE INT8 · 612 KB",
    m: [["MODEL", "v4"], ["LATENCY", "38ms"], ["ARENA", "214KB"]],
  },
  {
    n: "03",
    t: "DECIDE",
    d: "A rule engine weighs sensor state against a predictive weather pull. If rain is likely and the bed is already damp, the cycle is deferred rather than wasted.",
    k: "ON-DEVICE · 0 ms CLOUD",
    m: [["RULES", "41"], ["CLOUD", "0ms"], ["FALLBACK", "LOCAL"]],
  },
  {
    n: "04",
    t: "ACT",
    d: "An SPDT relay drives the 2.4 L/min pump; twelve MOSFET channels dim the LED array. Everything the tower does is written to the log before it happens.",
    k: "SPDT · 12CH PWM",
    m: [["PUMP", "2.4L/m"], ["PWM", "12CH"], ["LOGGED", "100%"]],
  },
  {
    n: "05",
    t: "REPORT",
    d: "State mirrors to Firebase Realtime Database, and anything urgent is pushed over WhatsApp via Twilio — in English or Hindi, with a photograph attached.",
    k: "RTDB · TWILIO EN/HI",
    m: [["SYNC", "94ms"], ["LANG", "EN/HI"], ["MEDIA", "JPEG"]],
  },
  {
    n: "06",
    t: "RECLAIM",
    d: "Runoff drains through all four tiers and returns to the reservoir. The loop is sealed, so the tower drinks roughly a twentieth of what an equivalent soil bed needs.",
    k: "95% RECLAIMED",
    m: [["LOSS", "5%"], ["LOOP", "SEALED"], ["TIERS", "04"]],
  },
];

function Card({
  c,
  i,
  active,
  progress,
}: {
  c: (typeof CARDS)[number];
  i: number;
  active: boolean;
  progress: MotionValue<number>;
}) {
  // each card drifts its own contents at a slightly different rate
  const inner = useTransform(progress, [0, 1], [40 + i * 10, -40 - i * 10]);
  const ghost = useTransform(progress, [0, 1], [90 + i * 40, -90 - i * 40]);

  return (
    <motion.article
      animate={{
        opacity: active ? 1 : 0.34,
        scale: active ? 1 : 0.93,
        filter: active ? "blur(0px)" : "blur(2.5px)",
      }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="cell relative w-[84vw] sm:w-[60vw] md:w-[44vw] lg:w-[34vw] shrink-0 h-[58vh] overflow-hidden"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <span className="cell-sweep" />

      {/* enormous ghost numeral drifting behind the content */}
      <motion.span
        style={{ x: ghost }}
        aria-hidden
        className="pointer-events-none absolute -bottom-[7vh] -right-[1vw] font-display-xl text-[26vh] leading-none text-outline-static select-none"
      >
        {c.n}
      </motion.span>

      {/* top status rail */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-7 md:px-10 py-5 border-b border-white/10 mono text-[10px] tracking-[0.28em] uppercase">
        <span className="c-acid">{c.n}</span>
        <span className="flex items-center gap-2 text-white/30">
          <span
            className={`w-[5px] h-[5px] rounded-full ${
              active ? "bg-[var(--grow)] animate-pulse" : "bg-white/20"
            }`}
          />
          {active ? "ACTIVE" : "IDLE"}
        </span>
      </div>

      <motion.div
        style={{ y: inner }}
        className="relative z-10 h-full flex flex-col justify-center px-7 md:px-10 pt-16"
      >
        <h3 className="font-display-xl text-[clamp(44px,5.6vw,92px)] text-white mb-5">
          {c.t}
        </h3>
        <p className="text-white/45 text-[14.5px] md:text-[15.5px] leading-relaxed max-w-[40ch] mb-8">
          {c.d}
        </p>

        <div className="flex gap-px bg-white/10 border border-white/10 w-max">
          {c.m.map(([k, v]) => (
            <div key={k} className="bg-[#050907] px-4 py-3">
              <div className="mono text-[9px] tracking-[0.26em] text-white/25 mb-1">
                {k}
              </div>
              <div className="mono text-[12px] c-grow">{v}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* bottom key */}
      <div className="absolute bottom-0 inset-x-0 px-7 md:px-10 py-5 border-t border-white/10 mono text-[10px] tracking-[0.26em] uppercase text-white/35">
        {c.k}
      </div>
    </motion.article>
  );
}

export default function HorizontalDeck() {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const eased = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.35,
  });

  // travel: hold a beat at each end so the first and last card can breathe
  const x = useTransform(eased, [0, 0.06, 0.94, 1], ["4vw", "4vw", "-182vw", "-182vw"]);
  const bar = useTransform(eased, [0, 1], ["0%", "100%"]);
  const headX = useTransform(eased, [0, 1], [0, -70]);
  const glow = useTransform(eased, [0, 0.5, 1], [0.05, 0.16, 0.05]);

  useMotionValueEvent(eased, "change", (v) => {
    const n = Math.min(CARDS.length - 1, Math.max(0, Math.round(v * (CARDS.length - 1))));
    setIdx((p) => (p === n ? p : n));
  });

  return (
    <section
      id="loop"
      ref={ref}
      className="relative bg-black border-t border-white/10"
      style={{ height: `${CARDS.length * 70}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* reactive glow that swells mid-journey */}
        <motion.div
          style={{ opacity: glow }}
          className="absolute inset-0 bg-[radial-gradient(60vw_50vh_at_50%_50%,#00ff87,transparent_70%)] pointer-events-none"
        />
        <div className="verde-grid absolute inset-0 opacity-[0.28] pointer-events-none" />

        {/* header */}
        <motion.div style={{ x: headX }} className="relative z-10 px-6 md:px-12 mb-8">
          <div className="sec-index">04 — The loop</div>
          <h2 className="font-display-xl t-big text-white">
            SIX STEPS,{" "}
            <span className="text-outline-static">FOREVER.</span>
          </h2>
        </motion.div>

        {/* track */}
        <motion.div
          style={{ x }}
          className="relative z-10 flex gap-5 md:gap-7 w-max will-change-transform"
        >
          {CARDS.map((c, i) => (
            <Card key={c.n} c={c} i={i} active={i === idx} progress={eased} />
          ))}
        </motion.div>

        {/* footer rail */}
        <div className="relative z-10 px-6 md:px-12 mt-9 flex items-center gap-5 md:gap-8">
          <span className="font-display-xl text-[clamp(26px,3vw,44px)] c-grow tabular-nums leading-none">
            {CARDS[idx].n}
          </span>
          <span className="hud-read">/ {String(CARDS.length).padStart(2, "0")}</span>

          <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
            <motion.div
              style={{ width: bar }}
              className="h-full bg-[var(--grow)] shadow-[0_0_14px_#00ff87]"
            />
          </div>

          {/* step pips */}
          <div className="hidden sm:flex items-center gap-2">
            {CARDS.map((c, i) => (
              <span
                key={c.n}
                className={`h-[2px] transition-all duration-500 ${
                  i === idx ? "w-7 bg-[var(--grow)]" : "w-3 bg-white/20"
                }`}
              />
            ))}
          </div>

          <span className="hud-read shrink-0 hidden md:inline">KEEP SCROLLING →</span>
        </div>
      </div>
    </section>
  );
}
