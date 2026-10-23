import Link from "next/link";
import type { Project } from "@/content/projects";
import { clean } from "@/content/clean";
import { Cover } from "./Cover";

export function ProjectCard({ project, index, ratio = "aspect-[4/5]", sizes = "(min-width: 768px) 50vw, 100vw" }: { project: Project; index: number; ratio?: string; sizes?: string }) {
  return (
    <Link href={`/work/${project.slug}`} data-cursor="View" className="group block">
      <div className={`relative overflow-hidden rounded-[4px] ${ratio}`}>
        <Cover project={project} sizes={sizes} hoverSwap portrait={ratio.includes("4/5")} />
        <span className="t-label absolute left-4 top-4 rounded-full bg-bg/70 px-3 py-1.5 text-fg backdrop-blur">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="overflow-hidden">
          <h3 className="t-h3 transition-transform duration-500 ease-[var(--ease-expressive)] group-hover:-translate-y-0.5">{project.client}</h3>
          <p className="mt-1 text-[15px] text-fg-muted">{clean(project.cardTitle)}</p>
        </div>
        <span className="t-label mt-2 shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-fg">
          {clean(project.cardServices)}
        </span>
      </div>
    </Link>
  );
}
