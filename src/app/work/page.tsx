import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WorkGrid } from "@/components/WorkGrid";
import { projects } from "@/content/projects";
import { ventures } from "@/content/site";

export const metadata: Metadata = { title: "Work", description: "Management projects from Diznovate and independent work." };

const container = "mx-auto max-w-[1440px] px-5 md:px-14";

export default function Work() {
  return (
    <>
      <section className={`${container} pb-12 pt-20 md:pt-28`}>
        <Reveal className="space-y-8">
          <Eyebrow no="01">Work</Eyebrow>
          <h1 className="display max-w-5xl text-5xl md:text-[88px]">
            Projects I have led, <span className="serif text-fg-2">for brands I believe in.</span>
          </h1>
          <p className="text-lg text-fg-2">Management projects from Diznovate and independent work.</p>
        </Reveal>
      </section>

      <section className={`${container} pb-20 md:pb-28`}>
        <WorkGrid projects={projects} />
      </section>

      <section className="border-t border-line bg-paper-2 py-20 md:py-28">
        <div className={container}>
          <SectionHeading no="02" eyebrow="My own ventures" title={<>Products <span className="serif text-fg-2">I have founded.</span></>} />
          <div className="grid gap-4 md:grid-cols-3">
            {ventures.map((v, i) => (
              <Reveal key={v.name} delay={i * 0.07} className="group rounded-3xl border border-line bg-card p-8 transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:border-line-strong">
                <span className="grid size-12 place-items-center rounded-2xl bg-paper-2 font-medium text-fg-2 transition-colors duration-300 group-hover:bg-ink group-hover:text-ink-fg">{v.initial}</span>
                <p className="mt-10 text-2xl font-medium tracking-tight">{v.name}</p>
                <p className="mt-2 text-fg-2">{v.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
