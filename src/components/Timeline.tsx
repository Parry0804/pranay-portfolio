"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { milestones } from "@/content/experience";

// Pinned section: vertical scroll drives the milestones sideways.
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1600px] px-4 md:px-10">
          <p className="t-label text-fg-muted">(03) The path so far</p>
          <h2 className="t-h1 mt-6 max-w-[900px]">From one designer to <span className="thin text-fg-muted">leading the whole build.</span></h2>
        </div>
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-[7px] h-px bg-line" />
          <motion.div className="absolute left-0 top-[7px] h-px bg-signal" style={{ width: line }} />
          <motion.ol className="flex w-max gap-6 pl-4 md:gap-10 md:pl-10" style={{ x }}>
            {milestones.map((m, i) => (
              <li key={m.company} className="w-[78vw] shrink-0 md:w-[30vw]">
                <span className={`block h-[15px] w-[15px] rounded-full border-2 ${i === milestones.length - 1 ? "border-signal bg-signal" : "border-fg-muted bg-bg"}`} />
                <p className="t-label mt-8 text-fg-subtle">{m.year}</p>
                <p className="t-h2 mt-3">{m.company}</p>
                <p className="mt-3 max-w-[360px] text-fg-muted">{m.note}</p>
              </li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
