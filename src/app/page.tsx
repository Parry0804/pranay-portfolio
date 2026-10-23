import Link from "next/link";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { TextMarquee } from "@/components/TextMarquee";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";
import { ProjectCard } from "@/components/ProjectCard";
import { ServiceRow } from "@/components/ServiceRow";
import { featured, projects } from "@/content/projects";
import { services } from "@/content/services";
import { roles } from "@/content/experience";

const container = "mx-auto max-w-[1440px] px-5 md:px-14";

export default function Home() {
  const work = featured.map((s) => projects.find((p) => p.slug === s)!);
  return (
    <>
      <Hero />
      <LogoMarquee />
      <TextMarquee />

      {/* About teaser */}
      <section className={`${container} grid gap-14 py-20 md:py-28 lg:grid-cols-[1.4fr_1fr]`}>
        <Reveal className="space-y-8">
          <Eyebrow no="01">About me</Eyebrow>
          <p className="heading text-3xl md:text-[44px]">
            I&apos;m a designer who became a CTO. For seven years I&apos;ve helped <span className="serif text-fg-2">20+ companies</span> turn messy ideas into products people actually use.
          </p>
          <Button href="/about" variant="outline">More about me</Button>
        </Reveal>
        <Reveal delay={0.1} className="space-y-3 self-end">
          {[
            ["G", "GetHire", "CTO · now"],
            ["D", "Diznovate", "Founder & Creative Director"],
            ["T", "Talent Thread", "Founder"],
            ["D", "Databytely", "Founder"],
          ].map(([i, n, r]) => (
            <Link key={n} href="/experience" className="group flex items-center gap-4 rounded-2xl border border-line bg-card p-4 transition-all duration-500 ease-out-soft hover:translate-x-1 hover:border-line-strong">
              <span className="grid size-11 place-items-center rounded-full bg-raised font-medium text-fg-2 transition-colors group-hover:bg-ink group-hover:text-ink-fg">{i}</span>
              <span className="flex-1">
                <span className="block font-medium">{n}</span>
                <span className="text-sm text-fg-3">{r}</span>
              </span>
              <span className="text-fg-3 transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* Selected work */}
      <section className={`${container} py-20 md:py-28`}>
        <SectionHeading
          no="02"
          eyebrow="Selected work"
          title={<>Projects I have led, <span className="serif text-fg-2">from first sketch to launch.</span></>}
          action={<Button href="/work" variant="outline">All projects</Button>}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {work.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.1}>
              <ProjectCard p={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className={`${container} py-20 md:py-28`}>
        <SectionHeading
          no="03"
          eyebrow="What I do"
          title={<>Four ways I can <span className="serif text-fg-2">help your team.</span></>}
          action={<Button href="/services" variant="outline">All services</Button>}
        />
        <Reveal>
          {services.map((s) => <ServiceRow key={s.no} no={s.no} name={s.name} tags={s.short} />)}
          <div className="border-t border-line" />
        </Reveal>
      </section>

      {/* Experience snapshot */}
      <section className="border-y border-line bg-paper-2 py-20 md:py-28">
        <div className={container}>
          <SectionHeading
            no="04"
            eyebrow="Experience"
            title={<>Seven years. Six roles. <span className="serif text-fg-2">One habit: shipping.</span></>}
            action={<Button href="/experience" variant="outline">Full experience</Button>}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((r, i) => (
              <Reveal key={r.company} delay={(i % 3) * 0.08}>
                <Link href="/experience" className="group flex h-full flex-col justify-between gap-10 rounded-3xl border border-line bg-card p-7 transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
                  <div className="flex items-center justify-between">
                    <p className="label text-fg-3">{r.period}</p>
                    {r.current && <span className="rounded-full bg-ink px-3 py-1 text-xs font-medium text-ink-fg">Current</span>}
                  </div>
                  <div>
                    <p className="text-2xl font-medium tracking-tight">{r.company}</p>
                    <p className="mt-1 text-fg-2">{r.title}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
