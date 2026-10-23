import Link from "next/link";
import type { Project } from "@/content/projects";
import { clean } from "@/content/clean";
import { Cover } from "./Cover";

export function NextProject({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/work/${project.slug}`} data-cursor="Next" className="group block border-t border-line">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-20 md:grid-cols-[1fr_520px] md:items-center md:px-10 md:py-32">
        <div>
          <p className="t-label text-fg-muted">Next project · {String(index).padStart(2, "0")}</p>
          <p className="t-display mt-6 transition-[transform,color] duration-700 ease-[var(--ease-expressive)] group-hover:translate-x-4 group-hover:text-signal">
            {project.client} <span className="inline-block transition-transform duration-700 group-hover:translate-x-3">→</span>
          </p>
          <p className="t-body-l mt-6 max-w-[560px] text-fg-muted">{clean(project.title)}</p>
        </div>
        <div className="aspect-[16/10] overflow-hidden rounded-[4px] transition-[clip-path] duration-700 ease-[var(--ease-expressive)] [clip-path:inset(8%_8%_8%_8%)] group-hover:[clip-path:inset(0_0_0_0)]">
          <Cover project={project} sizes="520px" />
        </div>
      </div>
    </Link>
  );
}
