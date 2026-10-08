"use client";

import { useEffect, useState } from "react";
import CommandPalette from "../CommandPalette";

const links = [
  { href: "#tour", label: "Tour" },
  { href: "#telemetry", label: "Telemetry" },
  { href: "#hardware", label: "Hardware" },
  { href: "#specs", label: "Specs" },
  { href: "#build", label: "Build" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[60] transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(5,7,6,0.72)] backdrop-blur-xl border-b border-[var(--line-soft)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="wrap flex items-center justify-between h-[66px]">
        <a href="#" className="flex items-center gap-2.5" aria-label="Project Verde — home">
          <svg viewBox="0 0 26 30" fill="none" className="w-[19px] h-[22px]" aria-hidden>
            <path
              d="M13 27V12M13 18C4 18 2 11 3 4c7 0 11 5 10 14ZM13 23c0-9 4-15 11-15 1 9-3 15-11 15Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <span
            className="font-[800] tracking-[0.3em] text-[14px]"
            style={{ fontFamily: "var(--display)" }}
          >
            VERDE
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3.5 py-2 rounded-full text-[13px] text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <CommandPalette />
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 -mr-2"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-5 h-px bg-current" />
        </button>
      </div>

      {open && (
        <nav className="md:hidden wrap pb-5 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-[15px] border-b border-[var(--line-soft)]"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
