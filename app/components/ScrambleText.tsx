"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}=+*^?#";

export default function ScrambleText({
  text,
  className = "",
  speed = 38,
  trigger = "view",
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  speed?: number;
  trigger?: "view" | "hover" | "mount";
  as?: React.ElementType;
}) {
  const [out, setOut] = useState(trigger === "mount" ? "" : text);
  const ref = useRef<HTMLElement>(null);
  const raf = useRef<number>(0);
  const done = useRef(false);

  const run = () => {
    let frame = 0;
    const queue = text.split("").map((c, i) => ({
      c,
      start: Math.floor(i * 1.6),
      end: Math.floor(i * 1.6) + 10 + Math.floor(Math.random() * 14),
    }));

    const tick = () => {
      let complete = 0;
      let s = "";
      for (const q of queue) {
        if (frame >= q.end) {
          complete++;
          s += q.c;
        } else if (frame >= q.start) {
          s += q.c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)];
        } else {
          s += q.c === " " ? " " : "";
        }
      }
      setOut(s);
      if (complete === queue.length) return;
      frame++;
      raf.current = requestAnimationFrame(tick);
    };
    cancelAnimationFrame(raf.current);
    tick();
  };

  useEffect(() => {
    if (trigger === "mount") {
      run();
      return () => cancelAnimationFrame(raf.current);
    }
    if (trigger !== "view" || !ref.current) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting && !done.current) {
          done.current = true;
          run();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger, speed]);

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseEnter={trigger === "hover" ? run : undefined}
    >
      {out || "\u00A0"}
    </Tag>
  );
}
