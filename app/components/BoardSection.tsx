"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SceneSlot, useScenes } from "./ScenePreloader";

/** The board spins as you scroll past it — scroll position drives the real 3D model. */
export default function BoardSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { send } = useScenes();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const spin = useTransform(scrollYProgress, [0, 1], [-0.9, 1.5]);

  useEffect(() => {
    return spin.on("change", (v) => send("board", { action: "spin", value: v }));
  }, [spin, send]);

  return (
    <section id="hardware" className="wrap py-24 md:py-32" ref={ref}>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="lg:order-2"
        >
          <div className="eyebrow mb-5">The hardware</div>
          <h2 className="font-display-xl t-big mb-7 max-w-[540px]">
            One microcontroller, doing a surprising amount.
          </h2>
          <p className="lede mb-8 max-w-[470px]">
            The ESP8266 runs the sensor array, the pump relay, the LED PWM driver and the WiFi
            uplink — on a custom board laid out in KiCad with an LM2596 buck converter so it
            survives a real power supply.
          </p>
          <div className="flex flex-wrap gap-2.5 mb-8">
            {["160 MHz", "4 MB flash", "Custom PCB", "1,200+ lines C++"].map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>
          <button
            onClick={() => send("board", { action: "explode" })}
            className="btn btn-ghost"
          >
            Explode the board
          </button>
        </motion.div>

        <SceneSlot id="board" className="h-[400px] md:h-[540px] lg:order-1" />
      </div>
    </section>
  );
}
