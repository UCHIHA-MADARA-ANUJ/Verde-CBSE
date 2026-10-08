"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { SceneSlot, useScenes } from "./ScenePreloader";

/* -------------------------------------------------------------------------
   Pinned scroll narrative. The tower stays fixed while the page scrolls
   through four chapters; each chapter flies the real 3D camera to a
   different tier via postMessage. The model is never re-mounted.
---------------------------------------------------------------------------*/

const chapters = [
  {
    k: "Tier 04 — Canopy",
    t: "Light, measured in photons.",
    d: "A 12-LED array per shelf, driven by MOSFET PWM across 380–780 nm. The controller trims output by the hour so the top tier never scorches and the bottom never stretches.",
    stat: ["12×", "LED per tier"],
    view: { az: 0.9, pol: 1.0, dist: 7.6, ty: 3.95 },
  },
  {
    k: "Tier 03 — Canopy health",
    t: "A camera that knows what wilt looks like.",
    d: "An OV2640 feeds a TensorFlow Lite model running on-device. Early chlorosis and leaf-spot markers surface days before they're visible to you — no round trip to a server.",
    stat: ["0", "Cloud calls to infer"],
    view: { az: 2.1, pol: 1.22, dist: 7.0, ty: 3.0 },
  },
  {
    k: "Tier 02 — Root zone",
    t: "Every site measured on its own.",
    d: "Capacitive moisture probes and an NPK RS485 bus report per-plant, not per-shelf. The pump answers to the driest site, and the reservoir level is tracked to ±3 mm.",
    stat: ["±3mm", "Reservoir precision"],
    view: { az: 3.6, pol: 1.3, dist: 7.2, ty: 2.05 },
  },
  {
    k: "Base — Closed loop",
    t: "The water comes back.",
    d: "2.4 L/min through an SPDT relay, recirculated through all four tiers and returned to a sealed reservoir. Against open soil, the system uses about 95% less water.",
    stat: ["95%", "Less water than soil"],
    view: { az: 5.2, pol: 1.34, dist: 8.4, ty: 0.9 },
  },
];

export default function TowerStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { send } = useScenes();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const barWidth = useTransform(bar, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const i = Math.min(chapters.length - 1, Math.max(0, Math.floor(v * chapters.length + 0.001)));
      setActive(i);
    });
  }, [scrollYProgress]);

  useEffect(() => {
    send("tower", { action: "view", ...chapters[active].view });
  }, [active, send]);

  const c = chapters[active];

  return (
    <section id="tour" ref={ref} className="relative" style={{ height: `${chapters.length * 100}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="wrap h-full grid lg:grid-cols-2 items-center gap-8">
          {/* copy */}
          <div className="relative z-10 max-w-[520px] pt-20 lg:pt-0">
            <div className="flex items-center gap-3 mb-8">
              <span className="eyebrow">Guided tour</span>
              <span className="h-px flex-1 bg-[var(--line-soft)]" />
              <span className="mono text-[10px] accent">
                {String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="eyebrow accent mb-5">{c.k}</div>
                <h2 className="font-display-xl text-[clamp(34px,4.6vw,5rem)] mb-7">{c.t}</h2>
                <p className="lede mb-9">{c.d}</p>
                <div className="flex items-baseline gap-4">
                  <span className="display text-[clamp(32px,3.6vw,46px)] accent">{c.stat[0]}</span>
                  <span className="eyebrow">{c.stat[1]}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* chapter rail */}
            <div className="mt-12 flex gap-2.5">
              {chapters.map((ch, i) => (
                <button
                  key={ch.k}
                  aria-label={ch.k}
                  onClick={() =>
                    window.scrollTo({
                      top:
                        (ref.current?.offsetTop ?? 0) +
                        (i + 0.5) * window.innerHeight,
                      behavior: "smooth",
                    })
                  }
                  className="group h-8 flex items-end"
                >
                  <span
                    className={`block h-[3px] rounded-full transition-all duration-500 ${
                      i === active
                        ? "w-12 bg-[var(--green)]"
                        : "w-6 bg-white/15 group-hover:bg-white/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* the live model keeps its own column */}
          <SceneSlot id="tower" className="hidden lg:block h-[86vh] -mr-10" />
        </div>

        {/* mobile: model sits behind, dimmed */}
        <div className="lg:hidden absolute inset-0 -z-0 opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-[var(--bg)]" />
        </div>

        <motion.div
          className="absolute bottom-0 left-0 h-px bg-[var(--green)]"
          style={{ width: barWidth }}
        />
      </div>
    </section>
  );
}
