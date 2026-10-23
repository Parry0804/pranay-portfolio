"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

// Black-and-white portrait that melts into the background (lighten blend, so its
// blacks take on the moving mesh). A soft light follows the cursor across it.
export function HeroPhoto({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const light = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    const spot = light.current;
    const img = layer.current;
    if (!el || !spot || !img) return;
    const still =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("motion-off");
    if (still) return;

    const cur = { x: 0.55, y: 0.3, px: 0, py: 0 };
    const tgt = { ...cur };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tgt.x = (e.clientX - r.left) / r.width;
      tgt.y = (e.clientY - r.top) / r.height;
      tgt.px = (e.clientX / window.innerWidth - 0.5) * -16;
      tgt.py = (e.clientY / window.innerHeight - 0.5) * -10;
    };
    window.addEventListener("pointermove", onMove);
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      for (const k of ["x", "y", "px", "py"] as const) cur[k] += (tgt[k] - cur[k]) * 0.07;
      spot.style.setProperty("--lx", `${cur.x * 100}%`);
      spot.style.setProperty("--ly", `${cur.y * 100}%`);
      img.style.transform = `translate3d(${cur.px}px, ${cur.py}px, 0) scale(1.04)`;
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={host}
      className={`overflow-hidden mix-blend-lighten [mask-image:linear-gradient(to_bottom,#000_55%,transparent_96%)] md:[mask-image:linear-gradient(to_right,transparent,#000_22%),linear-gradient(to_bottom,#000_70%,transparent)] md:[mask-composite:intersect] ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <div ref={layer} className="absolute inset-0 will-change-transform [transform:scale(1.04)]">
          <Image
            src="/about/pranay-mono.jpg"
            alt="Black and white portrait of Pranay Pawar"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-[45%_15%] md:object-top"
          />
        </div>
      </motion.div>
      <div
        ref={light}
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light [background:radial-gradient(circle_at_var(--lx,55%)_var(--ly,30%),rgba(255,255,255,0.55),transparent_38%)]"
      />
    </div>
  );
}
