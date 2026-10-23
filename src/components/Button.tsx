import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-ink-fg hover:bg-ink/85",
  outline: "border border-line text-fg hover:border-fg-3 hover:bg-card",
};

export function Button({
  href,
  children,
  variant = "primary",
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const cls = `group inline-flex items-center gap-3 rounded-full py-3 pl-6 pr-3 text-[15px] font-medium transition-all duration-300 ease-out-soft hover:pr-2 hover:pl-7 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] ${styles[variant]}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <span
          className={`grid size-8 place-items-center rounded-full transition-transform duration-300 ease-out-soft group-hover:-rotate-45 ${
            variant === "primary" ? "bg-ink-fg text-ink" : "bg-card text-fg"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </>
  );
  return external ? (
    <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
