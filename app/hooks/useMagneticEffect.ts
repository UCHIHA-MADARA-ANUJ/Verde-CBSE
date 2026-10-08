"use client";

import { useRef, useCallback } from "react";

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagneticEffect<T extends HTMLElement>({
  strength = 0.3,
  radius = 200,
}: MagneticOptions = {}) {
  const ref = useRef<T>(null);

  const handleMouseMove = useCallback(
    (e: Event) => {
      const me = e as MouseEvent;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = me.clientX - centerX;
      const distY = me.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < radius) {
        const force = (1 - dist / radius) * strength;
        el.style.transform = `translate(${distX * force}px, ${distY * force}px)`;
      }
    },
    [strength, radius]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);

  const bind = useCallback(
    (el: T | null) => {
      if (ref.current) {
        ref.current.removeEventListener("mousemove", handleMouseMove);
        ref.current.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (el) {
        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);
      }
      (ref as any).current = el;
    },
    [handleMouseMove, handleMouseLeave]
  );

  return { ref: bind };
}
