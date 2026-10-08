"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface KioskModeProps {
  children: React.ReactNode;
}

const sections = [
  "hero",
  "about",
  "dashboard",
  "hardware",
  "intelligence",
  "modes",
  "plants",
  "code",
  "usecase",
  "infographic",
  "awards",
  "testimonials",
  "gallery",
  "cta",
  "team",
  "footer",
];

export default function KioskMode({ children }: KioskModeProps) {
  const [isKiosk, setIsKiosk] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef(0);

  // Check URL for kiosk mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("kiosk") === "true") {
      setIsKiosk(true);
    }
  }, []);

  const scrollToSection = useCallback((index: number) => {
    const id = sections[index];
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const startKiosk = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentSection(0);
    setProgress(0);
    progressRef.current = 0;
    scrollToSection(0);

    // Move to next section every 10 seconds
    intervalRef.current = setInterval(() => {
      progressRef.current += 1;
      setProgress(progressRef.current);

      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setProgress(0);
        setCurrentSection((prev) => {
          const next = (prev + 1) % sections.length;
          scrollToSection(next);
          return next;
        });
      }
    }, 100); // Update every 100ms for smooth progress bar
  }, [scrollToSection]);

  useEffect(() => {
    if (isKiosk) {
      startKiosk();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isKiosk, startKiosk]);

  if (!isKiosk) return <>{children}</>;

  return (
    <>
      {/* Kiosk mode overlay controls */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-black/80 backdrop-blur-md border-t border-primary/20 px-4 py-3">
        <div className="max-w-6xl mx-auto">
          {/* Progress bar */}
          <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-[9px] text-primary/80 uppercase tracking-wider">
                KIOSK MODE
              </span>
              <span className="font-mono text-[8px] text-white/30">
                AUTO-CYCLING — {currentSection + 1}/{sections.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const prev = (currentSection - 1 + sections.length) % sections.length;
                  setCurrentSection(prev);
                  scrollToSection(prev);
                  progressRef.current = 0;
                  setProgress(0);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-primary hover:border-primary/40 text-[10px] font-mono transition-all touch-target"
                style={{ minHeight: "44px", minWidth: "44px" }}
              >
                ← PREV
              </button>

              <button
                onClick={() => {
                  if (intervalRef.current) clearInterval(intervalRef.current);
                  setIsKiosk(false);
                }}
                className="px-4 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono transition-all touch-target"
                style={{ minHeight: "44px", minWidth: "44px" }}
              >
                EXIT KIOSK
              </button>

              <button
                onClick={() => {
                  const next = (currentSection + 1) % sections.length;
                  setCurrentSection(next);
                  scrollToSection(next);
                  progressRef.current = 0;
                  setProgress(0);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-primary hover:border-primary/40 text-[10px] font-mono transition-all touch-target"
                style={{ minHeight: "44px", minWidth: "44px" }}
              >
                NEXT →
              </button>
            </div>
          </div>
        </div>
      </div>

      {children}
    </>
  );
}
