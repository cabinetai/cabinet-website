import type { Metadata } from "next";
import {
  ArrowRight,
  Bot,
  Check,
  GitBranch,
  MessageSquareText,
  Server,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { DemoForm } from "@/components/demo-form";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: "Book an executive Cabinet demo",
  description:
    "Bring one recurring company workflow. In 30 minutes, see how Cabinet connects your knowledge, AI agents, approvals, and work in an environment you control.",
  openGraph: {
    title: "Book an executive Cabinet demo",
    description:
      "A focused 30-minute Cabinet briefing built around one real company workflow.",
    type: "website",
    url: "https://runcabinet.com/demo",
  },
};

const AGENDA = [
  {
    icon: MessageSquareText,
    title: "Start with your workflow",
    body: "We map the people, company context, systems, approvals, and final artifact involved today.",
  },
  {
    icon: Bot,
    title: "Run it through Cabinet",
    body: "See how agents receive the right context, complete visible work, and return results to your knowledge base.",
  },
  {
    icon: Workflow,
    title: "Leave with an evaluation path",
    body: "We outline a first use case, deployment shape, technical review, and the proof your team should require.",
  },
];

const CONTROL_POINTS = [
  { icon: Server, text: "Self-hosted deployment options" },
  { icon: ShieldCheck, text: "Human approvals for sensitive actions" },
  { icon: GitBranch, text: "Open source architecture and change history" },
];

export default function DemoPage() {
  return (
    <main className="min-h-screen overflow-clip bg-bg text-text-primary">
      <SiteNavbar fixed />

      <section className="relative isolate overflow-hidden px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8 lg:pb-30 lg:pt-36">
        <div aria-hidden className="home-hero-wash pointer-events-none absolute inset-0 -z-20" />
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-45 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]"
        />

        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <div className="max-w-2xl lg:sticky lg:top-32">
            <p className="section-label">Executive workflow briefing</p>
            <h1 className="mt-5 max-w-[12ch] font-display text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.98] tracking-[-0.055em] text-text-primary">
              See Cabinet around work your company actually runs.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl">
              Bring one recurring workflow. We will show how <span className="font-brand italic">Cabinet</span> connects the knowledge, agents, approvals, and people needed to complete it.
            </p>

            <div className="mt-9 space-y-4 border-t border-border pt-7">
              {CONTROL_POINTS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-bg text-accent">
                      <Icon aria-hidden className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold text-text-secondary">{item.text}</span>
                  </div>
                );
              })}
            </div>

            <a
              href="#briefing-agenda"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-warm"
            >
              See the 30-minute agenda <ArrowRight aria-hidden className="h-4 w-4" />
            </a>
          </div>

          <DemoForm />
        </div>
      </section>

      <section
        id="briefing-agenda"
        className="scroll-mt-24 border-y border-border bg-bg-card px-5 py-20 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label">The 30-minute agenda</p>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,5vw,4.4rem)] leading-[1] tracking-[-0.05em] text-text-primary">
              A working session, not a feature tour.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              The most useful demo starts with a real operating constraint and ends with a clear way to test Cabinet.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {AGENDA.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="home-role-card rounded-[26px] bg-bg-warm p-7 ring-1 ring-border-light sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-bg-card text-accent shadow-sm">
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>
                    <span className="font-code text-[11px] text-text-tertiary">0{index + 1}</span>
                  </div>
                  <h3 className="mt-7 font-display text-3xl leading-[1.04] tracking-[-0.04em] text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">{item.body}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl bg-green-bg px-6 py-5 text-center sm:flex-row sm:text-left">
            <span className="flex items-start gap-3">
              <Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-green" />
              <span>
                <strong className="block text-sm text-text-primary">Useful even if Cabinet is not the fit</strong>
                <span className="mt-1 block text-xs leading-relaxed text-text-secondary">
                  You will leave with sharper requirements for company context, agent control, and workflow ownership.
                </span>
              </span>
            </span>
            <a href="mailto:hi@runcabinet.com" className="shrink-0 text-sm font-semibold text-green-warm hover:text-green">
              hi@runcabinet.com
            </a>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}
