"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Leaf, Shield, Cloud, Cpu, Github, Linkedin } from "lucide-react";
import { useRef } from "react";
import SectionReveal from "../components/SectionReveal";
import TextScramble from "../components/TextScramble";
import TiltCard from "../components/TiltCard";

const cards = [
  { icon: Leaf, title: "Biological Core", desc: "Project Verde bridges biological life with autonomous digital architecture. The system orchestrates a closed-loop ecosystem where sensor data directly influences actuators, creating a self-sustaining biome.", color: "#22c55e" },
  { icon: Cloud, title: "Cloud Mesh", desc: "Real-time telemetry streams through a redundant mesh topology. Every node synchronizes with Firebase, enabling predictive modeling and fleet-wide optimization algorithms.", color: "#22d3ee" },
  { icon: Shield, title: "Autonomous Shield", desc: "A multi-layered security envelope protects the network with AES-256 encryption, hardware-isolated enclaves, and automated failover protocols.", color: "#a855f7" },
  { icon: Cpu, title: "Regenerative Stack", desc: "Built on a fault-tolerant mesh topology, each Verde pod sustains full production cycles offline. Synchronized data streams enable fleet-wide optimization.", color: "#f59e0b" },
];

function TiltCardWrapper({ card, index }: { card: typeof cards[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="glass-card p-8 rounded-[2.5rem] group cursor-pointer"
    >
      <div className="flex items-center gap-4 mb-5">
        <div
          className="p-3 rounded-xl border transition-all duration-300 group-hover:scale-110"
          style={{ borderColor: `${card.color}30`, backgroundColor: `${card.color}10` }}
        >
          <card.icon size={24} style={{ color: card.color }} />
        </div>
        <h3 className="text-xl font-heading font-black uppercase tracking-tighter text-white group-hover:text-primary transition-colors">
          <TextScramble text={card.title} trigger="hover-once" speed={25} />
        </h3>
      </div>
      <p className="text-slate-300 leading-relaxed text-sm">{card.desc}</p>
      <div
        className="mt-4 h-px w-full origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"
        style={{ backgroundColor: `${card.color}40` }}
      />
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative z-10 py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="mb-16">
          <span className="section-label">01 // PROJECT ARCHITECTURE</span>
          <h2 className="section-heading">
            DIGITAL{" "}
            <TextScramble text="ECOLOGY." as="span" trigger="hover-once" className="text-primary text-neon italic" />
          </h2>
          <div className="h-px w-24 bg-primary/40" />
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {cards.map((c, i) => (
            <TiltCardWrapper key={c.title} card={c} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SectionReveal delay={0.1}>
            <TiltCard className="glass p-7 rounded-[2.5rem] border border-white/5 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden" tiltDegree={6}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <span className="font-mono text-[10px] text-primary/60 uppercase tracking-widest mb-2 block">Hardware Node</span>
                <h3 className="text-2xl font-heading font-black uppercase tracking-tighter text-white mb-2 group-hover:text-primary transition-colors">AARAV CHOUDHARY</h3>
                <p className="text-sm text-slate-400 mb-5">ARCHITECT & PCB DESIGN</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["PCB Design", "KiCad", "Soldering", "ESP8266", "Sensor Integration"].map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a href="#" className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/30 hover:text-primary hover:border-primary/50 transition-all text-xs font-mono" aria-label="GitHub">GH</a>
                  <a href="#" className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/30 hover:text-primary hover:border-primary/50 transition-all text-xs font-mono" aria-label="LinkedIn">LI</a>
                </div>
              </div>
            </TiltCard>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <TiltCard className="glass p-7 rounded-[2.5rem] border border-primary/20 hover:border-primary/40 transition-all duration-500 group relative overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.05)]" tiltDegree={6}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <span className="font-mono text-[10px] text-primary/60 uppercase tracking-widest mb-2 block">Software Node · Project Lead</span>
                <h3 className="text-2xl font-heading font-black uppercase tracking-tighter text-white mb-2 group-hover:text-primary transition-colors">ANUJ PHULERA</h3>
                <p className="text-sm text-slate-400 mb-5">FULL-STACK & CLOUD OPS</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Next.js", "Firebase", "TensorFlow", "C++", "React", "Python"].map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a href="#" className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/30 hover:text-primary hover:border-primary/50 transition-all text-xs font-mono" aria-label="GitHub">GH</a>
                  <a href="#" className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/30 hover:text-primary hover:border-primary/50 transition-all text-xs font-mono" aria-label="LinkedIn">LI</a>
                </div>
              </div>
            </TiltCard>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
