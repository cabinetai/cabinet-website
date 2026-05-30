"use client";

import { useState } from "react";
import {
  HardDrive,
  GitBranch,
  Boxes,
  Feather,
  ShieldCheck,
  Server,
} from "lucide-react";

type Principle = {
  icon: React.ElementType;
  name: string;
  tagline: string;
  body: string;
  iconBg: string;
  iconFg: string;
  takeaway: string;
};

const PRINCIPLES: Principle[] = [
  {
    icon: HardDrive,
    name: "Yours",
    tagline: "Own and export your data, anytime",
    body: "Your knowledge base is plain markdown on disk, not rows in a vendor's database. Run ls and you see your work; move the folder and the whole cabinet moves with it. There is no export request to file, no proprietary format to decode, and no one sitting between your team and its own files.",
    iconBg: "bg-amber-100",
    iconFg: "text-amber-600",
    takeaway: "you can take everything and leave whenever you want.",
  },
  {
    icon: GitBranch,
    name: "Git everything",
    tagline: "Every change tracked and reversible",
    body: "Every save auto-commits, so your team can inspect diffs, review how knowledge evolved, and restore any page to an earlier state. You get the same accountability over your AI's output that you already expect from production code.",
    iconBg: "bg-violet-100",
    iconFg: "text-violet-600",
    takeaway: "nothing is ever silently lost or overwritten.",
  },
  {
    icon: Boxes,
    name: "BYOAI",
    tagline: "Use the AI you already pay for",
    body: "Cabinet connects to the model accounts your organization already holds — Claude, Codex, OpenCode, local models, and whatever ships next. You bring the inference, so spend flows through contracts you control rather than a markup layered on top.",
    iconBg: "bg-blue-100",
    iconFg: "text-blue-600",
    takeaway: "no second subscription and no per-seat AI markup.",
  },
  {
    icon: Feather,
    name: "KISS",
    tagline: "Simple enough to audit",
    body: "Plain files and predictable behavior mean there is no black box to take on faith. The system is small enough for your engineers to reason about and verify themselves. If a capability can't be explained in a paragraph, it usually shouldn't ship.",
    iconBg: "bg-emerald-100",
    iconFg: "text-emerald-600",
    takeaway: "your engineers can verify exactly what it does.",
  },
  {
    icon: ShieldCheck,
    name: "Security",
    tagline: "Human approval before anything leaves",
    body: "Every dispatched task waits in a human approval queue before it sends an email, calls an API, or touches anything external. Exposure is limited by default, so giving agents autonomy never means giving up control.",
    iconBg: "bg-rose-100",
    iconFg: "text-rose-600",
    takeaway: "an agent never acts on the outside world unsupervised.",
  },
  {
    icon: Server,
    name: "Self-hosted",
    tagline: "Runs in infrastructure you control",
    body: "Cabinet is open source and self-hosted by default, so plans, research, and operating memory live where your existing policies already apply. The only data that ever leaves is the prompt and response of a cloud-model call you explicitly invoke.",
    iconBg: "bg-teal-100",
    iconFg: "text-teal-600",
    takeaway: "your context stays inside your own environment.",
  },
];

export function PrinciplesShowcase() {
  const [open, setOpen] = useState<number | null>(null);
  const [detailIdx, setDetailIdx] = useState(0);
  const detail = PRINCIPLES[detailIdx];
  const DetailIcon = detail.icon;

  const handleClick = (i: number) => {
    if (open === i) {
      setOpen(null);
    } else {
      setDetailIdx(i);
      setOpen(i);
    }
  };

  return (
    <div>
      {/* Full-width row of flush square cards — no gaps, shared hairline borders */}
      <div className="overflow-hidden rounded-2xl border-l border-t border-border bg-bg-card">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {PRINCIPLES.map((p, i) => {
            const isOpen = open === i;
            const Icon = p.icon;
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => handleClick(i)}
                aria-expanded={isOpen}
                className={`group relative flex aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden border-b border-r border-border p-5 text-center transition-colors ${
                  isOpen ? `z-10 ${p.iconBg}` : "hover:bg-bg-card-hover"
                }`}
              >
                {/* the icon itself, oversized and heavily blurred → an ambient
                    colour wash behind the label (replaces the old chip) */}
                <Icon
                  aria-hidden
                  strokeWidth={2}
                  className={`pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 ${p.iconFg} blur-sm transition-all duration-300 ${
                    isOpen
                      ? "scale-110 opacity-55"
                      : "opacity-30 group-hover:scale-105 group-hover:opacity-45"
                  }`}
                />
                <div className="relative z-10 min-w-0">
                  <h3 className="font-display text-base leading-tight text-text-primary">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-snug text-text-secondary">
                    {p.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel — revealed only on click */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open !== null ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="rounded-2xl border border-border bg-bg-card p-7">
            {/* Takeaway — the title, at the top */}
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${detail.iconBg}`}
              >
                <DetailIcon className={`h-6 w-6 ${detail.iconFg}`} strokeWidth={2.25} />
              </div>
              <p className="font-display text-lg leading-snug text-text-primary">
                <span className={`font-semibold ${detail.iconFg}`}>{detail.name}</span>
                <span className="mx-2 text-accent">=</span>
                {detail.takeaway}
              </p>
            </div>

            {/* Tagline */}
            <p className="mt-5 text-sm font-medium text-text-tertiary">
              {detail.tagline}
            </p>

            {/* Full explanation */}
            <p className="mt-2 font-body-serif leading-relaxed text-text-secondary">
              {detail.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
