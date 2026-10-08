"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import SplitText from "./SplitText";

const steps = [
  { n: "01", t: "Breadboard", d: "DHT22 and a capacitive probe on a NodeMCU. Serial output only — proving the reads were stable before trusting them.", tag: "Week 1–2" },
  { n: "02", t: "Firmware", d: "Non-blocking scheduler in C++, debounced sensor sampling, relay safety interlocks and a watchdog so a hung read can't leave the pump on.", tag: "Week 3–5" },
  { n: "03", t: "The board", d: "Schematic and two-layer layout in KiCad. LM2596 buck, flyback diodes on the relay, screw terminals for anything leaving the enclosure.", tag: "Week 6–8" },
  { n: "04", t: "Cloud + alerts", d: "Firebase Realtime Database for telemetry, Twilio WhatsApp for alerts in English and Hindi, OpenWeatherMap to hold irrigation before rain.", tag: "Week 9–11" },
  { n: "05", t: "Vision", d: "A small TensorFlow Lite classifier for early leaf-spot and chlorosis, quantised to run on-device against an OV2640 feed.", tag: "Week 12–14" },
  { n: "06", t: "The tower", d: "Four tiers, twenty net pots, recirculating feed line and the controller mounted where you can actually reach it.", tag: "Week 15+" },
];

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  const height = useTransform(h, [0, 1], ["0%", "100%"]);

  return (
    <section id="build" className="wrap py-24 md:py-32">
      <div className="eyebrow mb-4">How it got built</div>
      <SplitText
        text="Fourteen weeks, in order."
        className="font-display-xl t-big mb-20 max-w-[900px]"
        accentLast={1}
      />

      <div ref={ref} className="relative pl-8 md:pl-14">
        {/* rail */}
        <div className="absolute left-[3px] md:left-[9px] top-2 bottom-2 w-px bg-[var(--line-soft)]" />
        <motion.div
          className="absolute left-[3px] md:left-[9px] top-2 w-px bg-gradient-to-b from-[var(--green)] to-[var(--green-deep)]"
          style={{ height }}
        />

        <div className="flex flex-col gap-10 md:gap-14">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              <span className="absolute -left-8 md:-left-14 top-2.5 w-[7px] h-[7px] rounded-full bg-[var(--bg)] border border-[var(--green)] group-hover:bg-[var(--green)] transition-colors duration-300" />
              <div className="flex flex-wrap items-baseline gap-4 mb-2">
                <span className="mono text-[11px] accent">{s.n}</span>
                <h3 className="text-[21px] md:text-[25px]">{s.t}</h3>
                <span className="eyebrow ml-auto">{s.tag}</span>
              </div>
              <p className="text-[15px] leading-[1.75] muted max-w-[620px]">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
