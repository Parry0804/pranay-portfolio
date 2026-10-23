import type { Metadata } from "next";
import { Label } from "@/components/Button";
import { Clock } from "@/components/Clock";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Reveal, RevealText } from "@/components/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contact", description: "Start a project with Pranay Pawar." };

export default function ContactPage() {
  const links = [
    ["Email", site.email, `mailto:${site.email}`],
    ["Phone", site.phone, `tel:${site.phone.replace(/\s/g, "")}`],
    ["WhatsApp", "Message me ↗", site.whatsapp],
    ...(site.linkedin ? [["LinkedIn", "Profile ↗", site.linkedin]] : []),
  ];
  return (
    <>
      <section className="mx-auto grid max-w-[1600px] gap-16 px-4 pb-24 pt-32 md:grid-cols-12 md:gap-6 md:px-10 md:pt-44">
        <div className="md:col-span-5">
          <Label>Contact</Label>
          <RevealText as="h1" text={"Let's build\nsomething good."} immediate className="t-display mt-6" />
          <Reveal delay={0.5}>
            <p className="mt-10 flex items-center gap-2 text-fg-muted">
              <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
              Open for 2 projects from November · usually replies within a day
            </p>
            <p className="t-label mt-3 text-fg-subtle"><Clock /></p>
            <ul className="mt-12 border-t border-line">
              {links.map(([k, v, href]) => (
                <li key={k} className="border-b border-line">
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-baseline justify-between gap-6 py-5">
                    <span className="t-label text-fg-subtle">{k}</span>
                    <span className="break-all text-right text-[17px] font-medium transition-[transform,color] duration-500 group-hover:-translate-x-2 group-hover:text-signal md:text-[19px]">{v}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="md:col-span-6 md:col-start-7 md:pt-10">
          <Reveal delay={0.3}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
      <Footer cta={false} />
    </>
  );
}
