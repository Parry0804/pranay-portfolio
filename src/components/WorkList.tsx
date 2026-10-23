"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { clean } from "@/content/clean";
import { Cover } from "./Cover";

// Numbered rows; a preview follows the cursor with a slight tilt.
export function WorkList({ projects, start = 1 }: { projects: Project[]; start?: number }) {
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 160, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 160, damping: 20 });
  const rotate = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 });
  const lastX = useRef(0);

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
        rotate.set(Math.max(-8, Math.min(8, (e.clientX - lastX.current) * 0.6)));
        lastX.current = e.clientX;
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul className="border-t border-line">
        {projects.map((p, i) => (
          <li key={p.slug} className="border-b border-line">
            <Link
              href={`/work/${p.slug}`}
              data-cursor="View"
              onPointerEnter={() => setActive(i)}
              className="group grid grid-cols-[48px_1fr_auto] items-center gap-4 py-7 md:grid-cols-[80px_1.3fr_1fr_1fr_48px] md:py-9"
            >
              <span className="t-label text-fg-subtle">{String(start + i).padStart(2, "0")}</span>
              <span className="t-h2 transition-[transform,color] duration-500 ease-[var(--ease-expressive)] group-hover:translate-x-4 group-hover:text-signal">
                {p.client}
              </span>
              <span className="hidden text-[15px] text-fg-muted md:block">{clean(p.cardServices) || "—"}</span>
              <span className="hidden text-[15px] text-fg-muted md:block">{clean(p.industry)}</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[240px] w-[360px] -translate-x-1/2 -translate-y-1/2 md:block"
        style={{ x, y, rotate }}
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={active}
              className="absolute inset-0 overflow-hidden rounded-md shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
              initial={{ opacity: 0, scale: 0.85, clipPath: "inset(50% 0 50% 0)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0% 0)" }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Cover project={projects[active]} sizes="360px" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
