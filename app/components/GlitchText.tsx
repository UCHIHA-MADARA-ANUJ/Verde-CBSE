"use client";

import { useEffect, useState, useRef } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  triggerInterval?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export default function GlitchText({ text, className = "", triggerInterval = 5000, as: Tag = "div" }: GlitchTextProps) {
  const [display, setDisplay] = useState(text);
  const [glitching, setGlitching] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";

  useEffect(() => {
    const triggerGlitch = () => {
      setGlitching(true);
      let iterations = 0;
      const maxIterations = 10;
      const glitchInterval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iterations) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        iterations += 1 / 2;
        if (iterations >= maxIterations) {
          clearInterval(glitchInterval);
          setDisplay(text);
          setGlitching(false);
        }
      }, 40);
    };

    intervalRef.current = setInterval(triggerGlitch, triggerInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, triggerInterval]);

  return (
    <Tag className={`${className} ${glitching ? "relative" : ""}`}>
      <span className="relative z-10">{display}</span>
      {glitching && (
        <>
          <span className="absolute top-0 left-0 -ml-[2px] text-red-400/50 z-0" aria-hidden="true">
            {display}
          </span>
          <span className="absolute top-0 left-0 ml-[2px] text-cyan-400/50 z-0" aria-hidden="true">
            {display}
          </span>
        </>
      )}
    </Tag>
  );
}
