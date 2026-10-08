"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { Cpu, Zap, Wifi, Server, Database, Activity } from "lucide-react";

interface Chip {
  id: string;
  x: number;
  y: number;
  label: string;
  icon: typeof Cpu;
  color: string;
  specs: string[];
}

interface Trace {
  id: string;
  from: string;
  to: string;
  path: string;
  color?: string;
}

const chips: Chip[] = [
  { id: "esp8266", x: 50, y: 50, label: "ESP8266", icon: Cpu, color: "#22c55e", specs: ["160MHz", "4MB Flash", "WiFi b/g/n"] },
  { id: "dht22", x: 15, y: 30, label: "DHT22", icon: Activity, color: "#22d3ee", specs: ["Temp ±0.5°C", "Humidity", "1-Wire"] },
  { id: "moisture", x: 15, y: 70, label: "Soil Sensor", icon: Zap, color: "#a855f7", specs: ["ADC 10-bit", "Capacitive", "Analog"] },
  { id: "relay", x: 85, y: 50, label: "Relay K1", icon: Zap, color: "#f59e0b", specs: ["5V SPDT", "10A max", "Opto-coupled"] },
  { id: "wifi", x: 50, y: 15, label: "WiFi Module", icon: Wifi, color: "#22c55e", specs: ["802.11 b/g/n", "-42dBm", "TCP/IP"] },
  { id: "cloud", x: 85, y: 15, label: "Firebase", icon: Server, color: "#22d3ee", specs: ["RTDB", "Auth", "Cloud Func"] },
  { id: "tank", x: 50, y: 85, label: "Tank Sensor", icon: Database, color: "#a855f7", specs: ["HC-SR04", "2-400cm", "Ultrasonic"] },
];

const traces: Trace[] = [
  { id: "t1", from: "dht22", to: "esp8266", path: "M30,30 Q40,30 50,35" },
  { id: "t2", from: "moisture", to: "esp8266", path: "M30,70 Q40,65 50,60" },
  { id: "t3", from: "esp8266", to: "relay", path: "M65,50 Q75,50 80,50" },
  { id: "t4", from: "esp8266", to: "wifi", path: "M50,35 Q50,25 50,20" },
  { id: "t5", from: "wifi", to: "cloud", path: "M65,15 Q75,15 80,15" },
  { id: "t6", from: "esp8266", to: "tank", path: "M50,65 Q50,75 50,80" },
  { id: "t7", from: "dht22", to: "moisture", path: "M20,45 Q20,55 20,65" },
  { id: "t8", from: "cloud", to: "relay", path: "M85,30 Q90,40 85,45" },
];

