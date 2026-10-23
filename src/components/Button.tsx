import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "./Magnetic";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  icon?: "→" | "↗" | "↓";
  external?: boolean;
  download?: boolean;
  className?: string;
};

// Pill button: magnetic pull, fill wipes in from the left, arrow slides right.
export function Button({ href, children, variant = "primary", icon = "→", external, download, className = "" }: Props) {
  const primary = variant === "primary";
  const cls = `group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-4 text-[15px] font-medium transition-colors duration-300 ${
    primary ? "bg-signal text-bg" : "border border-line-strong text-fg hover:border-fg"
  } ${className}`;
  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 origin-left scale-x-0 rounded-full transition-transform duration-500 ease-[var(--ease-expressive)] group-hover:scale-x-100 ${
          primary ? "bg-fg" : "bg-fg"
        }`}
      />
      <span className={`relative transition-colors duration-300 ${primary ? "" : "group-hover:text-bg"}`}>{children}</span>
      <span
        aria-hidden
        className={`relative transition-[transform,color] duration-500 ease-[var(--ease-expressive)] group-hover:translate-x-1.5 ${
          primary ? "" : "group-hover:text-bg"
        }`}
      >
        {icon}
      </span>
    </>
  );
  return (
    <Magnetic>
      {external || download ? (
        <a href={href} className={cls} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} download={download}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}

export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
    </span>
  );
}

export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`t-label text-fg-muted ${className}`}>{children}</p>;
}
