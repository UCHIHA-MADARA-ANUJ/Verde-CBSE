"use client";

import { motion } from "framer-motion";
import SplitText from "./SplitText";

const team = [
  {
    name: "Anuj Phulera",
    role: "Software & systems",
    blurb: "Firmware, cloud pipeline, the vision model and this site.",
    skills: ["Next.js", "Firebase", "Embedded C++", "TensorFlow", "Python"],
  },
  {
    name: "Aarav Choudhary",
    role: "Hardware & electronics",
    blurb: "Schematic, board layout, power delivery and the physical build.",
    skills: ["PCB design", "KiCad", "Soldering", "ESP8266", "Power electronics"],
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-24 md:py-28 border-t border-[var(--line-soft)]">
      <div className="wrap">
        <div className="eyebrow mb-4">Who built it</div>
        <SplitText
          text="Two people, one workbench."
          className="font-display-xl t-big mb-16 max-w-[800px]"
          accentLast={1}
        />

        <div className="grid md:grid-cols-2 gap-5">
          {team.map((m, i) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="card p-8 h-full"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-[25px] mb-1">{m.name}</h3>
                  <div className="eyebrow">{m.role}</div>
                </div>
                <span
                  className="display text-[40px] leading-none opacity-10"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-[15px] muted mb-7 leading-relaxed">{m.blurb}</p>
              <div className="flex flex-wrap gap-2">
                {m.skills.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
