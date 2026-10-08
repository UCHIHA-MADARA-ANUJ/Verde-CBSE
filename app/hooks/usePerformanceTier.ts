"use client";

import { useEffect, useState } from "react";

export type PerformanceTier = "low" | "medium" | "high";

export function usePerformanceTier(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>("high");

  useEffect(() => {
    // Detect low-end devices
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const memory = (navigator as any).deviceMemory ?? 8;
    const cores = navigator.hardwareConcurrency ?? 4;
    const isLowEnd = isMobile && (memory <= 2 || cores <= 2);
    const isMidEnd = isMobile && (memory <= 4 || cores <= 4);

    if (isLowEnd) setTier("low");
    else if (isMidEnd) setTier("medium");
    else setTier("high");
  }, []);

  return tier;
}
