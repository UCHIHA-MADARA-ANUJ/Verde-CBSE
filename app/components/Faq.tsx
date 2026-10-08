"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplitText from "./SplitText";

const qs = [
  {
    q: "Why hydroponics instead of soil?",
    a: "A recirculating loop reuses the same nutrient solution instead of letting it drain away, so the system uses roughly 95% less water than an equivalent soil bed. Roots also get oxygen directly, which is why growth rates are higher in the same footprint.",
  },
  {
    q: "What happens if the WiFi drops?",
    a: "Nothing stops. Irrigation and lighting decisions are made on the ESP8266 itself, not in the cloud — Firebase is a reporting channel, not a dependency. Readings are buffered locally and flushed once the uplink returns.",
  },
  {
    q: "How does it know not to water before rain?",
    a: "The controller pulls a short-range forecast from OpenWeatherMap and holds the irrigation cycle if meaningful rainfall is expected. A physical rain sensor acts as the fallback if the API is unreachable.",
  },
  {
    q: "Does the disease detection run in the cloud?",
    a: "No. The classifier is quantised to run on-device with TensorFlow Lite, so inference happens next to the camera. That keeps latency low and means no plant imagery ever has to leave the unit.",
  },
  {
    q: "Why build a custom PCB?",
    a: "Jumper wires on a breadboard are fine for a demo and terrible in a humid enclosure next to a pump. The KiCad board gives proper power regulation, flyback protection on the relay and screw terminals for everything leaving the box.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="wrap py-24 md:py-32">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
        <div>
          <div className="eyebrow mb-4">Questions</div>
          <SplitText
            text="The things people ask."
            className="font-display-xl t-big"
            accentLast={1}
          />
        </div>

        <div className="flex flex-col">
          {qs.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-[var(--line-soft)]"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span
                    className={`text-[17px] md:text-[19px] transition-colors duration-300 ${
                      isOpen ? "text-white" : "text-[var(--ink-soft)] group-hover:text-white"
                    }`}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={`shrink-0 text-[20px] leading-none ${isOpen ? "accent" : "muted"}`}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-[15px] leading-[1.8] muted pb-7 max-w-[620px]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
