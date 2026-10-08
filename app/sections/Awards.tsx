"use client";

import { motion } from "framer-motion";
import { Award, Medal, Trophy, Star, Sparkles, Shield, BookOpen, Users } from "lucide-react";

const awards = [
  {
    icon: Trophy,
    title: "Best Science Project",
    organization: "Annual Science Exhibition 2024",
    date: "DEC 2024",
    description: "First place for most innovative IoT-integrated agricultural solution. Judges commended the system's end-to-end autonomy and practical impact.",
    color: "#22c55e",
  },
  {
    icon: Award,
    title: "Innovation in Engineering",
    organization: "Delhi STEM Fair",
    date: "NOV 2024",
    description: "Recognized for outstanding engineering design — custom PCB, firmware architecture, and real-time cloud integration working as a unified system.",
    color: "#22d3ee",
  },
  {
    icon: Medal,
    title: "Excellence in IoT",
    organization: "National Youth Tech Summit",
    date: "OCT 2024",
    description: "Awarded for exceptional IoT implementation combining ESP8266, Firebase, and ML for real-time autonomous plant care.",
    color: "#a855f7",
  },
  {
    icon: Star,
    title: "People's Choice Award",
    organization: "Open Hardware Expo",
    date: "SEP 2024",
    description: "Visitor-voted favorite project. The live demo of WhatsApp-controlled irrigation was a crowd favorite.",
    color: "#f59e0b",
  },
];

export default function AwardsSection() {
  return (
    <section id="awards" className="relative z-10 py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">{'// ACCOLADES'}</span>
          <h2 className="section-heading text-center">
            RECOGNITION &{" "}
            <span className="text-primary text-neon italic">AWARDS.</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-xl mx-auto">
            Third-party validation from science fairs, tech summits, and industry exhibitions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg flex-shrink-0"
                  style={{
                    backgroundColor: `${award.color}15`,
                    borderColor: `${award.color}30`,
                    boxShadow: `0 0 20px ${award.color}10`,
                  }}
                >
                  <award.icon size={24} style={{ color: award.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-lg font-heading font-black uppercase tracking-tighter text-white group-hover:text-primary transition-colors">
                      {award.title}
                    </h3>
                    <span
                      className="font-mono text-[8px] uppercase tracking-wider px-2 py-1 rounded-full border flex-shrink-0"
                      style={{
                        color: `${award.color}CC`,
                        borderColor: `${award.color}30`,
                        backgroundColor: `${award.color}10`,
                      }}
                    >
                      {award.date}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">
                    {award.organization}
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {award.description}
                  </p>

                  {/* Badge glow ring */}
                  <motion.div
                    className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-5 group-hover:opacity-15 transition-opacity duration-500"
                    style={{ backgroundColor: award.color }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
