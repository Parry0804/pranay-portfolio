import Link from "next/link";
import { Tag } from "./Tag";

export function ServiceRow({ no, name, tags }: { no: string; name: string; tags: string[] }) {
  return (
    <Link
      href="/services"
      className="group grid grid-cols-[48px_1fr_auto] items-center gap-6 border-t border-line py-8 transition-all duration-500 ease-out-soft hover:rounded-3xl hover:border-transparent hover:bg-card hover:px-8 md:grid-cols-[80px_1fr_auto_auto]"
    >
      <span className="font-mono text-sm text-fg-3 transition-colors group-hover:text-fg-2">{no}</span>
      <span className="text-2xl font-medium tracking-tight md:text-4xl">{name}</span>
      <span className="hidden gap-2 md:flex">
        {tags.map((t) => <Tag key={t}>{t}</Tag>)}
      </span>
      <span className="grid size-12 place-items-center rounded-full border border-line bg-card transition-all duration-500 ease-out-soft group-hover:-rotate-45 group-hover:border-transparent group-hover:bg-ink group-hover:text-ink-fg">
        →
      </span>
    </Link>
  );
}
