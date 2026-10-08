"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Sprout, Menu, X, Wifi } from "lucide-react";
import MagneticButton from "./MagneticButton";

const links = [
  { href: "#about", label: "About" },
  { href: "#dashboard", label: "Telemetry" },
  { href: "#hardware", label: "Hardware" },
  { href: "#code", label: "Firmware" },
  { href: "#intelligence", label: "Features" },
  { href: "#plants", label: "Plants" },
  { href: "#usecase", label: "Cycle" },
  { href: "#team", label: "Team" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollRef = useRef(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 50);

      // Hide nav on scroll down, show on scroll up
      if (currentScroll > 200) {
        setNavHidden(currentScroll > lastScrollRef.current);
      } else {
        setNavHidden(false);
      }
      lastScrollRef.current = currentScroll;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-[60] origin-left"
        style={{ scaleX, opacity: scrolled ? 1 : 0 }}
      />
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          translateY: navHidden && scrolled ? -100 : 0,
        }}
        transition={{
          y: { duration: 0.8, ease: "easeOut", delay: 0.2 },
          translateY: { duration: 0.4, ease: "easeOut" },
        }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-2xl border-b border-white/[0.03] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
        style={{ willChange: "transform" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-3.5 flex justify-between items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group glass px-3 md:px-4 py-2 rounded-full border-primary/20 flex items-center gap-2 md:gap-3 hover:border-primary/50 transition-all duration-300"
          >
            <div className="relative">
              <Sprout className="text-primary group-hover:animate-pulse" size={16} />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-mono text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-primary">Project Verde</span>
              <span className="font-mono text-[7px] md:text-[8px] tracking-[0.2em] uppercase text-white/40">Build V21.0.4 // Alpha</span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const isActive = activeSection === l.href;
              return (
                <MagneticButton
                  key={l.href}
                  as="button"
                  onClick={() => handleNavClick(l.href)}
                  strength={0.15}
                  radius={120}
                  className={`relative px-3 lg:px-4 py-2 rounded-full text-[10px] lg:text-[11px] font-mono uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "text-primary"
                      : "text-white/50 hover:text-primary"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-full border border-primary/30 bg-primary/5"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </MagneticButton>
              );
            })}
            <div className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20">
              <Wifi size={9} className="text-primary animate-pulse" />
              <span className="text-[8px] font-mono text-primary/80 uppercase tracking-wider">Live</span>
            </div>
          </div>

          {/* Mobile hamburger */}
          <MagneticButton
            as="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden glass p-2.5 rounded-full border-white/10 hover:border-primary/40 transition-colors relative z-50"
            ariaLabel="Toggle menu"
            strength={0.2}
            radius={100}
          >
            {mobileOpen ? <X size={16} className="text-white" /> : <Menu size={16} className="text-white" />}
          </MagneticButton>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
          {mobileOpen && (
          <motion.div
            data-mobile-menu="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-3 p-6">
              {links.map((l, i) => (
                <motion.button
                  key={l.href}
                  onClick={() => handleNavClick(l.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className={`w-full max-w-xs px-6 py-4 rounded-2xl text-sm font-mono uppercase tracking-wider transition-all border ${
                    activeSection === l.href
                      ? "text-primary border-primary/30 bg-primary/5"
                      : "text-white/60 border-white/5 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {l.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20"
              >
                <Wifi size={10} className="text-primary animate-pulse" />
                <span className="text-[9px] font-mono text-primary/80 uppercase tracking-wider">System Online</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
