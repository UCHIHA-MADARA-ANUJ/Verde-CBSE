"use client";

import { useEffect, useRef } from "react";
import { usePerformanceTier } from "../hooks/usePerformanceTier";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface Node {
  x: number;
  y: number;
  label: string;
  type: "core" | "sensor" | "actuator" | "power";
  phase: number;
}

interface Connection {
  from: number;
  to: number;
  data?: { label: string; speed: number };
}

export default function HardwareDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const perf = usePerformanceTier();
  const reduced = useReducedMotion();
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let frame = 0;

    const isLowPerf = perf === "low" || reduced;

    const nodes: Node[] = [
      { x: 0.5, y: 0.35, label: "ESP8266", type: "core", phase: 0 },
      { x: 0.2, y: 0.55, label: "DHT22", type: "sensor", phase: 1.2 },
      { x: 0.35, y: 0.7, label: "Moisture", type: "sensor", phase: 2.5 },
      { x: 0.65, y: 0.7, label: "HC-SR04", type: "sensor", phase: 0.8 },
      { x: 0.8, y: 0.55, label: "NPK", type: "sensor", phase: 1.9 },
      { x: 0.7, y: 0.2, label: "Relay K1", type: "actuator", phase: 3.1 },
      { x: 0.3, y: 0.2, label: "UV LEDs", type: "actuator", phase: 0.4 },
      { x: 0.5, y: 0.85, label: "5V Reg", type: "power", phase: 2.0 },
    ];

    const connections: Connection[] = [
      { from: 0, to: 1, data: { label: "1-Wire", speed: 0.8 } },
      { from: 0, to: 2, data: { label: "ADC", speed: 1.2 } },
      { from: 0, to: 3, data: { label: "GPIO", speed: 0.6 } },
      { from: 0, to: 4, data: { label: "RS485", speed: 0.9 } },
      { from: 0, to: 5, data: { label: "GPIO", speed: 1.1 } },
      { from: 0, to: 6, data: { label: "PWM", speed: 0.7 } },
      { from: 7, to: 0, data: { label: "VIN", speed: 1.0 } },
    ];

    const drawNode = (node: Node, time: number) => {
      const nx = node.x * w;
      const ny = node.y * h;
      const pulse = isLowPerf ? 1 : 0.7 + 0.3 * Math.sin(time * 2 + node.phase);

      // Node glow
      const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, 20);
      const colors = {
        core: "rgba(34,197,94,",
        sensor: "rgba(34,211,238,",
        actuator: "rgba(168,85,247,",
        power: "rgba(245,158,11,",
      };
      const c = colors[node.type];
      grad.addColorStop(0, `${c}${0.3 * pulse})`);
      grad.addColorStop(1, `${c}0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(nx, ny, 20, 0, Math.PI * 2);
      ctx.fill();

      // Node circle
      ctx.beginPath();
      ctx.arc(nx, ny, isLowPerf ? 5 : 4 + pulse * 2, 0, Math.PI * 2);
      ctx.fillStyle = colors[node.type].replace(",", "").replace(")", "") + `,${0.6 + 0.4 * pulse})`;
      ctx.fill();

      // Border
      ctx.strokeStyle = colors[node.type].replace(",", "").replace(")", "") + `,${0.3 + 0.2 * pulse})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label
      ctx.fillStyle = `rgba(255,255,255,${0.5 + 0.3 * pulse})`;
      ctx.font = `${isLowPerf ? 8 : 9}px "JetBrains Mono", monospace`;
      ctx.textAlign = "center";
      ctx.fillText(node.label, nx, ny + 18);
    };

    const drawConnection = (conn: Connection, time: number) => {
      const from = nodes[conn.from];
      const to = nodes[conn.to];
      const fx = from.x * w;
      const fy = from.y * h;
      const tx = to.x * w;
      const ty = to.y * h;

      // Line
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(tx, ty);
      ctx.strokeStyle = `rgba(34,197,94,${isLowPerf ? 0.08 : 0.12})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Data packet animation
      if (!isLowPerf && conn.data) {
        const t = ((time * conn.data.speed) % 1);
        const px = fx + (tx - fx) * t;
        const py = fy + (ty - fy) * t;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,197,94,${0.4 + 0.6 * Math.sin(t * Math.PI)})`;
        ctx.fill();

        // Label at midpoint
        if (frame % 120 < 60) {
          ctx.fillStyle = `rgba(255,255,255,${0.15 * Math.sin(t * Math.PI)})`;
          ctx.font = '7px "JetBrains Mono", monospace';
          ctx.textAlign = "center";
          ctx.fillText(conn.data.label, (fx + tx) / 2, (fy + ty) / 2 - 8);
        }
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (timestamp: number) => {
      const time = timestamp / 1000;
      frame++;

      ctx.clearRect(0, 0, w, h);

      // Draw connections with data flow
      connections.forEach((c) => drawConnection(c, time));

      // Draw nodes
      nodes.forEach((n) => drawNode(n, time));

      if (!isLowPerf) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        // Low perf: only update every 2 seconds
        setTimeout(() => {
          rafRef.current = requestAnimationFrame(draw);
        }, 2000);
      }
    };

    if (!isLowPerf) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      draw(0);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [perf, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-2xl"
      aria-label="Animated system diagram showing ESP8266 core connected to sensors and actuators"
    />
  );
}
