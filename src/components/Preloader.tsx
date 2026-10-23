"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// First visit per session: a 0-100 counter, then the panel splits away.
export function Preloader() {
  const [show, setShow] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    let seen = true;
    try {
      seen = sessionStorage.getItem("pp-loaded") === "1";
      sessionStorage.setItem("pp-loaded", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let raf = requestAnimationFrame(() => setShow(true));
    const step = () => {
      const t = Math.min(1, (performance.now() - start) / 1300);
      setN(Math.round(100 * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => setShow(false), 200);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div key="pre" className="fixed inset-0 z-[80]" exit={{ pointerEvents: "none" }} aria-hidden>
          {[0, 1].map((half) => (
            <motion.div
              key={half}
              className="absolute inset-x-0 bg-bg"
              style={half === 0 ? { top: 0, height: "50.5%" } : { bottom: 0, height: "50.5%" }}
              exit={{ y: half === 0 ? "-100%" : "100%" }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            />
          ))}
          <motion.div className="absolute inset-0 flex items-end justify-between p-6 md:p-10" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <span className="t-label text-fg-muted">Pranay Pawar — Portfolio</span>
            <span className="font-display text-[22vw] font-medium leading-[0.8] tracking-[-0.05em] md:text-[12vw]">{n}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
