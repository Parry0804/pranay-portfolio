import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[1440px] flex-col items-start gap-8 px-5 py-32 md:px-14">
      <p className="label text-fg-3">404</p>
      <h1 className="display text-6xl md:text-8xl">This page <span className="serif text-fg-2">doesn&apos;t exist.</span></h1>
      <Button href="/">Back home</Button>
    </section>
  );
}
