"use client";

import { useEffect, useState } from "react";

// Types each phrase, holds, deletes, moves to the next. Shows the first phrase whole
// when motion is off.
export function Typewriter({ phrases, className = "" }: { phrases: string[]; className?: string }) {
  const [text, setText] = useState(phrases[0]);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("motion-off")
    )
      return;
    let i = 0;
    let n = phrases[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      if (deleting) {
        n--;
        if (n <= 0) {
          deleting = false;
          i = (i + 1) % phrases.length;
        }
      } else {
        n++;
      }
      setText(phrases[i].slice(0, Math.max(0, n)));
      const done = !deleting && n >= phrases[i].length;
      if (done) deleting = true;
      timer = setTimeout(step, done ? 2200 : deleting ? 28 : 55);
    };
    timer = setTimeout(step, 3200);
    return () => clearTimeout(timer);
  }, [phrases]);

  return (
    <span className={className} aria-label={phrases.join(", ")}>
      <span aria-hidden>{text}</span>
      <span aria-hidden className="ml-1 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] animate-pulse bg-fg" />
    </span>
  );
}
