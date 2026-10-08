"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Brain, Hand } from "lucide-react";
import SectionReveal from "../components/SectionReveal";
import TextScramble from "../components/TextScramble";
import TiltCard from "../components/TiltCard";

const aiFeatures = [
  "Auto moisture threshold per plant",
  "Predictive irrigation via weather API",
  "Disease detection every 6 hours",
  "Growth stage-aware adjustments",
  "Automatic UV light scheduling",
  "Real-time NPK fertilizer advice",
];

const manualFeatures = [
  "One-tap remote pump control",
  "Real-time sensor dashboard",
  "WhatsApp command interface",
  "Manual UV light override",
  "Custom threshold configuration",
  "Push notification alerts",
];

export default function Modes() {
  const [activeTab, setActiveTab] = useState<"ai" | "manual">("ai");

  return (
    <section id="modes" className="relative z-10 py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="mb-16">
          <span className="section-label">05 // DUAL PROTOCOL</span>
          <h2 className="section-heading">
            TWO MODES.{" "}
            <TextScramble text="ONE MISSION." as="span" trigger="hover-once" className="text-primary text-neon italic" />
          </h2>
          <div className="h-px w-24 bg-primary/40" />
        </SectionReveal>

        <div className="flex justify-center mb-10">
          <div className="glass p-1.5 rounded-full flex gap-1 border border-white/5">
            <button
              onClick={() => setActiveTab("ai")}
              className={`relative px-6 py-2.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                activeTab === "ai" ? "text-black font-bold" : "text-white/50 hover:text-white/80"
              }`}
            >
              {activeTab === "ai" && (
                <motion.div
                  layoutId="modeTab"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Brain size={14} /> AI Autonomous
              </span>
            </button>
            <button
              onClick={() => setActiveTab("manual")}
              className={`relative px-6 py-2.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                activeTab === "manual" ? "text-black font-bold" : "text-white/50 hover:text-white/80"
              }`}
            >
              {activeTab === "manual" && (
                <motion.div
                  layoutId="modeTab"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Hand size={14} /> User Controlled
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            {activeTab === "ai" ? (
              <motion.div
                key="ai"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <TiltCard
                  className="glass p-8 rounded-[3rem] border border-primary/20 relative overflow-hidden group hover:border-primary/40 transition-all duration-500"
                  tiltDegree={6}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                        <Brain size={22} className="text-primary" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-mono uppercase tracking-wider">AI AUTONOMOUS</span>
                    </div>
                    <h3 className="text-3xl font-heading font-black uppercase tracking-tighter text-white mb-4">
                      <TextScramble text="AI Mode" trigger="hover-once" speed={15} />
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-base mb-6">The system knows your plant. Select from 20+ pre-loaded profiles. AI sets all thresholds and manages every actuator automatically. Zero intervention.</p>
                    <div className="space-y-2 mb-6">
                      {aiFeatures.map((f, i) => (
                        <motion.div
                          key={f}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-2 font-mono text-[11px] text-white/50"
                        >
                          <span className="text-primary mt-0.5">✓</span>{f}
                        </motion.div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-primary/20 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">FULLY AUTONOMOUS</span>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                  </div>
                </TiltCard>

                <TiltCard className="glass p-8 rounded-[3rem] border border-white/5 relative overflow-hidden opacity-60 hover:opacity-100 transition-all duration-500" tiltDegree={4}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                      <Hand size={22} className="text-white/40" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/10 text-[10px] font-mono uppercase tracking-wider">USER CONTROLLED</span>
                  </div>
                  <h3 className="text-3xl font-heading font-black uppercase tracking-tighter text-white mb-4">Manual Mode</h3>
                  <p className="text-slate-300 leading-relaxed text-base mb-6">You&apos;re in control. Water when you want, stop when you want — from anywhere. The app shows every sensor reading in real time.</p>
                  <div className="space-y-2 mb-6">
                    {manualFeatures.map((f) => (
                      <div key={f} className="flex items-start gap-2 font-mono text-[11px] text-white/30">
                        <span className="text-white/20 mt-0.5">○</span>{f}
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">FULL USER CONTROL</span>
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                </TiltCard>
              </motion.div>
            ) : (
              <motion.div
                key="manual"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <TiltCard className="glass p-8 rounded-[3rem] border border-white/5 relative overflow-hidden opacity-60 hover:opacity-100 transition-all duration-500 order-2 lg:order-1" tiltDegree={4}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                      <Brain size={22} className="text-white/40" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/10 text-[10px] font-mono uppercase tracking-wider">AI AUTONOMOUS</span>
                  </div>
                  <h3 className="text-3xl font-heading font-black uppercase tracking-tighter text-white mb-4">AI Mode</h3>
                  <p className="text-slate-300 leading-relaxed text-base mb-6">The system knows your plant. Select from 20+ pre-loaded profiles. AI sets all thresholds and manages every actuator automatically.</p>
                  <div className="space-y-2 mb-6">
                    {aiFeatures.map((f) => (
                      <div key={f} className="flex items-start gap-2 font-mono text-[11px] text-white/30">
                        <span className="text-white/20 mt-0.5">○</span>{f}
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">FULLY AUTONOMOUS</span>
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                </TiltCard>

                <TiltCard
                  className="glass p-8 rounded-[3rem] border border-primary/20 relative overflow-hidden group hover:border-primary/40 transition-all duration-500 order-1 lg:order-2"
                  tiltDegree={6}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                        <Hand size={22} className="text-primary" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-mono uppercase tracking-wider">USER CONTROLLED</span>
                    </div>
                    <h3 className="text-3xl font-heading font-black uppercase tracking-tighter text-white mb-4">
                      <TextScramble text="Manual Mode" trigger="hover-once" speed={15} />
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-base mb-6">You&apos;re in control. Water when you want, stop when you want — from anywhere. The app shows every sensor reading in real time. WhatsApp bot means no app needed.</p>
                    <div className="space-y-2 mb-6">
                      {manualFeatures.map((f, i) => (
                        <motion.div
                          key={f}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-2 font-mono text-[11px] text-white/50"
                        >
                          <span className="text-primary mt-0.5">✓</span>{f}
                        </motion.div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-primary/20 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">FULL USER CONTROL</span>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
