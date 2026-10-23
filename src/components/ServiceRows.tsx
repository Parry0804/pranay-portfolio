"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/content/services";

const ease = [0.16, 1, 0.3, 1] as const;

// Large rows that open on hover (or tap) to show what each service includes.
export function ServiceRows() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ul className="border-t border-line" onPointerLeave={() => setOpen(null)}>
      {services.map((s, i) => (
        <li key={s.no} className="border-b border-line" onPointerEnter={() => setOpen(i)}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="group grid w-full grid-cols-[48px_1fr_auto] items-center gap-4 py-8 text-left md:grid-cols-[80px_1fr_360px] md:py-10">
            <span className="t-label text-fg-subtle">{s.no}</span>
            <span className={`t-h1 transition-[transform,color] duration-500 ease-[var(--ease-expressive)] ${open === i ? "translate-x-3 text-fg" : "text-fg/80"}`}>{s.name}</span>
            <span className="hidden text-right text-[15px] text-fg-muted md:block">{s.short.join(" · ")}</span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.6, ease }} className="overflow-hidden">
                <div className="grid gap-8 pb-10 md:grid-cols-[80px_1fr_1fr_360px]">
                  <span />
                  <p className="t-body-l max-w-[520px] text-fg-muted">{s.description}</p>
                  <ul className="flex flex-wrap content-start gap-2">
                    {s.includes.map((x) => (
                      <li key={x} className="rounded-full border border-line-strong px-3 py-1.5 text-[13px] text-fg-muted">{x}</li>
                    ))}
                  </ul>
                  <div className="md:text-right">
                    <Link href="/services" className="link-draw text-[15px]">Best for: {s.bestFor} →</Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
}
