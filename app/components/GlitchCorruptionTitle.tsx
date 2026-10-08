"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

interface GlitchCorruptionTitleProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div";
  delay?: number;
  scrambleChars?: string;
  uniqueId?: string;
}

const CHARS = "!<>-_\\/[]{}—=+*^?#$%@&~0123456789";
const CORRUPTION_PATTERNS = [
  [0.3, 0.6, 0.1, 0.8, 0.2], // pattern 1
  [0.5, 0.2, 0.7, 0.1, 0.4], // pattern 2
  [0.1, 0.8, 0.3, 0.5, 0.9], // pattern 3
  [0.6, 0.3, 0.9, 0.2, 0.7], // pattern 4
  [0.4, 0.9, 0.2, 0.7, 0.3], // pattern 5
];

export default function GlitchCorruptionTitle({
  text,
  className = "",
  as: Tag = "h2",
  delay = 0,
  scrambleChars = CHARS,
  uniqueId = "default",
}: GlitchCorruptionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [phase, setPhase] = useState<"idle" | "corrupting" | "revealing" | "done">("idle");
  const [displayText, setDisplayText] = useState(text);
  const corruptionPattern = useRef(CORRUPTION_PATTERNS[Math.floor(Math.random() * CORRUPTION_PATTERNS.length)]);

  const trigger = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("corrupting");

    // Phase 1: Rapid corruption (0-400ms)
    let frame = 0;
    const totalCorruptFrames = 20;
    const corruptInterval = setInterval(() => {
      frame++;
      setDisplayText(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            const corruptionChance = corruptionPattern.current[i % corruptionPattern.current.length];
            if (frame < totalCorruptFrames * corruptionChance) {
              // Random corruption char
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            }
            return char;
          })
          .join("")
      );

      if (frame >= totalCorruptFrames) {
        clearInterval(corruptInterval);
        setPhase("revealing");

        // Phase 2: RGB channel split + reveal (400-800ms)
        setTimeout(() => {
          setPhase("done");
          setDisplayText(text);
        }, 400);
      }
    }, 25);

    return () => clearInterval(corruptInterval);
  }, [text, scrambleChars, phase]);

  useEffect(() => {
    if (isInView && phase === "idle") {
      const t = setTimeout(trigger, delay * 1000);
      return () => clearTimeout(t);
    }
  }, [isInView, trigger, delay, phase]);

  const isGlitching = phase === "corrupting" || phase === "revealing";

  return (
    <div ref={ref} className="relative inline-block">
      <Tag className={className}>
        <span className="relative inline-block">
          {displayText}

          {/* RGB channel split layers during glitch */}
          {isGlitching && (
            <>
              {/* Red channel offset */}
              <span
                className="absolute inset-0 pointer-events-none select-none"
                style={{
                  color: "#ff0000",
                  clipPath: "inset(0 0 40% 0)",
                  transform: `translate(${Math.random() > 0.5 ? 2 : -2}px, 0)`,
                  opacity: 0.5,
                  mixBlendMode: "screen" as any,
                }}
                aria-hidden="true"
              >
                {displayText}
              </span>
              {/* Cyan channel offset */}
              <span
                className="absolute inset-0 pointer-events-none select-none"
                style={{
                  color: "#00ffff",
                  clipPath: "inset(40% 0 0 0)",
                  transform: `translate(${Math.random() > 0.5 ? -2 : 2}px, 0)`,
                  opacity: 0.5,
                  mixBlendMode: "screen" as any,
                }}
                aria-hidden="true"
              >
                {displayText}
              </span>
            </>
          )}
        </span>

        {/* Scanline overlay during glitch */}
        {isGlitching && (
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.05) 2px, rgba(0,255,0,0.05) 4px)",
              animation: "glitch-skew 0.3s infinite",
            }}
            aria-hidden="true"
          />
        )}
      </Tag>
    </div>
  );
}
