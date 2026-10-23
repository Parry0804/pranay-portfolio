export function SpinBadge({ className = "" }: { className?: string }) {
  const text = "AVAILABLE FOR PROJECTS • 2026 •";
  return (
    <div className={`size-28 ${className || "relative"}`} aria-hidden>
      <svg viewBox="0 0 100 100" className="size-full animate-spin-slow">
        <defs>
          <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-fg-2 font-mono text-[8.4px]">
          <textPath href="#circle" textLength="236" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto size-2.5 rounded-full bg-sage" />
    </div>
  );
}
