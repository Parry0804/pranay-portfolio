import Link from "next/link";
import { nav, site } from "@/content/site";
import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const linkCls = "text-fg-2 transition-colors duration-200 hover:text-fg";

export function Footer() {
  const connect = [
    site.linkedin && { label: "LinkedIn", href: site.linkedin },
    { label: "Email", href: `mailto:${site.email}` },
    { label: "WhatsApp", href: site.whatsapp },
    { label: "Book a call", href: "/contact" },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-14 md:py-28">
        <Reveal className="flex flex-col gap-10 border-b border-line pb-16 md:flex-row md:items-end md:justify-between">
          <div className="space-y-6">
            <Eyebrow>Got a project in mind?</Eyebrow>
            <h2 className="display text-5xl md:text-7xl">
              Let&apos;s build something
              <br />
              <span className="serif text-fg-2">remarkable.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <Button href="/contact">Start a project</Button>
            <a href={`mailto:${site.email}`} className={`${linkCls} text-lg`}>
              {site.email}
            </a>
            <a href={site.whatsapp} target="_blank" rel="noreferrer" className={linkCls}>
              {site.phone} · WhatsApp
            </a>
          </div>
        </Reveal>

        <div className="grid gap-10 pt-14 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="max-w-sm space-y-3">
            <p className="font-medium">{site.name}</p>
            <p className="text-fg-2">
              CTO at GetHire. Founder of Diznovate, Talent Thread and Databytely. Based in New Delhi, working worldwide.
            </p>
          </div>
          <FooterCol title="Pages" links={nav} />
          <FooterCol
            title="Ventures"
            links={["GetHire", "Diznovate", "Talent Thread", "Databytely"].map((v) => ({ label: v, href: "/experience" }))}
          />
          <FooterCol title="Connect" links={connect} />
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 text-sm text-fg-3 md:flex-row">
          <p>© 2026 Pranay Pawar</p>
          <p>Designed with care in New Delhi</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="space-y-4">
      <p className="label text-fg-3">{title}</p>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            {l.href.startsWith("/") ? (
              <Link href={l.href} className={linkCls}>{l.label}</Link>
            ) : (
              <a href={l.href} className={linkCls} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                {l.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
