"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { Sprout, Wifi, Droplets, Cpu, Shield, Zap, TrendingUp, Clock } from "lucide-react";

interface StatItem {
  icon: typeof Sprout;
  value: string;
  label: string;
  suffix?: string;
  color: string;
  chart?: number[];
}

const stats: StatItem[] = [
  { icon: Sprout, value: "20", label: "Plants Monitored", suffix: "+", color: "#22c55e", chart: [5, 8, 12, 15, 18, 20, 20] },
  { icon: Shield, value: "99.9", label: "System Uptime", suffix: "%", color: "#22d3ee", chart: [99, 99, 100, 99, 100, 100, 99.9] },
  { icon: Droplets, value: "42", label: "Water Saved", suffix: "%", color: "#a855f7", chart: [10, 18, 25, 32, 38, 40, 42] },
  { icon: Cpu, value: "1200", label: "Lines of C++", suffix: "+", color: "#f59e0b", chart: [200, 450, 700, 900, 1050, 1150, 1200] },
  { icon: Wifi, value: "25", label: "Cloud Latency", suffix: "ms", color: "#22c55e", chart: [80, 60, 45, 35, 30, 25, 25] },
  { icon: Zap, value: "340", label: "ML Inference", suffix: "ms", color: "#22d3ee", chart: [500, 450, 400, 380, 360, 350, 340] },
  { icon: TrendingUp, value: "8", label: "Active Nodes", suffix: "", color: "#a855f7", chart: [1, 2, 4, 5, 6, 7, 8] },
  { icon: Clock, value: "99.97", label: "Firmware Uptime", suffix: "%", color: "#f59e0b", chart: [99, 99.5, 99.8, 99.9, 99.95, 99.97, 99.97] },
];

function CountUp({ target, delay = 0 }: { target: number; delay?: number }) {
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => {
    if (Number.isInteger(target)) return Math.floor(v).toString();
    return v.toFixed(1);
  });

  useEffect(() => {
    const controls = animate(value, target, {
      delay: delay,
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [target, delay, value]);

  return <motion.span>{rounded}</motion.span>;
}

function CountingNumber({ target, suffix = "", delay = 0 }: { target: number; suffix?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <span ref={ref}>
      {isInView ? (
        <CountUp target={target} delay={delay} />
      ) : (
        "0"
      )}
      {suffix}
    </span>
  );
}

function AnimatedNumber({ value, suffix = "", delay = 0 }: { value: string; suffix?: string; delay?: number }) {
  const numValue = parseFloat(value);
  const isNumber = !isNaN(numValue);

  if (!isNumber) {
    return <span>{value}{suffix}</span>;
  }

  return (
    <CountingNumber target={numValue} suffix={suffix} delay={delay} />
  );
}

function MiniChart({ data, color, delay = 0 }: { data: number[]; color: string; delay?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 60;
  const h = 24;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`).join(" ");

  return (
    <svg width={w} height={h} className="opacity-50">
      <motion.polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3, duration: 0.8 }}
      />
    </svg>
  );
}

export default function InfographicSection() {
  return (
    <section id="infographic" className="relative z-10 py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {'// METRICS DASHBOARD'}
          </motion.span>
          <motion.h2
            className="section-heading text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            THE{" "}
            <span className="text-primary text-neon italic">NUMBERS.</span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-300 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Data-driven impact. Every metric tells a story of efficiency and innovation.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass p-5 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-500 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="p-2 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{
                    backgroundColor: `${stat.color}15`,
                    border: `1px solid ${stat.color}30`,
                  }}
                >
                  <stat.icon size={16} style={{ color: stat.color }} />
                </div>
                <div className="text-2xl md:text-3xl font-black tracking-tighter" style={{ color: stat.color }}>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} delay={i * 0.1} />
                </div>
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-2">
                {stat.label}
              </div>
              {stat.chart && (
                <MiniChart data={stat.chart} color={stat.color} delay={i * 0.1} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
