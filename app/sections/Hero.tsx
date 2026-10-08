"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, Cloud, Droplets, ChevronDown, Radio, Sparkles, ArrowUpRight, Cpu } from "lucide-react";
import { useRef } from "react";
import TextScramble from "../components/TextScramble";
import ParallaxLayer from "../components/ParallaxLayer";
import MagneticButton from "../components/MagneticButton";
import RippleEffect from "../components/RippleEffect";

const heroTitle = "VERDE";
const subtitleChars = "CHLOROPHYLL MEETS SILICON.".split("");

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const filterBlur = useTransform(scrollYProgress, [0.6, 1], ["blur(0px)", "blur(4px)"]);

  return (
    <section
      ref={containerRef}
      className="h-dvh flex flex-col items-center justify-center relative px-4 md:px-6 overflow-hidden"
    >
      {/* Multi-layer parallax background */}
      <ParallaxLayer speed={0.15} className="absolute inset-0 z-0" opacity={[1, 0.3]}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/3 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-cyan-500/2 blur-[80px]" />
      </ParallaxLayer>

      <ParallaxLayer speed={-0.1} className="absolute inset-0 z-0" opacity={[0.5, 0]}>
        <div className="absolute inset-0 grid-bg opacity-[0.03]" />
      </ParallaxLayer>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px] animate-pulse" style={{ animationDuration: "8s" }} />

      {/* Decorative HUD elements with parallax */}
      <ParallaxLayer speed={0.3} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 md:top-24 left-4 md:left-16 font-mono text-[8px] md:text-[9px] text-white/10 space-y-1 leading-relaxed">
          <div className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/30" /> SYS_VER: 3.0.0</div>
          <div className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/20" /> CLK: 160MHz</div>
          <div className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/20" /> MEM: 4MB</div>
          <div className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/20" /> WIFI: -42dBm</div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={-0.2} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 md:top-24 right-4 md:right-16 font-mono text-[8px] md:text-[9px] text-white/10 text-right space-y-1 leading-relaxed">
          <div>LAT: 28.6139° N</div>
          <div>LON: 77.209° E</div>
          <div>ALT: 216m</div>
          <div>ZONE: IST+5:30</div>
        </div>
      </ParallaxLayer>

      {/* Corner brackets with parallax */}
      <ParallaxLayer speed={0.4} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-32 left-4 md:left-16 flex flex-col gap-1">
          <div className="w-12 md:w-16 h-px bg-white/10" />
          <div className="w-8 md:w-10 h-px bg-white/10" />
          <div className="w-4 md:w-6 h-px bg-white/10" />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={-0.3} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-32 right-4 md:right-16 flex flex-col gap-1 items-end">
          <div className="w-12 md:w-16 h-px bg-white/10" />
          <div className="w-8 md:w-10 h-px bg-white/10" />
          <div className="w-4 md:w-6 h-px bg-white/10" />
        </div>
      </ParallaxLayer>

      <motion.div
        style={{ y, opacity, scale, filter: filterBlur }}
        className="relative z-10 flex flex-col items-center text-center max-w-5xl w-full"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="mb-6 md:mb-8"
        >
          <div className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <Radio size={10} className="text-primary/60" />
            NEURAL CORE ONLINE
            <Sparkles size={10} className="text-primary/60 ml-1" />
          </div>
        </motion.div>

        {/* Main title with TextScramble and character animation */}
        <h1 className="text-6xl sm:text-7xl md:text-9xl lg:text-[12rem] font-heading font-black tracking-tighter text-white mb-2 leading-none relative perspective-1000">
          <motion.span
            className="text-primary inline-block preserve-3d"
            animate={{
              textShadow: [
                "0 0 20px rgba(34,197,94,0.6), 0 0 40px rgba(34,197,94,0.3)",
                "0 0 30px rgba(34,197,94,0.9), 0 0 60px rgba(34,197,94,0.5), 0 0 80px rgba(34,197,94,0.3)",
                "0 0 20px rgba(34,197,94,0.6), 0 0 40px rgba(34,197,94,0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {heroTitle.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, rotateX: -45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
                whileHover={{ scale: 1.1, color: "#4ade80", transition: { duration: 0.2 } }}
              >
                <TextScramble text={char} trigger="hover-once" speed={30} as="span" />
              </motion.span>
            ))}
          </motion.span>
        </h1>

        {/* Subtitle with character stagger */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6"
        >
          <div className="h-px w-8 md:w-12 bg-primary/30" />
          <span className="text-[11px] md:text-sm font-mono text-primary/60 uppercase tracking-[0.3em]">Technical System Compendium</span>
          <div className="h-px w-8 md:w-12 bg-primary/30" />
        </motion.div>

        {/* Animated subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="text-lg md:text-2xl text-white/70 max-w-2xl mb-3 leading-relaxed px-2"
        >
          {subtitleChars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + i * 0.02, duration: 0.3 }}
              className={char === "C" || char === "S" ? "text-primary italic font-semibold" : ""}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2"
        >
          {[
            { icon: Zap, label: "Biometric Analytics" },
            { icon: Cloud, label: "Edge Computing" },
            { icon: Droplets, label: "Smart Irrigation" },
          ].map((item, i) => (
            <motion.span
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3 + i * 0.1, duration: 0.4 }}
              className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 text-white/40 font-mono text-[9px] md:text-[10px] uppercase tracking-wider hover:border-primary/30 hover:text-primary/70 hover:bg-primary/5 transition-all duration-300 cursor-default"
            >
              <item.icon size={10} className="text-primary/60" />
              {item.label}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons with ripple effect + magnetic */}
        <RippleEffect color="rgba(34,197,94,0.2)">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
            <MagneticButton
              as="a"
              href="#about"
              className="btn-primary rounded-2xl text-xs md:text-sm group"
              strength={0.2}
              radius={150}
            >
              <span>[EXPLORE SYSTEMS]</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#code"
              className="btn-secondary rounded-2xl text-xs md:text-sm group"
              strength={0.2}
              radius={150}
            >
              <Cpu size={14} className="group-hover:animate-pulse" />
              <span>[VIEW FIRMWARE]</span>
            </MagneticButton>
        </motion.div>
        </RippleEffect>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 md:gap-2"
      >
        <span className="text-[8px] md:text-[9px] font-mono text-white/20 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
