"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Terminal, ArrowRight } from "lucide-react";

const projects = [
  {
    id: "PRJ-001",
    title: "Verde_Core",
    description:
      "Real-time edge controller firmware for aeroponic nutrient delivery. Runs on dual-core ARM Cortex-M7 with sub-millisecond loop guarantees and hardware-in-the-loop simulation hooks.",
    tags: ["Rust", "Zephyr", "HAL", "CAN-FD"],
    links: { live: "#", repo: "#" },
  },
  {
    id: "PRJ-002",
    title: "Canopy_Vision",
    description:
      "Hyperspectral + RGB pipeline for early-stage plant stress detection. Deployed as TensorRT engines on NVIDIA Jetson Orin nodes with fleet-wide model distillation.",
    tags: ["PyTorch", "CUDA", "ONNX", "GStreamer"],
    links: { live: "#", repo: "#" },
  },
  {
    id: "PRJ-003",
    title: "RootMesh",
    description:
      "Decentralized mesh networking stack for underground sensor grids. Implements custom flooding protocols over LoRaWAN with store-and-forward resilience for off-grid pods.",
    tags: ["C++", "LoRa", "MQTT-SN", "eBPF"],
    links: { live: "#", repo: "#" },
  },
  {
    id: "PRJ-004",
    title: "Foliage_3D",
    description:
      "Procedural visualization engine for canopy light-interception modeling. Generates interactive WebGL simulations of growth projections using raymarched signed-distance fields.",
    tags: ["WebGL", "WGSL", "Three.js", "WASM"],
    links: { live: "#", repo: "#" },
  },
  {
    id: "PRJ-005",
    title: "Pollen_Sync",
    description:
      "Cross-region genetic drift tracker using distributed ledger consensus. Maintains provenance records for synthetic cultivars across regulatory boundaries.",
    tags: ["Solidity", "IPFS", "Zero-Knowledge", "Graph"],
    links: { live: "#", repo: "#" },
  },
  {
    id: "PRJ-006",
    title: "DewPoint_API",
    description:
      "GraphQL telemetry gateway aggregating millions of sensor events per second. Supports reactive subscriptions for live dashboarding and anomaly detection triggers.",
    tags: ["Rust", "GraphQL", "Tokio", "Redis"],
    links: { live: "#", repo: "#" },
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "circOut" }}
      className="glass-card group p-6 md:p-8 flex flex-col gap-5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="w-4 h-4 text-primary" />
      </div>

      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-primary/50 uppercase tracking-widest">
          {project.id}
        </span>
        <div className="flex gap-3">
          <a
            href={project.links.repo}
            className="text-white/20 hover:text-primary transition-colors"
            aria-label="Repository"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={project.links.live}
            className="text-white/20 hover:text-primary transition-colors"
            aria-label="Live demo"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-heading font-bold text-white group-hover:text-primary transition-colors">
        {project.title}
      </h3>

      <p className="text-sm text-slate-400 leading-relaxed flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 pt-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider border border-white/5 text-white/40 bg-white/[0.02]"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="systems" className="relative z-10 py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="font-mono text-[10px] text-primary/60 uppercase tracking-[0.4em] block mb-4">
            [ 00_011 :: DEPLOYED_MODULES ]
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Active <span className="text-primary text-neon">Systems</span>
          </h2>
          <div className="h-px w-24 bg-primary/40" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
