"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EasterEggsProps {
  children: React.ReactNode;
}

// Konami code: ↑↑↓↓←→←→BA
const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export default function EasterEggs({ children }: EasterEggsProps) {
  const [crtMode, setCrtMode] = useState(false);
  const [typewriterMode, setTypewriterMode] = useState(false);
  const [konamiRevealed, setKonamiRevealed] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);

  // Track key sequences
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // V key - CRT mode toggle
      if (e.key === "v" || e.key === "V") {
        e.preventDefault();
        setCrtMode((prev) => !prev);
        return;
      }

      // T key - Typewriter mode toggle
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        setTypewriterMode((prev) => !prev);
        return;
      }

      // Konami code tracking
      setKeySequence((prev) => {
        const next = [...prev, e.key].slice(-konamiCode.length);
        if (next.join(",") === konamiCode.join(",")) {
          setKonamiRevealed(true);
          setShowSecret(true);
          setTimeout(() => setShowSecret(false), 8000);
          return [];
        }
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* CRT overlay filter */}
      {crtMode && (
        <div
          className="fixed inset-0 pointer-events-none z-[9995]"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
            mixBlendMode: "overlay" as any,
          }}
        />
      )}

      {/* CRT scanline + green tint */}
      {crtMode && (
        <div
          className="fixed inset-0 pointer-events-none z-[9995]"
          style={{
            background: "rgba(0,255,0,0.03)",
            mixBlendMode: "screen" as any,
          }}
        />
      )}

      {/* CRT flicker */}
      {crtMode && (
        <style jsx global>{`
          @keyframes crt-flicker {
            0% { opacity: 1; }
            50% { opacity: 0.998; }
            100% { opacity: 1; }
          }
          body {
            animation: crt-flicker 0.15s infinite;
          }
          img, video, canvas {
            filter: hue-rotate(0deg) saturate(1.2) !important;
          }
        `}</style>
      )}

      {/* Typewriter mode - global style */}
      {typewriterMode && (
        <style jsx global>{`
          @keyframes typewriter-cursor {
            0%, 100% { border-right-color: #22c55e; }
            50% { border-right-color: transparent; }
          }
          h1, h2, h3, h4, h5, h6, p, span, a, button, li {
            animation: typewriter-cursor 1s step-end infinite;
            border-right: 2px solid #22c55e;
            white-space: nowrap;
            overflow: hidden;
            max-width: fit-content;
          }
        `}</style>
      )}

      {/* Mode indicators */}
      <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-2">
        <AnimatePresence>
          {crtMode && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass px-3 py-1.5 rounded-full border border-primary/30"
            >
              <span className="font-mono text-[8px] text-primary uppercase tracking-wider">
                CRT MODE • PRESS V
              </span>
            </motion.div>
          )}
          {typewriterMode && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass px-3 py-1.5 rounded-full border border-cyan-400/30"
            >
              <span className="font-mono text-[8px] text-cyan-400 uppercase tracking-wider">
                TYPEWRITER • PRESS T
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Konami code secret reveal */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowSecret(false)}
          >
            <motion.div
              className="glass p-8 rounded-3xl border border-primary/30 max-w-lg text-center"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-2xl font-heading font-black uppercase tracking-tighter text-primary mb-4">
                SECRET UNLOCKED!
              </h3>
              <div className="space-y-3 text-sm text-slate-300">
                <p className="font-mono text-primary/80 text-xs">
                  {'// VERDE EASTER EGG // VER 1.0'}
                </p>
                <p>
                  <strong className="text-primary">Behind the Scenes:</strong>
                </p>
                <ul className="text-left space-y-2 text-xs font-mono text-white/60">
                  <li>✦ The plant in the logo is a real Tulsi from Aarav&apos;s balcony</li>
                  <li>✦ First prototype was built on a cardboard box (true story)</li>
                  <li>✦ &quot;पानी दो&quot; (give water) is the most sent WhatsApp command</li>
                  <li>✦ Anuj once debugged firmware for 36 hours straight &mdash; no sleep</li>
                  <li>✦ The circuit board has a hidden easter egg: a tiny 🌱 in the copper layer</li>
                  <li>✦ Total water saved during testing: enough to fill 2&nbsp;bathtubs</li>
                  <li>✦ This project started as a joke that became an obsession</li>
                </ul>
              </div>
              <motion.button
                className="mt-6 btn-primary text-xs"
                onClick={() => setShowSecret(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                [CLOSE]
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
