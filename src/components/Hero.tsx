"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { site, stats } from "@/content/site";
import { Button } from "./Button";
import { SpinBadge } from "./SpinBadge";

const words = ["products", "brands", "platforms"];

// Set to "/me.jpg" (in /public) once the photo is ready.
const PHOTO: string | null = null;

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 3200);
    return () => clearInterval(t);
  }, [reduce]);

  // Gentle parallax on the portrait, following the pointer.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const px = useTransform(sx, (v) => v * 12);
  const py = useTransform(sy, (v) => v * 12);

  return (
    <section
      className="relative overflow-hidden"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
    >
      {/* very faint drifting glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 size-[720px] rounded-full bg-lavender/10 blur-[140px]"
        animate={reduce ? undefined : { x: [0, 120, 40, 0], y: [0, 60, -30, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-[1440px] gap-16 px-5 pb-20 pt-16 md:px-14 md:pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="label mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-paper-2 px-4 py-2 text-fg-2"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-sage opacity-40" />
              <span className="relative inline-flex size-2 rounded-full bg-sage" />
            </span>
            Hi, I&apos;m Pranay · {site.role}
          </motion.p>

          <h1 className="display text-[52px] sm:text-7xl xl:text-[96px]">
            <motion.span className="block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease }}>
              I turn ideas into
            </motion.span>
            <span className="relative block h-[1.05em] overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={words[i]}
                  className="serif absolute left-0 text-lavender"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.7, ease }}
                >
                  {words[i]}
                </motion.span>
              </AnimatePresence>
            </span>
            <motion.span className="block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease }}>
              people love.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-fg-2 md:text-xl"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Button href="/contact">Start a project</Button>
            <Button href="/work" variant="outline">See my work</Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-14 flex gap-10 border-t border-line pt-8"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-4xl font-medium tracking-tight">{s.value}</dt>
                <dd className="mt-1 text-fg-3">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
          className="relative mx-auto w-full max-w-[440px]"
        >
          <motion.div style={reduce ? undefined : { x: px, y: py }} className="relative aspect-[44/54] overflow-hidden rounded-t-[220px] rounded-b-[32px] border border-line bg-gradient-to-b from-raised to-paper-2">
            {PHOTO ? (
              <Image src={PHOTO} alt="Pranay Pawar" fill priority className="object-cover grayscale-[30%]" sizes="440px" />
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <span className="serif text-[160px] leading-none text-line-strong">Pp</span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-paper/80 to-transparent" />
          </motion.div>

          <Float className="-left-6 top-16 md:-left-16" delay={0}>
            <span className="size-2 rounded-full bg-sage" /> CTO at GetHire
          </Float>
          <Float className="-right-4 top-[58%] md:-right-10" delay={1.2}>
            <span className="font-medium text-fg">100+</span> projects shipped
          </Float>
          <Float className="bottom-10 left-4 md:-left-8" delay={2.4}>
            Product · Design · Tech
          </Float>

          <SpinBadge className="absolute -right-8 -top-8 hidden md:block" />
        </motion.div>
      </div>

      <p className="label pb-10 text-center text-fg-3">Scroll to explore</p>
    </section>
  );
}

function Float({ children, className, delay }: { children: React.ReactNode; className: string; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute flex items-center gap-2 rounded-full border border-line bg-paper-2/90 px-4 py-2.5 text-sm text-fg-2 shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur ${className}`}
      animate={reduce ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
