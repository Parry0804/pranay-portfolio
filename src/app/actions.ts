"use server";

import { site } from "@/content/site";

export type ContactState = { ok: boolean; message: string } | null;

const clean = (v: FormDataEntryValue | null, max = 2000) => String(v ?? "").trim().slice(0, max);

// Sends the enquiry by email through Resend when RESEND_API_KEY is set.
export async function sendEnquiry(_: ContactState, form: FormData): Promise<ContactState> {
  if (clean(form.get("website"))) return { ok: true, message: "Thanks!" }; // honeypot

  const name = clean(form.get("name"), 120);
  const email = clean(form.get("email"), 200);
  const company = clean(form.get("company"), 200);
  const service = clean(form.get("service"), 120);
  const budget = clean(form.get("budget"), 120);
  const message = clean(form.get("message"), 5000);

  if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
    return { ok: false, message: "Please add your name, a valid email and a short message." };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY is not set; enquiry not sent", { name, email });
    return { ok: false, message: `The form isn't connected yet. Please email me at ${site.email}.` };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? site.email,
      reply_to: email,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
      text: [`Name: ${name}`, `Email: ${email}`, `Company: ${company || "-"}`, `Service: ${service || "-"}`, `Budget: ${budget || "-"}`, "", message].join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return { ok: false, message: `Something went wrong. Please email me at ${site.email}.` };
  }
  return { ok: true, message: "Thanks! I'll reply within one working day." };
}
