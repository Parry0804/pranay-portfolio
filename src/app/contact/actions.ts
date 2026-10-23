"use server";

import { Resend } from "resend";

export type ContactState = { ok: boolean; error?: string };

export async function sendEnquiry(_: ContactState, form: FormData): Promise<ContactState> {
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
    return { ok: false, error: "Please add your name, a valid email and a few lines about the project." };
  }
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${form.get("company") || "-"}`,
    `Services: ${form.getAll("service").join(", ") || "-"}`,
    `Budget: ${form.get("budget") || "-"}`,
    `Timeline: ${form.get("timeline") || "-"}`,
    "",
    message,
  ].join("\n");

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY is not set; enquiry not sent:\n" + body);
    return { ok: false, error: "The form isn't connected yet. Please email pranay.pawar.58989@gmail.com directly." };
  }
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM ?? "Website <onboarding@resend.dev>",
    to: process.env.CONTACT_TO ?? "pranay.pawar.58989@gmail.com",
    replyTo: email,
    subject: `New enquiry from ${name}`,
    text: body,
  });
  return error ? { ok: false, error: "Something went wrong. Please email me directly." } : { ok: true };
}
