import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { TextMarquee } from "@/components/TextMarquee";
import { Faq } from "@/components/Faq";
import { engagements, faqs, process, services } from "@/content/services";

export const metadata: Metadata = { title: "Services", description: "Fractional CTO, product management, design & branding, and delivery management." };

const container = "mx-auto max-w-[1440px] px-5 md:px-14";

export default function Services() {
  return (
    <>
      <section className={`${container} py-20 md:py-28`}>
        <Reveal className="max-w-5xl space-y-8">
          <Eyebrow no="01">Services & expertise</Eyebrow>
          <h1 className="display text-5xl md:text-[88px]">
            Expertise that takes products <span className="serif text-fg-2">from idea to impact.</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-fg-2 md:text-xl">
            Hire me for one piece of the puzzle, or for the whole thing. Strategy, design, engineering leadership and delivery, under one roof.
          </p>
          <Button href="/contact">Book a free intro call</Button>
        </Reveal>
      </section>

      <TextMarquee />

      <section className={`${container} grid gap-6 py-20 md:py-28 lg:grid-cols-2`}>
        {services.map((s, i) => (
          <Reveal key={s.no} delay={(i % 2) * 0.08}>
            <article className="group flex h-full flex-col gap-8 rounded-[28px] border border-line bg-card p-8 transition-all duration-500 ease-out-soft hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)] md:p-10">
              <div className="flex items-start justify-between">
                <span className="font-mono text-sm text-fg-3">{s.no}</span>
                <span className="grid size-11 place-items-center rounded-full border border-line transition-all duration-500 ease-out-soft group-hover:-rotate-45 group-hover:border-transparent group-hover:bg-ink group-hover:text-ink-fg">→</span>
              </div>
              <div className="space-y-4">
                <h2 className="heading text-3xl md:text-4xl">{s.name}</h2>
                <p className="text-lg text-fg-2">{s.description}</p>
              </div>
              <div className="rounded-2xl border border-line bg-paper-2 p-5">
                <p className="label text-fg-3">Best for</p>
                <p className="mt-2">{s.bestFor}</p>
              </div>
              <div>
                <p className="label mb-4 text-fg-3">What you get</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {s.includes.map((x) => (
                    <li key={x} className="flex items-center gap-3 text-fg-2">
                      <span className="size-1.5 rounded-full bg-sage" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <Button href="/contact" variant="outline">Discuss this</Button>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="border-y border-line bg-paper-2 py-20 md:py-28">
        <div className={container}>
          <SectionHeading no="02" eyebrow="Process" title={<>A simple process, <span className="serif text-fg-2">run with discipline.</span></>} />
          <ol className="grid gap-4 md:grid-cols-5">
            {process.map((p, i) => (
              <Reveal as="li" key={p.no} delay={i * 0.07} className="group rounded-3xl border border-line bg-card p-6 transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:border-line-strong">
                <span className="grid size-10 place-items-center rounded-full border border-line font-mono text-sm text-fg-2 transition-colors duration-300 group-hover:bg-ink group-hover:text-ink-fg">{p.no}</span>
                <p className="mt-10 text-xl font-medium tracking-tight">{p.name}</p>
                <p className="mt-2 text-fg-2">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${container} py-20 md:py-28`}>
        <SectionHeading no="03" eyebrow="Engagement" title={<>Ways to <span className="serif text-fg-2">work together.</span></>} />
        <div className="grid gap-4 md:grid-cols-3">
          {engagements.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.07}>
              <div className={`group flex h-full flex-col gap-6 rounded-3xl border p-8 transition-all duration-500 ease-out-soft hover:-translate-y-1 ${e.popular ? "border-line-strong bg-raised" : "border-line bg-card hover:border-line-strong"}`}>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-medium tracking-tight">{e.name}</p>
                  {e.popular && <span className="rounded-full bg-ink px-3 py-1 text-xs font-medium text-ink-fg">Most popular</span>}
                </div>
                <p className="text-fg-2">{e.text}</p>
                <p className="label mt-auto text-fg-3">Pricing on request</p>
                <Button href="/contact" variant={e.popular ? "primary" : "outline"}>Get a quote</Button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`${container} pb-20 md:pb-28`}>
        <SectionHeading no="04" eyebrow="FAQ" title={<>Questions clients <span className="serif text-fg-2">often ask.</span></>} />
        <Reveal><Faq items={faqs} /></Reveal>
      </section>
    </>
  );
}
