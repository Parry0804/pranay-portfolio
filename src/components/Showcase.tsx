"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { clean } from "@/content/clean";
import { Cover } from "./Cover";

const DURATION = 6000;
const ease = [0.16, 1, 0.3, 1] as const;

// Featured project slider: auto-advances every 6 s with a progress line; drag or click to change.
export function Showcase({ projects }: { projects: Project[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const start = performance.now() - progress * DURATION;
    let raf = 0;
    const tick = () => {
      const p = (performance.now() - start) / DURATION;
      if (p >= 1) {
        setI((v) => (v + 1) % projects.length);
        setProgress(0);
        return;
      }
      setProgress(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, paused, projects.length]);

  const go = (n: number) => {
    setI((n + projects.length) % projects.length);
    setProgress(0);
  };
  const p = projects[i];

  return (
    <div onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div
        className="relative aspect-[4/5] select-none overflow-hidden rounded-[4px] md:aspect-[16/8]"
        data-cursor="Drag"
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
        }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={p.slug}
            className="group absolute inset-0"
            initial={{ clipPath: "inset(0 0 0 100%)" }}
            animate={{ clipPath: "inset(0 0 0 0%)" }}
            exit={{ opacity: 0.4 }}
            transition={{ duration: 1.1, ease }}
          >
            <motion.div className="h-full w-full" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease }}>
              <Cover project={p} sizes="100vw" priority={i === 0} showName={false} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/50 via-35% to-transparent to-70%" />
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 p-6 md:p-10">
          <div>
            <AnimatePresence mode="wait">
              <motion.div key={p.slug} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6, ease }}>
                <p className="t-label text-fg-muted">{clean(p.cardServices)}</p>
                <h3 className="t-h1 mt-3">{p.client}</h3>
                <p className="mt-2 max-w-[520px] text-fg-muted">{clean(p.cardTitle)}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <Link
            href={`/work/${p.slug}`}
            data-cursor="Open"
            className="group/v flex h-28 w-28 items-center justify-center rounded-full bg-fg text-[14px] font-medium text-bg transition-transform duration-500 ease-[var(--ease-expressive)] hover:scale-110"
          >
            View case
          </Link>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-5 gap-3 md:gap-6">
        {projects.map((q, n) => (
          <button key={q.slug} onClick={() => go(n)} className="group text-left">
            <span className="relative block h-px w-full bg-line">
              <span
                className="absolute inset-y-0 left-0 bg-signal"
                style={{ width: n === i ? `${progress * 100}%` : n < i ? "100%" : "0%", opacity: n < i ? 0.35 : 1 }}
              />
            </span>
            <span className="mt-3 flex gap-3 text-[14px]">
              <span className="t-label pt-[3px] text-fg-subtle">0{n + 1}</span>
              <span className={`hidden transition-colors md:inline ${n === i ? "text-fg" : "text-fg-muted group-hover:text-fg"}`}>{q.client}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
