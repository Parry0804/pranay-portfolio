"use client";

import { LayoutGroup, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Project } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { WorkList } from "./WorkList";

const ratios = ["aspect-[4/5]", "aspect-[16/10]", "aspect-[16/10]", "aspect-[4/5]"];

// Filter chips with live counts, and a List / Grid toggle. Filtering animates with layout transitions.
export function WorkIndex({ projects }: { projects: Project[] }) {
  const filters = useMemo(() => {
    const cats = new Map<string, number>();
    projects.forEach((p) => p.categories.forEach((c) => cats.set(c, (cats.get(c) ?? 0) + 1)));
    return [["All", projects.length] as const, ...[...cats.entries()].sort((a, b) => b[1] - a[1])];
  }, [projects]);
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const shown = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-line pb-8">
        <LayoutGroup>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {filters.map(([name, count]) => (
              <button
                key={name}
                role="tab"
                aria-selected={filter === name}
                onClick={() => setFilter(name)}
                className={`relative rounded-full border px-4 py-2.5 text-[14px] transition-colors duration-300 ${
                  filter === name ? "border-transparent text-bg" : "border-line-strong text-fg-muted hover:border-fg-muted hover:text-fg"
                }`}
              >
                {filter === name && <motion.span layoutId="chip" className="absolute inset-0 rounded-full bg-fg" transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />}
                <span className="relative">
                  {name} <span className="t-label ml-1 opacity-60">{count}</span>
                </span>
              </button>
            ))}
          </div>
        </LayoutGroup>
        <div className="flex gap-4 text-[14px]">
          {(["grid", "list"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} className={`capitalize transition-colors ${view === v ? "text-fg" : "text-fg-subtle hover:text-fg"}`}>
              {v}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-12">
        {view === "list" ? (
          <WorkList projects={shown} />
        ) : (
          <motion.div layout className="grid gap-x-6 gap-y-16 md:grid-cols-2">
            {shown.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.06 }}
                className={i % 2 === 1 ? "md:mt-32" : ""}
              >
                <ProjectCard project={p} index={projects.indexOf(p) + 1} ratio={ratios[i % 4]} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
}
