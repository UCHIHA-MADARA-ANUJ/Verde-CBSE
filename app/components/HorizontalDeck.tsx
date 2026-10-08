"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const CARDS = [
  { n: "01", t: "SENSE", d: "Twelve channels sample the bed, the air and the reservoir every two seconds. Capacitive soil probes, an RS485 NPK spear, DHT22 and an ultrasonic level gauge.", k: "12 CHANNELS · 0.5Hz" },
  { n: "02", t: "SEE", d: "An OV2640 photographs the canopy hourly. A quantised TensorFlow Lite model runs on the device itself and scores leaf health, chlorosis and pest damage.", k: "TFLITE INT8 · 612KB" },
  { n: "03", t: "DECIDE", d: "A rule engine weighs the sensor state against a predictive weather pull. If rain is likely and the bed is damp, the cycle is deferred rather than wasted.", k: "ON-DEVICE · 0ms CLOUD" },
  { n: "04", t: "ACT", d: "An SPDT relay drives the 2.4 L/min pump; twelve MOSFET channels dim the LED array. Everything the tower does is logged before it happens.", k: "SPDT · 12CH PWM" },
  { n: "05", t: "REPORT", d: "State is mirrored to Firebase Realtime Database and anything urgent is pushed over WhatsApp via Twilio, in English or Hindi, with a photograph attached.", k: "RTDB · TWILIO EN/HI" },
  { n: "06", t: "RECLAIM", d: "Runoff drains through all four tiers and returns to the reservoir. The loop is sealed, so the system uses roughly a twentieth of the water an equivalent soil bed needs.", k: "95% RECLAIMED" },
];

export default function HorizontalDeck() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);
  const x = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="loop" ref={ref} className="relative h-[420vh] bg-black border-t border-white/10">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="px-6 md:px-12 mb-10">
          <div className="sec-index">04 — The loop</div>
          <h2 className="font-display-xl t-big text-white">
            SIX STEPS, <span className="text-outline-static">FOREVER.</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-px bg-white/10 border-y border-white/10 w-max">
          {CARDS.map((c) => (
            <article
              key={c.n}
              className="cell w-[82vw] sm:w-[62vw] md:w-[42vw] lg:w-[32vw] p-9 md:p-12 flex flex-col justify-between min-h-[46vh]"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              <span className="cell-sweep" />
              <div>
                <div className="mono text-[11px] tracking-[0.3em] c-acid mb-7">{c.n}</div>
                <h3 className="font-display-xl text-[clamp(38px,4.6vw,76px)] text-white mb-6">
                  {c.t}
                </h3>
                <p className="text-white/40 text-[15px] leading-relaxed max-w-[42ch]">{c.d}</p>
              </div>
              <div className="mono text-[10px] tracking-[0.26em] uppercase c-grow pt-10">
                {c.k}
              </div>
            </article>
          ))}
        </motion.div>

        <div className="px-6 md:px-12 mt-10 flex items-center gap-6">
          <div className="h-px flex-1 bg-white/10 overflow-hidden">
            <motion.div style={{ width: bar }} className="h-full bg-[var(--grow)]" />
          </div>
          <span className="hud-read shrink-0">SCROLL →</span>
        </div>
      </div>
    </section>
  );
}
