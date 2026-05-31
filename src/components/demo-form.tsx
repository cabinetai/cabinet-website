"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const TEAM_SIZES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"];
const ROLES = [
  "Founder / CEO",
  "Sales",
  "Marketing",
  "Engineering",
  "Product",
  "Operations",
  "IT / Security",
  "Other",
];

/**
 * Demo request form. With no backend wired yet, submitting composes a
 * structured email to hi@runcabinet.com — functional today and trivial to
 * swap for Calendly/HubSpot/a real endpoint later (replace handleSubmit).
 */
export function DemoForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const subject = `Cabinet demo request: ${get("company") || get("name")}`;
    const body = [
      `Name: ${get("name")}`,
      `Work email: ${get("email")}`,
      `Company: ${get("company")}`,
      `Team size: ${get("teamSize")}`,
      `Role: ${get("role")}`,
      "",
      "What we'd like to see:",
      get("goals"),
    ].join("\n");
    window.location.href = `mailto:hi@runcabinet.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-bg text-accent">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="font-display text-xl text-text-primary">Your email is ready to send</h3>
        <p className="mt-2 font-body-serif text-sm leading-relaxed text-text-secondary">
          We just opened a pre-filled message in your mail app. Send it and we&apos;ll be in
          touch within one business day. Prefer email directly?{" "}
          <a
            href="mailto:hi@runcabinet.com"
            className="text-accent underline underline-offset-2 hover:text-accent-warm"
          >
            hi@runcabinet.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-bg-card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Work email" name="email" type="email" required />
        <Field label="Company" name="company" required />
        <div>
          <label className="mb-1.5 block font-code text-xs uppercase tracking-wider text-text-tertiary">
            Team size
          </label>
          <select name="teamSize" className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text-primary outline-none focus:border-accent">
            {TEAM_SIZES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block font-code text-xs uppercase tracking-wider text-text-tertiary">
            Your role
          </label>
          <select name="role" className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text-primary outline-none focus:border-accent">
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block font-code text-xs uppercase tracking-wider text-text-tertiary">
            What would you like to see?
          </label>
          <textarea
            name="goals"
            rows={3}
            placeholder="The workflows or team you'd want Cabinet running for you…"
            className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-accent-warm hover:shadow-lg"
      >
        Request a demo <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-3 text-center font-code text-xs text-text-tertiary">
        No obligation, no prep needed.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-code text-xs uppercase tracking-wider text-text-tertiary">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent"
      />
    </div>
  );
}
