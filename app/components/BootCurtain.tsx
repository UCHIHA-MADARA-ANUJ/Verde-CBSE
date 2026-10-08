"use client";

import { useEffect, useRef, useState } from "react";

const LOG = [
  "VERDE OS v3.0.0 — autonomous cultivation kernel",
  "POST ........................ OK",
  "mount /dev/esp8266 @ 160MHz ... OK",
  "flash 4096KB verified ......... OK",
  "i2c bus scan .................. 6 devices",
  "dht22   temp/rh ............... ONLINE",
  "hcsr04  reservoir ............. ONLINE",
  "ads1115 soil x4 ............... ONLINE",
  "rs485   npk probe ............. ONLINE",
  "ov2640  canopy optics ......... ONLINE",
  "loading tflite model canopy_v4.tflite",
  "quantized int8 · 612KB · arena 214KB",
  "firebase rtdb handshake ....... PAIRED",
  "twilio channel EN/HI .......... ARMED",
  "openweather delhi predictive .. SYNCED",
  "pump relay SPDT ............... SAFE",
  "led array 12ch pwm ............ 0%",
  "closed loop integrity ......... SEALED",
  "rendering volumetric assets ...",
];

export default function BootCurtain({
  progress,
  ready,
}: {
  progress: number;
  ready: boolean;
}) {
  const [lines, setLines] = useState<string[]>([]);
  const [pct, setPct] = useState(0);
  const [mem, setMem] = useState(0);
  const box = useRef<HTMLDivElement>(null);

  // stream the log
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setLines(LOG.slice(0, i));
      if (i >= LOG.length) clearInterval(id);
    }, 105);
    return () => clearInterval(id);
  }, []);

  // smooth the percentage so it never jumps or stalls at 0
  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => {
        const ceiling = ready ? 100 : Math.max(progress, 12) * 0.92;
        if (p >= ceiling) return p;
        return Math.min(ceiling, p + Math.random() * 3.4);
      });
      setMem(Math.floor(180000 + Math.random() * 90000));
    }, 55);
    return () => clearInterval(id);
  }, [progress, ready]);

  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight });
  }, [lines]);

  const shown = Math.floor(pct);

  return (
    <div
      className="fixed inset-0 z-[9990] bg-black flex flex-col transition-opacity duration-[900ms]"
      style={{ opacity: ready && pct >= 99 ? 0 : 1 }}
    >
      <div className="hud-frame !inset-4 md:!inset-6" />

      {/* top readouts */}
      <div className="flex justify-between p-7 md:p-10 hud-read">
        <span className="c-grow">BOOT SEQUENCE</span>
        <span>MEM_ALLOC {mem.toLocaleString()} B</span>
      </div>

      {/* centre */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div
          className="font-display-xl text-[clamp(54px,15vw,15rem)] text-white leading-[0.8] glitch"
          data-text="VERDE"
        >
          VERDE
        </div>

        <div className="font-display-xl c-grow text-[clamp(40px,9vw,9rem)] leading-none mt-2 tabular-nums">
          {String(shown).padStart(3, "0")}
          <span className="text-white/25">%</span>
        </div>

        <div className="w-[min(560px,80vw)] h-px bg-white/15 mt-8 overflow-hidden">
          <div
            className="h-full bg-[var(--grow)] shadow-[0_0_18px_#00ff87]"
            style={{ width: `${shown}%`, transition: "width 120ms linear" }}
          />
        </div>
      </div>

      {/* console */}
      <div
        ref={box}
        className="h-[34vh] md:h-[30vh] overflow-hidden px-7 md:px-12 pb-10 mono text-[10px] md:text-[11px] leading-[1.75] text-white/35"
      >
        {lines.map((l, i) => (
          <div key={i} className={i === lines.length - 1 ? "c-grow" : undefined}>
            <span className="text-white/20 mr-3">
              {String(i + 1).padStart(2, "0")}
            </span>
            {l}
          </div>
        ))}
        <div className="c-acid">
          <span className="text-white/20 mr-3">
            {String(lines.length + 1).padStart(2, "0")}
          </span>
          awaiting gpu handoff
          <span className="inline-block w-2 h-3 bg-[var(--acid)] ml-2 align-middle animate-pulse" />
        </div>
      </div>
    </div>
  );
}
