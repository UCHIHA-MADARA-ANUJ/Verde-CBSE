"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Copy, Check, FileCode, Terminal, Cloud } from "lucide-react";
import SectionReveal from "../components/SectionReveal";
import TerminalComponent from "../components/Terminal";
import TextScramble from "../components/TextScramble";

const files = [
  { id: "firmware", label: "verde_firmware_v21.ino", icon: FileCode },
  { id: "dashboard", label: "dashboard.tsx", icon: Terminal },
  { id: "api", label: "telemetry_api.ts", icon: Cloud },
];

const codeSnippets: Record<string, string[]> = {
  firmware: [
    "// ═══════════════════════════════════════════",
    "// PROJECT VERDE — AUTONOMOUS PLANT OS V3.0",
    "// Lead: Anuj Phulera | Hardware: Aarav Choudhary",
    "// ═══════════════════════════════════════════",
    "",
    "// AI Mode: Adaptive PID Irrigation Logic",
    "void executeSystemPoll() {",
    "  float sensorRaw = analogRead(A0);",
    "  float moisture = map(sensorRaw, 1024, 250, 0, 100);",
    "  ",
    "  // Load plant profile from AI database",
    "  PlantProfile profile = AI.getProfile(activePlant);",
    "  ",
    "  // Fuzzy Logic Threshold Check",
    "  if (moisture < profile.moistureMin) {",
    "    if (systemState == READY) {",
    "      Serial.println(\"[LOG] TRIGGER_PUMP\");",
    "      digitalWrite(RELAY_K1, LOW);",
    "      delay(profile.burstDuration);",
    "      digitalWrite(RELAY_K1, HIGH);",
    "      lastIrrigation = millis();",
    "    }",
    "  }",
    "}",
    "",
    "// Predictive Irrigation — Weather API",
    "void checkWeatherForecast() {",
    "  WeatherData tmrw = WeatherAPI.getTomorrow();",
    "  if (tmrw.tempMax > 38.0) {",
    "    schedulePreIrrigation(TONIGHT_22_00);",
    "    Serial.println(\"[AI] Pre-irrigate scheduled\");",
    "  }",
    "}",
    "",
    "// WhatsApp Command Handler",
    "void onWhatsAppMessage(String msg) {",
    "  if (msg == \"पानी दो\" || msg == \"water now\") {",
    "    manualOverride(PUMP_ON);",
    "  }",
    "  if (msg == \"status\") {",
    "    sendStatusReport();",
    "  }",
    "}",
    "",
    "// Low-Latency Telemetry Sync",
    "void pushCloud() {",
    "  String payload = buildJson(moisture, temp,",
    "                             humidity, tankLevel,",
    "                             npk.N, npk.P, npk.K);",
    "  Firebase.patch(DB_PATH, payload);",
    "}",
  ],
  dashboard: [
    "import { useState, useEffect } from 'react';",
    "import { motion } from 'framer-motion';",
    "",
    "export default function TelemetryDashboard() {",
    "  const [telemetry, setTelemetry] = useState(null);",
    "",
    "  useEffect(() => {",
    "    const ws = new WebSocket('wss://verde.tech/api/live');",
    "    ws.onmessage = (e) => setTelemetry(JSON.parse(e.data));",
    "    return () => ws.close();",
    "  }, []);",
    "",
    "  return (",
    "    <div className='grid grid-cols-4 gap-4'>",
    "      <Gauge label='Moisture' value={telemetry?.moisture} />",
    "      <Gauge label='Temperature' value={telemetry?.temp} />",
    "      <Gauge label='Humidity' value={telemetry?.humidity} />",
    "      <Gauge label='Tank Level' value={telemetry?.tank} />",
    "    </div>",
    "  );",
    "}",
  ],
  api: [
    "import { NextResponse } from 'next/server';",
    "",
    "export async function GET() {",
    "  const data = {",
    "    timestamp: new Date().toISOString(),",
    "    sensors: {",
    "      moisture: { value: 68, unit: '%' },",
    "      temperature: { value: 24.2, unit: '°C' },",
    "      humidity: { value: 62, unit: '%' },",
    "    },",
    "    tank: { level: 78, unit: '%' },",
    "    npk: { n: 45, p: 23, k: 67 },",
    "    system: {",
    "      uptime: 99.97,",
    "      firmware: 'V3.0.0',",
    "    },",
    "  };",
    "  return NextResponse.json({ success: true, data });",
    "}",
  ],
};

