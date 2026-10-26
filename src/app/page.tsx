import Image from "next/image";
import Link from "next/link";
import { Button, Label } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { HeroPhoto } from "@/components/HeroPhoto";
import { LogoMarquee, TextTicker } from "@/components/Marquee";
import { Reveal, RevealMedia, RevealText } from "@/components/Reveal";
import { ScrollWords } from "@/components/ScrollWords";
import { ServiceRows } from "@/components/ServiceRows";
import { Showcase } from "@/components/Showcase";
import { Timeline } from "@/components/Timeline";
import { Typewriter } from "@/components/Typewriter";
import { WorkList } from "@/components/WorkList";
import { featured, projects } from "@/content/projects";
import { site } from "@/content/site";

const showcase = [...featured, "supplementro"].map((s) => projects.find((p) => p.slug === s)!);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col overflow-x-clip px-4 pb-12 pt-24 md:px-10 md:pb-16 md:pt-28">
        <HeroPhoto className="absolute inset-x-0 top-0 h-[74%] md:inset-x-auto md:right-0 md:h-full md:w-[62%] lg:w-[56%]" />
        <div className="relative hidden justify-between text-fg-muted md:flex">
          <span className="t-label">Portfolio — 2019 / 2026</span>
        </div>
        <ul className="absolute right-4 top-24 z-10 flex flex-col gap-3 md:right-10 md:top-auto md:bottom-10">
          {[
            { href: site.whatsapp, label: "WhatsApp", path: "M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm4.6 12.6c-.2.6-1.1 1.1-1.6 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 1.9 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.1.1.6-.1 1.2Z" },
            { href: `mailto:${site.email}`, label: "Email", path: "M4 6h16v12H4z M4 7l8 6 8-6" },
            ...(site.linkedin ? [{ href: site.linkedin, label: "LinkedIn", path: "M6.5 9.5v8 M6.5 6.5v.01 M10.5 17.5v-8 M10.5 13a3 3 0 0 1 6 0v4.5" }] : []),
          ].map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-line bg-bg-raised/70 text-fg backdrop-blur transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-fg hover:text-bg"
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill={s.label === "WhatsApp" ? "currentColor" : "none"} stroke={s.label === "WhatsApp" ? "none" : "currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
        <div className="pointer-events-none relative mt-auto max-w-[640px] [&_a]:pointer-events-auto">
          {/* Keeps the text readable where it sits over the photo on phones */}
          <div aria-hidden className="absolute -inset-x-4 -bottom-10 -top-16 -z-10 bg-gradient-to-t from-bg via-bg/85 to-transparent md:hidden" />
          <Reveal immediate delay={0.15} className="flex items-center gap-2.5 text-fg-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_0_4px_rgba(76,195,138,0.15)]" />
            <span className="t-label">Available for 2 projects from November</span>
          </Reveal>
          <RevealText
            as="h1"
            text={"Pranay\nPawar"}
            immediate
            delay={0.25}
            className="mt-5 font-display text-[clamp(3.5rem,8.4vw,8rem)] font-medium leading-[0.9] tracking-[-0.045em]"
          />
          <Reveal immediate delay={0.55}>
            <p className="mt-6 min-h-[1.3em] font-display text-[clamp(1.375rem,2.2vw,2rem)] leading-[1.2] tracking-[-0.02em] text-fg-muted">
              I lead{" "}
              <Typewriter
                className="text-fg"
                phrases={["product & technology", "engineering teams", "startups from idea to launch", "design that ships"]}
              />
            </p>
          </Reveal>
          <Reveal immediate delay={0.7}>
            <p className="mt-5 max-w-[480px] text-[16px] leading-[1.65] text-fg-muted md:text-[17px]">
              Founder of Diznovate and Talent Thread. Seven years of turning rough ideas into products
              people actually use.
            </p>
          </Reveal>
          <Reveal immediate delay={0.85} className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/work"
              aria-label="See my work"
              className="group grid h-[52px] w-[52px] place-items-center rounded-full bg-signal text-bg transition-transform duration-500 ease-[var(--ease-expressive)] hover:rotate-[-45deg]"
            >
              <span aria-hidden className="text-[18px]">↓</span>
            </Link>
            <Button href="/contact">Let&apos;s talk</Button>
            <a
              href={`mailto:${site.email}?subject=CV%20request`}
              className="link-draw ml-2 inline-flex items-center gap-2 text-[15px] text-fg"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M7 3h7l5 5v13H7z M14 3v5h5 M10 13h6 M10 17h6" />
              </svg>
              Ask for my CV
            </a>
          </Reveal>
        </div>
      </section>

      {/* Featured work */}
      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-10 md:py-32">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <Label>(01) Selected work</Label>
            <RevealText text="Work I'm proud of" className="t-h1 mt-5" />
          </div>
          <Link href="/work" className="link-draw hidden text-[15px] md:inline">All 13 projects →</Link>
        </div>
        <Reveal>
          <Showcase projects={showcase} />
        </Reveal>
      </section>

      {/* Logos */}
      <section className="border-y border-line py-16 md:py-24">
        <div className="mx-auto mb-12 flex max-w-[1600px] justify-between px-4 md:px-10">
          <Label>Teams and brands I&apos;ve worked with</Label>
          <Label className="text-fg-subtle">20+ companies</Label>
        </div>
        <LogoMarquee />
      </section>

      {/* Intro */}
      <section className="mx-auto grid max-w-[1600px] gap-12 px-4 py-24 md:grid-cols-12 md:gap-6 md:px-10 md:py-40">
        <div className="md:col-span-4">
          <Label>(02) About</Label>
          <RevealMedia className="mt-8 aspect-[4/5] rounded-[4px]">
            <Image src="/about/pranay.jpg" alt="Pranay Pawar sitting on a stone wall above the Aravalli hills" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-[30%_40%]" />
          </RevealMedia>
          <p className="t-label mt-4 text-fg-subtle">Udaipur, 2025</p>
        </div>
        <div className="md:col-span-7 md:col-start-6 md:pt-24">
          <ScrollWords
            className="t-h2"
            text="I started as a *graphic *designer, grew into *product and *delivery, and now lead *technology at GetHire. Along the way I founded a studio and two products of my own. I care about clear thinking, calm teams and products that ship."
          />
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8">
            {[["7+", "years in design, product and tech"], ["20+", "companies as product or project lead"], ["3", "companies founded"]].map(([v, l]) => (
              <div key={l}>
                <p className="t-h2">{v}</p>
                <p className="mt-2 text-[14px] text-fg-muted">{l}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Button href="/about" variant="secondary">More about me</Button>
          </div>
        </div>
      </section>

      <Timeline />

      {/* Index */}
      <section className="mx-auto max-w-[1600px] px-4 py-24 md:px-10 md:py-40">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <Label>(04) Index</Label>
            <RevealText text="Projects I've led" className="t-h1 mt-5" />
          </div>
          <Link href="/work" className="link-draw text-[15px]">See all →</Link>
        </div>
        <WorkList projects={projects.slice(0, 6)} />
      </section>

      {/* Services */}
      <section className="mx-auto max-w-[1600px] px-4 pb-24 md:px-10 md:pb-40">
        <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <Label>(05) Services</Label>
            <RevealText text="Four ways I can help" className="t-h1 mt-5" />
          </div>
          <p className="t-body-l max-w-[480px] text-fg-muted md:justify-self-end">
            For a project, a monthly retainer, or a few days a week as your CTO or head of product.
          </p>
        </div>
        <ServiceRows />
      </section>

      {/* Belief + ticker */}
      <section className="relative overflow-hidden py-24 md:py-40">
        <div className="absolute inset-0 flex flex-col justify-center">
          <TextTicker
            rows={[
              ["Product strategy", "UX research", "Design systems", "Brand identity", "Roadmaps"],
              ["Engineering leadership", "Prototyping", "Agile delivery", "Team building", "Print & menu"],
            ]}
          />
        </div>
        <div className="relative mx-auto max-w-[1100px] px-4 text-center md:px-10">
          <Label>How I work</Label>
          <RevealText text="Good design is clear thinking made visible. Not decoration." className="t-h1 mt-8" />
          <p className="mt-8 text-fg-muted">— Pranay Pawar</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
