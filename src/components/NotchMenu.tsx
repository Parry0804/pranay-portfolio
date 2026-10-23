"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Clock } from "./Clock";

const links = [
  { href: "/work", label: "Work", note: "13 projects", img: "/work/freshcoo/hero.jpg" },
  { href: "/about", label: "About", note: "Story & experience", img: "/about/pranay.jpg" },
  { href: "/services", label: "Services", note: "4 ways I help", img: "/work/rara-energy/cover.jpg" },
  { href: "/contact", label: "Contact", note: "Start a project", img: "/about/pranay-hero.jpg" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function NotchMenu() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState(0);
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            className="fixed inset-0 z-40 bg-bg/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <motion.nav
          layout
          aria-label="Main"
          transition={{ duration: 0.7, ease }}
          style={{ borderRadius: open ? 24 : 999 }}
          className={`pointer-events-auto overflow-hidden border border-line bg-bg-raised/80 shadow-[0_24px_64px_rgba(0,0,0,0.45)] backdrop-blur-xl ${
            open ? "w-full max-w-[880px]" : scrolled ? "w-[300px]" : "w-[340px]"
          }`}
        >
          <motion.div layout="position" className="flex items-center justify-between p-2">
            <Link href="/" onClick={() => setOpen(false)} className="group flex items-center gap-3 pl-1" data-cursor="Home">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-fg font-display text-[13px] font-semibold text-bg transition-transform duration-500 group-hover:rotate-[360deg]">
                PP
              </span>
              <span className="text-[15px] font-medium">Pranay Pawar</span>
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-panel"
              className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-[14px] transition-colors duration-300 ${
                open ? "bg-fg text-bg" : "bg-bg text-fg hover:bg-line"
              }`}
            >
              {open ? "Close" : "Menu"}
              <span className="relative block h-[8px] w-[14px]" aria-hidden>
                <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-500 ${open ? "top-[3px] rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-500 ${open ? "top-[3px] -rotate-45" : "top-[6.5px]"}`} />
              </span>
            </button>
          </motion.div>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id="menu-panel"
                key="panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6, ease }}
              >
                <div className="grid gap-6 px-6 pb-6 pt-4 md:grid-cols-[1fr_280px]">
                  <ul>
                    {links.map((l, i) => (
                      <motion.li
                        key={l.href}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.06 }}
                        className="border-b border-line last:border-0"
                      >
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          onPointerEnter={() => setHover(i)}
                          className="group flex items-baseline justify-between py-3"
                        >
                          <span className={`t-h1 transition-[color,transform] duration-500 ease-[var(--ease-expressive)] group-hover:translate-x-3 ${path.startsWith(l.href) ? "text-signal" : ""}`}>
                            {l.label}
                          </span>
                          <span className="t-label shrink-0 text-fg-subtle"><span className="hidden sm:inline">{`0${i + 1} / ${l.note}`}</span><span className="sm:hidden">{`0${i + 1}`}</span></span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="relative hidden overflow-hidden rounded-xl border border-line md:block">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={hover}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease }}
                      >
                        {links[hover].img ? (
                          <Image src={links[hover].img!} alt="" fill sizes="280px" className="object-cover" />
                        ) : (
                          <div className="flex h-full items-end bg-[radial-gradient(circle_at_30%_20%,#2a1a12,transparent_60%),radial-gradient(circle_at_80%_80%,#1a1530,#0b0b0d)] p-5">
                            <span className="t-h2">{links[hover].label}</span>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-4 text-[14px]">
                  <a href={`mailto:${site.email}`} className="link-draw text-fg-muted hover:text-fg">
                    {site.email}
                  </a>
                  <span className="flex items-center gap-2 text-fg-muted">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
                    Open for 2 projects · <Clock />
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
}
