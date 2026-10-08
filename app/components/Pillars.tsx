"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import SplitText from "./SplitText";

const pillars = [
  {
    t: "It waters itself",
    d: "Soil moisture, tank level and the weather forecast are read together. The pump runs when the plants need it, not on a timer — and holds off when rain is coming.",
    k: "Closed-loop irrigation",
  },
  {
    t: "It watches the plants",
    d: "A camera and an on-device TensorFlow Lite model check the canopy for early disease markers, so problems surface days before they're visible to you.",
    k: "On-device vision",
  },
  {
    t: "It tells you",
    d: "Telemetry streams to Firebase in real time. A WhatsApp bot answers questions and raises alerts in English or Hindi, with no app to install.",
    k: "Cloud + messaging",
  },
];

function Tilt({ children, i }: { children: React.ReactNode; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${-py * 5}deg) rotateY(${px * 6}deg) translateY(-4px)`;
        el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
        el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (el) el.style.transform = "";
      }}
      className="card group p-8 h-full transition-transform duration-300 will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(74,222,128,0.09), transparent 62%)",
        }}
      />
      {children}
    </motion.div>
  );
}

export default function Pillars() {
  return (
    <section id="system" className="wrap py-24 md:py-32">
      <div className="eyebrow mb-4">What it does</div>
      <SplitText
        text="Growing is mostly attention. Verde pays it for you."
        className="font-display-xl t-big max-w-[1100px] mb-20"
        accentLast={3}
      />

      <div className="grid md:grid-cols-3 gap-5">
        {pillars.map((p, i) => (
          <Tilt key={p.t} i={i}>
            <div className="eyebrow mb-7 relative z-10">{`0${i + 1} — ${p.k}`}</div>
            <h3 className="text-[23px] mb-3.5 relative z-10">{p.t}</h3>
            <p className="text-[15px] leading-[1.75] muted relative z-10">{p.d}</p>
          </Tilt>
        ))}
      </div>
    </section>
  );
}
