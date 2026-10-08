"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

/* Live-feeling telemetry: seeded random walks, animated sparklines, a radial
   gauge and counters that only run once the panel is actually on screen. */

type Series = { key: string; label: string; unit: string; min: number; max: number; seed: number };

const SERIES: Series[] = [
  { key: "temp", label: "Water temp", unit: "°C", min: 20.4, max: 22.6, seed: 21.4 },
  { key: "ph", label: "Nutrient pH", unit: "", min: 5.9, max: 6.5, seed: 6.2 },
  { key: "rh", label: "Humidity", unit: "%", min: 58, max: 71, seed: 64 },
  { key: "ec", label: "Conductivity", unit: "mS", min: 1.1, max: 1.9, seed: 1.4 },
];

function useWalk(s: Series, live: boolean, points = 44) {
  const [data, setData] = useState<number[]>(() =>
    Array.from({ length: points }, (_, i) => s.seed + Math.sin(i / 5) * (s.max - s.min) * 0.18)
  );

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1];
        const drift = (Math.random() - 0.5) * (s.max - s.min) * 0.14;
        const pull = (s.seed - last) * 0.08;
        const next = Math.min(s.max, Math.max(s.min, last + drift + pull));
        return [...prev.slice(1), next];
      });
    }, 1400);
    return () => clearInterval(id);
  }, [live, s]);

  return data;
}

function Spark({ data, min, max }: { data: number[]; min: number; max: number }) {
  const d = useMemo(() => {
    const w = 100;
    const h = 30;
    const span = max - min || 1;
    return data
      .map((v, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((v - min) / span) * h;
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
  }, [data, min, max]);

  const area = `${d} L100,30 L0,30 Z`;

  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-9 overflow-visible">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(74,222,128)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="rgb(74,222,128)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sparkFill)" />
      <path
        d={d}
        fill="none"
        stroke="rgb(74,222,128)"
        strokeWidth="1.1"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Counter({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const ctrl = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = v.toFixed(decimals);
      },
    });
    return () => ctrl.stop();
  }, [inView, to, decimals]);

  return <span ref={ref}>0</span>;
}

function Gauge({ value }: { value: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <svg ref={ref} viewBox="0 0 130 130" className="w-[150px] h-[150px] -rotate-90">
      <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
      <motion.circle
        cx="65"
        cy="65"
        r={r}
        fill="none"
        stroke="rgb(74,222,128)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: inView ? c - (value / 100) * c : c }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

export default function Telemetry() {
  const ref = useRef<HTMLDivElement>(null);
  const live = useInView(ref, { margin: "-10%" });

  return (
    <section id="telemetry" className="wrap py-24 md:py-32" ref={ref}>
      <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
        <div>
          <div className="eyebrow mb-4">Live telemetry</div>
          <h2 className="font-display-xl t-big max-w-[900px]">
            The system is always reporting.
          </h2>
        </div>
        <div className="chip">
          <i className="dot animate-pulse" /> Streaming · Firebase RTDB
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
        {/* sparkline grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {SERIES.map((s, i) => (
            <SeriesCard key={s.key} s={s} live={live} delay={i * 0.07} />
          ))}
        </div>

        {/* reservoir gauge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="card p-8 flex flex-col items-center justify-center text-center"
        >
          <div className="eyebrow mb-7">Reservoir</div>
          <div className="relative">
            <Gauge value={82} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="display text-[40px]">
                <Counter to={82} />
                <span className="text-[20px] muted">%</span>
              </span>
            </div>
          </div>
          <p className="text-[13px] muted mt-6 max-w-[220px]">
            Ultrasonic level, sampled every 30 s. Refill alert fires below 15%.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function SeriesCard({ s, live, delay }: { s: Series; live: boolean; delay: number }) {
  const data = useWalk(s, live);
  const latest = data[data.length - 1];
  const prev = data[data.length - 2] ?? latest;
  const up = latest >= prev;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="card p-6"
    >
      <div className="flex items-start justify-between mb-5">
        <span className="eyebrow">{s.label}</span>
        <span
          className={`mono text-[10px] ${up ? "accent" : "muted"}`}
          aria-label={up ? "rising" : "falling"}
        >
          {up ? "▲" : "▼"}
        </span>
      </div>
      <div className="display text-[30px] mb-3 tabular-nums">
        {latest.toFixed(s.key === "rh" ? 0 : 1)}
        <span className="text-[15px] muted ml-1">{s.unit}</span>
      </div>
      <Spark data={data} min={s.min} max={s.max} />
    </motion.div>
  );
}
