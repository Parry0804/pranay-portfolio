"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Project } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

const filters = ["All", "Brand", "Product", "Web", "Travel", "Print"];

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.categories.includes(active));
  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {filters.map((f) => {
          const on = f === active;
          const count = f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(f)}
              className={`relative rounded-full border px-5 py-2.5 text-[15px] font-medium transition-colors duration-300 ${on ? "border-transparent text-ink-fg" : "border-line text-fg-2 hover:border-fg-3 hover:text-fg"}`}
            >
              {on && <motion.span layoutId="work-filter" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="relative">{f} <span className="opacity-60">({count})</span></span>
            </button>
          );
        })}
      </div>
      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard p={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
