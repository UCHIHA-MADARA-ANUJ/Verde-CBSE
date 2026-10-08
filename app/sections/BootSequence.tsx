"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLogs = [
  "[BIOS] Verde Tech Bootloader v3.0.0",
  "[BIOS] Checking memory integrity... OK",
  "[BIOS] Initializing sensor array...",
  "[BIOS] DHT22 thermal node... OK",
  "[BIOS] HC-SR04 tank monitor... OK",
  "[BIOS] OV2640 vision module... OK",
  "[BIOS] NPK soil probe... OK",
  "[BIOS] Loading neural weights...",
  "[BIOS] TensorFlow Lite v1.2.0 loaded",
  "[BIOS] Establishing Firebase mesh...",
  "[BIOS] Handshake complete. RTDB online.",
  "[BIOS] Mounting plant profiles...",
  "[BIOS] 20 profiles loaded. DB ready.",
  "[BIOS] Starting neural core...",
  "[BIOS] System ready. Welcome.",
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);
  const [glitchTrigger, setGlitchTrigger] = useState(false);
  const fullText = "VERDE TECH";

  const clamped = Math.min(progress, 100);

  useEffect(() => {
    let logIndex = 0;
    let charIndex = 0;
    let destroyed = false;

    const logInterval = setInterval(() => {
      if (!destroyed && logIndex < bootLogs.length) {
        setLogs((prev) => [...prev, bootLogs[logIndex]]);
        logIndex++;
      }
    }, 100);

    const typeInterval = setInterval(() => {
      if (!destroyed) {
        setText(fullText.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex >= fullText.length) clearInterval(typeInterval);
      }
    }, 120);

    const progInterval = setInterval(() => {
      if (!destroyed) {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(progInterval);
            // Trigger glitch before exit
            setTimeout(() => setGlitchTrigger(true), 200);
            setTimeout(() => setExit(true), 600);
            setTimeout(() => onComplete(), 1400);
            return 100;
          }
          return p + 2 + Math.random() * 5;
        });
      }
    }, 80);

    return () => {
      destroyed = true;
      clearInterval(logInterval);
      clearInterval(typeInterval);
      clearInterval(progInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(20px) brightness(2)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {/* Background effects */}
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="scanline" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 opacity-30" />

          {/* Glitch overlay on exit */}
          <AnimatePresence>
            {glitchTrigger && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0, 0.6, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 1] }}
                className="absolute inset-0 z-10 pointer-events-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent" style={{ transform: "skewX(-10deg) translateX(-50%)", animation: "shimmer 0.3s linear infinite" }} />
                <div className="absolute top-1/3 left-0 w-full h-0.5 bg-primary/60" />
                <div className="absolute top-2/3 left-0 w-full h-px bg-primary/40" />
                <div className="absolute top-1/4 left-0 w-full h-px bg-cyan-400/30" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative z-20 flex flex-col items-center w-full max-w-3xl px-6 md:px-10">
            {/* Boot logs */}
            <div className="w-full mb-6 h-28 overflow-hidden font-mono text-[9px] md:text-[10px] text-white/30 space-y-1 leading-relaxed">
              {logs.slice(-8).map((log, i) => (
                <motion.div
                  key={log + i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-primary/50 mr-2">▸</span>
                  {log}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-8 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Main title */}
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-black text-primary tracking-[0.25em] text-neon-xl mb-4 select-none">
              {text.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                className="inline-block w-1.5 h-8 md:h-16 bg-primary ml-2 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              />
            </h1>

            {/* Subtitle */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-primary/30" />
              <span className="text-[9px] font-mono text-primary/50 uppercase tracking-[0.4em]">Autonomous Plant OS</span>
              <div className="h-px w-8 bg-primary/30" />
            </div>

            {/* Progress section */}
            <div className="w-full flex flex-col items-center gap-4">
              <div className="flex justify-between w-full font-mono text-[10px] text-primary/60 uppercase tracking-[0.4em]">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Initializing Core
                </span>
                <span className="font-bold text-primary">{Math.round(clamped)}%</span>
              </div>

              <div className="w-full h-[3px] bg-white/5 overflow-hidden rounded-full border border-white/5 relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/60 via-primary to-primary/60"
                  style={{ width: `${clamped}%` }}
                  transition={{ duration: 0.2, ease: "linear" }}
                >
                  <div className="absolute right-0 top-0 h-full w-[3px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8),0_0_20px_rgba(34,197,94,0.6)]" />
                  <div className="absolute right-0 top-0 h-full w-[20px] bg-gradient-to-r from-transparent to-white/20" />
                </motion.div>
              </div>

              <div className="flex gap-4 md:gap-8 text-[9px] font-mono uppercase tracking-[0.3em]">
                {[
                  { label: "Biosync", threshold: 30 },
                  { label: "Neural_Link", threshold: 55 },
                  { label: "Verde_Alpha", threshold: 80 },
                ].map((item) => (
                  <span
                    key={item.label}
                    className={`transition-all duration-500 ${
                      clamped > item.threshold
                        ? "text-primary"
                        : "text-white/20"
                    }`}
                  >
                    {clamped > item.threshold && (
                      <span className="mr-1.5 inline-block w-1 h-1 rounded-full bg-primary animate-pulse" />
                    )}
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            <motion.div
              className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent mt-8 origin-right"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />

            <div className="mt-6 font-mono text-[9px] text-white/20 tracking-widest uppercase flex items-center gap-4">
              <span>SYS_LOAD: BOOT_V3.0.0</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>BUILD: STABLE</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>HASH: 0xDEAD_BEEF</span>
            </div>
          </div>

          {/* Corner info */}
          <div className="absolute bottom-6 left-4 md:left-10 font-mono text-[9px] text-white/20 tracking-widest">
            MEM: 4MB FLASH // CLK: 160MHz
          </div>
          <div className="absolute bottom-6 right-4 md:right-10 font-mono text-[9px] text-white/20 tracking-widest">
            {new Date().toLocaleDateString("en-GB")}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
