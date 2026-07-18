import {
  CalendarClock,
  FileSpreadsheet,
  GitBranch,
  MessagesSquare,
  PenLine,
  Search,
  SquareKanban,
  Terminal,
} from "lucide-react";
import { MotionReveal } from "./motion-primitives";

const FEATURES = [
  {
    icon: PenLine,
    title: "Markdown editor",
    body: "WYSIWYG editing that saves as plain markdown files.",
  },
  {
    icon: Search,
    title: "Full-text search",
    body: "Cmd+K finds any file, answer, or artifact in the company.",
  },
  {
    icon: GitBranch,
    title: "Git-backed history",
    body: "Every change is committed. Diff and restore any version.",
  },
  {
    icon: CalendarClock,
    title: "Scheduled jobs",
    body: "Cron-scheduled AI work runs nights, weekends, and holidays.",
  },
  {
    icon: SquareKanban,
    title: "Task board",
    body: "Work moves from running to your review to complete, in the open.",
  },
  {
    icon: MessagesSquare,
    title: "Internal chat",
    body: "Channels for people and AI teams, beside the work itself.",
  },
  {
    icon: Terminal,
    title: "Web terminal",
    body: "A real terminal in the browser, where the files and agents live.",
  },
  {
    icon: FileSpreadsheet,
    title: "Every file type",
    body: "PDF, CSV, and Office files render as first-class content.",
  },
];

export function WorkspaceFeatures() {
  return (
    <section
      id="workspace"
      className="home-snap-section scroll-mt-24 px-5 py-[clamp(4.5rem,8svh,7rem)] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <MotionReveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="section-label">The workspace</p>
            <h2 className="mt-3 font-section text-[clamp(2.15rem,3.5vw,3.2rem)] leading-[1.03] text-text-primary">
              A real workspace, not a chat window.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-text-secondary">
              Chat sessions end and the work disappears. Cabinet gives people and AI teams the
              same durable tools, so the work has a permanent home.
            </p>
          </div>
        </MotionReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <MotionReveal key={feature.title} variant="pop" delay={Math.min(index * 0.06, 0.3)}>
              <article className="card-skin h-full rounded-[20px] p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-bg text-accent">
                  <feature.icon aria-hidden className="h-4 w-4" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-text-primary">{feature.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
                  {feature.body}
                </p>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
