"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Power, Activity, Cpu, Droplets, Cloud, Sun, Smartphone, Wifi, ChevronDown } from "lucide-react";
import SectionReveal from "../components/SectionReveal";
import TextScramble from "../components/TextScramble";

const steps = [
  { step: "STEP 01", time: "06:00 AM", title: "SYSTEM BOOT", desc: "NodeMCU powers on. Boot sequence initializes Firebase connection, loads Tulsi plant profile, establishes Wi-Fi. All nodes nominal.", snippet: "> BOOT: Kernel v3.0.0 initialized\n> NET: Firebase handshake OK\n> PROFILE: Tulsi loaded — moistureMin: 65%\n> STATE: READY", icon: Power, color: "#22c55e" },
  { step: "STEP 02", time: "06:05 AM", title: "SENSOR POLL", desc: "executeSystemPoll() fires. ADC reads moisture at 31% — below Tulsi's 65% minimum threshold.", snippet: "> SENS: moisture=31% threshold=65%\n> ALERT: Below threshold — action required\n> CAM: OV2640 capture — 640x480 OK\n> ML: No disease detected", icon: Activity, color: "#22d3ee" },
  { step: "STEP 03", time: "06:05:03 AM", title: "AI DECISION", desc: "Fuzzy logic confirms moisture deficit. System state = READY. Relay K1 activates. Pump runs for 8 seconds.", snippet: "> LOG: TRIGGER_PUMP\n> RELAY: K1 → LOW (active)\n> PUMP: Running 8.0s\n> DELAY: burstDuration=8000ms", icon: Cpu, color: "#a855f7" },
  { step: "STEP 04", time: "06:05:11 AM", title: "PUMP STOPS", desc: "Moisture re-read at 71% — within Tulsi optimal range. Relay K1 deactivates. No human intervention.", snippet: "> SENS: moisture=71% — NOMINAL\n> RELAY: K1 → HIGH (off)\n> LOG: TARGET_REACHED\n> PUMP: Idle — runtime 8.0s", icon: Droplets, color: "#22c55e" },
  { step: "STEP 05", time: "06:05:12 AM", title: "TELEMETRY PUSH", desc: "pushCloud() transmits JSON payload. Firebase updated. Dashboard live.", snippet: "> FIREBASE: PATCH /plants/tulsi\n> JSON: {moisture:71,temp:24.2,...}\n> LATENCY: 18ms\n> SYNC: OK", icon: Wifi, color: "#22d3ee" },
  { step: "STEP 06", time: "08:00 AM", title: "WEATHER CHECK", desc: "checkWeatherForecast() queries OpenWeatherMap. Tomorrow: 43°C in Delhi. Pre-irrigation scheduled for 22:00.", snippet: "> WEATHER: Delhi tomorrow 43°C max\n> AI: Threshold 38°C exceeded\n> SCHEDULE: Pre-irrigation 22:00\n> LOG: AI — Pre-irrigate scheduled", icon: Cloud, color: "#a855f7" },
  { step: "STEP 07", time: "18:30 PM", title: "LIGHTS ON", desc: "LDR detects ambient light drop below 200 lux. UV grow light array activates. Tulsi receives photoperiod.", snippet: "> LDR: 187 lux < 200 threshold\n> UV: Grow light array ON\n> SPECTRUM: 380-780nm active\n> PHOTOPERIOD: 4h remaining", icon: Sun, color: "#f59e0b" },
  { step: "STEP 08", time: "ALERT", title: "WHATSAPP STATUS", desc: "User texts 'status' from Dubai. Bot responds instantly with moisture %, temp, tank level, UV status.", snippet: "> WHATSAPP: INBOUND — 'status'\n> REPLY: Moisture 71% | Temp 24.2°C\n> TANK: 78% | UV: ON | Last: 06:05\n> LATENCY: 1.2s", icon: Smartphone, color: "#22c55e" },
];

export default function UseCase() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="usecase" ref={ref} className="relative z-10 py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="mb-16">
          <span className="section-label">08 // REAL WORLD SCENARIO</span>
          <h2 className="section-heading">
            IN{" "}
            <TextScramble text="ACTION." as="span" trigger="hover-once" className="text-primary text-neon italic" />
          </h2>
          <p className="text-xl text-slate-300 font-medium">A complete autonomous cycle. From sensor read to cloud log. Fully hands-free.</p>
          <div className="h-px w-24 bg-primary/40 mt-8" />
        </SectionReveal>

        <div className="relative">
          {/* Central line */}
          <div className="absolute left-5 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          {steps.map((s, i) => {
            const isExpanded = expanded === i;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative flex gap-5 md:gap-8 mb-6"
              >
                <div className="flex flex-col items-center z-10">
                  <motion.div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center bg-black relative"
                    style={{ borderColor: `${s.color}40` }}
                    whileHover={{ scale: 1.1, borderColor: `${s.color}80` }}
                    transition={{ duration: 0.2 }}
                  >
                    <s.icon size={18} style={{ color: s.color }} />
                    <div className="absolute inset-0 rounded-full animate-pulse-ring opacity-30" style={{ borderColor: s.color }} />
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-transparent to-transparent min-h-[30px]" />
                  )}
                </div>

                <div className="flex-1">
                  <div
                    className="glass-card p-5 md:p-6 rounded-[2rem] cursor-pointer group"
                    onClick={() => setExpanded(isExpanded ? null : i)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.4em] font-bold" style={{ color: `${s.color}80` }}>{s.step}</span>
                        <span className="text-white/20">—</span>
                        <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">{s.time}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={14} className="text-white/30 group-hover:text-primary transition-colors" />
                      </motion.div>
                    </div>
                    <h4 className="text-lg font-heading font-black uppercase tracking-tighter text-white mb-2 group-hover:text-primary transition-colors">
                      <TextScramble text={s.title} trigger="hover-once" speed={25} />
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed mb-3">{s.desc}</p>

                    <motion.div
                      initial={false}
                      animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="glass p-4 rounded-xl border border-white/5 font-mono text-[10px] leading-relaxed" style={{ color: `${s.color}90` }}>
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                          <span className="text-white/30 uppercase tracking-wider text-[9px]">Terminal Output</span>
                        </div>
                        <pre className="whitespace-pre-wrap">{s.snippet}</pre>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
