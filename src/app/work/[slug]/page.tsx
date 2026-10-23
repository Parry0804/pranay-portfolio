import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Label } from "@/components/Button";
import { Cover } from "@/components/Cover";
import { Footer } from "@/components/Footer";
import { NextProject } from "@/components/NextProject";
import { Reveal, RevealMedia, RevealText } from "@/components/Reveal";
import { clean, isReal } from "@/content/clean";
import { getProject, nextProject, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: p.client, description: clean(p.title) } : {};
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const index = projects.indexOf(p) + 1;
  const next = nextProject(slug);
  const results = p.results.filter((r) => isReal(r.value));
  const meta = [
    ["Client", p.clientFull],
    ["Industry", p.industry],
    ["Role", p.role],
    ["Services", p.services],
  ].filter(([, v]) => isReal(v));
  const story = [
    ["Brief", p.brief],
    ["What I did", p.myRole],
    ["The challenge", p.challenge],
    ["Approach", p.approach],
    ["Outcome", p.outcome],
  ].filter(([, v]) => isReal(v));
  const gallery = p.gallery ?? [];

  return (
    <>
      <section className="mx-auto max-w-[1600px] px-4 pb-16 pt-32 md:px-10 md:pt-40">
        <div className="flex justify-between">
          <Link href="/work" className="t-label link-draw text-fg-muted hover:text-fg">← All work</Link>
          <span className="t-label text-fg-subtle">{String(index).padStart(2, "0")} / {projects.length}</span>
        </div>
        <RevealText as="h1" text={p.client} immediate className="t-display-xl mt-12" />
        {isReal(p.title) && (
          <Reveal delay={0.4}>
            <p className="t-h3 mt-8 max-w-[880px] text-fg-muted">{clean(p.title)}</p>
          </Reveal>
        )}
        <Reveal delay={0.55}>
          <dl className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {meta.map(([k, v]) => (
              <div key={k} className="border-t border-line pt-4">
                <dt className="t-label text-fg-subtle">{k}</dt>
                <dd className="mt-2 text-[15px]">{clean(v)}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section className="px-4 md:px-10">
        <RevealMedia className="mx-auto aspect-[16/10] max-w-[1600px] rounded-[4px] md:aspect-[16/8]">
          <Cover project={p} sizes="100vw" priority />
        </RevealMedia>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-24 md:px-10 md:py-40">
        {story.map(([h, b], i) => (
          <Reveal key={h}>
            <div className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-6 md:py-14">
              <span className="t-label text-fg-subtle md:col-span-1">0{i + 1}</span>
              <h2 className="t-h3 md:col-span-3">{h}</h2>
              <p className="t-body-l text-fg-muted md:col-span-7 md:col-start-6">{clean(b)}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {gallery.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-4 md:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((src, i) => (
              <RevealMedia key={src} className="group relative aspect-[3/4] rounded-[4px] bg-bg-raised">
                <Image src={src} alt={`${p.client}, image ${i + 1}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-contain p-6 transition-transform duration-700 ease-[var(--ease-expressive)] group-hover:scale-[1.03]" />
              </RevealMedia>
            ))}
          </div>
        </section>
      )}

      {p.highlights && (
        <section className="mx-auto max-w-[1600px] px-4 py-24 md:px-10 md:py-32">
          <Label>{p.highlights.title}</Label>
          <ul className="mt-8 flex flex-wrap gap-2">
            {p.highlights.items.map((x) => (
              <li key={x} className="rounded-full border border-line-strong px-4 py-2 text-[15px] text-fg-muted transition-colors hover:border-fg hover:text-fg">{x}</li>
            ))}
          </ul>
        </section>
      )}

      {results.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-4 pb-24 md:px-10 md:pb-40">
          <Label>Results</Label>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {results.map((r) => (
              <Reveal key={r.label} className="border-t border-line pt-6">
                <p className="t-display">{r.value}</p>
                <p className="mt-4 text-fg-muted">{r.label}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <NextProject project={next} index={projects.indexOf(next) + 1} />
      <Footer />
    </>
  );
}
