"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  alpha: number;
  layer: number;
  phase: number;
  phaseSpeed: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const frameCountRef = useRef(0);
  const isVisibleRef = useRef(true);
  const lastTimeRef = useRef(0);

  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    // Optimized: fewer particles per layer, better distribution
    const configs = [
      { count: 25, speed: 0.12, size: [0.8, 1.5] },
      { count: 35, speed: 0.2, size: [1.0, 2.0] },
      { count: 45, speed: 0.35, size: [1.2, 2.8] },
    ];

    for (let layer = 0; layer < configs.length; layer++) {
      const cfg = configs[layer];
      for (let i = 0; i < cfg.count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * cfg.speed,
          vy: (Math.random() - 0.5) * cfg.speed,
          size: cfg.size[0] + Math.random() * (cfg.size[1] - cfg.size[0]),
          alpha: 0.15 + Math.random() * 0.35,
          layer,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.015 + Math.random() * 0.025,
        });
      }
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    particlesRef.current = initParticles(w, h);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      particlesRef.current = initParticles(w, h);
    };

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(onResize, 200);
    };
    window.addEventListener("resize", debouncedResize);

    const onVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      if (!document.hidden) {
        lastTimeRef.current = 0;
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const draw = (timestamp: number) => {
      if (!isVisibleRef.current) return;

      // Adaptive frame rate: skip if too much time passed (e.g., tab switch)
      if (lastTimeRef.current && timestamp - lastTimeRef.current > 100) {
        lastTimeRef.current = timestamp;
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastTimeRef.current = timestamp;

      ctx.clearRect(0, 0, w, h);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const frame = frameCountRef.current++;

      // Connection lines - throttle to every 4th frame for perf
      if (frame % 4 === 0) {
        const maxDist = 100;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            if (a.layer !== b.layer) continue;
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = dx * dx + dy * dy;
            if (dist < maxDist * maxDist) {
              const alpha = (1 - Math.sqrt(dist) / maxDist) * 0.12 * a.alpha;
              ctx.strokeStyle = `rgba(34,197,94,${alpha})`;
              ctx.lineWidth = 0.4;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // Particles
      for (const p of particles) {
        p.phase += p.phaseSpeed;
        const pulseAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.phase));

        // Mouse repulsion - optimized: skip if mouse far
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 22500) {
            const dist = Math.sqrt(distSq);
            const force = (150 - dist) / 150;
            const f = force * 0.4;
            p.vx += (dx / dist) * f;
            p.vy += (dy / dist) * f;
          }
        }

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.vx += (Math.random() - 0.5) * 0.015;
        p.vy += (Math.random() - 0.5) * 0.015;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        if (p.y > h) p.y -= h;

        // Draw particle
        ctx.fillStyle = `rgba(34,197,94,${pulseAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow only for larger particles - saves draw calls
        if (p.size > 1.8) {
          ctx.fillStyle = `rgba(34,197,94,${pulseAlpha * 0.2})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", debouncedResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      clearTimeout(resizeTimeout);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  );
}
