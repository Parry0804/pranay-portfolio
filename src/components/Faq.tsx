"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="border-t border-line">
      {items.map((f, i) => (
        <li key={f.q} className="border-b border-line">
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="group flex w-full items-baseline gap-6 py-7 text-left">
            <span className="t-label w-8 shrink-0 text-fg-subtle">0{i + 1}</span>
            <span className="t-h4 flex-1 transition-colors group-hover:text-signal">{f.q}</span>
            <span className={`t-h3 text-fg-muted transition-transform duration-500 ${open === i ? "rotate-45" : ""}`}>+</span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                <p className="max-w-[640px] pb-8 pl-14 text-fg-muted">{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
}
