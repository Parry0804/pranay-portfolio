import Image from "next/image";
import { clients } from "@/content/site";

// Endless strip of client logos. The list is rendered twice and shifted by
// half its width, so the loop has no visible seam.
export function LogoMarquee({ label = "Trusted by 20+ teams and brands" }: { label?: string }) {
  return (
    <section className="marquee border-y border-line py-10" aria-label="Companies I have worked with">
      <p className="label mb-8 text-center text-fg-3">{label}</p>
      <div className="marquee-mask overflow-hidden">
        <ul className="flex w-max animate-marquee gap-4 [--marquee-duration:45s]">
          {[...clients, ...clients].map((c, i) => (
            <li
              key={i}
              aria-hidden={i >= clients.length}
              className="grid h-[92px] w-[196px] shrink-0 place-items-center rounded-2xl border border-line bg-card transition-colors duration-300 hover:border-line-strong"
            >
              {c.logo ? (
                <span className="grid h-16 w-[150px] place-items-center rounded-xl bg-ink/90 px-3 transition-[filter,opacity] duration-500 [filter:grayscale(1)] opacity-80 hover:opacity-100 hover:[filter:grayscale(0)]">
                  <Image src={c.logo} alt={c.name} width={130} height={52} className="max-h-[52px] w-auto object-contain" />
                </span>
              ) : (
                <span className="text-xl font-medium tracking-tight text-fg-2">{c.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
