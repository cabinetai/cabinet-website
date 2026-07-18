import { ArrowUpRight, Check, FileText, LayoutDashboard, MousePointerClick } from "lucide-react";
import { MotionReveal } from "./motion-primitives";

const POINTS = [
  {
    icon: MousePointerClick,
    title: "Interactive from the first run",
    body: "Filter, drill in, and decide inside the result.",
  },
  {
    icon: FileText,
    title: "Saved beside its sources",
    body: "Plain HTML next to the data it came from. No viewer license.",
  },
  {
    icon: LayoutDashboard,
    title: "Beyond text answers",
    body: "Note apps and chat assistants stop at paragraphs. Cabinet ships the tool.",
  },
];

const BARS = [42, 58, 38, 71, 55, 84, 66, 92, 74, 61];

export function AppsWedge() {
  return (
    <section
      id="live-apps"
      className="home-snap-section scroll-mt-24 bg-bg-warm px-5 py-[clamp(4.5rem,8svh,7rem)] sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <MotionReveal variant="left">
          <p className="section-label">Live apps, not chat logs</p>
          <h2 className="mt-5 max-w-[13ch] font-section text-[clamp(2.15rem,3.5vw,3.2rem)] leading-[1.03] text-text-primary">
            Results arrive as tools, not transcripts.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            A churn review becomes an interactive board. A product audit becomes a review app.
            Cabinet renders work as live web apps inside your workspace, saved beside the docs
            they came from.
          </p>

          <div className="mt-8 space-y-5">
            {POINTS.map((point) => (
              <div key={point.title} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-bg-card text-accent shadow-sm">
                  <point.icon aria-hidden className="h-4 w-4" />
                </span>
                <span>
                  <strong className="block text-sm font-semibold text-text-primary">
                    {point.title}
                  </strong>
                  <span className="mt-1 block text-sm leading-relaxed text-text-secondary">
                    {point.body}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal
          variant="right"
          delay={0.08}
          className="home-product-surface overflow-hidden rounded-[30px] bg-bg-card p-4 sm:p-6"
        >
          <div className="flex items-center justify-between gap-4 px-1 pb-5">
            <span>
              <strong className="block text-sm text-text-primary">Churn risk review</strong>
              <span className="mt-1 block font-code text-[9px] text-text-tertiary">
                live app · rendered by the Customer Health team
              </span>
            </span>
            <span className="hidden items-center gap-2 rounded-full bg-green-bg px-3 py-1.5 text-[10px] font-semibold text-green-warm sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-green" /> Saved to Company Cabinet
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Metric label="At-risk accounts" value="6" detail="2 added this week" />
            <Metric label="Renewals this quarter" value="$1.2M" detail="$310K needs action" />
            <Metric label="Median health score" value="82" detail="Up 4 since Monday" />
          </div>

          <div className="mt-3 rounded-[20px] bg-bg-warm p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
                Weekly renewal exposure
              </p>
              <p className="font-code text-[9px] text-text-tertiary">filter: segment · owner</p>
            </div>
            <div className="mt-4 flex h-24 items-end gap-1.5 sm:h-28">
              {BARS.map((height, index) => (
                <span
                  key={index}
                  style={{ height: `${height}%` }}
                  className={`flex-1 rounded-t-md ${index >= 7 ? "bg-accent" : "bg-accent/45"}`}
                />
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between font-code text-[9px] text-text-tertiary">
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
            </div>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="flex items-center gap-2.5 rounded-2xl bg-bg-warm px-3.5 py-3">
              <Check aria-hidden className="h-3.5 w-3.5 shrink-0 text-green" />
              <span className="text-[11px] font-semibold text-text-secondary">
                Escalate Alder &amp; Co before the Q4 renewal
              </span>
            </div>
            <div className="flex items-center gap-2.5 rounded-2xl bg-bg-warm px-3.5 py-3">
              <ArrowUpRight aria-hidden className="h-3.5 w-3.5 shrink-0 text-accent" />
              <span className="text-[11px] font-semibold text-text-secondary">
                Open the account drill-down app
              </span>
            </div>
          </div>

          <p className="mt-4 px-1 font-code text-[9px] text-text-tertiary">
            company-cabinet/customers/churn-review.html · beside churn-sources/
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[20px] bg-bg-warm p-4">
      <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
        {label}
      </p>
      <p className="mt-2 font-section text-2xl text-text-primary">{value}</p>
      <p className="mt-1 text-[10px] text-text-secondary">{detail}</p>
    </div>
  );
}
