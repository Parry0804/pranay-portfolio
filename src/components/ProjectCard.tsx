import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

// Charcoal covers rotate so neighbouring cards differ slightly.
const tones = [
  "from-[#17171b] to-[#24232b]",
  "from-[#16181a] to-[#22262a]",
  "from-[#19171a] to-[#28232a]",
  "from-[#161719] to-[#1f2226]",
];

export function ProjectCover({ p, index = 0, large = false }: { p: Project; index?: number; large?: boolean }) {
  if (p.cover) {
    return (
      <Image
        src={p.cover}
        alt={`${p.client} project cover`}
        fill
        className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
        sizes={large ? "(min-width: 1024px) 1200px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
      />
    );
  }
  return (
    <div className={`absolute inset-0 grid place-items-center bg-gradient-to-br ${tones[index % tones.length]}`}>
      {p.logo ? (
        <span className={`grid -rotate-3 place-items-center rounded-3xl bg-ink shadow-[0_24px_60px_rgba(0,0,0,0.4)] transition-transform duration-700 ease-out-soft group-hover:rotate-0 group-hover:scale-105 ${large ? "h-60 w-[420px] p-10" : "h-36 w-60 p-6"}`}>
          <Image src={p.logo} alt={`${p.client} logo`} width={320} height={170} className="max-h-full w-auto object-contain grayscale" />
        </span>
      ) : (
        <span className={`serif text-fg/80 transition-transform duration-700 ease-out-soft group-hover:scale-105 ${large ? "text-8xl md:text-9xl" : "text-6xl"}`}>
          {p.client}
        </span>
      )}
    </div>
  );
}

export function ProjectCard({ p, index = 0 }: { p: Project; index?: number }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className="group block rounded-[28px] border border-line bg-card p-3 transition-all duration-500 ease-out-soft hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
    >
      <div className="relative aspect-[7/5] overflow-hidden rounded-[20px]">
        <ProjectCover p={p} index={index} />
        <span className="absolute right-4 top-4 grid size-10 translate-y-2 place-items-center rounded-full bg-ink text-ink-fg opacity-0 transition-all duration-500 ease-out-soft group-hover:translate-y-0 group-hover:opacity-100">
          ↗
        </span>
      </div>
      <div className="space-y-3 px-3 pb-3 pt-5">
        <div className="flex items-center justify-between gap-4">
          <p className="label text-fg-3">{p.industry}</p>
          <p className="text-sm text-fg-3">{p.cardServices}</p>
        </div>
        <h3 className="text-2xl font-medium tracking-tight">{p.client}</h3>
        <p className="text-fg-2 transition-colors duration-300 group-hover:text-fg">{p.cardTitle}</p>
      </div>
    </Link>
  );
}