export default function LivingCircuitBoard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [pulsePositions, setPulsePositions] = useState<Record<string, number>>({});

  // Animate pulses along traces
  useEffect(() => {
    if (!isInView) return;

    const intervals = traces.map((trace) => {
      return setInterval(() => {
        setPulsePositions((prev) => ({
          ...prev,
          [trace.id]: 0,
        }));
        // Animate from 0 to 1
        let pos = 0;
        const speed = 0.02;
        const animInterval = setInterval(() => {
          pos += speed;
          if (pos >= 1) {
            clearInterval(animInterval);
          }
          setPulsePositions((prev) => ({
            ...prev,
            [trace.id]: pos,
          }));
        }, 30);
        return animInterval;
      }, 2000 + Math.random() * 3000);
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [isInView]);

  const getChipCenter = (chipId: string) => {
    const chip = chips.find((c) => c.id === chipId);
    if (!chip) return { x: 50, y: 50 };
    // Convert percentage to SVG coordinates
    // SVG viewBox is 0 0 100 100
    return { x: chip.x, y: chip.y };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[600px] mx-auto"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 10px rgba(34,197,94,0.15))" }}
      >
        {/* Board background */}
        <rect
          x="2"
          y="2"
          width="96"
          height="96"
          rx="4"
          fill="#0a1a0a"
          stroke="#22c55e"
          strokeWidth="0.3"
          opacity={0.5}
        />

        {/* Grid pattern */}
        <defs>
          <pattern id="pcb-grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M5 0 L0 0 0 5" fill="none" stroke="#22c55e" strokeWidth="0.1" opacity={0.15} />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect x="2" y="2" width="96" height="96" fill="url(#pcb-grid)" rx="4" />

        {/* Traces */}
        {traces.map((trace) => (
          <g key={trace.id}>
            {/* Base trace */}
            <path
              d={trace.path}
              fill="none"
              stroke="#22c55e"
              strokeWidth="0.5"
              opacity={0.3}
            />
            {/* Glow trace */}
            <path
              d={trace.path}
              fill="none"
              stroke="#22c55e"
              strokeWidth="1.5"
              opacity={0.1}
              filter="url(#glow)"
            />
            {/* Animated pulse */}
            {pulsePositions[trace.id] !== undefined && (
              <circle
                r="1.5"
                fill="#4ade80"
                filter="url(#glow)"
                opacity={0.9}
              >
                <animateMotion
                  dur="1s"
                  repeatCount="1"
                  path={trace.path}
                  begin={`${pulsePositions[trace.id] * 1}s`}
                />
              </circle>
            )}
            {/* Static pulse dots along trace */}
            {[0.2, 0.5, 0.8].map((pos, i) => (
              <circle
                key={i}
                r="0.3"
                fill="#22c55e"
                opacity={0.2 * (i + 1)}
              >
                <animate
                  attributeName="opacity"
                  values="0.1;0.4;0.1"
                  dur={`${2 + i * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        ))}

        {/* Via holes */}
        {chips.map((chip) => (
          <circle
            key={`via-${chip.id}`}
            cx={chip.x}
            cy={chip.y}
            r="1"
            fill="none"
            stroke="#22c55e"
            strokeWidth="0.3"
            opacity={0.3}
          />
        ))}

        {/* Chips */}
        {chips.map((chip) => {
          const isActive = activeChip === chip.id;
          return (
            <g
              key={chip.id}
              onMouseEnter={() => setActiveChip(chip.id)}
              onMouseLeave={() => setActiveChip(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Chip body */}
              <rect
                x={chip.x - 6}
                y={chip.y - 4}
                width="12"
                height="8"
                rx="1"
                fill={isActive ? "rgba(34,197,94,0.2)" : "rgba(34,197,94,0.08)"}
                stroke={isActive ? "#22c55e" : "rgba(34,197,94,0.3)"}
                strokeWidth="0.4"
              >
                {isActive && (
                  <animate
                    attributeName="stroke-opacity"
                    values="0.5;1;0.5"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                )}
              </rect>
              {/* Chip pins */}
              {[0, 1, 2, 3].map((pin) => (
                <line
                  key={pin}
                  x1={chip.x - 4 + pin * 2.5}
                  y1={chip.y + 4}
                  x2={chip.x - 4 + pin * 2.5}
                  y2={chip.y + 6}
                  stroke={isActive ? "#4ade80" : "#22c55e"}
                  strokeWidth="0.3"
                  opacity={isActive ? 0.8 : 0.3}
                />
              ))}
              {[0, 1, 2, 3].map((pin) => (
                <line
                  key={`pin-t-${pin}`}
                  x1={chip.x - 4 + pin * 2.5}
                  y1={chip.y - 4}
                  x2={chip.x - 4 + pin * 2.5}
                  y2={chip.y - 6}
                  stroke={isActive ? "#4ade80" : "#22c55e"}
                  strokeWidth="0.3"
                  opacity={isActive ? 0.8 : 0.3}
                />
              ))}
              {/* Label */}
              <text
                x={chip.x}
                y={chip.y + 0.5}
                textAnchor="middle"
                fill={isActive ? "#4ade80" : "rgba(34,197,94,0.6)"}
                fontSize="1.5"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {chip.label}
              </text>
              {/* Glow ring on hover */}
              {isActive && (
                <circle
                  cx={chip.x}
                  cy={chip.y}
                  r="10"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="0.5"
                  opacity={0.5}
                >
                  <animate
                    attributeName="r"
                    values="8;14;8"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.5;0.1;0.5"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Spec popup on hover */}
      {activeChip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-2 glass px-3 py-2 rounded-xl border border-primary/30 text-center"
        >
          {chips.find((c) => c.id === activeChip)?.specs.map((spec, i) => (
            <div key={i} className="font-mono text-[9px] text-primary/80 whitespace-nowrap">{spec}</div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
