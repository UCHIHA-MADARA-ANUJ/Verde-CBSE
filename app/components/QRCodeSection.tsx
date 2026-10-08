"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Smartphone, Scan, ArrowRight } from "lucide-react";

// Simple QR code generator for URL text
// This is a minimal QR implementation - in production use a library like qrcode
function generateQRMatrix(text: string, size: number): boolean[][] {
  // Simple placeholder matrix generator
  // For a real QR code, use qrcode.js library
  const matrix: boolean[][] = [];
  for (let i = 0; i < size; i++) {
    matrix[i] = [];
    for (let j = 0; j < size; j++) {
      // Create finder patterns (corners)
      const isFinder = (i < 7 && j < 7) || (i < 7 && j >= size - 7) || (i >= size - 7 && j < 7);
      const isTiming = (i === 6 || j === 6);
      const isData = !isFinder && !isTiming;
      
      if (isFinder) {
        // Finder pattern
        if ((i === 0 || i === 6 || j === 0 || j === 6) || 
            (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
          matrix[i][j] = true;
        } else {
          matrix[i][j] = false;
        }
      } else if (isTiming) {
        matrix[i][j] = (i + j) % 2 === 0;
      } else {
        // Data area - pseudo-random based on text
        const charCode = text.charCodeAt((i * size + j) % text.length) || 0;
        matrix[i][j] = (charCode + i + j) % 3 !== 0;
      }
    }
  }
  return matrix;
}

export default function QRCodeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [buildProgress, setBuildProgress] = useState(0);

  const siteUrl = "https://verde-tech-portfolio.vercel.app";
  const qrSize = 21; // Version 1 QR
  const cellSize = 8;
  const padding = 16;

  useEffect(() => {
    if (!isInView) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const matrix = generateQRMatrix(siteUrl, qrSize);
    const totalCells = qrSize * qrSize;
    let currentCell = 0;

    // Animate drawing the QR code dot by dot
    const interval = setInterval(() => {
      if (currentCell >= totalCells) {
        clearInterval(interval);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw all cells up to currentCell
      let drawn = 0;
      for (let i = 0; i < qrSize; i++) {
        for (let j = 0; j < qrSize; j++) {
          if (drawn <= currentCell && matrix[i]?.[j]) {
            const x = padding + j * cellSize;
            const y = padding + i * cellSize;

            // Draw with slight glow
            ctx.fillStyle = "#22c55e";
            ctx.shadowColor = "rgba(34,197,94,0.3)";
            ctx.shadowBlur = 2;
            ctx.fillRect(x, y, cellSize - 1, cellSize - 1);
            ctx.shadowBlur = 0;

            drawn++;
          }
        }
      }

      currentCell += Math.max(1, Math.floor(totalCells / 200)); // Speed up animation
      setBuildProgress(Math.min(100, (currentCell / totalCells) * 100));
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, siteUrl]);

  return (
    <section id="qr" className="relative z-10 py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={containerRef}
          className="glass p-8 md:p-12 rounded-3xl border border-white/5 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Smartphone size={24} className="text-primary" />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-heading font-black uppercase tracking-tighter text-white">
                SCAN TO EXPLORE
              </h2>
              <p className="text-xs font-mono text-white/40">
                Open the live project on your phone
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* QR Code canvas */}
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={padding * 2 + qrSize * cellSize}
                height={padding * 2 + qrSize * cellSize}
                className="rounded-2xl bg-black border border-white/5"
                style={{ width: 180, height: 180 }}
              />

              {/* Build progress */}
              {buildProgress < 100 && (
                <motion.div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[8px] text-primary/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  BUILDING QR... {Math.floor(buildProgress)}%
                </motion.div>
              )}
            </div>

            <div className="text-left space-y-4">
              <div className="flex items-center gap-2">
                <Scan size={16} className="text-primary" />
                <span className="text-sm text-slate-300">
                  Point your camera at the QR code
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight size={16} className="text-primary" />
                <span className="text-sm text-slate-300">
                  Opens the full Project Verde experience
                </span>
              </div>
              <div className="glass px-4 py-2 rounded-xl border border-primary/20 inline-block">
                <span className="font-mono text-[10px] text-primary/60">
                  {siteUrl}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
