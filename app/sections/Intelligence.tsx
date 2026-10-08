"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Eye, Cloud, MessageSquare, FlaskConical, Droplets, CloudRain, Sprout, Sun, BarChart3, Zap } from "lucide-react";
import SectionReveal from "../components/SectionReveal";
import Sparkline from "../components/Sparkline";
import TextScramble from "../components/TextScramble";
import TiltCard from "../components/TiltCard";

const features = [
  { icon: Eye, title: "PLANT DISEASE DETECTION", desc: "OV2640 vision module captures leaf imagery every 6 hours. TensorFlow Lite model identifies 14 disease classes before visible symptoms appear.", detail: "MODEL_ACC: 91.3% // INFERENCE: 340ms", color: "#22c55e", sparkline: [82, 85, 88, 90, 91, 91, 92, 91] },
  { icon: Cloud, title: "PREDICTIVE IRRIGATION", desc: "OpenWeatherMap API fetches 48-hour forecasts. If tomorrow exceeds 38°C, the system pre-irrigates tonight. Proactive, not reactive.", detail: "API: OpenWeatherMap // LOOKAHEAD: 48H", color: "#22d3ee", sparkline: [30, 35, 42, 38, 45, 40, 38, 43] },
  { icon: MessageSquare, title: "WHATSAPP COMMAND BOT", desc: "Twilio API integration means anyone can control Verde via WhatsApp. Send 'पानी दो' and the pump starts instantly.", detail: "PROVIDER: Twilio API // LANG: Hindi + English", color: "#a855f7", sparkline: [10, 15, 20, 25, 30, 28, 32, 35] },
  { icon: FlaskConical, title: "SOIL NPK ANALYSIS", desc: "RS485 Modbus NPK sensor reads Nitrogen, Phosphorus, and Potassium. AI cross-references against plant profiles.", detail: "PROTOCOL: RS485 Modbus // ACCURACY: ±2%", color: "#f59e0b", sparkline: [40, 42, 45, 43, 47, 48, 46, 50] },
  { icon: Droplets, title: "WATER TANK MONITOR", desc: "HC-SR04 ultrasonic sensor provides real-time tank level percentage. Push notification fires below 15%.", detail: "SENSOR: HC-SR04 // RANGE: 2cm-400cm", color: "#22c55e", sparkline: [85, 82, 78, 75, 72, 68, 65, 60] },
  { icon: CloudRain, title: "RAIN DETECTION + PAUSE", desc: "Tipping-bucket rain sensor detects rainfall and suspends all irrigation. Critical for Indian monsoon season.", detail: "TRIGGER: 0.5mm threshold // AUTO-RESUME", color: "#22d3ee", sparkline: [0, 0, 2, 5, 12, 8, 3, 0] },
  { icon: Sprout, title: "GROWTH STAGE INTELLIGENCE", desc: "AI tracks days-since-planting and auto-adjusts thresholds per growth stage. Seedlings and flowering plants get different care.", detail: "STAGES: Seedling→Vegetative→Flowering→Fruiting", color: "#a855f7", sparkline: [1, 2, 3, 4, 5, 6, 7, 8] },
  { icon: Sun, title: "UV GROW LIGHT SYSTEM", desc: "Full-spectrum UV LED array (380-780nm) enables photosynthesis after sunset. AI-managed photoperiod.", detail: "SPECTRUM: 380-780nm // PHOTOPERIOD: AI-MANAGED", color: "#f59e0b", sparkline: [0, 0, 150, 400, 800, 400, 150, 0] },
  { icon: BarChart3, title: "WATER COST ANALYTICS", desc: "System logs every litre dispensed and calculates INR cost. Dashboard shows ~40% savings vs manual irrigation.", detail: "TRACKING: Litres + INR // SAVINGS: ~40% avg", color: "#22c55e", sparkline: [100, 95, 88, 82, 75, 68, 62, 58] },
];

export default function Intelligence() {
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="intelligence" ref={ref} className="relative z-10 py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="mb-16">
          <span className="section-label">04 // INTELLIGENCE LAYER</span>
          <h2 className="section-heading">
            BEYOND{" "}
            <TextScramble text="AUTOMATION." as="span" trigger="hover-once" className="text-primary text-neon italic" />
          </h2>
          <p className="text-xl text-slate-300 font-medium">Nine systems. One brain. Zero human error.</p>
          <div className="h-px w-24 bg-primary/40 mt-8" />
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <SectionReveal key={f.title} delay={i * 0.06}>
              <TiltCard
                className="glass-card p-7 rounded-[2.5rem] group relative overflow-hidden"
                tiltDegree={6}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="p-3 rounded-xl border transition-all duration-300 group-hover:scale-110"
                    style={{ borderColor: `${f.color}30`, backgroundColor: `${f.color}10` }}
                  >
                    <f.icon size={24} style={{ color: f.color }} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary uppercase tracking-wider">ACTIVE</span>
                    <Zap size={12} className="text-primary animate-pulse" />
                  </div>
                </div>
                <h3 className="text-lg font-heading font-black uppercase tracking-tighter text-white mb-3 group-hover:text-primary transition-colors">
                  <TextScramble text={f.title} trigger="hover-once" speed={25} />
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{f.desc}</p>
                <div className="flex items-center justify-between gap-3">
                  <div className="font-mono text-[10px] text-white/20 border-t border-white/5 pt-3 flex-1">{f.detail}</div>
                  <div className="pt-3">
                    <Sparkline data={f.sparkline} width={60} height={20} color={f.color} delay={i * 0.05} fill={false} />
                  </div>
                </div>
                <div
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r transition-all duration-700"
                  style={{
                    width: hovered === i ? "100%" : "0%",
                    backgroundColor: f.color,
                    opacity: 0.5,
                  }}
                />
              </TiltCard>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
