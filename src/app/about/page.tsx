import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { LogoMarquee } from "@/components/LogoMarquee";
import { SpinBadge } from "@/components/SpinBadge";
import { Tag } from "@/components/Tag";
import { education, milestones } from "@/content/experience";
import { principles, skills } from "@/content/services";

export const metadata: Metadata = { title: "About", description: "Designer by craft, technologist by choice. The story of Pranay Pawar." };

const container = "mx-auto max-w-[1440px] px-5 md:px-14";

const story = [
  "My career started at Edvantage India as a graphic designer. I fell in love with how design changes behaviour, and grew into the Design Team Manager role, leading the team on brand and product work.",
  "From 2019 I worked independently as a UX, product and project lead for more than 20 companies, from Walmart to travel, energy, health and food brands. I learned to run discovery, manage delivery and keep clients happy at the same time.",
  "In 2022 I founded Diznovate, a design and technology studio. We have delivered 100+ projects, cut project timelines by 20% and grew the studio to profitability. In 2025 I started Talent Thread, an AI-enabled freelancing platform with skill advancement, and in 2026 Databytely.",
  "Today I'm CTO at GetHire, where I lead technology, product and engineering. Design is still how I think: every system I build starts with the people who will use it.",
];

export default function About() {
  return (
    <>
      <section className={`${container} grid gap-14 py-20 md:py-28 lg:grid-cols-[1.3fr_1fr] lg:items-end`}>
        <Reveal className="space-y-8">
          <Eyebrow no="01">About me</Eyebrow>
          <h1 className="display text-5xl md:text-[88px]">
            Designer by craft.
            <br />
            <span className="serif text-fg-2">Technologist by choice.</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-fg-2 md:text-xl">
            I&apos;m Pranay Pawar, CTO at GetHire and founder of Diznovate, Talent Thread and Databytely. I started as a graphic designer, grew into product and project leadership, and now lead technology. I bring a designer&apos;s eye to every engineering decision.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Based in New Delhi", "Works worldwide", "English · Hindi", "7+ years"].map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        </Reveal>
        <Reveal delay={0.15} className="relative mx-auto w-full max-w-[400px]">
          <div className="grid aspect-[4/5] place-items-center rounded-t-[200px] rounded-b-[28px] border border-line bg-gradient-to-b from-raised to-paper-2">
            <span className="serif text-[140px] text-line-strong">Pp</span>
          </div>
          <span className="absolute -left-4 top-12 rotate-[-4deg] rounded-full border border-line bg-paper-2 px-4 py-2 text-sm text-fg-2">hello there!</span>
          <SpinBadge className="absolute -bottom-8 -right-4" />
        </Reveal>
      </section>

      <LogoMarquee />

      <section className={`${container} grid gap-14 py-20 md:py-28 lg:grid-cols-[1fr_1.4fr]`}>
        <Reveal className="space-y-6">
          <Eyebrow no="02">My story</Eyebrow>
          <h2 className="heading text-4xl md:text-5xl">From pixels <span className="serif text-fg-2">to platforms.</span></h2>
        </Reveal>
        <div className="space-y-6">
          {story.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-lg leading-relaxed text-fg-2 md:text-xl">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`${container} py-20 md:py-28`}>
        <SectionHeading no="03" eyebrow="Journey" title={<>A few milestones <span className="serif text-fg-2">along the way.</span></>} />
        <ol className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {milestones.map((m, i) => (
            <Reveal as="li" key={m.company} delay={i * 0.06} className="group relative rounded-3xl border border-line bg-card p-6 transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:border-line-strong">
              <p className="label text-fg-3">{m.year}</p>
              <p className="mt-6 text-xl font-medium tracking-tight">{m.company}</p>
              <p className="mt-2 text-sm text-fg-2">{m.note}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="border-y border-line bg-paper-2 py-20 md:py-28">
        <div className={container}>
          <SectionHeading no="04" eyebrow="How I work" title={<>Four principles I bring <span className="serif text-fg-2">to every team.</span></>} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06} className="group rounded-3xl border border-line bg-card p-7 transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:border-line-strong">
                <p className="font-mono text-sm text-fg-3">0{i + 1}</p>
                <p className="mt-10 text-2xl font-medium tracking-tight">{p.name}</p>
                <p className="mt-3 text-fg-2">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`${container} grid gap-16 py-20 md:py-28 lg:grid-cols-[1.4fr_1fr]`}>
        <div>
          <SectionHeading no="05" eyebrow="Expertise" title="What I am good at." />
          <div className="space-y-10">
            {skills.map((g) => (
              <Reveal key={g.group} className="space-y-4">
                <p className="label text-fg-3">{g.group}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span key={s} className="rounded-full border border-line px-4 py-2 text-fg-2 transition-all duration-300 hover:border-fg-3 hover:bg-card hover:text-fg">{s}</span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading no="06" eyebrow="Education" title="Where I studied." />
          <ul className="divide-y divide-line border-y border-line">
            {education.map((e) => (
              <li key={e.school} className="flex items-center justify-between gap-6 py-6">
                <span className="text-lg">{e.school}</span>
                <span className="font-mono text-sm text-fg-3">{e.years}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
