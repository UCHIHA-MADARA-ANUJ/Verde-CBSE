"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Lightbulb, Pen, Cpu, Code, Cloud, Rocket, Sparkles, ArrowRight } from "lucide-react";

interface Milestone {
  date: string;
  title: string;
  description: string;
  icon: typeof Lightbulb;
  color: string;
  status: "completed" | "in-progress" | "upcoming";
}

const milestones: Milestone[] = [
  {
    date: "JAN 2024",
    title: "Idea Conception",
    description: "Identified the problem: manual irrigation leads to 40% water waste. Envisioned an autonomous system that combines IoT, AI, and cloud intelligence.",
    icon: Lightbulb,
    color: "#22c55e",
    status: "completed",
  },
  {
    date: "FEB 2024",
    title: "First Prototype",
    description: "Breadboard prototype with ESP8266, soil moisture sensor, and relay module. Basic pump control via web interface. Proof of concept established.",
    icon: Pen,
    color: "#22d3ee",
    status: "completed",
  },
  {
    date: "MAR 2024",
    title: "PCB v1 Design",
    description: "Designed custom PCB in KiCad with voltage regulation (LM2596 BUCK), opto-coupled relay isolation, and sensor headers. First batch fabricated.",
    icon: Cpu,
    color: "#a855f7",
    status: "completed",
  },
  {
    date: "APR 2024",
    title: "Firmware v21",
    description: "1,200+ lines of C++ firmware with async WiFi stack, Firebase RTDB sync, fuzzy logic irrigation, disease detection pipeline, and multi-sensor polling.",
    icon: Code,
    color: "#f59e0b",
    status: "completed",
  },
  {
    date: "MAY 2024",
    title: "Cloud Integration",
    description: "Firebase RTDB schema finalized. OpenWeatherMap API integrated for predictive irrigation. Twilio WhatsApp bot deployed. Real-time telemetry dashboard built.",
    icon: Cloud,
    color: "#22c55e",
    status: "completed",
  },
  {
    date: "JUN 2024",
    title: "Exhibition Ready",
    description: "Full system integration: hardware + firmware + cloud + dashboard. Exhibition kiosk mode configured. Documentation complete. Ready for science exhibition.",
    icon: Rocket,
    color: "#22d3ee",
    status: "completed",
  },
  {
    date: "FUTURE",
    title: "What's Next",
    description: "Solar power integration, cellular IoT (NB-IoT) for rural areas, multi-pod mesh networking, and advanced ML models for real-time disease classification.",
    icon: Sparkles,
    color: "#a855f7",
    status: "upcoming",
  },
];

export default function InteractiveTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const timelineWidth = milestones.length * 320 + 80;

  return (
    <div ref={containerRef} className="relative py-20 overflow-hidden">
      {/* Section label */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label">10 // THE JOURNEY</span>
        <h2 className="section-heading text-center">
          FROM IDEA TO{" "}
          <span className="text-primary text-neon italic">EXHIBITION.</span>
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Six months of engineering. One mission: redefine autonomous agriculture.
        </p>
      </motion.div>

      {/* Timeline track */}
      <div className="relative">
        {/* Central line - animated */}
        <motion.div
          className="absolute top-1/2 left-0 h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"
          style={{
            width: `${timelineWidth}px`,
            left: "50%",
            marginLeft: `-${timelineWidth / 2}px`,
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Milestones */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-8 px-8 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {milestones.map((m, i) => {
            const isActive = activeMilestone === i;
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={i}
                className="snap-start flex-shrink-0 w-[280px]"
                initial={{ opacity: 0, y: isEven ? 40 : -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onMouseEnter={() => setActiveMilestone(i)}
                onMouseLeave={() => setActiveMilestone(null)}
              >
                <div
                  className={`relative ${isEven ? "pt-20" : "pb-20"}`}
                >
                  {/* Connector line */}
                  <motion.div
                    className={`absolute left-1/2 -translate-x-1/2 w-0.5 ${
                      isEven ? "top-8 bottom-0" : "top-0 bottom-8"
                    }`}
                    style={{
                      background: `linear-gradient(to ${isEven ? "bottom" : "top"}, ${m.color}, transparent)`,
                      opacity: isActive ? 1 : 0.3,
                    }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                  />

                  {/* Node circle */}
                  <motion.div
                    className={`absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-black z-10 ${
                      isEven ? "top-8" : "bottom-8"
                    }`}
                    style={{ borderColor: m.color }}
                    animate={
                      isActive
                        ? {
                            scale: 1.2,
                            boxShadow: `0 0 20px ${m.color}40`,
                          }
                        : {
                            scale: m.status === "upcoming" ? 0.8 : 1,
                            boxShadow: "none",
                          }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <m.icon
                      size={12}
                      style={{ color: m.color }}
                      className={isActive ? "animate-pulse" : ""}
                    />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    className={`glass p-5 rounded-2xl border cursor-pointer group ${
                      isEven ? "mt-0" : "mt-0"
                    } ${
                      isActive
                        ? "border-primary/40 shadow-[0_0_30px_rgba(34,197,94,0.08)]"
                        : "border-white/5"
                    }`}
                    animate={
                      isActive
                        ? { y: isEven ? -4 : 4 }
                        : { y: 0 }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    {/* Date badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="font-mono text-[8px] uppercase tracking-wider px-2 py-1 rounded-full border"
                        style={{
                          color: `${m.color}CC`,
                          borderColor: `${m.color}30`,
                          backgroundColor: `${m.color}10`,
                        }}
                      >
                        {m.date}
                      </span>
                      <span
                        className={`font-mono text-[7px] uppercase tracking-wider ${
                          m.status === "completed"
                            ? "text-primary/60"
                            : m.status === "in-progress"
                            ? "text-yellow-500/60"
                            : "text-white/20"
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>

                    <h3 className="text-base font-heading font-black uppercase tracking-tighter text-white mb-2 group-hover:text-primary transition-colors">
                      {m.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {m.description}
                    </p>

                    {/* Progress indicator */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: m.color }}
                          initial={{ width: 0 }}
                          whileInView={{
                            width: m.status === "completed" ? "100%" : m.status === "in-progress" ? "60%" : "0%",
                          }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + 0.5, duration: 0.8 }}
                        />
                      </div>
                      <ArrowRight
                        size={10}
                        className={`text-white/20 group-hover:text-primary transition-colors ${
                          isActive ? "translate-x-0.5" : ""
                        }`}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5"
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight size={12} className="text-primary" />
          <span className="font-mono text-[8px] text-primary/60 uppercase tracking-wider">
            Scroll to explore the journey
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
