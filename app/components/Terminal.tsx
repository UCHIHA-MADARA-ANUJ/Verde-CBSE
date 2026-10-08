"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalProps {
  lines: string[];
  typingSpeed?: number;
  className?: string;
  title?: string;
  maxLines?: number;
  live?: boolean;
  onLineAdded?: (line: string) => void;
}

export default function Terminal({ lines, typingSpeed = 20, className = "", title = "terminal", maxLines = 12, live = false }: TerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentLineIndex >= lines.length) return;
    const line = lines[currentLineIndex];
    let charIndex = 0;
    const interval = setInterval(() => {
      charIndex++;
      setCurrentText(line.slice(0, charIndex));
      if (charIndex >= line.length) {
        clearInterval(interval);
        setTimeout(() => {
          setDisplayedLines((prev) => [...prev, line].slice(-maxLines));
          setCurrentText("");
          setCurrentLineIndex((i) => i + 1);
        }, typingSpeed * 2);
      }
    }, typingSpeed);
    return () => clearInterval(interval);
  }, [currentLineIndex, lines, typingSpeed, maxLines]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines, currentText]);

  return (
    <div className={`glass rounded-2xl border border-white/5 overflow-hidden flex flex-col ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/30 border border-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 border border-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/30 border border-green-500/50" />
        </div>
        <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono ml-2">{title}</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[9px] text-primary/60 uppercase tracking-wider font-mono">live</span>
        </div>
      </div>
      <div ref={containerRef} className="p-4 font-mono text-[10px] md:text-xs leading-relaxed overflow-y-auto max-h-[300px] space-y-1">
        {displayedLines.map((line, i) => (
          <div key={i + line} className={`${i === displayedLines.length - 1 && live ? "text-primary/90" : "text-white/50"}`}>
            <span className="opacity-40 mr-2">{String(i + 1).padStart(3, "0")}</span>
            {line}
          </div>
        ))}
        {currentLineIndex < lines.length && (
          <div className="text-primary/90">
            <span className="opacity-40 mr-2">{String(currentLineIndex + 1).padStart(3, "0")}</span>
            {currentText}
            <span className="inline-block w-1.5 h-3.5 bg-primary ml-0.5 animate-blink-fast align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}
