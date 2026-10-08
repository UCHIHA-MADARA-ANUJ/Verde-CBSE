"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight, Cpu, Wrench, Code, Beaker } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  stage: string;
  color: string;
  icon: typeof Cpu;
  gradient: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "pcb-design",
    title: "PCB Design in KiCad",
    caption: "Custom PCB layout with LM2596 buck converter, ESP8266, sensor headers, and opto-coupled relay isolation.",
    stage: "Hardware Design",
    color: "#22c55e",
    icon: Cpu,
    gradient: "from-green-900/40 via-emerald-900/20 to-transparent",
  },
  {
    id: "soldering",
    title: "Soldering Session",
    caption: "Through-hole and SMD soldering of the sensor array, voltage regulators, and ESP8266 core module.",
    stage: "Assembly",
    color: "#22d3ee",
    icon: Wrench,
    gradient: "from-cyan-900/40 via-teal-900/20 to-transparent",
  },
  {
    id: "firmware",
    title: "Firmware Development",
    caption: "1,200+ lines of C++ firmware with async WiFi stack, Firebase RTDB sync, and fuzzy logic irrigation.",
    stage: "Software",
    color: "#a855f7",
    icon: Code,
    gradient: "from-purple-900/40 via-violet-900/20 to-transparent",
  },
  {
    id: "testing",
    title: "Sensor Calibration",
    caption: "Calibrating the DHT22 temperature/humidity sensor and capacitive soil moisture probe against reference instruments.",
    stage: "Testing",
    color: "#f59e0b",
    icon: Beaker,
    gradient: "from-amber-900/40 via-yellow-900/20 to-transparent",
  },
  {
    id: "integration",
    title: "System Integration",
    caption: "Connecting all subsystems: sensors → ESP8266 → Firebase → Dashboard. End-to-end data flow verified.",
    stage: "Integration",
    color: "#22c55e",
    icon: Cpu,
    gradient: "from-green-900/40 via-emerald-900/20 to-transparent",
  },
  {
    id: "exhibition",
    title: "Exhibition Ready",
    caption: "Final system assembled in acrylic enclosure. Live demo showing real-time telemetry and autonomous irrigation.",
    stage: "Deployment",
    color: "#22d3ee",
    icon: Wrench,
    gradient: "from-cyan-900/40 via-teal-900/20 to-transparent",
  },
];

export default function GallerySection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selectedIndex = selectedId ? galleryItems.findIndex((g) => g.id === selectedId) : -1;

  const selected = galleryItems.find((g) => g.id === selectedId);

  return (
    <section id="gallery" className="relative z-10 py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">{'// BUILD DIARY'}</span>
          <h2 className="section-heading text-center">
            THE{" "}
            <span className="text-primary text-neon italic">PROCESS.</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-xl mx-auto">
            From bare PCB to exhibition-ready system. Every stage documented.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              onClick={() => setSelectedId(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ minHeight: i === 0 ? "400px" : "200px" }}
            >
              {/* Gradient placeholder background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-all duration-500 ${
                  hoveredId === item.id ? "scale-110" : "scale-100"
                }`}
              />

              {/* Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[8px] uppercase tracking-wider px-2 py-1 rounded-full border"
                    style={{
                      color: `${item.color}CC`,
                      borderColor: `${item.color}30`,
                      backgroundColor: `${item.color}10`,
                    }}
                  >
                    {item.stage}
                  </span>
                  <motion.div
                    className="p-1.5 rounded-full bg-black/50 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ZoomIn size={12} className="text-white" />
                  </motion.div>
                </div>

                <div>
                  <div
                    className="p-2 rounded-lg inline-block mb-2 transition-all duration-300"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon size={16} style={{ color: item.color }} />
                  </div>
                  <h3 className="text-lg font-heading font-black uppercase tracking-tighter text-white">
                    {item.title}
                  </h3>
                  <motion.p
                    className="text-xs text-slate-300 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.caption}
                  </motion.p>
                </div>
              </div>

              {/* Hover border glow */}
              <div
                className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ borderColor: `${item.color}40` }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass p-8 rounded-3xl max-w-lg w-full border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      backgroundColor: `${selected.color}15`,
                      border: `1px solid ${selected.color}30`,
                    }}
                  >
                    <selected.icon size={24} style={{ color: selected.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-black uppercase tracking-tighter text-white">
                      {selected.title}
                    </h3>
                    <span
                      className="font-mono text-[8px] uppercase tracking-wider"
                      style={{ color: `${selected.color}80` }}
                    >
                      {selected.stage}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  className="p-2 rounded-full border border-white/10 text-white/40 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div
                className="w-full aspect-video rounded-2xl mb-4 bg-gradient-to-br flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${selected.color}20, ${selected.color}05)`,
                }}
              >
                <selected.icon size={64} style={{ color: selected.color, opacity: 0.3 }} />
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {selected.caption}
              </p>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <button
                  onClick={() => {
                    const prev = (selectedIndex - 1 + galleryItems.length) % galleryItems.length;
                    setSelectedId(galleryItems[prev].id);
                  }}
                  className="flex items-center gap-2 text-xs font-mono text-white/40 hover:text-primary transition-colors"
                >
                  <ChevronLeft size={14} /> Previous
                </button>
                <span className="text-xs font-mono text-white/20">
                  {selectedIndex + 1} / {galleryItems.length}
                </span>
                <button
                  onClick={() => {
                    const next = (selectedIndex + 1) % galleryItems.length;
                    setSelectedId(galleryItems[next].id);
                  }}
                  className="flex items-center gap-2 text-xs font-mono text-white/40 hover:text-primary transition-colors"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
