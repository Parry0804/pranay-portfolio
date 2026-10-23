import type { Metadata } from "next";
import { Label } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Reveal, RevealText } from "@/components/Reveal";
import { WorkIndex } from "@/components/WorkIndex";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Work", description: "Brand, product and delivery projects led by Pranay Pawar." };

export default function WorkPage() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-4 pb-24 pt-32 md:px-10 md:pt-44">
        <div className="grid gap-10 md:grid-cols-[1fr_440px] md:items-end">
          <div>
            <Label>Index — {projects.length} projects</Label>
            <RevealText as="h1" text="Work" immediate className="t-display-xl mt-6" />
          </div>
          <Reveal delay={0.4}>
            <p className="t-body-l text-fg-muted">
              Brand, product and delivery work for startups, studios and a Fortune 1 retailer. Most of it as the person accountable for shipping.
            </p>
          </Reveal>
        </div>
        <div className="mt-20">
          <WorkIndex projects={projects} />
        </div>
      </section>
      <Footer />
    </>
  );
}
