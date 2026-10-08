"use client";

import { motion } from "framer-motion";
import { Sprout, Twitter, Github, Linkedin, Instagram, ArrowUp, Wifi } from "lucide-react";
import SectionReveal from "../components/SectionReveal";

const links = [
  { href: "#about", label: "About" },
  { href: "#dashboard", label: "Telemetry" },
  { href: "#hardware", label: "Hardware" },
  { href: "#code", label: "Firmware" },
  { href: "#intelligence", label: "Features" },
  { href: "#plants", label: "Plants" },
  { href: "#team", label: "Team" },
];

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-20 px-6 border-t border-white/10 bg-[#020202] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-16">
          <div className="space-y-8 max-w-md">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center relative group">
                <Sprout className="text-primary relative z-10" size={28} />
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <div className="font-black text-2xl uppercase tracking-tighter">Project Verde</div>
                <div className="text-[10px] font-mono text-white/30 tracking-[0.4em]">REGROWTH ECOSYSTEM // ALPHA</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">A visionary science project bridging the gap between biological life and autonomous digital architecture. Developed for the Annual Science Exhibition 2024.</p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-primary hover:border-primary/50 transition-all duration-300 group"
                >
                  <s.icon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-16">
            <div className="space-y-6">
              <h5 className="font-mono text-xs text-primary uppercase tracking-[0.5em]">Navigation</h5>
              <ul className="space-y-3 font-bold text-sm text-white/60">
                {links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="font-mono text-xs text-primary uppercase tracking-[0.5em]">Resources</h5>
              <ul className="space-y-3 font-bold text-sm text-white/60">
                {["Documentation", "API Reference", "GitHub", "Changelog"].map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="font-mono text-xs text-primary uppercase tracking-[0.5em]">Legal</h5>
              <ul className="space-y-3 font-bold text-sm text-white/60">
                {["Safety Protocols", "Open Source", "Data Privacy", "MIT License"].map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
            &copy; 2024 Science Exhibition Project // Aarav & Anuj
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-mono text-primary/40 uppercase tracking-[0.4em]">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              SYSTEM_STATUS_NOMINAL
            </div>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/30 hover:text-primary hover:border-primary/50 transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
