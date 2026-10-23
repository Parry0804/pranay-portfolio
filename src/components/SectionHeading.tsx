import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function SectionHeading({
  no,
  eyebrow,
  title,
  action,
}: {
  no?: string;
  eyebrow: string;
  title: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <Reveal className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl space-y-5">
        <Eyebrow no={no}>{eyebrow}</Eyebrow>
        <h2 className="heading text-4xl md:text-5xl">{title}</h2>
      </div>
      {action}
    </Reveal>
  );
}
