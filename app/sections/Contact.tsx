"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Radio, Send } from "lucide-react";
import TerminalText from "../components/TerminalText";
import RippleEffect from "../components/RippleEffect";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
  };

  return (
    <section id="contact" className="relative z-10 py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="font-mono text-[10px] text-primary/60 uppercase tracking-[0.4em] block mb-4">
            [ 00_100 :: NEURAL_LINK ]
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Initiate <span className="text-primary text-neon">Contact</span>
          </h2>
          <div className="h-px w-24 bg-primary/40" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-slate-300 leading-relaxed text-lg">
              <TerminalText
                text="Open a secure channel. We respond to all transmissions within 24 cycles."
                speed={20}
                delay={0}
              />
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="p-3 border border-white/10 group-hover:border-primary/40 transition-colors">
                  <Mail className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1">
                    Direct Line
                  </div>
                  <div className="text-white/80 font-mono text-sm">
                    command@verde.systems
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 border border-white/10 group-hover:border-primary/40 transition-colors">
                  <MapPin className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1">
                    Origin Node
                  </div>
                  <div className="text-white/80 font-mono text-sm">
                    35.6762° N, 139.6503° E
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 border border-white/10 group-hover:border-primary/40 transition-colors">
                  <Radio className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1">
                    Mesh Status
                  </div>
                  <div className="text-white/80 font-mono text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Online — 14ms latency
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass p-8 border border-white/5"
          >
            <RippleEffect color="rgba(34,197,94,0.15)">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="callsign" className="text-[10px] font-mono uppercase tracking-widest text-white/30">
                  Callsign
                </label>
                <input
                  id="callsign"
                  name="callsign"
                  type="text"
                  required
                  className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all"
                  placeholder="user_001"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="channel-id" className="text-[10px] font-mono uppercase tracking-widest text-white/30">
                  Channel ID
                </label>
                <input
                  id="channel-id"
                  name="channelId"
                  type="email"
                  required
                  className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all"
                  placeholder="node@mesh.net"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="payload" className="text-[10px] font-mono uppercase tracking-widest text-white/30">
                  Payload
                </label>
                <textarea
                  id="payload"
                  name="payload"
                  required
                  rows={4}
                  className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all resize-none"
                  placeholder="Enter transmission data..."
                />
              </div>

              <button
                type="submit"
                disabled={status !== "idle"}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-black font-mono text-sm font-bold tracking-wider uppercase hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "idle" && (
                  <>
                    <Send className="w-4 h-4" /> Transmit
                  </>
                )}
                {status === "sending" && "Encrypting..."}
                {status === "sent" && "Signal Sent."}
              </button>
            </form>
            </RippleEffect>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
          SYS_VER: 2.1.0 // BUILD: STABLE
        </span>
        <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
          © {new Date().getFullYear()} Project Verde. All systems nominal.
        </span>
      </div>
    </section>
  );
}
