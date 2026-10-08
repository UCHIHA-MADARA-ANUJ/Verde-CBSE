"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MagneticCursorTrailProps {
  children: React.ReactNode;
}

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  branches: { x: number; y: number; angle: number; length: number }[];
}

export default function MagneticCursorTrail({ children }: MagneticCursorTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailPointsRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: -100, y: -100, lastX: -100, lastY: -100 });
  const rafRef = useRef(0);
  const frameRef = useRef(0);
  const [nearInteractive, setNearInteractive] = useState(false);

  // Check proximity to interactive elements
  const checkProximity = useCallback((x: number, y: number) => {
    const interactive = document.querySelectorAll("a, button, [role='button'], .btn-primary, .btn-secondary, .glass-card");
    let isNear = false;
    interactive.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      if (dist < 100) isNear = true;
    });
    setNearInteractive(isNear);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const prevX = mouseRef.current.x;
      const prevY = mouseRef.current.y;
      mouseRef.current = { x: e.clientX, y: e.clientY, lastX: prevX, lastY: prevY };
      checkProximity(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      frameRef.current++;

      // Only add trail points every 3 frames
      if (frameRef.current % 3 === 0 && mouse.lastX !== -100) {
        const branchCount = nearInteractive ? 3 : 1 + Math.floor(Math.random() * 2);
        const branches = [];

        for (let i = 0; i < branchCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const length = nearInteractive ? 20 + Math.random() * 30 : 10 + Math.random() * 20;
          branches.push({
            x: 0,
            y: 0,
            angle,
            length,
          });
        }

        trailPointsRef.current.push({
          x: mouse.x,
          y: mouse.y,
          age: 0,
          branches,
        });
      }

      // Limit trail points
      if (trailPointsRef.current.length > 40) {
        trailPointsRef.current = trailPointsRef.current.slice(-40);
      }

      // Draw trail
      const points = trailPointsRef.current;

      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        point.age++;

        const alpha = Math.max(0, 1 - point.age / 50);
        const width = Math.max(0.3, 2 * (1 - point.age / 50));

        // Main trail dot
        ctx.fillStyle = `rgba(34, 197, 94, ${alpha * 0.4})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, width * 2, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.fillStyle = `rgba(134, 239, 172, ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, width, 0, Math.PI * 2);
        ctx.fill();

        // Branch traces (PCB-like)
        for (const branch of point.branches) {
          const endX = point.x + Math.cos(branch.angle) * branch.length * (1 - point.age / 50);
          const endY = point.y + Math.sin(branch.angle) * branch.length * (1 - point.age / 50);

          ctx.strokeStyle = `rgba(34, 197, 94, ${alpha * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          
          // Slight curve to traces
          const midX = (point.x + endX) / 2 + Math.sin(branch.angle) * 5;
          const midY = (point.y + endY) / 2 + Math.cos(branch.angle) * 5;
          ctx.quadraticCurveTo(midX, midY, endX, endY);
          ctx.stroke();

          // Small dot at end of branch
          ctx.fillStyle = `rgba(34, 197, 94, ${alpha * 0.2})`;
          ctx.beginPath();
          ctx.arc(endX, endY, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Solder joint effect near interactive elements
      if (nearInteractive && points.length > 0) {
        const last = points[points.length - 1];
        ctx.fillStyle = "rgba(34, 197, 94, 0.15)";
        ctx.beginPath();
        ctx.arc(last.x, last.y, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(34, 197, 94, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [nearInteractive, checkProximity]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9996]"
        style={{ mixBlendMode: "screen" }}
      />
      {children}
    </>
  );
}
