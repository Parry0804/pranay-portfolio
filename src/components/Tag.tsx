export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-line bg-card px-3 py-1 text-[13px] text-fg-2 transition-colors duration-300 group-hover:border-line-strong group-hover:text-fg">
      {children}
    </span>
  );
}
