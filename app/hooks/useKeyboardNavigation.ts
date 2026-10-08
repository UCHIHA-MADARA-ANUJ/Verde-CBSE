"use client";

import { useEffect, useCallback } from "react";

/**
 * Tracks keyboard vs mouse navigation mode.
 * Adds `.keyboard-nav` class on body when user presses Tab,
 * removes it on mouse click. Enables enhanced :focus-visible styles
 * only when navigating via keyboard.
 *
 * Also provides arrow-key section navigation across the page
 * and Escape-to-close for any overlay.
 */
export default function useKeyboardNavigation() {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Mark as keyboard navigation
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-nav");
    }

    // Arrow key section navigation
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const sections = document.querySelectorAll<HTMLElement>(
        "section[id], footer, header"
      );
      const current = document.activeElement;
      const currentIdx = Array.from(sections).findIndex(
        (s) => s === current || s.contains(current)
      );

      let nextIdx: number;
      if (e.key === "ArrowDown") {
        nextIdx = Math.min(currentIdx + 1, sections.length - 1);
      } else {
        nextIdx = Math.max(currentIdx - 1, 0);
      }

      if (nextIdx !== currentIdx && sections[nextIdx]) {
        e.preventDefault();
        sections[nextIdx].scrollIntoView({ behavior: "smooth" });
        sections[nextIdx].setAttribute("tabindex", "-1");
        sections[nextIdx].focus({ preventScroll: true });
      }
    }

    // Escape key — close mobile menu if open
    if (e.key === "Escape") {
      const mobileMenu = document.querySelector('[data-mobile-menu="true"]');
      if (mobileMenu) {
        const closeBtn = document.querySelector(
          '[aria-label="Toggle menu"]'
        ) as HTMLButtonElement | null;
        closeBtn?.click();
        closeBtn?.focus();
      }
    }
  }, []);

  const handleMouseDown = useCallback(() => {
    document.body.classList.remove("keyboard-nav");
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleKeyDown, handleMouseDown]);
}
