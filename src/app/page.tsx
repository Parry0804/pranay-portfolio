import Image from "next/image";
import Link from "next/link";
import { Button, Label } from "@/components/Button";
import { Clock } from "@/components/Clock";
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

const showcase = [...featured, "supplementro"].map((s) => projects.find((p) => p.slug === s)!);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col overflow-x-clip px-4 pb-10 pt-24 md:px-10 md:pt-28">
        <div className="flex justify-between text-fg-muted">
          <span className="t-label">Portfolio — 2019 / 2026</span>
          <span className="t-label hidden items-center gap-2 md:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-signal" />
            Available for 2 projects from Nov · <Clock />
          </span>
        </div>
        <HeroPhoto className="absolute inset-x-0 top-[8%] h-[62%] md:inset-x-auto md:right-[3%] md:top-[9%] md:aspect-[4/5] md:h-[91%]" />
        <div className="pointer-events-none relative mt-auto [&_a]:pointer-events-auto">
          <RevealText as="h1" text={"Pranay\nPawar"} immediate delay={0.2} className="t-display-xl" />
          <Reveal delay={0.55}>
            <p className="t-h3 mt-6 text-fg-muted">
              I lead{" "}
              <Typewriter
                className="text-fg"
                phrases={["technology at GetHire", "product for 20+ companies", "design at Diznovate", "teams that ship"]}
              />
            </p>
          </Reveal>
          <div className="mt-8 grid max-w-[620px] gap-8">
            <Reveal delay={0.7}>
              <p className="t-body-l max-w-[560px] text-fg-muted">
                CTO at GetHire. Founder of Diznovate and Talent Thread. Seven years of turning rough ideas into
                products people actually use.
              </p>
            </Reveal>
            <Reveal delay={0.85} className="flex flex-wrap gap-3">
              <Button href="/contact">Start a project</Button>
              <Button href="/about" variant="secondary" icon="→">
                About me
              </Button>
            </Reveal>
          </div>
          <div className="mt-14 flex items-center gap-4 text-fg-subtle">
            <span className="t-label">Scroll</span>
            <span className="relative h-px w-24 overflow-hidden bg-line">
              <span className="absolute inset-y-0 left-0 w-1/3 animate-marquee bg-fg [--marquee-duration:2.4s]" />
            </span>
          </div>
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
