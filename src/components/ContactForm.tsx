"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useActionState } from "react";
import { sendEnquiry, type ContactState } from "@/app/actions";
import { services } from "@/content/services";

const field =
  "w-full rounded-2xl border border-line bg-paper-2 px-5 py-4 text-fg placeholder:text-fg-3 outline-none transition-colors duration-300 hover:border-line-strong focus:border-fg-3";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendEnquiry, null);

  return (
    <form action={action} className="space-y-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="label text-fg-3">Name</span>
          <input name="name" required className={field} placeholder="Your name" />
        </label>
        <label className="space-y-2">
          <span className="label text-fg-3">Email</span>
          <input name="email" type="email" required className={field} placeholder="you@company.com" />
        </label>
        <label className="space-y-2">
          <span className="label text-fg-3">Company</span>
          <input name="company" className={field} placeholder="Optional" />
        </label>
        <label className="space-y-2">
          <span className="label text-fg-3">I need help with</span>
          <select name="service" className={field} defaultValue="">
            <option value="" disabled>Choose a service</option>
            {services.map((s) => <option key={s.no}>{s.name}</option>)}
            <option>Something else</option>
          </select>
        </label>
      </div>
      <label className="block space-y-2">
        <span className="label text-fg-3">Budget</span>
        <select name="budget" className={field} defaultValue="">
          <option value="" disabled>Choose a range</option>
          <option>Under ₹2 lakh</option>
          <option>₹2–5 lakh</option>
          <option>₹5–15 lakh</option>
          <option>₹15 lakh+</option>
          <option>Not sure yet</option>
        </select>
      </label>
      <label className="block space-y-2">
        <span className="label text-fg-3">Project details</span>
        <textarea name="message" required rows={6} className={field} placeholder="What are you building, and when do you want to launch?" />
      </label>
      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center gap-3 rounded-full bg-ink py-3 pl-6 pr-3 text-[15px] font-medium text-ink-fg transition-all duration-300 hover:bg-ink/85 hover:pl-7 hover:pr-2 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send enquiry"}
          <span className="grid size-8 place-items-center rounded-full bg-ink-fg text-ink transition-transform duration-300 group-hover:-rotate-45">→</span>
        </button>
        <AnimatePresence>
          {state && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className={state.ok ? "text-sage" : "text-clay"}
            >
              {state.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
