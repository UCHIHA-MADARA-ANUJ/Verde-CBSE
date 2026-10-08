"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, X } from "lucide-react";
import SectionReveal from "../components/SectionReveal";
import SVGGauge from "../components/SVGGauge";
import TextScramble from "../components/TextScramble";
import TiltCard from "../components/TiltCard";

const categories = ["ALL", "HERB", "VEGETABLE", "FLOWER", "SUCCULENT"];

const plants = [
  { name: "TULSI", category: "HERB", moisture: 72, temp: "22–32°C", light: "10h/day", npk: "5:10:5", growth: "12–16 weeks", difficulty: 2 },
  { name: "TOMATO", category: "VEGETABLE", moisture: 67, temp: "20–30°C", light: "12h/day", npk: "10:15:10", growth: "10–14 weeks", difficulty: 3 },
  { name: "CUCUMBER", category: "VEGETABLE", moisture: 77, temp: "22–30°C", light: "11h/day", npk: "8:12:8", growth: "8–12 weeks", difficulty: 2 },
  { name: "MONEY PLANT", category: "HERB", moisture: 57, temp: "18–30°C", light: "8h/day", npk: "3:5:3", growth: "6–8 weeks", difficulty: 1 },
  { name: "ROSE", category: "FLOWER", moisture: 62, temp: "20–28°C", light: "10h/day", npk: "6:10:6", growth: "16–24 weeks", difficulty: 4 },
  { name: "CACTUS", category: "SUCCULENT", moisture: 30, temp: "25–35°C", light: "14h/day", npk: "2:5:2", growth: "24–48 weeks", difficulty: 1 },
  { name: "MINT", category: "HERB", moisture: 75, temp: "20–28°C", light: "9h/day", npk: "4:8:4", growth: "8–10 weeks", difficulty: 2 },
  { name: "ALOE VERA", category: "SUCCULENT", moisture: 40, temp: "22–35°C", light: "12h/day", npk: "2:4:2", growth: "20–30 weeks", difficulty: 1 },
];

const categoryColors: Record<string, string> = {
  HERB: "#22c55e",
  VEGETABLE: "#22d3ee",
  FLOWER: "#a855f7",
  SUCCULENT: "#f59e0b",
};

export default function PlantLibrary() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = plants.filter((p) => {
    const matchCat = activeCategory === "ALL" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="plants" className="relative z-10 py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="mb-16">
          <span className="section-label">06 // PLANT_DB</span>
          <h2 className="section-heading">
            THE{" "}
            <TextScramble text="PLANT LIBRARY." as="span" trigger="hover-once" className="text-primary text-neon italic" />
          </h2>
          <p className="text-xl text-slate-300 font-medium">20+ plant profiles. Every threshold calibrated. Every need anticipated.</p>
          <div className="h-px w-24 bg-primary/40 mt-8" />
        </SectionReveal>

        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-wider border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-white/5 border-white/10 text-white/50 hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search profiles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-primary/40 placeholder:text-white/20"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((p, i) => {
              const color = categoryColors[p.category] || "#22c55e";
              const isExpanded = expanded === p.name;
              return (
                <motion.div
                  key={p.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <TiltCard
                    className="glass p-5 rounded-[2rem] border-white/5 hover:border-primary/40 transition-all duration-500 group cursor-pointer h-full"
                    tiltDegree={6}
                  >
                    <div
                      onClick={() => setExpanded(isExpanded ? null : p.name)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-mono text-[10px] uppercase tracking-[0.4em] flex items-center gap-2" style={{ color: `${color}80` }}>
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                          {p.name}
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider border" style={{ borderColor: `${color}20`, color: `${color}80`, backgroundColor: `${color}10` }}>
                          {p.category}
                        </span>
                      </div>
                      <div className="h-px w-full bg-white/5 mb-3" />
                      <div className="flex justify-center mb-3">
                        <SVGGauge value={p.moisture} max={100} suffix="%" color={color} size={70} delay={i * 0.05} label="Moisture" />
                      </div>
                      <div className="space-y-1.5 font-mono text-[10px] text-white/50">
                        {Object.entries({ TEMP: p.temp, "LIGHT HRS": p.light, "NPK": p.npk, GROWTH: p.growth }).map(([k, v]) => (
                          <div key={k} className="flex justify-between">
                            <span className="text-white/30">{k}</span>
                            <span className="text-white/70">{v}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="font-mono text-[9px] text-primary/80 uppercase tracking-wider">PROFILE ACTIVE</span>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <div
                              key={idx}
                              className="w-1 h-3 rounded-full"
                              style={{
                                backgroundColor: idx < p.difficulty ? color : "rgba(255,255,255,0.1)",
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 pt-3 border-t border-white/5 font-mono text-[10px] text-white/40 space-y-1">
                              <div>DIFFICULTY: {["Easy", "Easy", "Medium", "Hard", "Expert"][p.difficulty - 1]}</div>
                              <div>AI_THRESHOLDS: LOADED</div>
                              <div>GROWTH_TRACKING: ENABLED</div>
                              <div>IRRIGATION_MODE: AUTO</div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <SectionReveal delay={0.3} className="mt-10 text-center">
          <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em]">+12 MORE PROFILES IN DATABASE // UPDATED MONTHLY</span>
        </SectionReveal>
      </div>
    </section>
  );
}
