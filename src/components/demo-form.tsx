"use client";

import { useRef, useState } from "react";
import { ArrowRight, Check, Mail, ShieldCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const TEAM_SIZES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"];
const ROLES = [
  "Founder / CEO",
  "AI leadership",
  "Operations",
  "Product",
  "Engineering",
  "IT / Security",
  "Other",
];

type FieldName = "name" | "email" | "company" | "workflow";
type FormErrors = Partial<Record<FieldName, string>>;

export function DemoForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const started = useRef(false);

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackEvent("demo_form_start", { source: "demo_page" });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const get = (key: string) => String(form.get(key) ?? "").trim();
    const nextErrors: FormErrors = {};

    if (get("name").length < 2) nextErrors.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(get("email"))) nextErrors.email = "Enter a valid work email.";
    if (get("company").length < 2) nextErrors.company = "Enter your company name.";
    if (get("workflow").length < 12) {
      nextErrors.workflow = "Describe one recurring workflow in at least 12 characters.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      trackEvent("demo_form_validation_error", {
        source: "demo_page",
        errorCount: Object.keys(nextErrors).length,
      });
      return;
    }

    setErrors({});
    const subject = `Cabinet workflow briefing: ${get("company")}`;
    const body = [
      `Name: ${get("name")}`,
      `Work email: ${get("email")}`,
      `Company: ${get("company")}`,
      `Team size: ${get("teamSize")}`,
      `Role: ${get("role")}`,
      "",
      "Workflow to review:",
      get("workflow"),
    ].join("\n");

    trackEvent("demo_form_submit", {
      source: "demo_page",
      role: get("role"),
      teamSize: get("teamSize"),
    });
    window.location.href = `mailto:hi@runcabinet.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="home-product-surface rounded-[30px] bg-bg-card p-7 text-center ring-1 ring-border-light sm:p-10">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-bg text-green">
          <Check aria-hidden className="h-6 w-6" />
        </div>
        <p className="section-label mt-7">Request prepared</p>
        <h2 className="mt-3 font-display text-3xl tracking-[-0.04em] text-text-primary sm:text-4xl">
          Your email is ready to send.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-text-secondary">
          We opened a pre-filled request in your mail app. Send it and we will reply within one business day.
        </p>
        <a
          href="mailto:hi@runcabinet.com"
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-warm"
        >
          <Mail aria-hidden className="h-4 w-4" /> hi@runcabinet.com
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={markStarted}
      noValidate
      className="home-product-surface rounded-[30px] bg-bg-card p-6 ring-1 ring-border-light sm:p-8 lg:p-10"
    >
      <div className="flex items-start justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="section-label">Tell us what should run better</p>
          <h2 className="mt-3 font-display text-3xl tracking-[-0.04em] text-text-primary sm:text-4xl">
            Request your briefing
          </h2>
        </div>
        <span className="hidden h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-bg text-accent sm:grid">
          <ShieldCheck aria-hidden className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" error={errors.name} required />
        <Field
          label="Work email"
          name="email"
          type="email"
          autoComplete="email"
          error={errors.email}
          required
        />
        <Field
          label="Company"
          name="company"
          autoComplete="organization"
          error={errors.company}
          required
        />
        <SelectField label="Team size" name="teamSize" options={TEAM_SIZES} />
        <div className="sm:col-span-2">
          <SelectField label="Your role" name="role" options={ROLES} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="workflow" className="mb-2 block text-xs font-semibold text-text-secondary">
            One workflow you want to improve <span aria-hidden className="text-accent">*</span>
          </label>
          <textarea
            id="workflow"
            name="workflow"
            rows={4}
            aria-invalid={Boolean(errors.workflow)}
            aria-describedby={errors.workflow ? "workflow-error" : "workflow-help"}
            placeholder="For example: prepare our Monday operating review from project updates, forecasts, and open decisions."
            className="w-full resize-none rounded-xl border border-border bg-bg px-4 py-3 text-sm leading-relaxed text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent-bg"
          />
          {errors.workflow ? (
            <p id="workflow-error" role="alert" className="mt-2 text-xs font-medium text-accent-warm">
              {errors.workflow}
            </p>
          ) : (
            <p id="workflow-help" className="mt-2 text-[11px] leading-relaxed text-text-tertiary">
              A sentence is enough. We use it only to prepare the conversation.
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="btn-wood mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full px-7 text-base font-semibold"
      >
        Prepare demo request <ArrowRight aria-hidden className="h-4 w-4" />
      </button>
      <p className="mt-4 text-center text-xs leading-relaxed text-text-tertiary">
        Opens a pre-filled email. No account or calendar access required.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  error,
  required = false,
}: {
  label: string;
  name: FieldName;
  type?: string;
  autoComplete?: string;
  error?: string;
  required?: boolean;
}) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-semibold text-text-secondary">
        {label} {required && <span aria-hidden className="text-accent">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="h-12 w-full rounded-xl border border-border bg-bg px-4 text-sm text-text-primary outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent-bg"
      />
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-xs font-medium text-accent-warm">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-semibold text-text-secondary">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="h-12 w-full rounded-xl border border-border bg-bg px-4 text-sm text-text-primary outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent-bg"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
