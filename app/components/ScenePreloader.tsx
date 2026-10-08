"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

/* -------------------------------------------------------------------------
   All three WebGL scenes are mounted ONCE here, at page load, inside a fixed
   offscreen layer. Each one posts `scene-ready` when it has rendered its
   first frame. The loading curtain lifts only when all of them have.

   Sections then "claim" a scene by id: the preloader moves that iframe's
   wrapper over the section's slot (position + size), so the model is never
   re-created, never re-parsed and never re-warmed on scroll.
---------------------------------------------------------------------------*/

export const SCENES = [
  { id: "tower", src: "/scenes/tower.html", title: "Verde four-tier growing tower" },
  { id: "pod", src: "/scenes/pod.html", title: "Seedling with soil moisture sensor" },
  { id: "board", src: "/scenes/board.html", title: "ESP8266 controller board" },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

interface Ctx {
  ready: boolean;
  progress: number;
  register: (id: SceneId, el: HTMLElement | null) => void;
  unregister: (id: SceneId, el: HTMLElement | null) => void;
  send: (id: SceneId, payload: Record<string, unknown>) => void;
}

const SceneCtx = createContext<Ctx>({
  ready: false,
  progress: 0,
  register: () => {},
  unregister: () => {},
  send: () => {},
});
export const useScenes = () => useContext(SceneCtx);

export default function ScenePreloader({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);
  const [lifted, setLifted] = useState(false);

  const slots = useRef<Partial<Record<SceneId, HTMLElement[]>>>({});
  const holders = useRef<Partial<Record<SceneId, HTMLDivElement | null>>>({});
  const frames = useRef<Partial<Record<SceneId, HTMLIFrameElement | null>>>({});

  /* ---- listen for each scene's first frame ---- */
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.data?.verde !== "scene-ready" || typeof e.data.src !== "string") return;
      const hit = SCENES.find((s) => e.data.src.endsWith(s.src));
      if (hit) setLoaded((p) => (p[hit.id] ? p : { ...p, [hit.id]: true }));
    };
    window.addEventListener("message", onMsg);
    // never trap the user behind a stalled frame
    const bail = setTimeout(() => setReady(true), 12000);
    return () => {
      window.removeEventListener("message", onMsg);
      clearTimeout(bail);
    };
  }, []);

  const count = Object.values(loaded).filter(Boolean).length;
  const progress = Math.round((count / SCENES.length) * 100);

  useEffect(() => {
    if (count === SCENES.length) setReady(true);
  }, [count]);

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setLifted(true), 620);
    return () => clearTimeout(t);
  }, [ready]);

  /* ---- keep each live iframe glued to whichever slot claimed it ---- */
  useEffect(() => {
    let raf = 0;
    const sync = () => {
      (Object.keys(holders.current) as SceneId[]).forEach((id) => {
        const holder = holders.current[id];
        const list = (slots.current[id] ?? []).filter((n) => n.isConnected);
        let slot: HTMLElement | null = null;
        let best = Infinity;
        const mid = window.innerHeight / 2;
        for (const n of list) {
          const r = n.getBoundingClientRect();
          if (r.width < 2 || r.height < 2) continue;
          const d = Math.abs(r.top + r.height / 2 - mid);
          if (d < best) {
            best = d;
            slot = n;
          }
        }
        if (!holder) return;
        if (!slot) {
          holder.style.opacity = "0";
          holder.style.pointerEvents = "none";
          return;
        }
        const r = slot.getBoundingClientRect();
        const offscreen = r.bottom < -400 || r.top > window.innerHeight + 400;
        holder.style.transform = `translate3d(${r.left}px, ${r.top}px, 0)`;
        holder.style.width = `${r.width}px`;
        holder.style.height = `${r.height}px`;
        holder.style.opacity = offscreen ? "0" : "1";
        holder.style.pointerEvents = offscreen ? "none" : "auto";
      });
      raf = requestAnimationFrame(sync);
    };
    raf = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(raf);
  }, []);

  const ctx = useMemo<Ctx>(
    () => ({
      ready,
      progress,
      register: (id, el) => {
        const list = slots.current[id] ?? (slots.current[id] = []);
        if (el) {
          if (!list.includes(el)) list.push(el);
        }
      },
      unregister: (id, el) => {
        const list = slots.current[id];
        if (!list || !el) return;
        const i = list.indexOf(el);
        if (i >= 0) list.splice(i, 1);
      },
      send: (id, payload) => {
        frames.current[id]?.contentWindow?.postMessage({ verde: "cmd", ...payload }, "*");
      },
    }),
    [ready, progress]
  );

  return (
    <SceneCtx.Provider value={ctx}>
      {/* live scenes — mounted once, moved around, never remounted */}
      <div className="fixed inset-0 z-[2] pointer-events-none" aria-hidden={!ready}>
        {SCENES.map((s) => (
          <div
            key={s.id}
            ref={(el) => {
              holders.current[s.id] = el;
            }}
            className="absolute top-0 left-0 will-change-transform"
            style={{ opacity: 0, transition: "opacity .6s ease" }}
          >
            <iframe
              ref={(el) => {
                frames.current[s.id] = el;
              }}
              src={s.src}
              title={s.title}
              className="scene-frame"
              scrolling="no"
            />
          </div>
        ))}
      </div>

      {children}

      {/* curtain */}
      {!lifted && (
        <div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[var(--bg)] transition-opacity duration-[600ms]"
          style={{ opacity: ready ? 0 : 1 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <svg viewBox="0 0 26 30" fill="none" className="w-[22px] h-[26px] accent">
              <path
                d="M13 27V12M13 18C4 18 2 11 3 4c7 0 11 5 10 14ZM13 23c0-9 4-15 11-15 1 9-3 15-11 15Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <span
              className="text-[15px] font-extrabold tracking-[0.42em]"
              style={{ fontFamily: "var(--display)" }}
            >
              VERDE
            </span>
          </div>

          <div className="w-[190px] h-px bg-[var(--line)] overflow-hidden">
            <div
              className="h-full bg-[var(--green)] transition-[width] duration-700 ease-out"
              style={{ width: `${Math.max(progress, 8)}%` }}
            />
          </div>

          <div className="eyebrow mt-5">
            Cultivating your view · {String(progress).padStart(3, "0")}%
          </div>
        </div>
      )}
    </SceneCtx.Provider>
  );
}

/** A placeholder in the layout that a preloaded scene gets positioned over. */
export function SceneSlot({
  id,
  className = "",
}: {
  id: SceneId;
  className?: string;
}) {
  const { register, unregister } = useScenes();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    register(id, node);
    return () => unregister(id, node);
  }, [id, register, unregister]);

  return <div ref={ref} className={className} />;
}
