import {
  ArrowDown,
  ArrowRight,
  Bot,
  CalendarClock,
  Check,
  FileText,
  FolderOpen,
  LayoutDashboard,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";
import { MotionReveal } from "./motion-primitives";

export function DurableWork() {
  return (
    <section
      id="durable-work"
      className="home-snap-section home-viewport-section scroll-mt-24 px-5 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <MotionReveal variant="left">
          <p className="section-label">How Cabinet works</p>
          <h2 className="mt-5 max-w-[12ch] font-section text-[clamp(2.35rem,4vw,3.75rem)] leading-[1.02] text-text-primary">
            The work stays useful after the chat ends.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Cabinet turns a request or schedule into owned work. The team uses company context,
            stops for decisions, and saves the result beside its sources.
          </p>

          <div className="mt-8 flex items-start gap-3 text-sm leading-relaxed text-text-secondary">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green-bg text-green">
              <Check aria-hidden className="h-3.5 w-3.5" />
            </span>
            <span>The next person and the next run start with the same context.</span>
          </div>
        </MotionReveal>

        <MotionReveal
          variant="right"
          delay={0.08}
          className="home-product-surface overflow-hidden rounded-[30px] bg-bg-card p-4 sm:p-6"
        >
          <div className="flex items-center justify-between gap-4 px-1 pb-5">
            <span>
              <strong className="block text-sm text-text-primary">One workflow, visible end to end</strong>
              <span className="mt-1 block font-code text-[9px] text-text-tertiary">
                request · team · company result
              </span>
            </span>
            <span className="hidden items-center gap-2 rounded-full bg-green-bg px-3 py-1.5 text-[10px] font-semibold text-green-warm sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-green" /> Saved to Company Cabinet
            </span>
          </div>

          <div className="grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-2">
            <WorkflowStage
              icon={MessageSquareText}
              eyebrow="Request"
              title="Prepare Monday's operating review"
            >
              <div className="mt-4 flex flex-wrap gap-2">
                <Signal icon={MessageSquareText} label="On demand" />
                <Signal icon={CalendarClock} label="Every Monday" />
              </div>
            </WorkflowStage>

            <WorkflowArrow />

            <WorkflowStage icon={Bot} eyebrow="AI team" title="Chief of Staff + analyst">
              <div className="mt-4 space-y-2">
                <Signal icon={FolderOpen} label="Company context" wide />
                <Signal icon={ShieldCheck} label="Approval before publish" wide />
              </div>
            </WorkflowStage>

            <WorkflowArrow />

            <WorkflowStage icon={FolderOpen} eyebrow="Company Cabinet" title="Owned work, ready to use">
              <div className="mt-4 space-y-2 font-code text-[9px] text-text-secondary">
                <Artifact icon={FileText} name="operating-review.md" />
                <Artifact icon={LayoutDashboard} name="dashboard.html" />
                <Artifact icon={FolderOpen} name="decisions/" />
              </div>
            </WorkflowStage>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

function WorkflowStage({
  icon: Icon,
  eyebrow,
  title,
  children,
}: {
  icon: typeof Bot;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="min-w-0 rounded-[20px] bg-bg-warm p-4 sm:p-5">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-bg-card text-accent shadow-sm">
        <Icon aria-hidden className="h-4 w-4" />
      </span>
      <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.11em] text-text-tertiary">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-sm font-semibold leading-snug text-text-primary">{title}</h3>
      {children}
    </article>
  );
}

function WorkflowArrow() {
  return (
    <span className="grid place-items-center text-accent" aria-hidden>
      <ArrowDown className="h-4 w-4 lg:hidden" />
      <ArrowRight className="hidden h-4 w-4 lg:block" />
    </span>
  );
}

function Signal({
  icon: Icon,
  label,
  wide = false,
}: {
  icon: typeof Bot;
  label: string;
  wide?: boolean;
}) {
  return (
    <span
      className={`items-center gap-1.5 rounded-lg bg-bg-card px-2.5 py-2 text-[9px] font-semibold text-text-secondary shadow-sm ${
        wide ? "flex w-full" : "inline-flex"
      }`}
    >
      <Icon aria-hidden className="h-3 w-3 shrink-0 text-accent" />
      {label}
    </span>
  );
}

function Artifact({ icon: Icon, name }: { icon: typeof FileText; name: string }) {
  return (
    <span className="flex items-center gap-2 rounded-lg bg-bg-card px-2.5 py-2 shadow-sm">
      <Icon aria-hidden className="h-3 w-3 shrink-0 text-green-warm" />
      <span className="truncate">{name}</span>
    </span>
  );
}
