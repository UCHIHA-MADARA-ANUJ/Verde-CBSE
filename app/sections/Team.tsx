"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, MapPin, Cpu } from "lucide-react";
import SectionReveal from "../components/SectionReveal";
import TextScramble from "../components/TextScramble";

interface TeamMemberProps {
  name: string;
  badges: string[];
  initials: string;
  desc: string;
  skills: { name: string; level: number; color: string }[];
  contributions: string[];
  quote: string;
  isLead?: boolean;
  delay: number;
  location: string;
  status: string;
}

function TiltCard({ member, index }: { member: TeamMemberProps; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-6deg", "6deg"]);

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: member.delay, duration: 0.5 }}
      viewport={{ once: true }}
      className={`glass p-8 rounded-[3rem] border relative overflow-hidden group ${member.isLead ? "border-primary/20 md:col-span-2" : "border-white/5"}`}
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${member.isLead ? "via-primary/60" : "via-primary/40"} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Cpu size={80} className="text-primary" />
      </div>

      <div className="flex items-start gap-5 mb-6">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-heading font-black text-xl tracking-tighter ${member.isLead ? "bg-primary/20 text-primary border border-primary/30" : "bg-white/5 text-white/40 border border-white/10"}`}>
          {member.initials}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-2">
            {member.badges.map((b) => (
              <span key={b} className={`font-mono text-[9px] uppercase tracking-wider px-2 py-1 rounded ${member.isLead ? "bg-primary/10 text-primary/80 border border-primary/20" : "bg-white/5 text-white/40 border border-white/10"}`}>
                {b}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-heading font-black uppercase tracking-tighter text-white group-hover:text-primary transition-colors">
            <TextScramble text={member.name} trigger="hover-once" speed={25} />
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <MapPin size={10} className="text-white/30" />
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">{member.location}</span>
            <span className="text-white/10">|</span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-mono text-primary/60 uppercase tracking-wider">{member.status}</span>
          </div>
        </div>
      </div>

      <p className="text-slate-300 leading-relaxed text-sm mb-5">{member.desc}</p>

      <div className="mb-5 space-y-2">
        {member.skills.map((skill) => (
          <div key={skill.name} className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider w-20">{skill.name}</span>
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: member.delay + 0.3 }}
                viewport={{ once: true }}
              />
            </div>
            <span className="text-[10px] font-mono text-white/30 w-8 text-right">{skill.level}%</span>
          </div>
        ))}
      </div>

      <div className="space-y-1.5 mb-5">
        {member.contributions.map((c) => (
          <div key={c} className="flex items-start gap-2 font-mono text-[10px] text-white/40">
            <span className="text-primary mt-0.5">✓</span>
            {c}
          </div>
        ))}
      </div>

      <div className="border-t border-white/5 pt-4 flex items-center justify-between">
        <span className="text-sm text-white/30 italic">&ldquo;{member.quote}&rdquo;</span>
        <div className="flex gap-2">
          <a href="#" className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/30 hover:text-primary hover:border-primary/50 transition-all" aria-label="GitHub">
            <Github size={14} />
          </a>
          <a href="#" className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/30 hover:text-primary hover:border-primary/50 transition-all" aria-label="LinkedIn">
            <Linkedin size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

const teamData: TeamMemberProps[] = [
  {
    name: "ANUJ PHULERA",
    badges: ["PROJECT LEAD", "SOFTWARE ARCHITECT", "CLOUD ENGINEER"],
    initials: "AP",
    desc: "Anuj architected the entire software stack of Project Verde — from the Firebase real-time database schema to the React dashboard, from the Twilio WhatsApp integration to the TensorFlow Lite disease detection pipeline. As project lead, he defined the system architecture and drove the project from concept to exhibition-ready build.",
    skills: [
      { name: "Next.js", level: 95, color: "#22c55e" },
      { name: "Firebase", level: 92, color: "#f59e0b" },
      { name: "Embedded C++", level: 88, color: "#22d3ee" },
      { name: "TensorFlow", level: 85, color: "#a855f7" },
      { name: "Python", level: 90, color: "#22c55e" },
    ],
    contributions: [
      "Designed full Firebase RTDB schema and cloud architecture",
      "Built ESPDash V2 real-time web dashboard",
      "Integrated OpenWeatherMap predictive irrigation API",
      "Implemented Twilio WhatsApp bot (Hindi + English)",
      "Trained TensorFlow Lite plant disease detection model",
      "Wrote 1,200+ lines of ESP8266 firmware in C++",
      "Designed plant profile AI database (20+ profiles)",
      "Led project architecture and hardware-software integration",
    ],
    quote: "Build it so it works when you're not watching.",
    isLead: true,
    delay: 0,
    location: "Delhi, India",
    status: "Online",
  },
  {
    name: "AARAV CHOUDHARY",
    badges: ["HARDWARE NODE", "PCB DESIGNER", "EMBEDDED SYSTEMS"],
    initials: "AC",
    desc: "Aarav designed and fabricated the entire physical layer of Project Verde — custom PCB layout, component selection, power delivery network, and sensor array integration. His hardware decisions directly enable the system's 99.9% uptime and sub-25ms response times.",
    skills: [
      { name: "PCB Design", level: 94, color: "#22c55e" },
      { name: "KiCad", level: 90, color: "#22d3ee" },
      { name: "Soldering", level: 92, color: "#f59e0b" },
      { name: "ESP8266", level: 88, color: "#a855f7" },
      { name: "Power Electronics", level: 85, color: "#22c55e" },
    ],
    contributions: [
      "Designed custom PCB with KiCad",
      "Integrated ESP8266, DHT22, soil moisture, HC-SR04",
      "Built LM2596 BUCK power delivery network",
      "Opto-coupled relay array for pump control",
      "OV2640 camera module integration",
      "NPK RS485 Modbus sensor wiring",
      "UV LED grow light array assembly",
      "Rain sensor exterior installation",
    ],
    quote: "Every solder joint is a synapse.",
    delay: 0.15,
    location: "Delhi, India",
    status: "Coding",
  },
];

export default function Team() {
  return (
    <section id="team" className="relative z-10 py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="mb-16">
          <span className="section-label">09 // THE ARCHITECTS</span>
          <h2 className="section-heading">
            MEET THE{" "}
            <TextScramble text="BUILDERS." as="span" trigger="hover-once" className="text-primary text-neon italic" />
          </h2>
          <div className="h-px w-24 bg-primary/40" />
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {teamData.map((member, i) => (
            <TiltCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
