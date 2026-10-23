import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contact", description: "Tell me about your project. I reply within one working day." };

export default function Contact() {
  const direct = [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "WhatsApp", value: site.phone, href: site.whatsapp },
    { label: "Location", value: "New Delhi · working worldwide" },
  ];
  return (
    <section className="mx-auto grid max-w-[1440px] gap-16 px-5 py-20 md:px-14 md:py-28 lg:grid-cols-[1fr_1.2fr]">
      <Reveal className="space-y-8">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="display text-5xl md:text-[80px]">
          Tell me about <span className="serif text-fg-2">your project.</span>
        </h1>
        <p className="max-w-md text-lg text-fg-2">Share a few details and I&apos;ll reply within one working day. Prefer to talk? Message me on WhatsApp.</p>
        <ul className="space-y-3 pt-4">
          {direct.map((d) => (
            <li key={d.label}>
              {d.href ? (
                <a href={d.href} target={d.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center justify-between rounded-2xl border border-line bg-card p-5 transition-all duration-500 ease-out-soft hover:translate-x-1 hover:border-line-strong">
                  <span>
                    <span className="label block text-fg-3">{d.label}</span>
                    <span className="mt-1 block text-lg">{d.value}</span>
                  </span>
                  <span className="text-fg-3 transition-transform duration-500 group-hover:-rotate-45">→</span>
                </a>
              ) : (
                <div className="rounded-2xl border border-line bg-card p-5">
                  <span className="label block text-fg-3">{d.label}</span>
                  <span className="mt-1 block text-lg">{d.value}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.1} className="rounded-[32px] border border-line bg-card p-6 md:p-10">
        <ContactForm />
      </Reveal>
    </section>
  );
}
