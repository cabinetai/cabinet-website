"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Database, ListChecks, Users } from "lucide-react";
import { useState } from "react";
import { MotionReveal } from "./motion-primitives";

type DrawerId = "data" | "team" | "tasks";

const DRAWERS: Array<{
  id: DrawerId;
  icon: typeof Database;
  label: string;
  tagline: string;
  tag: string;
  title: string;
  body: string;
  receipts: string[];
}> = [
  {
    id: "data",
    icon: Database,
    label: "Data",
    tagline: "Your knowledge, in one place",
    tag: "Files on disk",
    title: "Connect your knowledge",
    body: "Your whole knowledge base in one place. Drive, SharePoint, Notion, and Slack sit next to your own files on disk, and everything stays yours.",
    receipts: ["One company directory", "Sources keep their structure", "company-cabinet/"],
  },
  {
    id: "team",
    icon: Users,
    label: "AI team",
    tagline: "The specialists inside",
    tag: "No AI tax",
    title: "Bring your own AI",
    body: "Plug in the model accounts you already pay for: Claude, GPT, Gemini, Grok, local models. No markup, no new vendor.",
    receipts: ["Claude", "GPT", "Gemini", "Grok", "Local models"],
  },
  {
    id: "tasks",
    icon: ListChecks,
    label: "Tasks",
    tagline: "The work, getting done",
    tag: "Always on",
    title: "Agents that do the work",
    body: "Not just search and chat. A team of agents researches, drafts, and ships on a schedule, 24/7.",
    receipts: ["On demand", "On a schedule", "With your approval"],
  },
];

export function WhatIsCabinet() {
  const [activeId, setActiveId] = useState<DrawerId>("data");
  const reduceMotion = useReducedMotion();
  const active = DRAWERS.find((drawer) => drawer.id === activeId) ?? DRAWERS[0];

  return (
    <section
      id="what-is-cabinet"
      className="home-snap-section scroll-mt-24 px-5 py-[clamp(4.5rem,8svh,7rem)] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <MotionReveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="section-label">What is a Cabinet</p>
            <h2 className="mt-3 font-section text-[clamp(2.15rem,3.5vw,3.2rem)] leading-[1.03] text-text-primary">
              One cabinet, three drawers.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-text-secondary">
              Your knowledge, your AI team, and the work itself. Everything has its place, and
              you own the whole cabinet.
            </p>
          </div>
        </MotionReveal>

        <MotionReveal variant="pop" delay={0.1}>
          <div className="home-product-surface mx-auto mt-12 max-w-5xl rounded-[32px] bg-[linear-gradient(155deg,var(--stage-brass),var(--stage-brass-strong))] p-4 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4" role="tablist" aria-label="Cabinet drawers">
              {DRAWERS.map((drawer) => {
                const selected = drawer.id === activeId;
                return (
                  <button
                    key={drawer.id}
                    id={`drawer-tab-${drawer.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="drawer-panel"
                    onClick={() => setActiveId(drawer.id)}
                    className={`group rounded-[22px] bg-[linear-gradient(180deg,var(--accent-bg),var(--stage-brass))] p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_14px_26px_-18px_rgba(59,47,47,0.55)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                      selected
                        ? "-translate-y-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_22px_34px_-18px_rgba(59,47,47,0.6)]"
                        : "hover:-translate-y-0.5"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent-warm">
                        {drawer.label}
                      </span>
                      <drawer.icon aria-hidden className="h-4 w-4 text-accent-warm" />
                    </span>
                    <span className="mx-auto mt-5 block h-2 w-16 rounded-full bg-[linear-gradient(180deg,var(--stage-brass-strong),var(--accent-light))] shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]" />
                    <span className="mt-5 block text-sm font-semibold text-text-primary">
                      {drawer.tagline}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                id="drawer-panel"
                role="tabpanel"
                aria-labelledby={`drawer-tab-${active.id}`}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 rounded-[24px] bg-bg-card p-6 sm:mt-4 sm:p-8"
              >
                <div className="grid items-center gap-6 sm:grid-cols-[1.2fr_0.8fr] sm:gap-10">
                  <div>
                    <span className="inline-flex items-center rounded-full bg-accent-bg px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-accent-warm">
                      {active.tag}
                    </span>
                    <h3 className="mt-4 font-section text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.05] text-text-primary">
                      {active.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
                      {active.body}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    {active.receipts.map((receipt) => (
                      <span
                        key={receipt}
                        className="inline-flex items-center gap-1.5 rounded-full bg-bg-warm px-3 py-2 text-[11px] font-semibold text-text-secondary"
                      >
                        <Check aria-hidden className="h-3 w-3 text-green" />
                        {receipt}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
