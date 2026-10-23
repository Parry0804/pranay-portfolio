"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { Button, Roll } from "./Button";
import { Clock } from "./Clock";

export function Footer({ cta = true }: { cta?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const fill = useTransform(scrollYProgress, [0.3, 1], [100, 0]);
  const clip = useTransform(fill, (f) => `inset(0 ${f}% 0 0)`);
  const [copied, setCopied] = useState(false);
  const motionOff = useSyncExternalStore(
    () => () => {},
    () => document.documentElement.classList.contains("motion-off"),
    () => false,
  );

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line bg-bg-sunken/80">
      {cta && (
        <div className="mx-auto max-w-[1600px] px-4 pt-24 md:px-10 md:pt-40">
          <p className="t-label text-fg-muted">Next step</p>
          <h2 className="t-display mt-6">
            Have a project <span className="thin text-fg-muted">in mind?</span>
          </h2>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Button href="/contact">Start a project</Button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(site.email);
                setCopied(true);
                setTimeout(() => setCopied(false), 2200);
              }}
              data-cursor="Copy"
              className="link-draw text-[17px] text-fg-muted hover:text-fg"
            >
              {copied ? "Copied to clipboard ✓" : site.email}
            </button>
          </div>
        </div>
      )}
      <div className="mx-auto mt-24 grid max-w-[1600px] gap-10 px-4 md:grid-cols-4 md:px-10">
        <div>
          <p className="t-label text-fg-subtle">Pages</p>
          <ul className="mt-4 space-y-2 text-[15px]">
            {[["/work", "Work"], ["/about", "About"], ["/services", "Services"], ["/contact", "Contact"]].map(([h, l]) => (
              <li key={h}><Link href={h} className="text-fg-muted hover:text-fg"><Roll>{l}</Roll></Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="t-label text-fg-subtle">Elsewhere</p>
          <ul className="mt-4 space-y-2 text-[15px]">
            <li><a href={site.whatsapp} target="_blank" rel="noreferrer" className="text-fg-muted hover:text-fg"><Roll>WhatsApp ↗</Roll></a></li>
            {site.linkedin && <li><a href={site.linkedin} target="_blank" rel="noreferrer" className="text-fg-muted hover:text-fg"><Roll>LinkedIn ↗</Roll></a></li>}
            <li><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-fg-muted hover:text-fg"><Roll>{site.phone}</Roll></a></li>
          </ul>
        </div>
        <div>
          <p className="t-label text-fg-subtle">Local time</p>
          <p className="mt-4 text-[15px] text-fg-muted"><Clock /></p>
        </div>
        <div className="md:text-right">
          <p className="t-label text-fg-subtle">Motion</p>
          <button
            className="mt-4 text-[15px] text-fg-muted hover:text-fg"
            onClick={() => {
              const on = document.documentElement.classList.toggle("motion-off");
              try { localStorage.setItem("motion-off", on ? "1" : "0"); } catch {}
              location.reload();
            }}
          >
            {motionOff ? "Turn motion on" : "Turn motion off"}
          </button>
        </div>
      </div>
      <div className="relative mt-16 select-none px-2 md:px-6" aria-hidden>
        <p className="whitespace-nowrap font-display text-[15.4vw] font-medium leading-[0.9] tracking-[-0.05em] text-fg/[0.06]">Pranay Pawar</p>
        <motion.p
          className="absolute inset-0 whitespace-nowrap px-2 font-display text-[15.4vw] font-medium leading-[0.9] tracking-[-0.05em] text-signal md:px-6"
          style={{ clipPath: clip }}
        >
          Pranay Pawar
        </motion.p>
      </div>
      <div className="mx-auto flex max-w-[1600px] justify-between px-4 py-6 text-[13px] text-fg-subtle md:px-10">
        <span>© 2026 Pranay Pawar</span>
        <span>Designed & built in New Delhi</span>
      </div>
    </footer>
  );
}
