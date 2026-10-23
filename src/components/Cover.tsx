import Image from "next/image";
import type { Project } from "@/content/projects";
import { clean } from "@/content/clean";
import { visualFor } from "@/content/visuals";

// The project's image, or a typographic cover on a tinted tile when no image exists yet.
export function Cover({
  project,
  sizes,
  priority,
  hoverSwap = false,
  showName = true,
  portrait = false,
  className = "",
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  hoverSwap?: boolean;
  showName?: boolean;
  portrait?: boolean;
  className?: string;
}) {
  const v = visualFor(project.slug);
  const image = portrait && v.thumb ? v.thumb : v.image;
  if (image) {
    return (
      <div className={`relative h-full w-full overflow-hidden bg-bg-raised ${className}`}>
        <Image
          src={image}
          alt={v.alt ?? `${project.client}: ${project.cardTitle}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-[transform,opacity] duration-[900ms] ease-[var(--ease-expressive)] group-hover:scale-[1.04]"
        />
        {hoverSwap && v.hover && (
          <Image
            src={v.hover}
            alt=""
            fill
            sizes={sizes}
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
      </div>
    );
  }
  return (
    <div
      className={`@container relative flex h-full w-full flex-col justify-between overflow-hidden p-[6%] ${className}`}
      style={{ background: `radial-gradient(120% 90% at 15% 10%, ${v.tint[0]} 0%, transparent 60%), radial-gradient(100% 100% at 90% 100%, ${v.tint[1]} 0%, #0b0b0d 70%)` }}
    >
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:48px_48px]" />
      <div aria-hidden className="absolute -right-[20%] -top-[30%] aspect-square w-[80%] rounded-full border border-fg/10 transition-transform duration-[1200ms] ease-[var(--ease-expressive)] group-hover:scale-110" />
      <div aria-hidden className="absolute -right-[8%] -top-[18%] aspect-square w-[56%] rounded-full border border-fg/[0.07] transition-transform duration-[1200ms] ease-[var(--ease-expressive)] group-hover:scale-90" />
      <span className="t-label relative text-fg-muted">{clean(project.industry)}</span>
      {project.logo && !showName && (
        <div className="relative mx-auto h-[22cqw] w-[44cqw] opacity-70">
          <Image src={project.logo.replace("/logos/", "/logos/mono/")} alt="" fill sizes="40vw" className="object-contain" />
        </div>
      )}
      {showName ? (
        <div className="relative">
          {project.logo && (
            <div className="relative mb-4 h-10 w-28 opacity-80">
              <Image src={project.logo.replace("/logos/", "/logos/mono/")} alt="" fill sizes="112px" className="object-contain object-left" />
            </div>
          )}
          <span className="block font-display text-[clamp(2rem,13cqw,9rem)] font-medium leading-[0.95] tracking-[-0.03em] transition-transform duration-700 ease-[var(--ease-expressive)] group-hover:-translate-y-1">
            {project.client}
          </span>
        </div>
      ) : (
        <span aria-hidden className="relative block whitespace-nowrap font-display text-[18cqw] font-medium leading-[0.8] tracking-[-0.04em] text-fg/[0.06]">
          {project.client}
        </span>
      )}
    </div>
  );
}
