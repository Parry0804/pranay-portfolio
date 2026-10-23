"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// Steps on a horizontal line that draws as you scroll.
export function StepsLine({ steps }: { steps: { no: string; name: string; text: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const w = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div ref={ref} className="relative">
      <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-line md:block" />
      <motion.div className="absolute left-0 top-[7px] hidden h-px bg-signal md:block" style={{ width: w }} />
      <ol className="grid gap-10 md:grid-cols-5 md:gap-6">
        {steps.map((s, i) => (
          <motion.li
            key={s.no}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
          >
            <span className="block h-[15px] w-[15px] rounded-full border-2 border-fg-muted bg-bg" />
            <p className="t-label mt-8 text-fg-subtle">{s.no}</p>
            <h3 className="t-h3 mt-3">{s.name}</h3>
            <p className="mt-3 text-[15px] text-fg-muted">{s.text}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
