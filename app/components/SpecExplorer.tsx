"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplitText from "./SplitText";

const groups = {
  Sensing: [
    { k: "DHT22", v: "Air temp −40–80 °C ±0.5 °C, RH 0–100 %", p: "1-Wire" },
    { k: "Capacitive probe", v: "Root-zone moisture, per growing site", p: "Analog" },
    { k: "HC-SR04", v: "Reservoir level 2–400 cm, ±3 mm", p: "Trigger/echo" },
    { k: "NPK RS485", v: "Nitrogen, phosphorus, potassium", p: "Modbus" },
    { k: "Rain sensor", v: "Suppresses irrigation before rainfall", p: "Digital" },
    { k: "OV2640", v: "2 MP canopy camera for inference", p: "SPI" },
  ],
  Compute: [
    { k: "ESP8266", v: "160 MHz Tensilica L106, 4 MB flash", p: "Controller" },
    { k: "Firmware", v: "1,200+ lines C++, non-blocking scheduler", p: "Embedded" },
    { k: "TensorFlow Lite", v: "Quantised leaf-disease classifier", p: "On-device" },
    { k: "Watchdog", v: "Hardware reset on a hung sensor read", p: "Safety" },
  ],
  Power: [
    { k: "LM2596", v: "Buck converter, 5 V DC rail", p: "Regulation" },
    { k: "Relay K1", v: "SPDT, 1.5 A max, flyback protected", p: "Switching" },
    { k: "LED array", v: "12× per tier, 380–780 nm", p: "MOSFET PWM" },
    { k: "Pump", v: "2.4 L/min recirculating feed", p: "Fluidics" },
  ],
  Cloud: [
    { k: "Firebase RTDB", v: "Telemetry stream + command channel", p: "Realtime" },
    { k: "Twilio", v: "WhatsApp alerts, English and Hindi", p: "Messaging" },
    { k: "OpenWeatherMap", v: "Predictive irrigation hold", p: "Forecast" },
    { k: "Next.js", v: "This dashboard and documentation", p: "Frontend" },
  ],
};

type Group = keyof typeof groups;

export default function SpecExplorer() {
  const [tab, setTab] = useState<Group>("Sensing");
  const keys = Object.keys(groups) as Group[];

  return (
    <section id="specs" className="wrap py-24 md:py-32">
      <div className="eyebrow mb-4">Subsystems</div>
      <SplitText
        text="Everything inside, in plain terms."
        className="font-display-xl t-big mb-14 max-w-[900px]"
        accentLast={1}
      />

      <div className="flex flex-wrap gap-2 mb-10">
        {keys.map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`relative px-5 py-2.5 rounded-full text-[13px] font-medium transition-colors duration-300 ${
              tab === k ? "text-[#04140a]" : "text-[var(--ink-soft)] hover:text-white"
            }`}
          >
            {tab === k && (
              <motion.span
                layoutId="specTab"
                className="absolute inset-0 rounded-full bg-[var(--green)]"
                transition={{ type: "spring", stiffness: 340, damping: 32 }}
              />
            )}
            <span className="relative z-10">{k}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-2 gap-4"
        >
          {groups[tab].map((row, i) => (
            <motion.div
              key={row.k}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.045, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="card p-6 flex items-start justify-between gap-5"
            >
              <div>
                <div className="text-[16px] mb-1.5 font-medium">{row.k}</div>
                <div className="text-[14px] muted leading-relaxed">{row.v}</div>
              </div>
              <span className="chip shrink-0">{row.p}</span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
