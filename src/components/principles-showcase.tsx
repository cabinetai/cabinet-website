import Image from "next/image";
import {
  HardDrive,
  GitBranch,
  Boxes,
  Feather,
  ShieldCheck,
  Server,
} from "lucide-react";
import { woodSrcFor } from "./wood-icon";

type Principle = {
  icon: React.ElementType;
  name: string;
  tagline: string;
  body: string;
  takeaway: string;
};

const PRINCIPLES: Principle[] = [
  {
    icon: HardDrive,
    name: "Yours",
    tagline: "Own and export your data, anytime",
    body: "Your knowledge base is plain markdown on disk, not rows in a vendor's database. Move the folder and the whole cabinet moves with it. No export request, no proprietary format, no one between your team and its own files.",
    takeaway: "you can take everything and leave whenever you want.",
  },
  {
    icon: GitBranch,
    name: "Git everything",
    tagline: "Every change tracked and reversible",
    body: "Every save auto-commits, so your team can inspect diffs, review how knowledge evolved, and restore any page to an earlier state. The same accountability over your AI's output that you expect from production code.",
    takeaway: "nothing is ever silently lost or overwritten.",
  },
  {
    icon: Boxes,
    name: "BYOAI",
    tagline: "Use the AI you already pay for",
    body: "Cabinet connects to the model accounts your organization already holds: Claude, Codex, OpenCode, local models, and whatever ships next. Spend flows through contracts you control, not a markup layered on top.",
    takeaway: "no second subscription and no per-seat AI markup.",
  },
  {
    icon: Feather,
    name: "KISS",
    tagline: "Simple enough to audit",
    body: "Plain files and predictable behavior mean there is no black box to take on faith. The system is small enough for your engineers to reason about and verify themselves. If a capability can't be explained in a paragraph, it usually shouldn't ship.",
    takeaway: "your engineers can verify exactly what it does.",
  },
  {
    icon: ShieldCheck,
    name: "Security",
    tagline: "Human approval before anything leaves",
    body: "Every dispatched task waits in a human approval queue before it sends an email, calls an API, or touches anything external. Exposure is limited by default, so giving agents autonomy never means giving up control.",
    takeaway: "an agent never acts on the outside world unsupervised.",
  },
  {
    icon: Server,
    name: "Self-hosted",
    tagline: "Runs in infrastructure you control",
    body: "Cabinet is open source and self-hosted by default, so plans, research, and operating memory live where your existing policies already apply. The only data that leaves is the cloud-model call you explicitly invoke.",
    takeaway: "your context stays inside your own environment.",
  },
];

export function PrinciplesShowcase() {
  return (
    <div>
      <div className="mb-12 text-center">
        <p className="section-label mb-3">Principles</p>
        <h2 className="mb-4 font-display text-3xl text-text-primary md:text-4xl">What Cabinet{" "}is <span className="italic gradient-text">built on</span>
        </h2>
        <p className="mx-auto max-w-2xl font-body-serif leading-relaxed text-text-secondary">
          A few principles we think matter deeply for the future of AI + data
          tools. Every product decision gets weighed against these.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PRINCIPLES.map((p) => {
          const Icon = p.icon;
          const wsrc = woodSrcFor(p.icon);
          return (
            <div
              key={p.name}
              className="flex flex-col rounded-3xl bg-bg-card p-8 card-hover"
            >
              <div className="relative mb-5 flex h-32 items-center justify-center">
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(139,94,60,0.12), transparent 70%)",
                  }}
                />
                {wsrc ? (
                  <Image
                    src={wsrc}
                    alt=""
                    width={224}
                    height={224}
                    className="relative h-28 w-28 object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.10)]"
                  />
                ) : (
                  <Icon
                    aria-hidden
                    strokeWidth={1.5}
                    className="relative h-16 w-16 text-accent"
                  />
                )}
              </div>
              <span className="section-label">{p.tagline}</span>
              <h3 className="mb-2 mt-2 font-display text-xl text-text-primary">
                {p.name}
              </h3>
              <p className="mb-4 text-sm font-body-serif leading-relaxed text-text-secondary">
                {p.body}
              </p>
              <p className="mt-auto border-t border-border pt-4 text-sm font-body-serif italic leading-relaxed text-text-secondary">
                <span className="font-display font-semibold not-italic text-accent">
                  {p.name}
                </span>
                <span className="mx-2 text-accent">=</span>
                {p.takeaway}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
