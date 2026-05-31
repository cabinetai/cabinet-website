"use client";

import {
  ArrowRight,
  Briefcase,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Coffee,
  FileCheck,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import { FormEvent, useState } from "react";
import {
  Eyebrow,
  Pill,
  Section,
  SectionHeader,
} from "@/components/enterprise/primitives";

/* ──────────────────────────────────────────────────────────────
   HERO + FORM
   ────────────────────────────────────────────────────────────── */
function HeroForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const body = [
      `Name: ${form.get("name") ?? ""}`,
      `Role: ${form.get("role") ?? ""}`,
      `Company: ${form.get("company") ?? ""}`,
      `Company size: ${form.get("size") ?? ""}`,
      `Current tools: ${form.get("tools") ?? ""}`,
      `Email: ${form.get("email") ?? ""}`,
      "",
      "What we'd like to focus on:",
      `${form.get("notes") ?? ""}`,
    ].join("\n");
    const mailto = `mailto:hi@runcabinet.com?subject=Executive briefing request: ${encodeURIComponent(String(form.get("company") ?? ""))}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
  }

  return (
    <section className="relative ent-wash overflow-hidden">
      <div className="absolute inset-0 ent-dots opacity-40 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16">
          {/* Left — pitch */}
          <div className="ent-rise">
            <Pill icon={Sparkles}>Executive briefing · Q2 2026</Pill>
            <h1 className="ent-display-1 mt-6">
              Ninety minutes.<br />
              <em className="text-accent">
                Your operating model on a folder.
              </em>
            </h1>
            <p className="ent-lead mt-6 max-w-xl">
              The founders sit with you and your Chief of Staff. We map your
              strategy graph to a Cabinet room live. You leave with a forked
              template, an agent drafting your next MBR pre-read, and a 30-day
              path to enterprise-wide rollout.
            </p>

            <div className="mt-8 space-y-3">
              <Bullet icon={Video} t="Live working session" s="Not a sales pitch. We build alongside you." />
              <Bullet icon={Users} t="Founders in the room" s="Hila + an engineer on the call. No SDR layer." />
              <Bullet icon={FileCheck} t="NDA-friendly" s="Send yours over ahead of time, we'll sign." />
              <Bullet icon={Coffee} t="No slides" s="A live Cabinet room on your top three OKRs." />
            </div>
          </div>

          {/* Right — form */}
          <div className="relative">
            <div className="ent-glow" />
            <div className="relative ent-card p-7 md:p-9 shadow-xl shadow-text-primary/[0.05]">
              {submitted ? (
                <ThankYou />
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <p className="ent-eyebrow mb-2">Request a briefing</p>
                  <h2 className="ent-display-3">A few things to help us prepare.</h2>

                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <Field name="name" label="Your name" placeholder="Sarah Kim" required />
                    <Field name="role" label="Your role" placeholder="Chief of Staff" required />
                  </div>
                  <Field name="company" label="Company" placeholder="Acme Industries" required />
                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      name="size"
                      label="Company size"
                      options={["Under 500", "500–2,000", "2,000–10,000", "10,000–50,000", "50,000+"]}
                      required
                    />
                    <Field
                      name="email"
                      label="Work email"
                      type="email"
                      placeholder="you@acme.com"
                      required
                    />
                  </div>
                  <Field
                    name="tools"
                    label="Current strategy tooling (optional)"
                    placeholder="Workboard · Viva Goals · Notion · PPT + Slack"
                  />
                  <Textarea
                    name="notes"
                    label="What would you like the 90 minutes to focus on?"
                    placeholder="We're 6 months into a transformation. The MBR prep is killing us. We want to see how Cabinet would handle…"
                  />

                  <button
                    type="submit"
                    className="ent-btn-primary w-full justify-center mt-4 group"
                  >
                    Submit request
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <p className="text-[11px] text-text-tertiary text-center">
                    We respond within one business day. Briefings hosted by Hila Shmuel, founder.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bullet({
  icon: Icon,
  t,
  s,
}: {
  icon: React.ElementType;
  t: string;
  s: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-bg-card transition-colors">
      <div className="w-10 h-10 rounded-lg bg-accent-bg-subtle border border-accent-bg flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <div>
        <p className="text-[15px] font-semibold text-text-primary">{t}</p>
        <p className="text-sm text-text-secondary mt-0.5 font-body-serif">{s}</p>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold text-text-secondary">
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full h-11 px-3.5 rounded-lg border border-border bg-bg-card text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
      />
    </label>
  );
}
function Select({
  name,
  label,
  options,
  required,
}: {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold text-text-secondary">
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="mt-1.5 w-full h-11 px-3.5 rounded-lg border border-border bg-bg-card text-[14px] text-text-primary focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
function Textarea({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold text-text-secondary">{label}</span>
      <textarea
        name={name}
        rows={4}
        placeholder={placeholder}
        className="mt-1.5 w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg-card text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all resize-y"
      />
    </label>
  );
}

function ThankYou() {
  return (
    <div className="ent-fade text-center py-8">
      <div className="mx-auto w-16 h-16 rounded-full bg-green-bg-subtle border border-green-bg flex items-center justify-center mb-5">
        <CheckCircle2 className="w-7 h-7 text-green-warm" />
      </div>
      <h2 className="ent-display-3">Briefing request sent.</h2>
      <p className="ent-lead mt-3 max-w-md mx-auto">
        Your email client just opened with the request. Send it and we'll
        respond within one business day with two proposed times.
      </p>
      <p className="mt-6 text-sm text-text-tertiary">
        Or write directly to{" "}
        <a className="text-accent font-semibold underline decoration-accent/30 underline-offset-2" href="mailto:hi@runcabinet.com">
          hi@runcabinet.com
        </a>
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   AGENDA
   ────────────────────────────────────────────────────────────── */
function Agenda() {
  const steps = [
    {
      n: "0:00",
      t: "Your strategy in five minutes",
      d: "Walk us through your top three OKRs and the one initiative that scares you most. We don't bring slides; you don't need to either.",
    },
    {
      n: "0:10",
      t: "Live build · your room",
      d: "We fork the cabinet:exec-strategy-room template, point it at the OKRs you shared, and connect the Chief of Staff agent. ~20 minutes of building together.",
    },
    {
      n: "0:35",
      t: "Daily brief on your real data",
      d: "Run the morning-brief job against your room. You see the artefact you would receive Monday at 06:00: grounded, cited, ready to ship.",
    },
    {
      n: "0:50",
      t: "MBR pre-read live",
      d: "Trigger the monthly-mbr job. Watch the Strategy Analyst draft your next pre-read: bowler, scorecard, three discussion points.",
    },
    {
      n: "1:10",
      t: "Security, sovereignty, and what's next",
      d: "Your CIO or CISO joins the last 20 minutes. We walk the architecture, answer questions, and outline a 30-day rollout path.",
    },
    {
      n: "1:30",
      t: "You keep the room",
      d: "The room is yours from the moment we hang up. We don't take it back. The forked template stays in your GitHub.",
    },
  ];
  return (
    <Section>
      <SectionHeader
        eyebrow="What to expect"
        title={
          <>
            The 90-minute agenda.{" "}
            <em className="text-accent">Built, not pitched.</em>
          </>
        }
      />
      <div className="grid lg:grid-cols-2 gap-x-10 gap-y-6">
        {steps.map((s) => (
          <div key={s.n} className="flex gap-5">
            <div className="shrink-0">
              <div className="w-16 text-right">
                <p className="font-display text-2xl text-accent leading-none">{s.n}</p>
                <p className="text-[10px] text-text-tertiary uppercase tracking-widest mt-1 font-semibold">
                  h:mm
                </p>
              </div>
            </div>
            <div className="flex-1 border-l border-border pl-6">
              <h3 className="ent-display-3">{s.t}</h3>
              <p className="text-[15px] text-text-secondary mt-2 font-body-serif leading-relaxed">
                {s.d}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ──────────────────────────────────────────────────────────────
   WHO ATTENDS
   ────────────────────────────────────────────────────────────── */
function WhoAttends() {
  return (
    <Section tone="warm">
      <SectionHeader
        eyebrow="Who attends"
        title={
          <>
            Bring the people who decide.{" "}
            <em className="text-accent">We bring the people who build.</em>
          </>
        }
      />
      <div className="grid md:grid-cols-2 gap-5">
        <Attendees
          who="From your side"
          color="accent"
          items={[
            { name: "Executive sponsor", role: "CEO / Chief of Staff / Head of Strategy" },
            { name: "Day-to-day owner", role: "VP Strategy · Director of Transformation · Head of PMO" },
            { name: "Security & platform (last 20 min)", role: "CISO · CIO · Head of Platform" },
            { name: "Optional", role: "CHRO if you're scoping the Coach layer" },
          ]}
        />
        <Attendees
          who="From our side"
          color="sage"
          items={[
            { name: "Hila Shmuel", role: "Founder · ex-Apple AI & Data Infrastructure" },
            { name: "Solutions engineer", role: "Live builds your room during the call" },
            { name: "After the call", role: "Async follow-ups, security pack, intro to pilots" },
          ]}
        />
      </div>
    </Section>
  );
}

function Attendees({
  who,
  color,
  items,
}: {
  who: string;
  color: "accent" | "sage";
  items: { name: string; role: string }[];
}) {
  const tone = color === "accent" ? "bg-accent-bg-subtle border-accent-bg" : "bg-green-bg-subtle border-green-bg";
  return (
    <div className={`ent-card p-7`}>
      <p className={`ent-eyebrow ${color === "sage" ? "text-green-warm" : ""}`}>{who}</p>
      <div className="mt-4 space-y-3">
        {items.map((it) => (
          <div key={it.name} className={`flex items-start gap-3 rounded-lg border ${tone} px-4 py-3`}>
            <Users className="w-4 h-4 text-text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-[14px] font-semibold text-text-primary">{it.name}</p>
              <p className="text-[12px] text-text-secondary font-body-serif">{it.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   FOUNDER NOTE
   ────────────────────────────────────────────────────────────── */
function FounderNote() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto text-center">
        <Pill>From the founder</Pill>
        <p className="ent-display-3 italic mt-6">
          “Every demo I run starts the same way:{" "}
          <span className="not-italic text-accent">
            what's the one initiative that scares you most this quarter?
          </span>{" "}
          We build the room around it. By the end of the hour, the room is
          already drafting your next pre-read. That's the only kind of demo I
          know how to give.”
        </p>
        <div className="mt-7 inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-warm flex items-center justify-center font-display text-white text-lg">
            HS
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-text-primary">Hila Shmuel</p>
            <p className="text-xs text-text-tertiary">
              Founder, Cabinet · ex-Apple AI Infrastructure
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function BriefingPage() {
  return (
    <>
      <HeroForm />
      <Agenda />
      <WhoAttends />
      <FounderNote />
    </>
  );
}
