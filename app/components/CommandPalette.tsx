"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useScenes } from "./ScenePreloader";

type Cmd = { id: string; label: string; hint: string; run: () => void };

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { send } = useScenes();

  const go = (hash: string) => () => {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const cmds: Cmd[] = useMemo(
    () => [
      { id: "tour", label: "Guided tour", hint: "Section", run: go("#tour") },
      { id: "telemetry", label: "Live telemetry", hint: "Section", run: go("#telemetry") },
      { id: "sensing", label: "Root-zone sensing", hint: "Section", run: go("#sensing") },
      { id: "hardware", label: "Hardware", hint: "Section", run: go("#hardware") },
      { id: "specs", label: "Subsystems", hint: "Section", run: go("#specs") },
      { id: "team", label: "Team", hint: "Section", run: go("#team") },
      {
        id: "spin",
        label: "Toggle tower rotation",
        hint: "Model",
        run: () => {
          send("tower", { action: "release" });
          send("tower", { action: "autorotate", value: true });
          setOpen(false);
        },
      },
      {
        id: "explode",
        label: "Explode the controller board",
        hint: "Model",
        run: () => {
          send("board", { action: "explode" });
          document.querySelector("#hardware")?.scrollIntoView({ behavior: "smooth" });
          setOpen(false);
        },
      },
      {
        id: "top",
        label: "Back to top",
        hint: "Navigate",
        run: () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setOpen(false);
        },
      },
      {
        id: "src",
        label: "Open the source on GitHub",
        hint: "External",
        run: () => {
          window.open("https://github.com/UCHIHA-MADARA-ANUJ", "_blank");
          setOpen(false);
        },
      },
    ],
    [send]
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return cmds;
    return cmds.filter((c) => (c.label + c.hint).toLowerCase().includes(s));
  }, [q, cmds]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSel((i) => Math.min(filtered.length - 1, i + 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSel((i) => Math.max(0, i - 1));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        filtered[sel]?.run();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, sel]);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="chip hidden md:inline-flex hover:border-[rgba(74,222,128,0.4)] transition-colors"
        aria-label="Open command palette"
      >
        Search <kbd className="opacity-60">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-start justify-center pt-[14vh] px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="panel relative w-full max-w-[560px] overflow-hidden"
            >
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSel(0);
                }}
                placeholder="Jump to a section or drive a model…"
                className="w-full bg-transparent px-5 py-4 text-[15px] outline-none placeholder:text-[var(--muted)] border-b border-[var(--line-soft)]"
              />
              <ul className="max-h-[320px] overflow-auto py-2">
                {filtered.map((c, i) => (
                  <li key={c.id}>
                    <button
                      onMouseEnter={() => setSel(i)}
                      onClick={c.run}
                      className={`w-full flex items-center justify-between gap-4 px-5 py-2.5 text-left text-[14px] transition-colors ${
                        i === sel ? "bg-[rgba(74,222,128,0.1)] text-white" : "text-[var(--ink-soft)]"
                      }`}
                    >
                      <span>{c.label}</span>
                      <span className="eyebrow">{c.hint}</span>
                    </button>
                  </li>
                ))}
                {!filtered.length && (
                  <li className="px-5 py-6 text-center eyebrow">No matches</li>
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
