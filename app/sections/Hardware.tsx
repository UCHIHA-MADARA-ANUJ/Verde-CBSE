"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Cpu, Zap, Radio, HardDrive, Gauge, Droplets, Sun, Thermometer, Camera, Leaf, ChevronRight, Wifi, CircuitBoard } from "lucide-react";
import SectionReveal from "../components/SectionReveal";
import SVGGauge from "../components/SVGGauge";
import TextScramble from "../components/TextScramble";
import TiltCard from "../components/TiltCard";
import ParallaxLayer from "../components/ParallaxLayer";
import HardwareDiagram from "../components/HardwareDiagram";

const nodes = [
  { icon: Droplets, title: "FLUIDICS NODE", desc: "DC 5V / 1.5A PUMP ARRAY. Controls water pump via relay K1 with zero-cross detection.", specs: ["Voltage: 5V DC", "Current: 1.5A max", "Relay: K1 SPDT", "Flow: 2.4L/min"] },
  { icon: Sun, title: "PHOTON ARRAY", desc: "CDS photo-resistive mapping. Ambient light detection drives UV grow light array.", specs: ["Sensor: CDS LDR", "Spectrum: 380-780nm", "Driver: MOSFET PWM", "Array: 12x LED"] },
  { icon: Thermometer, title: "DHT22 THERMAL", desc: "Dual sensor — temp + humidity. ±0.5°C accuracy, 1Hz sampling.", specs: ["Range: -40~80°C", "Accuracy: ±0.5°C", "Humidity: 0-100%", "Protocol: 1-Wire"] },
  { icon: Radio, title: "HC-SR04 TANK", desc: "Ultrasonic water tank level. 2cm-400cm range, push notification at <15%.", specs: ["Range: 2-400cm", "Precision: ±3mm", "Trigger: <15%", "Freq: 40kHz"] },
  { icon: Camera, title: "OV2640 VISION", desc: "Plant health imaging — 2MP. Feeds TensorFlow Lite ML pipeline.", specs: ["Resolution: UXGA 2MP", "Interface: SCCB/I2C", "ML: TFLite v1.2", "FPS: 15 max"] },
  { icon: Leaf, title: "NPK SOIL PROBE", desc: "Nitrogen · Phosphorus · Potassium. RS485 Modbus protocol, real-time readings.", specs: ["Protocol: RS485", "Baud: 9600", "Accuracy: ±2%", "Depth: 20cm"] },
];

const quickStats = [
  { label: "CPU Clock", value: 160, suffix: "MHz", icon: Cpu, max: 200 },
  { label: "Flash Mem", value: 4, suffix: "MB", icon: HardDrive, max: 8 },
  { label: "ADC Res", value: 10, suffix: "bit", icon: Gauge, max: 12 },
  { label: "WiFi Std", value: 80, suffix: "2.11n", icon: Wifi, max: 100 },
];

