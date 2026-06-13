"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
    body: "Cabinet connects to the model accounts your organization already holds: Claude, Codex, OpenCode, local models, and whatever ships next. You bring the inference, so spend flows through contracts you control rather than a markup layered on top.",
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
    iconBg: "bg-slate-100",
    iconFg: "text-slate-600",
    takeaway: "your context stays inside your own environment.",
  },
];

// Translucent colour wash for the active glass card. Mirrors PRINCIPLES order.
const ACTIVE_TINT = [
  "bg-amber-200/25",
  "bg-violet-200/25",
  "bg-blue-200/25",
  "bg-emerald-200/25",
  "bg-rose-200/25",
  "bg-slate-200/25",
];

export function PrinciplesShowcase() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const prefersReduced = useReducedMotion();

  // Scrollspy: highlight the sidebar card whose elaboration sits in the
  // vertical center band of the viewport.
  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) =>
          a.intersectionRatio >= b.intersectionRatio ? a : b,
        );
        const idx = Number((top.target as HTMLElement).dataset.index);
        if (!Number.isNaN(idx)) setActive(idx);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (i: number) => {
    refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* ── Left: title + sidebar of all principle cards (sticky) ── */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-24">
          <p className="section-label mb-3">Principles</p>
          <h2 className="mb-4 font-display text-3xl text-text-primary md:text-4xl">
            What Cabinet is{" "}
            <span className="italic gradient-text">built on</span>
          </h2>
          <p className="font-body-serif leading-relaxed text-text-secondary">
            A few principles we think matter deeply for the future of AI + data
            tools. Every product decision gets weighed against these.
          </p>

          <nav className="relative mt-8 flex flex-col gap-2.5">
            {/* ambient colour blobs the glass cards refract */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10"
            >
              <div className="absolute left-2 top-0 h-36 w-36 rounded-full bg-amber-300/45 blur-3xl" />
              <div className="absolute right-0 top-1/3 h-44 w-44 rounded-full bg-violet-300/45 blur-3xl" />
              <div className="absolute bottom-2 left-1/4 h-40 w-40 rounded-full bg-teal-300/45 blur-3xl" />
            </div>

            {PRINCIPLES.map((p, i) => {
              const on = active === i;
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={on ? "true" : undefined}
                  className={`group relative overflow-hidden rounded-2xl border border-white/40 px-4 py-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_24px_-12px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 ${
                    on
                      ? `${ACTIVE_TINT[i]} scale-[1.03] ring-1 ring-white/60`
                      : "bg-white/10 hover:bg-white/25"
                  }`}
                >
                  {/* top-edge glass sheen */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent"
                  />
                  <span
                    className={`relative font-display text-xl leading-tight ${p.iconFg} transition-all duration-300 ${
                      on ? "" : "opacity-60"
                    }`}
                  >
                    {p.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── Right: deep-dive elaboration, one screen per principle ── */}
      <div className="lg:col-span-7">
        {PRINCIPLES.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.article
              key={p.name}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-index={i}
              initial={prefersReduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.4, margin: "-10% 0px -10% 0px" }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 280, damping: 26, mass: 0.8 }
              }
              className="flex min-h-[58vh] flex-col justify-center py-8"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/40 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_24px_60px_-28px_rgba(0,0,0,0.30)] backdrop-blur-xl sm:p-10">
                {/* oversized blurred icon — ambient watermark, bottom-right */}
                <Icon
                  aria-hidden
                  strokeWidth={1.5}
                  className={`pointer-events-none absolute -bottom-10 -right-8 h-56 w-56 ${p.iconFg} opacity-[0.14] blur-sm`}
                />
                <div className="relative">
                  <h3 className="font-display text-2xl">
                    <span className={p.iconFg}>{p.name}</span>
                  </h3>
                  <p className="mt-1 text-sm font-medium text-text-tertiary">
                    {p.tagline}
                  </p>
                  <p className="mt-4 max-w-xl font-body-serif text-lg leading-relaxed text-text-secondary">
                    {p.body}
                  </p>
                  <p className="mt-6 font-display text-base text-text-primary">
                    <span className={`font-semibold ${p.iconFg}`}>{p.name}</span>
                    <span className="mx-2 text-accent">=</span>
                    {p.takeaway}
                  </p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
