"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const skillGroups = [
  {
    title: "LAYER_01 :: FIRMWARE",
    skills: [
      { name: "Rust / Embedded", level: 94 },
      { name: "C / RTOS", level: 91 },
      { name: "Zephyr / FreeRTOS", level: 87 },
      { name: "ARM Cortex-M", level: 89 },
    ],
  },
  {
    title: "LAYER_02 :: VISION",
    skills: [
      { name: "PyTorch / CUDA", level: 96 },
      { name: "OpenCV + GStreamer", level: 92 },
      { name: "ONNX Runtime", level: 85 },
      { name: "TensorRT", level: 88 },
    ],
  },
  {
    title: "LAYER_03 :: MESH",
    skills: [
      { name: "Kubernetes / Edge", level: 93 },
      { name: "ROS2 / DDS", level: 90 },
      { name: "MQTT / LoRaWAN", level: 86 },
      { name: "eBPF / XDP", level: 82 },
    ],
  },
  {
    title: "LAYER_04 :: INTERFACE",
    skills: [
      { name: "Next.js / WebGL", level: 95 },
      { name: "Three.js / R3F", level: 93 },
      { name: "WebAssembly", level: 84 },
      { name: "WebRTC / DataChannels", level: 80 },
    ],
  },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-baseline mb-2">
        <span className="font-mono text-xs text-white/70 group-hover:text-primary transition-colors">
          {name}
        </span>
        <span className="font-mono text-[10px] text-primary/60">{level}%</span>
      </div>
      <div className="h-1 bg-white/5 overflow-hidden relative">
        <motion.div
          className="absolute top-0 left-0 h-full bg-primary"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: "circOut" }}
        />
        <div className="absolute top-0 right-0 h-full w-px bg-white/10" />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative z-10 py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="font-mono text-[10px] text-primary/60 uppercase tracking-[0.4em] block mb-4">
            [ 00_010 :: CAPABILITY_MATRIX ]
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            System <span className="text-primary text-neon">Competencies</span>
          </h2>
          <div className="h-px w-24 bg-primary/40" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + gi * 0.15 }}
              className="glass p-8 border border-white/5"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[10px] font-mono text-primary/50 uppercase tracking-widest">
                  {group.title}
                </span>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <div className="space-y-6">
                {group.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.3 + gi * 0.15 + si * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
