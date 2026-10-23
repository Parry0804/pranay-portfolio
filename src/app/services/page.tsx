import type { Metadata } from "next";
import { Button, Label } from "@/components/Button";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Reveal, RevealText } from "@/components/Reveal";
import { StepsLine } from "@/components/StepsLine";
import { engagements, faqs, process as steps, services } from "@/content/services";

export const metadata: Metadata = { title: "Services", description: "Fractional CTO, product management, design and delivery from Pranay Pawar." };

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-4 pb-24 pt-32 md:px-10 md:pt-44">
        <Label>Services</Label>
        <RevealText as="h1" text={"Senior help,\nwithout the overhead."} immediate className="t-display mt-6" />
        <Reveal delay={0.5}>
          <p className="t-body-l mt-10 max-w-[600px] text-fg-muted">
            Hire me for a project, a monthly retainer, or a few days a week as your CTO or head of product.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 md:px-10">
        {services.map((s) => (
          <div key={s.no} className="grid gap-10 border-t border-line py-16 md:grid-cols-12 md:gap-6 md:py-24">
            <div className="md:col-span-5">
              <div className="md:sticky md:top-32">
                <p className="t-label text-fg-subtle">{s.no}</p>
                <h2 className="t-h1 mt-4">{s.name}</h2>
                <p className="mt-6 max-w-[440px] text-fg-muted">{s.description}</p>
              </div>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 md:col-span-6 md:col-start-7">
              <Reveal>
                <p className="t-label text-fg-subtle">What&apos;s included</p>
                <ul className="mt-5 space-y-3">
                  {s.includes.map((x) => (
                    <li key={x} className="flex gap-3 border-b border-line pb-3 text-[16px]">
                      <span className="text-signal">→</span>
                      {x}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="t-label text-fg-subtle">Best for</p>
                <p className="t-h4 mt-5">{s.bestFor}</p>
                <p className="t-label mt-10 text-fg-subtle">Focus</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.short.map((x) => (
                    <li key={x} className="rounded-full border border-line-strong px-3 py-1.5 text-[13px] text-fg-muted">{x}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-24 md:px-10 md:py-40">
        <Label>Ways to work together</Label>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {engagements.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.08}>
              <div className={`group h-full rounded-xl border p-8 transition-colors duration-500 hover:bg-bg-raised/70 ${e.popular ? "border-signal/50" : "border-line hover:border-line-strong"}`}>
                <div className="flex items-start justify-between">
                  <p className="t-label text-fg-subtle">0{i + 1}</p>
                  {e.popular && <span className="t-label rounded-full bg-signal-soft px-3 py-1 text-signal">Most chosen</span>}
                </div>
                <h3 className="t-h2 mt-12">{e.name}</h3>
                <p className="mt-4 text-fg-muted">{e.text}</p>
                <p className="mt-10 text-[14px] text-fg-subtle transition-colors group-hover:text-fg">Ask for a quote →</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pb-24 md:px-10 md:pb-40">
        <Label>How we start</Label>
        <RevealText text="From first call to weekly demos" className="t-h1 mb-16 mt-5" />
        <StepsLine steps={steps} />
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-12 px-4 pb-24 md:grid-cols-12 md:px-10 md:pb-40">
        <div className="md:col-span-4">
          <Label>Questions</Label>
          <h2 className="t-h2 mt-5">Still unsure? Ask me directly.</h2>
          <div className="mt-8">
            <Button href="/contact" variant="secondary">Book a 30-min call</Button>
          </div>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <Faq items={faqs} />
        </div>
      </section>
      <Footer />
    </>
  );
}
