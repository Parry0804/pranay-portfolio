import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Button } from "@/components/Button";
import { Tag } from "@/components/Tag";
import { companies, roles } from "@/content/experience";

export const metadata: Metadata = { title: "Experience", description: "Seven years of building, leading and shipping across 20+ companies." };

const container = "mx-auto max-w-[1440px] px-5 md:px-14";
const heroStats = [
  ["7+", "years of experience"],
  ["6", "roles & ventures"],
  ["20+", "companies served"],
  ["100+", "projects delivered"],
];

export default function Experience() {
  return (
    <>
      <section className={`${container} py-20 md:py-28`}>
        <Reveal className="space-y-8">
          <Eyebrow no="01">Experience</Eyebrow>
          <h1 className="display max-w-5xl text-5xl md:text-[88px]">
            Seven years of building, <span className="serif text-fg-2">leading and shipping.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1} className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {heroStats.map(([v, l]) => (
            <div key={l} className="rounded-3xl border border-line bg-card p-6 transition-colors duration-300 hover:border-line-strong">
              <p className="text-4xl font-medium tracking-tight md:text-5xl">{v}</p>
              <p className="mt-2 text-fg-3">{l}</p>
            </div>
          ))}
        </Reveal>
        {/* TODO: add /public/pranay-pawar-cv.pdf, then replace this with a direct download link. */}
        <div className="mt-10"><Button href="/contact" variant="outline">Ask for my CV</Button></div>
      </section>

      <LogoMarquee />

      <section className={`${container} space-y-6 py-20 md:py-28`}>
        {roles.map((r, i) => (
          <Reveal key={r.company} delay={0.04 * i}>
            <article className={`group grid gap-10 rounded-[28px] border p-8 transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)] md:p-12 lg:grid-cols-[1fr_1.3fr] ${r.current ? "border-line-strong bg-raised" : "border-line bg-card hover:border-line-strong"}`}>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="grid size-14 place-items-center rounded-2xl bg-paper-2 text-xl font-medium text-fg-2 transition-colors duration-300 group-hover:bg-ink group-hover:text-ink-fg">{r.initial}</span>
                  {r.current && <span className="rounded-full bg-ink px-3 py-1 text-xs font-medium text-ink-fg">Current role</span>}
                </div>
                <div>
                  <p className="label text-fg-3">{r.period} · {r.location}</p>
                  <h2 className="heading mt-4 text-3xl md:text-4xl">{r.company}</h2>
                  <p className="mt-2 text-lg text-fg-2">{r.title}</p>
                </div>
                <div className="flex flex-wrap gap-2">{r.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
              </div>
              <div className="space-y-8">
                <p className="text-lg leading-relaxed text-fg-2">{r.summary}</p>
                <div>
                  <p className="label mb-4 text-fg-3">What I do</p>
                  <ul className="space-y-2.5">
                    {r.doing.map((d) => (
                      <li key={d} className="flex gap-3 text-fg-2"><span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-sage" />{d}</li>
                    ))}
                  </ul>
                </div>
                {r.results.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 border-t border-line pt-6">
                    {r.results.map((x) => (
                      <div key={x.label}>
                        <p className="text-3xl font-medium tracking-tight">{x.value}</p>
                        <p className="mt-1 text-sm text-fg-3">{x.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="border-t border-line bg-paper-2 py-20 md:py-28">
        <div className={container}>
          <SectionHeading no="02" eyebrow="Companies I have worked with" title={<>20+ companies across retail, travel, energy, <span className="serif text-fg-2">health, food and education.</span></>} />
          <Reveal className="flex flex-wrap gap-3">
            {companies.map((c) => (
              <span key={c} className="rounded-full border border-line bg-card px-5 py-3 text-lg text-fg-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-fg-3 hover:text-fg">{c}</span>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
