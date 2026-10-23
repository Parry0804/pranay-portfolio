"use client";

import { useEffect, useRef, useState } from "react";

// Dot + lagging ring. Elements with data-cursor="Label" grow the ring and show the label.
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    document.documentElement.classList.add("has-cursor");
    const pos = { x: -100, y: -100 };
    const lag = { x: -100, y: -100 };
    let raf = 0;
    const move = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, input, textarea, label");
      setLabel(el?.dataset.cursor ?? null);
      setActive(!!el);
    };
    const loop = () => {
      lag.x += (pos.x - lag.x) * 0.18;
      lag.y += (pos.y - lag.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${lag.x}px, ${lag.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  const size = label ? 88 : active ? 52 : 36;
  return (
    <div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[70] hidden [@media(pointer:fine)]:block">
      <div ref={dot} className="absolute -ml-[5px] -mt-[5px] h-[10px] w-[10px] rounded-full bg-fg mix-blend-difference" />
      <div ref={ring} className="absolute">
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300 ease-[var(--ease-expressive)] ${
            label ? "border-transparent bg-fg text-bg" : "border-fg/40"
          }`}
          style={{ width: size, height: size }}
        >
          {label && <span className="t-label text-[10px]">{label}</span>}
        </div>
      </div>
    </div>
  );
}
