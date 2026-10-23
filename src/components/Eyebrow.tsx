export function Eyebrow({ no, children }: { no?: string; children: React.ReactNode }) {
  return (
    <p className="label flex items-center gap-2 text-fg-3">
      <span className="size-1.5 rounded-full bg-lavender" />
      {no && <span>{no} /</span>}
      <span>{children}</span>
    </p>
  );
}
