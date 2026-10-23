"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={it.q}>
            <button
              className="group flex w-full items-center justify-between gap-6 py-7 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className="text-xl font-medium tracking-tight transition-colors group-hover:text-fg md:text-2xl">{it.q}</span>
              <span className={`grid size-10 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-fg-3 ${isOpen ? "rotate-45 bg-ink text-ink-fg" : ""}`}>
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-8 text-lg text-fg-2">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
