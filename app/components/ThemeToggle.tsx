"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Always start with dark mode
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const newDark = !isDark;
    setIsDark(newDark);

    // Create radial wipe effect
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.zIndex = "99999";
    overlay.style.pointerEvents = "none";
    overlay.style.background = newDark ? "#000" : "#f0fdf4";
    overlay.style.borderRadius = "50%";
    overlay.style.width = "0";
    overlay.style.height = "0";
    overlay.style.left = "50%";
    overlay.style.top = "50%";
    overlay.style.transform = "translate(-50%, -50%)";
    overlay.style.transition = "width 0.8s cubic-bezier(0.16, 1, 0.3, 1), height 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    document.body.appendChild(overlay);

    // Trigger expansion
    requestAnimationFrame(() => {
      overlay.style.width = "300vw";
      overlay.style.height = "300vw";
    });

    // Switch theme mid-animation
    setTimeout(() => {
      if (newDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    }, 300);

    // Cleanup
    setTimeout(() => {
      overlay.remove();
      setIsTransitioning(false);
    }, 800);
  }, [isDark, isTransitioning]);

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-24 right-4 z-[60] p-3 rounded-full glass border border-white/10 hover:border-primary/40 transition-all duration-300 group"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      disabled={isTransitioning}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <Sun size={16} className="text-yellow-400 group-hover:animate-pulse" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <Moon size={16} className="text-primary group-hover:animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
