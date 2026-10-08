"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Sprout, Download, ExternalLink, Check, Copy } from "lucide-react";
import SectionReveal from "../components/SectionReveal";
import TextScramble from "../components/TextScramble";
import MagneticButton from "../components/MagneticButton";
import RippleEffect from "../components/RippleEffect";

const stats = [
  { l: "Protocol", v: "V3.0.0", color: "#22c55e" },
  { l: "Core Status", v: "Stable", color: "#22d3ee" },
  { l: "Plant Nodes", v: "20+", color: "#a855f7" },
  { l: "Sync Rate", v: "12ms", color: "#f59e0b" },
];

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("https://verde-tech-portfolio.vercel.app");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={ref} className="relative z-10 py-32 px-6 text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        <SectionReveal>
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 md:w-28 md:h-28 mx-auto flex items-center justify-center border-2 border-primary/20 rounded-full relative"
          >
            <div className="absolute inset-0 rounded-full border border-primary/10 animate-pulse" />
            <Sprout size={48} className="text-primary" />
          </motion.div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2 className="text-6xl md:text-[10rem] font-heading font-black tracking-tighter uppercase leading-[0.75] mb-8">
            JOIN THE <br />
            <span className="text-primary animate-neon-pulse italic">
              <TextScramble text="REGROWTH." trigger="always" speed={40} className="inline-block" />
            </span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <p className="text-xl md:text-2xl text-slate-200 font-bold max-w-3xl mx-auto leading-tight italic">
            Experience the next evolution of autonomous botanical intelligence. Project Verde is live, documented, and open for review.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <RippleEffect color="rgba(34,197,94,0.2)">
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton
              as="a"
              href="#"
              className="btn-primary rounded-2xl text-base"
              strength={0.25}
              radius={160}
            >
              <Download size={18} /> Download Docs
            </MagneticButton>
            <MagneticButton
              as="a"
              href="https://github.com"
              target="_blank"
              className="btn-secondary rounded-2xl text-base"
              strength={0.25}
              radius={160}
            >
              <ExternalLink size={18} /> Access Repository
            </MagneticButton>
          </div>
          </RippleEffect>
        </SectionReveal>

        <SectionReveal delay={0.4}>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="glass px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-sm font-mono text-white/50">
              <span>verde-tech-portfolio.vercel.app</span>
              <button onClick={handleCopy} className="text-white/30 hover:text-primary transition-colors" aria-label="Copy URL">
                {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </SectionReveal>

        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <SectionReveal key={s.l} delay={0.5 + i * 0.08}>
              <div className="text-center group">
                <div className="text-[10px] font-mono uppercase tracking-[0.4em] mb-2 group-hover:text-white transition-colors duration-300" style={{ color: `${s.color}80` }}>
                  {s.l}
                </div>
                <div className="text-3xl md:text-4xl font-black group-hover:text-primary transition-colors duration-300" style={{ textShadow: `0 0 30px ${s.color}30` }}>
                  {s.v}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
