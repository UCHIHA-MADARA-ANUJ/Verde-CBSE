"use client";

import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

interface TerminalTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  onComplete?: () => void;
}

export default function TerminalText({
  text,
  className,
  speed = 40,
  delay = 0,
  showCursor = true,
  onComplete,
}: TerminalTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed, onComplete]);

  return (
    <span className={cn("font-mono", className)}>
      {displayed}
      {showCursor && !done && (
        <span className="inline-block w-2 h-[1em] bg-primary ml-0.5 align-middle animate-blink-fast" />
      )}
    </span>
  );
}
