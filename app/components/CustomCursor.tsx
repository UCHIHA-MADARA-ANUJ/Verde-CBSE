"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 450, damping: 34, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 450, damping: 34, mass: 0.35 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("cursor-none");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const t = e.target as HTMLElement;
      setHover(
        !!t?.closest?.("a, button, input, [role='button'], iframe") ||
          getComputedStyle(t).cursor === "pointer"
      );
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.body.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", move);
      document.body.removeEventListener("mouseleave", leave);
    };
  }, [x, y, visible]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hover ? 10 : 6,
          height: hover ? 10 : 6,
          opacity: visible ? 1 : 0,
          backgroundColor: "#ffffff",
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hover ? 52 : 28,
          height: hover ? 52 : 28,
          opacity: visible ? (hover ? 1 : 0.5) : 0,
          borderColor: hover ? "#00ff87" : "rgba(255,255,255,0.4)",
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
}