export default function Hardware() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="hardware" ref={ref} className="relative z-10 py-32 px-6 overflow-hidden">
      {/* Parallax background */}
      <ParallaxLayer speed={0.15} className="absolute inset-0 z-0" opacity={[0.4, 0]}>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/2 blur-[100px]" />
      </ParallaxLayer>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionReveal className="mb-16">
          <span className="section-label">03 // THE PHYSICAL LAYER</span>
          <h2 className="section-heading">
            HARDWARE{" "}
            <TextScramble text="FABRICATION." as="span" trigger="hover-once" className="text-primary text-neon italic" />
          </h2>
          <div className="h-px w-24 bg-primary/40" />
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {quickStats.map((s, i) => (
            <SectionReveal key={s.label} delay={i * 0.08}>
              <TiltCard className="glass p-5 rounded-[2.5rem] border border-white/10 text-center group hover:border-primary/40 transition-all duration-500" tiltDegree={6}>
                <div className="p-3 rounded-2xl bg-white/5 mb-3 group-hover:bg-primary/20 transition-colors inline-flex">
                  <s.icon className="text-primary" size={20} />
                </div>
                <div className="flex justify-center mb-2">
                  <SVGGauge value={s.value} max={s.max} suffix={s.suffix} color="#22c55e" delay={i * 0.15} size={70} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold font-mono">{s.label}</div>
              </TiltCard>
            </SectionReveal>
          ))}
        </div>

        {/* PCB/Sensor System Diagram */}
        <SectionReveal className="mb-10">
          <TiltCard className="glass p-6 md:p-8 rounded-[2.5rem] border-primary/10 hover:border-primary/40 transition-all duration-500 group" tiltDegree={4}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                <CircuitBoard size={22} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-black uppercase tracking-tighter text-white group-hover:text-primary transition-colors">
                  <TextScramble text="SYSTEM TOPOLOGY" trigger="hover-once" speed={20} />
                </h3>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">ESP8266 CORE — SENSOR MESH — POWER GRID</span>
              </div>
            </div>
            <div className="w-full aspect-[2/1] relative">
              <HardwareDiagram />
            </div>
          </TiltCard>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <SectionReveal>
            <TiltCard className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden" tiltDegree={6}>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Cpu size={80} className="text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-black uppercase tracking-tighter text-white mb-5 group-hover:text-primary transition-colors">
                <TextScramble text="— ESP8266 CORE NODE" trigger="hover-once" speed={20} />
              </h3>
              <div className="space-y-3 font-mono text-[11px] text-white/50">
                {[{k:"Architecture",v:"Tensilica L106 32-bit"},{k:"Clock Speed",v:"160 MHz Burst"},{k:"Flash Memory",v:"4 MB Integrated"},{k:"Wi-Fi Stack",v:"802.11 b/g/n"},{k:"ADC Resolution",v:"10-bit Precision"},{k:"GPIO Pins",v:"17 Digital I/O"}].map((r) => (
                  <div key={r.k} className="flex justify-between items-center py-1 border-b border-white/[0.03] last:border-0">
                    <span className="text-white/30">{r.k}</span>
                    <span className="text-primary">{r.v}</span>
                  </div>
                ))}
              </div>
            </TiltCard>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <TiltCard className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden" tiltDegree={6}>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap size={80} className="text-primary" />
              </div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                  <Zap size={22} className="text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-black uppercase tracking-tighter text-white group-hover:text-primary transition-colors">
                  <TextScramble text="ENERGY GRID" trigger="hover-once" speed={20} />
                </h3>
              </div>
              <div className="h-1 bg-white/5 rounded-full mb-5 overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1.2 }} viewport={{ once: true }} />
              </div>
              <div className="space-y-3 font-mono text-[11px] text-white/50">
                {[{k:"OPERATING VOLTAGE",v:"5V DC USB-C"},{k:"PEAK LOAD CURRENT",v:"2.5 Amperes"},{k:"REGULATOR STAGE",v:"LM2596 BUCK"},{k:"ISOLATION MODE",v:"Opto-Coupled"},{k:"EFFICIENCY",v:"94%"}].map((r) => (
                  <div key={r.k} className="flex justify-between items-center py-1 border-b border-white/[0.03] last:border-0">
                    <span className="text-white/30">{r.k}</span>
                    <span className="text-primary">{r.v}</span>
                  </div>
                ))}
              </div>
            </TiltCard>
          </SectionReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {nodes.map((n, i) => (
            <SectionReveal key={n.title} delay={i * 0.08}>
              <TiltCard
                className="glass-card p-6 rounded-[2.5rem] group cursor-pointer relative overflow-hidden"
                tiltDegree={6}
                onMouseEnter={() => setActiveNode(i)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                      <n.icon size={20} className="text-primary group-hover:text-black" />
                    </div>
                    <h3 className="text-lg font-heading font-black uppercase tracking-tighter text-white group-hover:text-primary transition-colors">
                      <TextScramble text={n.title} trigger="hover-once" speed={20} />
                    </h3>
                  </div>
                  <ChevronRight size={14} className={`text-white/20 transition-transform duration-300 ${activeNode === i ? "rotate-90 text-primary" : ""}`} />
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-3">{n.desc}</p>
                <motion.div
                  initial={false}
                  animate={{ height: activeNode === i ? "auto" : 0, opacity: activeNode === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 border-t border-white/5 space-y-1 font-mono text-[10px] text-primary/70">
                    {n.specs.map((spec) => (
                      <div key={spec} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary/40" />
                        {spec}
                      </div>
                    ))}
                  </div>
                </motion.div>
                <div className="mt-3 h-px w-full bg-gradient-to-r from-primary/20 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </TiltCard>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
