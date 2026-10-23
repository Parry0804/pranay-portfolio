import Image from "next/image";
import { clients } from "@/content/site";

// Two rows of client logos moving in opposite directions; slows on hover.
export function LogoMarquee() {
  const half = Math.ceil(clients.length / 2);
  const rows = [clients.slice(0, half), clients.slice(half)];
  return (
    <div className="marquee marquee-mask space-y-6 overflow-hidden">
      {rows.map((row, r) => (
        <div
          key={r}
          className={`flex w-max ${r === 0 ? "animate-marquee" : "animate-marquee-reverse"}`}
          style={{ ["--marquee-duration" as string]: r === 0 ? "45s" : "60s" }}
        >
          {[...row, ...row].map((c, i) => (
            <div key={i} aria-hidden={i >= row.length} className="group mx-6 flex h-16 w-44 shrink-0 items-center justify-center md:mx-10">
              {c.logo ? (
                <div className="relative h-12 w-40">
                  <Image
                    src={c.logo.replace("/logos/", "/logos/mono/")}
                    alt={i < row.length ? c.name : ""}
                    fill
                    sizes="160px"
                    className="object-contain opacity-40 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
              ) : (
                <span className="font-display text-[22px] font-medium tracking-tight text-fg-subtle transition-colors duration-500 group-hover:text-fg">
                  {c.name}
                </span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function TextTicker({ rows }: { rows: string[][] }) {
  return (
    <div className="marquee space-y-2 overflow-hidden" aria-hidden>
      {rows.map((words, r) => (
        <div
          key={r}
          className={`flex w-max ${r % 2 === 0 ? "animate-marquee" : "animate-marquee-reverse"}`}
          style={{ ["--marquee-duration" as string]: r % 2 === 0 ? "70s" : "90s" }}
        >
          {[...words, ...words].map((w, i) => (
            <span key={i} className={`t-display whitespace-nowrap px-6 ${r % 2 ? "text-fg/[0.04]" : "text-fg/[0.07]"}`}>
              {w}<span className="mx-6 inline-block h-[0.14em] w-[0.14em] -translate-y-[0.3em] rounded-full bg-signal/50 align-middle" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
