"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { Cpu, Wifi, Cloud, Monitor, Database, ArrowRight } from "lucide-react";

interface Packet {
  id: number;
  x: number;
  y: number;
  progress: number;
  speed: number;
  path: number;
  size: number;
  opacity: number;
}

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  icon: typeof Cpu;
  color: string;
}

const nodes: Node[] = [
  { id: "sensor", label: "SENSOR", x: 0.1, y: 0.5, icon: Cpu, color: "#22c55e" },
  { id: "esp8266", label: "ESP8266", x: 0.3, y: 0.3, icon: Cpu, color: "#22d3ee" },
  { id: "wifi", label: "WiFi", x: 0.5, y: 0.2, icon: Wifi, color: "#a855f7" },
  { id: "firebase", label: "FIREBASE", x: 0.7, y: 0.4, icon: Cloud, color: "#f59e0b" },
  { id: "dashboard", label: "DASHBOARD", x: 0.9, y: 0.5, icon: Monitor, color: "#22c55e" },
];

const paths = [
  // Sensor → ESP8266
  (t: number) => ({ x: 0.1 + t * 0.2, y: 0.5 - t * 0.2 }),
  // ESP8266 → WiFi
  (t: number) => ({ x: 0.3 + t * 0.2, y: 0.3 - t * 0.1 }),
  // WiFi → Firebase
  (t: number) => ({ x: 0.5 + t * 0.2, y: 0.2 + t * 0.2 }),
  // Firebase → Dashboard
  (t: number) => ({ x: 0.7 + t * 0.2, y: 0.4 + t * 0.1 }),
  // Sensor → Firebase (direct cloud)
  (t: number) => ({ x: 0.1 + t * 0.6, y: 0.5 - t * 0.1 }),
];

const getPathEndpoints = (pathIndex: number) => {
  const pathEnds = [
    { from: "sensor", to: "esp8266" },
    { from: "esp8266", to: "wifi" },
    { from: "wifi", to: "firebase" },
    { from: "firebase", to: "dashboard" },
    { from: "sensor", to: "firebase" },
  ];
  return pathEnds[pathIndex];
};

export default function DataPacketFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const packetsRef = useRef<Packet[]>([]);
  const rafRef = useRef(0);
  const [pulseNode, setPulseNode] = useState<string | null>(null);

  useEffect(() => {
    let lastPacketTime = 0;
    let packetId = 0;

    const spawnPacket = () => {
      const pathIndex = Math.floor(Math.random() * paths.length);
      const packet: Packet = {
        id: packetId++,
        x: 0,
        y: 0,
        progress: 0,
        speed: 0.005 + Math.random() * 0.008,
        path: pathIndex,
        size: 2 + Math.random() * 2,
        opacity: 0.6 + Math.random() * 0.4,
      };
      packetsRef.current.push(packet);
    };

    const animate = (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Draw curved connection paths
      ctx.strokeStyle = "rgba(34,197,94,0.08)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      const pathStyles = [
        { from: nodes[0], to: nodes[1] },
        { from: nodes[1], to: nodes[2] },
        { from: nodes[2], to: nodes[3] },
        { from: nodes[3], to: nodes[4] },
        { from: nodes[0], to: nodes[3] },
      ];

      pathStyles.forEach((ps) => {
        const fromX = ps.from.x * w;
        const fromY = ps.from.y * h;
        const toX = ps.to.x * w;
        const toY = ps.to.y * h;
        const midX = (fromX + toX) / 2;
        const midY = (fromY + toY) / 2 - 30;

        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.quadraticCurveTo(midX, midY, toX, toY);
        ctx.stroke();
      });

      ctx.setLineDash([]);

      // Update and draw packets
      packetsRef.current = packetsRef.current.filter((p) => p.progress < 1);
      packetsRef.current = packetsRef.current.slice(-30); // max packets

      for (const p of packetsRef.current) {
        p.progress += p.speed;
        if (p.progress >= 1) {
          // Signal arrival: pulse the destination node
          const end = getPathEndpoints(p.path);
          setPulseNode(end.to);
          setTimeout(() => setPulseNode(null), 300);
          continue;
        }

        const pos = paths[p.path](p.progress);
        const px = pos.x * w;
        const py = pos.y * h;

        // Draw packet
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, p.size * 3);
        gradient.addColorStop(0, `rgba(134, 239, 172, ${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(34, 197, 94, ${p.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(34, 197, 94, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(134, 239, 172, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Spawn new packets periodically
      if (timestamp - lastPacketTime > 400) {
        spawnPacket();
        if (Math.random() > 0.6) spawnPacket(); // sometimes spawn two
        lastPacketTime = timestamp;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />

      {/* Node labels */}
      <div className="absolute inset-0">
        {nodes.map((node, i) => {
          const isPulsing = pulseNode === node.id;
          return (
            <motion.div
              key={node.id}
              className="absolute flex flex-col items-center gap-1"
              style={{ left: `${node.x * 100}%`, top: `${node.y * 100}%`, transform: "translate(-50%, -50%)" }}
              animate={isPulsing ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`p-2 rounded-lg border transition-all duration-300 ${
                  isPulsing
                    ? "bg-primary/20 border-primary/60 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                    : "bg-black/50 border-primary/30"
                }`}
              >
                <node.icon
                  size={16}
                  style={{ color: node.color }}
                  className={isPulsing ? "animate-pulse" : ""}
                />
              </div>
              <span className="font-mono text-[7px] text-primary/60 uppercase tracking-wider whitespace-nowrap">
                {node.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
