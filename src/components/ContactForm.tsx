"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState } from "react";
import { sendEnquiry, type ContactState } from "@/app/contact/actions";

const services = ["Fractional CTO", "Product", "Design & brand", "Delivery", "Not sure yet"];
const budgets = ["Under ₹2L", "₹2L – 5L", "₹5L – 10L", "₹10L+"];
const timelines = ["ASAP", "1–3 months", "Later"];

function Chips({ name, options, multi }: { name: string; options: string[]; multi?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label key={o} className="cursor-pointer">
          <input type={multi ? "checkbox" : "radio"} name={name} value={o} className="peer sr-only" />
          <span className="block rounded-full border border-line-strong px-4 py-2.5 text-[14px] text-fg-muted transition-colors duration-300 hover:border-fg-muted hover:text-fg peer-checked:border-fg peer-checked:bg-fg peer-checked:text-bg peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cool">
            {o}
          </span>
        </label>
      ))}
    </div>
  );
}

function Field({ label, name, type = "text", area, required }: { label: string; name: string; type?: string; area?: boolean; required?: boolean }) {
  const cls =
    "peer w-full border-0 border-b border-line-strong bg-transparent pb-3 pt-7 text-[18px] text-fg outline-none transition-colors placeholder-transparent focus:border-fg";
  return (
    <label className="relative block">
      {area ? <textarea name={name} rows={4} required={required} placeholder=" " className={`${cls} resize-none`} /> : <input name={name} type={type} required={required} placeholder=" " className={cls} />}
      <span className="pointer-events-none absolute left-0 top-7 text-[18px] text-fg-subtle transition-all duration-300 peer-focus:top-0 peer-focus:text-[12px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[12px]">
        {label}
        {required && " *"}
      </span>
      <span className="absolute bottom-0 left-0 h-px w-0 bg-signal transition-[width] duration-500 ease-[var(--ease-expressive)] peer-focus:w-full" />
    </label>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendEnquiry, { ok: false });

  return (
    <AnimatePresence mode="wait">
      {state.ok ? (
        <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-line p-10">
          <p className="t-label text-success">Message sent</p>
          <h2 className="t-h2 mt-6">Thank you. I&apos;ll reply within one working day.</h2>
        </motion.div>
      ) : (
        <motion.form key="form" action={action} className="space-y-12" exit={{ opacity: 0 }}>
          <fieldset>
            <legend className="t-label mb-4 text-fg-subtle">01 · What do you need?</legend>
            <Chips name="service" options={services} multi />
          </fieldset>
          <fieldset>
            <legend className="t-label mb-4 text-fg-subtle">02 · Budget</legend>
            <Chips name="budget" options={budgets} />
          </fieldset>
          <fieldset>
            <legend className="t-label mb-4 text-fg-subtle">03 · Timeline</legend>
            <Chips name="timeline" options={timelines} />
          </fieldset>
          <fieldset className="space-y-8">
            <legend className="t-label mb-2 text-fg-subtle">04 · About you</legend>
            <div className="grid gap-8 sm:grid-cols-2">
              <Field label="Your name" name="name" required />
              <Field label="Email" name="email" type="email" required />
            </div>
            <Field label="Company (optional)" name="company" />
            <Field label="Tell me about the project" name="message" area required />
          </fieldset>
          {state.error && <p role="alert" className="text-[15px] text-danger">{state.error}</p>}
          <div className="flex flex-wrap items-center gap-6">
            <button
              disabled={pending}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-signal px-7 py-4 text-[15px] font-medium text-bg disabled:opacity-60"
            >
              <span aria-hidden className="absolute inset-0 origin-left scale-x-0 rounded-full bg-fg transition-transform duration-500 ease-[var(--ease-expressive)] group-hover:scale-x-100" />
              <span className="relative">{pending ? "Sending…" : "Send message"}</span>
              <span aria-hidden className="relative transition-transform duration-500 group-hover:translate-x-1.5">→</span>
            </button>
            <p className="text-[14px] text-fg-subtle">Your details stay with me. No newsletters.</p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
