"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

let first = true;

const names: Record<string, string> = { "": "Home", work: "Work", about: "About", services: "Services", contact: "Contact" };

// Each navigation mounts a fresh template: a panel covers the screen, shows the page name, then lifts away.
export default function Template({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  // The server and the first client render both skip the panel, so hydration matches.
  const [skip] = useState(() => typeof window === "undefined" || first);
  useEffect(() => {
    first = false;
  }, []);
  const seg = path.split("/").filter(Boolean);
  const title = seg.length > 1 ? seg[1].replace(/-/g, " ") : names[seg[0] ?? ""] ?? "";
  return (
    <>
      {!skip && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[65] flex items-center justify-center bg-bg-raised"
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.25 }}
        >
          <motion.span
            className="t-h1 capitalize"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
            transition={{ duration: 0.9, times: [0, 0.3, 0.7, 1] }}
          >
            {title}
          </motion.span>
        </motion.div>
      )}
      <motion.div initial={skip ? false : { y: 60 }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}>
        {children}
      </motion.div>
    </>
  );
}
