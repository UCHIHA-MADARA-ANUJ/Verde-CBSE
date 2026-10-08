"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "../lib/utils";

interface TextScrambleProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  scrambleChars?: string;
  speed?: number;
  trigger?: "hover" | "hover-once" | "always";
  delay?: number;
}

const DEFAULT_CHARS = "!<>-_\\/[]{}—=+*^?#$%@&~abcdefghijklmnopqrstuvwxyz0123456789";

export default function TextScramble({
  text,
  className = "",
  as: Tag = "span",
  scrambleChars = DEFAULT_CHARS,
  speed = 40,
  trigger = "hover",
  delay = 0,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const frameRef = useRef(0);
  const currentFrameRef = useRef(0);

  const scramble = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsScrambling(true);
    let pos = 0;
    const totalFrames = Math.max(Math.floor(text.length * 0.6), 5);
    currentFrameRef.current = 0;
    frameRef.current = 0;

    const interval = setInterval(() => {
      currentFrameRef.current++;
      const progress = currentFrameRef.current / totalFrames;
      const completed = Math.floor(progress * text.length);

      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i <= completed) {
              const r = Math.random();
              if (r > 0.3) return text[i];
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join("")
      );

      if (currentFrameRef.current >= totalFrames) {
        clearInterval(interval);
        setDisplay(text);
        setIsScrambling(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, scrambleChars, speed]);

  const handleMouseEnter = useCallback(() => {
    if (trigger === "always") return;
    scramble();
  }, [scramble, trigger]);

  useEffect(() => {
    if (trigger === "always") {
      const t = setTimeout(scramble, delay);
      const interval = setInterval(() => {
        scramble();
      }, 4000);
      return () => {
        clearTimeout(t);
        clearInterval(interval);
      };
    }
  }, [trigger, delay, scramble]);

  return (
    <Tag
      className={cn(
        "relative",
        isScrambling && "select-none",
        className
      )}
      onMouseEnter={trigger !== "always" ? handleMouseEnter : undefined}
      style={{ cursor: trigger !== "always" ? "pointer" : undefined }}
    >
      <span className="relative z-10">{display}</span>
      {isScrambling && (
        <>
          <span
            className="absolute top-0 left-0 -ml-[1px] text-red-400/30 z-0"
            aria-hidden="true"
          >
            {display}
          </span>
          <span
            className="absolute top-0 left-0 ml-[1px] text-cyan-400/30 z-0"
            aria-hidden="true"
          >
            {display}
          </span>
        </>
      )}
    </Tag>
  );
}
