import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { ProjectCover } from "@/components/ProjectCard";
import { getProject, nextProject, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: `${p.client} case study`, description: p.title } : {};
}

const container = "mx-auto max-w-[1440px] px-5 md:px-14";

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = nextProject(slug);
  const index = projects.indexOf(p);

  const meta = [
    ["Client", p.clientFull],
    ["Industry", p.industry],
    ["Services", p.services],
    ["My role", p.role],
  ];
  const story = [
    ["01", "Challenge", p.challenge],
    ["02", "Approach", p.approach],
    ["03", "Outcome", p.outcome],
  ];

  return (
    <article>
      <section className={`${container} pb-14 pt-14 md:pt-20`}>
        <Reveal>
          <p className="mb-10 flex items-center gap-2 text-sm text-fg-3">
            <Link href="/work" className="transition-colors hover:text-fg">← All work</Link>
            <span>/</span>
            <span className="text-fg-2">{p.client}</span>
          </p>
          <Eyebrow>{p.industry} · Case study</Eyebrow>
          <p className="mt-8 text-xl text-fg-2">{p.client}</p>
          <h1 className="display mt-3 max-w-5xl text-4xl md:text-7xl">{p.title}</h1>
        </Reveal>
        <Reveal delay={0.1} className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-8 md:grid-cols-4">
          {meta.map(([k, v]) => (
            <div key={k}>
              <p className="label text-fg-3">{k}</p>
              <p className="mt-2 text-fg">{v}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <Reveal className={container}>
        <div className="group relative aspect-[15/8] overflow-hidden rounded-[32px] border border-line">
          <ProjectCover p={p} index={index} large />
        </div>
      </Reveal>

      <section className={`${container} grid gap-14 py-20 md:py-28 lg:grid-cols-2`}>
        <Reveal className="space-y-5">
          <p className="label text-fg-3">The brief</p>
          <p className="heading text-2xl md:text-3xl">{p.brief}</p>
        </Reveal>
        <Reveal delay={0.08} className="space-y-5">
          <p className="label text-fg-3">My role</p>
          <p className="text-lg leading-relaxed text-fg-2 md:text-xl">{p.myRole}</p>
        </Reveal>
      </section>

      <section className={`${container} grid gap-4 md:grid-cols-3`}>
        {story.map(([no, title, text], i) => (
          <Reveal key={title} delay={i * 0.07} className="group rounded-3xl border border-line bg-card p-8 transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:border-line-strong">
            <span className="font-mono text-sm text-fg-3">{no}</span>
            <p className="mt-10 text-2xl font-medium tracking-tight">{title}</p>
            <p className="mt-3 text-fg-2">{text}</p>
          </Reveal>
        ))}
      </section>

      {p.highlights && (
        <section className={`${container} py-20 md:py-28`}>
          <Reveal className="space-y-8">
            <Eyebrow>{p.highlights.title}</Eyebrow>
            <div className="flex flex-wrap gap-2">
              {p.highlights.items.map((x) => (
                <span key={x} className="rounded-full border border-line px-4 py-2 text-fg-2 transition-all duration-300 hover:border-fg-3 hover:text-fg">{x}</span>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      <section className={`${container} ${p.highlights ? "" : "pt-20 md:pt-28"}`}>
        {p.gallery ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {p.gallery.map((src, i) => (
              <Reveal key={src} delay={(i % 3) * 0.06} className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-line">
                <Image src={src} alt={`${p.client} design ${i + 1}`} fill className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]" sizes="(min-width: 768px) 33vw, 50vw" />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {[0, 1].map((i) => (
              <div key={i} className="grid aspect-[4/3] place-items-center rounded-3xl border border-dashed border-line-strong bg-paper-2 text-fg-3">
                [Add project image]
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={`${container} py-20 md:py-28`}>
        <Reveal className="rounded-[32px] border border-line bg-paper-2 p-8 md:p-14">
          <p className="label text-fg-3">Results</p>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {p.results.map((r) => (
              <div key={r.label}>
                <p className="text-6xl font-medium tracking-[-0.04em]">{r.value}</p>
                <p className="mt-3 text-fg-2">{r.label}</p>
              </div>
            ))}
          </div>
          <blockquote className="mt-14 border-t border-line pt-10">
            <p className="serif text-3xl text-fg-2 md:text-4xl">&ldquo;[Add a short quote from the client about working with you.]&rdquo;</p>
            <footer className="mt-4 text-fg-3">[Client name, role]</footer>
          </blockquote>
        </Reveal>
      </section>

      <section className={`${container} pb-20 md:pb-28`}>
        <Link href={`/work/${next.slug}`} className="group flex flex-col justify-between gap-8 rounded-[32px] border border-line bg-card p-8 transition-all duration-500 ease-out-soft hover:border-line-strong hover:bg-raised md:flex-row md:items-center md:p-14">
          <div>
            <p className="label text-fg-3">Next project</p>
            <p className="display mt-4 text-5xl transition-transform duration-500 ease-out-soft group-hover:translate-x-2 md:text-7xl">{next.client}</p>
          </div>
          <span className="grid size-16 place-items-center rounded-full bg-ink text-2xl text-ink-fg transition-transform duration-500 ease-out-soft group-hover:-rotate-45">→</span>
        </Link>
        <div className="mt-10 flex justify-center">
          <Button href="/contact">Start a similar project</Button>
        </div>
      </section>
    </article>
  );
}
