"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

const cells = [
  { n: 95, suf: "%", k: "WATER RECLAIMED", c: "c-grow", d: "Recirculating closed loop against an equivalent soil bed." },
  { n: 20, suf: "", k: "GROWING SITES", c: "c-grow", d: "Four stacked tiers in the footprint of a bookshelf." },
  { n: 0, suf: " MS", k: "CLOUD DEPENDENCY", c: "c-acid", d: "Every irrigation decision is made on-device. WiFi is optional." },
];

function Num({ to, suf }: { to: number; suf: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const ctrl = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = Math.round(v) + suf;
      },
    });
    return () => ctrl.stop();
  }, [inView, to, suf]);

  return (
    <div ref={ref} className="font-display-xl text-[clamp(52px,7vw,84px)] text-white mb-6">
      0{suf}
    </div>
  );
}

export default function StatsStrip() {
  return (
    <section className="py-24 md:py-40 bg-black relative border-t border-white/10">
      <div className="mx-auto px-6 max-w-[90rem]">
        <div className="grid-brut grid-cols-1 md:grid-cols-3">
          {cells.map((c) => (
            <div
              key={c.k}
              className="cell p-10 md:p-16 lg:p-20"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              <span className="cell-sweep" />
              <Num to={c.n} suf={c.suf} />
              <div className={`mono text-[11px] tracking-[0.24em] uppercase mb-6 ${c.c}`}>
                {c.k}
              </div>
              <p className="text-white/40 text-[15px] leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
