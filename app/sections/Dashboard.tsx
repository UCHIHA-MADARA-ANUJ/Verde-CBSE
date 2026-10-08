"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Wifi, Droplets, Thermometer, Battery, Shield, Monitor, Radio, Database, Activity, ArrowUpRight } from "lucide-react";
import SVGGauge from "../components/SVGGauge";
import Sparkline from "../components/Sparkline";
import SectionReveal from "../components/SectionReveal";
import Terminal from "../components/Terminal";
import TextScramble from "../components/TextScramble";
import TiltCard from "../components/TiltCard";
import ParallaxLayer from "../components/ParallaxLayer";

const logs = [
  "SYS: Thermal equilibrium reached",
  "CLOUD: Telemetry synced to Firebase",
  "ACT: Irrigation relay K1 triggered",
  "AI: Plant profile loaded — Tulsi",
  "WEATHER: Tomorrow 42°C — pre-irrigating",
  "WHATSAPP: Command received — पानी दो",
  "CAM: Leaf scan complete — HEALTHY",
  "NPK: N:45 P:23 K:67 — optimal",
  "TANK: Level 78% — nominal",
  "UV: Grow lights ON — photoperiod active",
  "RAIN: Sensor triggered — irrigation paused",
  "ML: Disease model confidence 91.3%",
];

const stats = [
  { label: "Soil Moisture", value: 68, suffix: "%", icon: Droplets, color: "#22c55e", trend: [62, 65, 64, 67, 68, 66, 68, 69] },
  { label: "Ambient Temp", value: 24, suffix: "°C", icon: Thermometer, color: "#22d3ee", trend: [22, 23, 24, 25, 24, 23, 24, 24] },
  { label: "Network Signal", value: -42, suffix: "dBm", icon: Wifi, color: "#a855f7", trend: [-45, -44, -43, -42, -42, -43, -42, -42] },
  { label: "Battery Health", value: 97, suffix: "%", icon: Battery, color: "#f59e0b", trend: [99, 98, 97, 97, 96, 97, 97, 97] },
];

export default function Dashboard() {
  const [liveLogs, setLiveLogs] = useState<string[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setLiveLogs((prev) => {
        const next = [`[${new Date().toLocaleTimeString("en-GB")}] ${logs[Math.floor(Math.random() * logs.length)]}`, ...prev].slice(0, 8);
        return next;
      });
      // noop — triggers re-render via liveLogs change
    }, 3500);
    return () => clearInterval(interval);
  }, [isInView]);

  const dashboards = [
    { icon: Monitor, title: "VISUALIZER", desc: "Deep-layer neural visualization of plant health metrics.", detail: "MOISTURE PRECISION 89%", color: "#22c55e" },
    { icon: Shield, title: "PROTOCOL", desc: "Automated defense monitoring environmental anomalies.", detail: "TEMP: 24.2°C · HUMID: 62%", color: "#22d3ee" },
    { icon: Radio, title: "LOGIC NODE", desc: "Asynchronous cloud commands via Firebase RTDB.", detail: "FIREBASE_CONN: ESTABLISHED", color: "#a855f7" },
    { icon: Database, title: "ECO-SYNC", desc: "Distributed ledger for botanical growth logs.", detail: "DATABASE LOAD: 0.02ms", color: "#f59e0b" },
  ];

  return (
    <section id="dashboard" ref={sectionRef} className="relative z-10 py-32 px-6 overflow-hidden">
      {/* Parallax background */}
      <ParallaxLayer speed={0.2} className="absolute inset-0 z-0" opacity={[0.5, 0]}>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-cyan-500/2 blur-[100px]" />
      </ParallaxLayer>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionReveal className="mb-16">
          <span className="section-label">02 // CENTRAL INTELLIGENCE</span>
          <h2 className="section-heading">
            Live{" "}
            <TextScramble text="Telemetry" as="span" trigger="hover-once" className="text-primary text-neon italic" />
          </h2>
          <div className="h-px w-24 bg-primary/40" />
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {stats.map((s, i) => (
            <SectionReveal key={s.label} delay={i * 0.08}>
              <TiltCard className="glass p-6 rounded-[2.5rem] border border-white/10 text-center group hover:border-primary/40 transition-all duration-500 h-full" tiltDegree={6}>
                <div className="p-3 rounded-2xl bg-white/5 mb-4 group-hover:bg-primary/20 transition-colors inline-flex">
                  <s.icon className="text-primary group-hover:animate-pulse" size={22} />
                </div>
                <div className="flex justify-center mb-3">
                  <SVGGauge value={s.value} max={s.label === "Network Signal" ? -30 : 100} suffix={s.suffix} color={s.color} delay={i * 0.15} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold font-mono">{s.label}</div>
                <div className="mt-2 flex justify-center">
                  <Sparkline data={s.trend} width={80} height={24} color={s.color} delay={i * 0.15} />
                </div>
              </TiltCard>
            </SectionReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-heading font-black uppercase tracking-tighter text-white">
                <TextScramble text="CENTRAL INTELLIGENCE" trigger="hover-once" speed={20} />
              </h3>
              <span className="font-mono text-[10px] text-primary/60 uppercase tracking-widest">V3.0.0 LIVE TELEMETRY</span>
            </div>
            <Terminal
              title="system_log — LIVE"
              lines={liveLogs.length ? liveLogs : ["[SYSTEM] Initializing telemetry stream...", "[SYSTEM] Connection established. Waiting for data..."]}
              maxLines={8}
              live
            />
            <div className="flex items-center gap-4">
              <span className="text-sm font-heading font-black text-white">Efficiency:</span>
              <TextScramble text="A+" as="span" trigger="hover-once" speed={15} className="text-2xl font-black text-primary" />
              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary/60"
                  initial={{ width: 0 }}
                  whileInView={{ width: "96%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {dashboards.map((m, i) => (
              <SectionReveal key={m.title} delay={i * 0.1}>
                <TiltCard className="glass p-6 rounded-[2.5rem] border border-white/5 hover:border-primary/30 transition-all duration-500 group h-full" tiltDegree={6}>
                  <div className="flex items-center justify-between mb-3">
                    <m.icon size={22} style={{ color: m.color }} />
                    <ArrowUpRight size={14} className="text-white/20 group-hover:text-primary transition-colors" />
                  </div>
                  <h4 className="text-lg font-heading font-black uppercase tracking-tighter text-white mb-2 group-hover:text-primary transition-colors">
                    <TextScramble text={m.title} trigger="hover-once" speed={20} />
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">{m.desc}</p>
                  <div className="font-mono text-[10px]" style={{ color: `${m.color}80` }}>
                    {m.detail}
                  </div>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
