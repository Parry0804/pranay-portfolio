const words = ["Product strategy", "UX & UI design", "Fractional CTO", "Brand identity", "Design systems", "Delivery management", "Engineering leadership"];

export function TextMarquee() {
  return (
    <div className="marquee overflow-hidden border-b border-line py-6" aria-hidden>
      <div className="flex w-max animate-marquee items-center gap-10 [--marquee-duration:60s]">
        {[...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-10 text-2xl tracking-tight text-fg-3 md:text-3xl">
            {i % 2 ? <span className="serif text-fg-2">{w}</span> : w}
            <span className="size-1.5 rounded-full bg-line-strong" />
          </span>
        ))}
      </div>
    </div>
  );
}
