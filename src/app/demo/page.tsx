import type { Metadata } from "next";
import { Check, ShieldCheck, Server, GitBranch } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { DemoForm } from "@/components/demo-form";

export const metadata: Metadata = {
  title: "Book a Cabinet demo",
  description:
    "See Cabinet on your own stack: a 30-minute walkthrough of the knowledge base, your AI team, and how it runs self-hosted on data you own. No obligation, no prep needed.",
  openGraph: {
    title: "Book a Cabinet demo",
    description:
      "A 30-minute walkthrough of Cabinet on your own stack: self-hosted, on data you own.",
    type: "website",
    url: "https://runcabinet.com/demo",
  },
};

const SEE = [
  "Your AI team in action: agents that research, draft, and ship on a schedule.",
  "The file-based knowledge base: Markdown on disk, git history, no lock-in.",
  "Bring-your-own-AI routing to the model accounts you already pay for.",
  "What a self-hosted deployment looks like inside your environment.",
];

const REASSURE = [
  { icon: Server, text: "Self-hosted. Your data stays on your infrastructure." },
  { icon: ShieldCheck, text: "Nothing you share trains a model. Ever." },
  { icon: GitBranch, text: "Open source: inspect every line before you commit." },
];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-bg">
      <SiteNavbar />

      <section className="relative overflow-hidden border-b border-border dot-grid">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 60% at 30% 0%, rgba(139, 94, 60, 0.08), transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="section-label mb-3">Book a demo</p>
            <h1 className="max-w-xl font-display text-4xl leading-[1.05] tracking-tight text-text-primary sm:text-5xl">
              See Cabinet on your own stack
            </h1>
            <p className="mt-6 max-w-lg font-body-serif text-lg leading-relaxed text-text-secondary">
              A 30-minute walkthrough tailored to your team: how Cabinet onboards an AI
              crew, runs it on data you own, and replaces the tool sprawl you live in today.
            </p>

            <div className="mt-9">
              <p className="font-code text-xs uppercase tracking-wider text-text-tertiary">
                What you&apos;ll see
              </p>
              <ul className="mt-4 space-y-3">
                {SEE.map((s) => (
                  <li key={s} className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="font-body-serif leading-relaxed text-text-secondary">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9 space-y-3 border-t border-border pt-6">
              {REASSURE.map((r) => (
                <div key={r.text} className="flex items-center gap-3">
                  <r.icon className="h-4 w-4 shrink-0 text-accent" />
                  <span className="font-code text-sm text-text-tertiary">{r.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pt-10">
            <DemoForm />
          </div>
        </div>
      </section>
    </main>
  );
}
