"use client";

import { useRef, ReactNode, useCallback } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  target?: string;
  ariaLabel?: string;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.25,
  radius = 200,
  onClick,
  as: Tag = "button",
  href,
  target,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

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

  const setRef = useCallback(
    (el: HTMLButtonElement | HTMLAnchorElement | null) => {
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

  const props = {
    ref: setRef,
    className: `${className} magnetic-btn`,
    onClick,
    "aria-label": ariaLabel,
    style: { transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)" },
  };

  if (Tag === "a") {
    return (
      <a {...props} href={href} target={target}>
        {children}
      </a>
    );
  }

  return <button {...props}>{children}</button>;
}
