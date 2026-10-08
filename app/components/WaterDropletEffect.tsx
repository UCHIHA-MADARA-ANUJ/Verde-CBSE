"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";

interface Droplet {
  id: number;
  x: number;
  delay: number;
  size: number;
  duration: number;
  opacity: number;
}

interface SplashParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  delay: number;
}

export default function WaterDropletEffect({ 
  triggerOnce = true,
  className = ""
}: { 
  triggerOnce?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: triggerOnce, amount: 0.3 });
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const [splashes, setSplashes] = useState<SplashParticle[]>([]);
  const [isActive, setIsActive] = useState(false);
  const dropletIdRef = useRef(0);
  const splashIdRef = useRef(0);

  useEffect(() => {
    if (!isInView) return;
    setIsActive(true);

    // Spawn droplets in sequence
    const dropletInterval = setInterval(() => {
      const newDroplet: Droplet = {
        id: dropletIdRef.current++,
        x: 20 + Math.random() * 60, // random horizontal position (percentage)
        delay: 0,
        size: 3 + Math.random() * 4,
        duration: 0.6 + Math.random() * 0.4,
        opacity: 0.6 + Math.random() * 0.4,
      };
      setDroplets((prev) => [...prev, newDroplet]);

      // Schedule splash after droplet falls
      setTimeout(() => {
        const splashCount = 3 + Math.floor(Math.random() * 4);
        const newSplashes: SplashParticle[] = [];
        for (let i = 0; i < splashCount; i++) {
          const angle = (Math.PI * 2 * i) / splashCount + (Math.random() - 0.5) * 0.5;
          const speed = 2 + Math.random() * 4;
          newSplashes.push({
            id: splashIdRef.current++,
            x: newDroplet.x,
            y: 100,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 3,
            size: 1 + Math.random() * 2,
            delay: 0,
          });
        }
        setSplashes((prev) => [...prev, ...newSplashes]);
      }, (newDroplet.duration) * 1000);

      // Cleanup old droplets
      setTimeout(() => {
        setDroplets((prev) => prev.slice(-10));
        setSplashes((prev) => prev.slice(-30));
      }, 3000);
    }, 800);

    // Stop after some time
    const stopTimeout = setTimeout(() => {
      clearInterval(dropletInterval);
      setIsActive(false);
    }, 6000);

    return () => {
      clearInterval(dropletInterval);
      clearTimeout(stopTimeout);
    };
  }, [isInView]);

  return (
    <div ref={ref} className={`relative ${className}`} style={{ minHeight: "100px" }}>
      {/* Droplets falling */}
      {droplets.map((d) => (
        <motion.div
          key={d.id}
          className="absolute top-0 z-10"
          style={{ left: `${d.x}%`, width: d.size, height: d.size * 1.5 }}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: "100%",
            opacity: [0, d.opacity, d.opacity, 0.8],
          }}
          transition={{
            duration: d.duration,
            ease: "easeIn",
          }}
        >
          {/* Droplet shape */}
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "linear-gradient(180deg, rgba(34, 211, 238, 0.8), rgba(34, 197, 94, 0.6))",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              boxShadow: "0 0 6px rgba(34, 211, 238, 0.3)",
            }}
          />
        </motion.div>
      ))}

      {/* Splash particles */}
      {splashes.map((s) => (
        <motion.div
          key={s.id}
          className="absolute bottom-0 z-10"
          style={{ left: `${s.x}%` }}
          initial={{ y: 0, x: 0, opacity: 1, scale: 1 }}
          animate={{
            y: s.vy * 10,
            x: s.vx * 10,
            opacity: 0,
            scale: 0.3,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: s.size,
              height: s.size,
              background: "rgba(34, 211, 238, 0.7)",
              boxShadow: "0 0 4px rgba(34, 211, 238, 0.4)",
            }}
          />
        </motion.div>
      ))}

      {/* Splash ring at bottom */}
      {splashes.length > 0 && splashes.slice(-1).map((s) => (
        <motion.div
          key={`ring-${s.id}`}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          initial={{ width: 0, opacity: 0.6 }}
          animate={{ width: 60, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            height: 2,
            background: "radial-gradient(ellipse, rgba(34, 211, 238, 0.4) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
      ))}

      {/* Ripple indicator */}
      {isActive && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <motion.div
            className="w-full"
            initial={{ scaleX: 0, opacity: 0.5 }}
            animate={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{
              height: 2,
              background: "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.3), transparent)",
              transformOrigin: "center",
            }}
          />
        </div>
      )}
    </div>
  );
}