const syntaxColors: Record<string, string> = {
  "//": "#6b7280",
  "import": "#c084fc",
  "from": "#c084fc",
  "export": "#c084fc",
  "default": "#c084fc",
  "function": "#c084fc",
  "const": "#22d3ee",
  "let": "#22d3ee",
  "var": "#22d3ee",
  "return": "#f472b6",
  "if": "#f472b6",
  "else": "#f472b6",
  "for": "#f472b6",
  "while": "#f472b6",
  "void": "#f472b6",
  "float": "#22d3ee",
  "int": "#22d3ee",
  "String": "#fbbf24",
  "new": "#f472b6",
  "true": "#22c55e",
  "false": "#ef4444",
  "null": "#ef4444",
  "async": "#c084fc",
  "await": "#c084fc",
  "useState": "#fbbf24",
  "useEffect": "#fbbf24",
};

function highlightSyntax(line: string) {
  const parts = line.split(/(\s+|\{|\}|\(|\)|\[|\]|;|:|,|\.|'[^']*'|"[^"]*"|\d+)/g).filter(Boolean);
  return parts.map((part, i) => {
    const trimmed = part.trim();
    if (trimmed.startsWith("//")) return <span key={i} style={{ color: syntaxColors["//"] }}>{part}</span>;
    if (trimmed.startsWith('"') || trimmed.startsWith("'")) return <span key={i} style={{ color: "#86efac" }}>{part}</span>;
    if (/^\d/.test(trimmed)) return <span key={i} style={{ color: "#fbbf24" }}>{part}</span>;
    if (syntaxColors[trimmed]) return <span key={i} style={{ color: syntaxColors[trimmed] }}>{part}</span>;
    return <span key={i}>{part}</span>;
  });
}

export default function Code() {
  const [activeFile, setActiveFile] = useState("firmware");
  const [copied, setCopied] = useState(false);
  const lines = codeSnippets[activeFile];

  const handleCopy = () => {
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="code" className="relative z-10 py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionReveal className="mb-16">
          <span className="section-label">07 // THE LOGIC CORE</span>
          <h2 className="section-heading">
            NEURAL{" "}
            <TextScramble text="CODE." as="span" trigger="hover-once" className="text-primary text-neon italic" />
          </h2>
          <div className="h-px w-24 bg-primary/40" />
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl border border-white/5 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex gap-1">
                  {files.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setActiveFile(f.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-mono transition-all duration-300 ${
                        activeFile === f.id
                          ? "bg-white/5 text-primary border border-white/10"
                          : "text-white/30 hover:text-white/60"
                      }`}
                    >
                      <f.icon size={12} />
                      {f.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/30 hover:text-primary hover:border-primary/40 transition-all"
                  aria-label="Copy code"
                >
                  {copied ? <Check size={12} className="text-primary" /> : <Copy size={12} />}
                </button>
              </div>
              <div className="p-4 font-mono text-[10px] md:text-xs leading-relaxed overflow-x-auto max-h-[400px] overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFile}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {lines.map((line, i) => (
                      <div key={i} className="flex">
                        <span className="text-white/20 select-none w-8 text-right pr-3 flex-shrink-0">{i + 1}</span>
                        <span className="text-white/80 whitespace-pre">{highlightSyntax(line)}</span>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <SectionReveal delay={0.1}>
              <div className="glass p-6 rounded-[2.5rem] border border-white/5 hover:border-primary/30 transition-all duration-500 group">
                <h4 className="text-xl font-heading font-black uppercase tracking-tighter text-white mb-3 group-hover:text-primary transition-colors">
                  <TextScramble text="ASYNC PROTOCOLS" trigger="hover-once" speed={20} />
                </h4>
                <p className="text-slate-300 leading-relaxed text-sm mb-4">Optimized Wi-Fi stack using non-blocking asynchronous requests. Sensor polling never stalls, even during heavy cloud transmissions.</p>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary font-bold tracking-widest">ESPDash_V2</div>
                  <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/40 tracking-widest">LATENCY: &lt; 25ms</div>
                </div>
              </div>
            </SectionReveal>

            <div className="grid grid-cols-2 gap-4">
              {[
                { v: "1.2k", l: "Lines of C++", color: "#22c55e" },
                { v: "99.9%", l: "Uptime Rate", color: "#22d3ee" },
                { v: "< 25ms", l: "Cloud Latency", color: "#a855f7" },
                { v: "6", l: "Active Modes", color: "#f59e0b" },
              ].map((s, i) => (
                <SectionReveal key={s.l} delay={0.1 + i * 0.05}>
                  <div className="glass p-5 rounded-[2rem] border border-white/5 text-center group hover:border-primary/40 transition-all duration-500">
                    <div className="text-3xl font-black text-white mb-1 group-hover:text-primary transition-colors" style={{ textShadow: `0 0 20px ${s.color}40` }}>
                      {s.v}
                    </div>
                    <div className="text-[9px] font-mono uppercase tracking-[0.3em]" style={{ color: `${s.color}80` }}>{s.l}</div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
