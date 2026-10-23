import type { Metadata } from "next";
import Image from "next/image";
import { Button, Label } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { LogoMarquee } from "@/components/Marquee";
import { Reveal, RevealMedia, RevealText } from "@/components/Reveal";
import { ScrollWords } from "@/components/ScrollWords";
import { clean, isReal } from "@/content/clean";
import { education, roles } from "@/content/experience";
import { principles, skills } from "@/content/services";
import { site, ventures } from "@/content/site";

export const metadata: Metadata = { title: "About", description: "Designer first, now CTO at GetHire. The story and experience of Pranay Pawar." };

const chapters = [
  { no: "01", title: "Design roots", text: "I started as a graphic designer at Edvantage India and was promoted to lead the design team. That is where I learned that good design is clear thinking made visible." },
  { no: "02", title: "Product and delivery", text: "From 2019 I worked as a UX, product and project lead for more than 20 companies, from Walmart to Freshcoo and five travel brands, owning roadmaps, research and delivery." },
  { no: "03", title: "Founder and CTO", text: "I founded Diznovate in 2022, then Talent Thread and Databytely. Today I lead technology, product and engineering at GetHire." },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1600px] gap-12 px-4 pb-24 pt-32 md:grid-cols-12 md:gap-6 md:px-10 md:pt-44">
        <div className="md:col-span-7">
          <Label>About</Label>
          <RevealText as="h1" text={"Designer first.\nNow I lead\nthe whole build."} immediate className="t-display mt-6" />
          <Reveal delay={0.6}>
            <p className="t-body-l mt-10 max-w-[620px] text-fg-muted">
              I&apos;m Pranay, CTO at GetHire in New Delhi. I care about clear thinking, calm teams and products that ship. I&apos;ve spent seven years moving between design, product and engineering, so I can lead all three.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={`mailto:${site.email}?subject=CV%20request`} external icon="↓">Ask for my CV</Button>
              <Button href="/contact" variant="secondary">Get in touch</Button>
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <RevealMedia className="relative aspect-[4/5] rounded-[4px]">
            <Image src="/about/pranay.jpg" alt="Pranay Pawar sitting on a stone wall above the Aravalli hills" fill priority sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-[30%_40%]" />
          </RevealMedia>
          <p className="t-label mt-4 text-fg-subtle">Udaipur, 2025 · in the Talent Thread tee</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-24 md:px-10 md:py-32">
        <ScrollWords className="t-h2 max-w-[1200px]" text="Seven years, *three companies founded, *20+ teams led, and one rule: I measure success by results for the business, not by deliverables." />
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pb-24 md:px-10 md:pb-40">
        <Label>The story</Label>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {chapters.map((c, i) => (
            <Reveal key={c.no} delay={i * 0.08} className="border-t border-line pt-6">
              <p className="t-label text-fg-subtle">{c.no}</p>
              <h2 className="t-h3 mt-6">{c.title}</h2>
              <p className="mt-4 text-fg-muted">{c.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pb-24 md:px-10 md:pb-40">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <Label>Experience</Label>
            <RevealText text="Where I've worked" className="t-h1 mt-5" />
          </div>
        </div>
        <ol className="border-t border-line">
          {roles.map((r) => (
            <li key={r.company} className="group border-b border-line">
              <Reveal>
                <div className="grid gap-4 py-10 md:grid-cols-12 md:gap-6">
                  <p className={`t-label md:col-span-2 ${r.current ? "text-signal" : "text-fg-subtle"}`}>{clean(r.period) || "Present"}</p>
                  <div className="md:col-span-4">
                    <h3 className="t-h2 transition-transform duration-500 ease-[var(--ease-expressive)] group-hover:translate-x-2">{r.company}</h3>
                    <p className="mt-2 text-fg-muted">{r.title}</p>
                  </div>
                  <div className="md:col-span-5 md:col-start-8">
                    <p className="text-fg-muted">{r.summary}</p>
                    {r.results.some((x) => isReal(x.value)) && (
                      <div className="mt-6 flex flex-wrap gap-8">
                        {r.results.filter((x) => isReal(x.value)).map((x) => (
                          <div key={x.label}>
                            <p className="t-h3">{x.value}</p>
                            <p className="text-[13px] text-fg-subtle">{x.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-line py-16">
        <LogoMarquee />
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-16 px-4 py-24 md:grid-cols-2 md:px-10 md:py-40">
        <div>
          <Label>Ventures</Label>
          <ul className="mt-8 border-t border-line">
            {ventures.map((v) => (
              <li key={v.name} className="flex items-baseline justify-between border-b border-line py-6">
                <span className="t-h3">{v.name}</span>
                <span className="text-[14px] text-fg-muted">{v.note}</span>
              </li>
            ))}
          </ul>
          <Label className="mt-16">Education</Label>
          <ul className="mt-8 border-t border-line">
            {education.map((e) => (
              <li key={e.school} className="flex items-baseline justify-between gap-6 border-b border-line py-5">
                <span className="t-h4">{e.school}</span>
                <span className="shrink-0 text-[14px] text-fg-muted">{e.years}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Label>How I work</Label>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {principles.map((p, i) => (
              <div key={p.name} className="rounded-xl border border-line p-6 transition-colors duration-500 hover:border-line-strong hover:bg-bg-raised/60">
                <p className="t-label text-fg-subtle">0{i + 1}</p>
                <h3 className="t-h4 mt-8">{p.name}</h3>
                <p className="mt-3 text-[15px] text-fg-muted">{p.text}</p>
              </div>
            ))}
          </div>
          <Label className="mt-16">Skills</Label>
          <div className="mt-8 space-y-6">
            {skills.map((g) => (
              <div key={g.group}>
                <p className="text-[14px] text-fg-subtle">{g.group}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((x) => (
                    <li key={x} className="rounded-full border border-line-strong px-3 py-1.5 text-[13px] text-fg-muted">{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
