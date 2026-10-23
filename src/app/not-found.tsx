import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-[1600px] flex-col justify-center px-4 md:px-10">
      <p className="t-label text-fg-muted">404</p>
      <h1 className="t-display mt-6">This page wandered off.</h1>
      <div className="mt-10"><Button href="/">Back home</Button></div>
    </section>
  );
}
