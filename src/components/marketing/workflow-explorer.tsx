"use client";

import {
  ArrowRight,
  BookOpenCheck,
  Check,
  FileStack,
  Inbox,
  ListChecks,
  MessagesSquare,
  Repeat2,
} from "lucide-react";
import { useState } from "react";
import { cabinetBySlug, cabinetCover, cabinetUrl } from "@/lib/cabinets";

type WorkflowId = "inbox" | "meetings" | "answers" | "documents" | "repeat" | "requests";

const WORKFLOWS = [
  {
    id: "inbox",
    label: "Inbox",
    icon: Inbox,
    promise: "Keep the inbox moving without giving up the send button.",
    proof: [
      "Surfaces what needs a person and organizes the rest.",
      "Drafts the replies that matter for your review.",
      "Keeps open threads and follow-ups visible.",
    ],
    cabinetSlug: "email",
  },
  {
    id: "meetings",
    label: "Meetings",
    icon: MessagesSquare,
    promise: "Turn every meeting into memory the company can use.",
    proof: [
      "Captures a structured summary while people stay present.",
      "Extracts decisions, action items, owners, and next steps.",
      "Keeps the follow-through connected to the original context.",
    ],
    cabinetSlug: "meeting-memory",
  },
  {
    id: "answers",
    label: "Answers",
    icon: BookOpenCheck,
    promise: "Get a sourced answer across the knowledge your company owns.",
    proof: [
      "Searches files, pages, code, data, and connected company context.",
      "Returns the answer in plain language with its sources.",
      "Keeps useful findings organized for the next question.",
    ],
    cabinetSlug: "company-brain",
  },
  {
    id: "documents",
    label: "Docs and reports",
    icon: FileStack,
    promise: "Move from scattered inputs to a reviewed first draft.",
    proof: [
      "Starts from the files, decisions, and conversations already in Cabinet.",
      "Drafts in the format the workflow actually requires.",
      "Runs a completeness check before the work reaches a person.",
    ],
    cabinetSlug: "prd-builder",
  },
  {
    id: "repeat",
    label: "Recurring work",
    icon: Repeat2,
    promise: "Run the work that returns every week on schedule.",
    proof: [
      "Pulls the latest context from the sources your team already uses.",
      "Runs a repeatable job with a visible owner and status.",
      "Routes sensitive results through a human review point.",
    ],
    cabinetSlug: "weekly-business-review",
  },
  {
    id: "requests",
    label: "Team requests",
    icon: ListChecks,
    promise: "Give every request a route, an owner, and a visible finish line.",
    proof: [
      "Categorizes incoming work and sends it to the right team.",
      "Applies the operating rules and service level for that request.",
      "Tracks progress and artifacts in one shared view.",
    ],
    cabinetSlug: "universal-request",
  },
] satisfies Array<{
  id: WorkflowId;
  label: string;
  icon: typeof Inbox;
  promise: string;
  proof: string[];
  cabinetSlug: string;
}>;

export function WorkflowExplorer() {
  const [activeId, setActiveId] = useState<WorkflowId>("inbox");
  const activeIndex = WORKFLOWS.findIndex((workflow) => workflow.id === activeId);
  const workflow = WORKFLOWS[activeIndex];
  const cabinet = cabinetBySlug(workflow.cabinetSlug);

  function selectByOffset(offset: number) {
    const nextIndex = (activeIndex + offset + WORKFLOWS.length) % WORKFLOWS.length;
    const next = WORKFLOWS[nextIndex];
    setActiveId(next.id);
    window.requestAnimationFrame(() => {
      document.getElementById(`workflow-tab-${next.id}`)?.focus();
    });
  }

  if (!cabinet) return null;

  return (
    <div className="home-product-surface grid overflow-hidden rounded-[30px] bg-bg-card lg:grid-cols-[0.66fr_1.05fr_0.92fr]">
      <div
        role="tablist"
        aria-label="Company workflows"
        className="flex gap-2 overflow-x-auto bg-bg-warm p-4 lg:flex-col lg:overflow-visible lg:p-5"
      >
        {WORKFLOWS.map((item) => {
          const Icon = item.icon;
          const selected = item.id === activeId;
          return (
            <button
              key={item.id}
              id={`workflow-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="workflow-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                  event.preventDefault();
                  selectByOffset(1);
                }
                if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                  event.preventDefault();
                  selectByOffset(-1);
                }
              }}
              className={`group flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 lg:w-full ${
                selected
                  ? "bg-bg-card text-text-primary shadow-sm"
                  : "text-text-secondary hover:bg-bg-card/60 hover:text-text-primary"
              }`}
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors ${
                  selected ? "bg-accent-bg text-accent" : "bg-bg-card text-text-tertiary"
                }`}
              >
                <Icon aria-hidden className="h-4 w-4" />
              </span>
              {item.label}
              <ArrowRight
                aria-hidden
                className={`ml-auto hidden h-4 w-4 transition-transform lg:block ${
                  selected ? "text-accent" : "text-text-muted group-hover:translate-x-0.5"
                }`}
              />
            </button>
          );
        })}
      </div>

      <section
        id="workflow-panel"
        role="tabpanel"
        aria-labelledby={`workflow-tab-${workflow.id}`}
        className="p-7 sm:p-9 lg:p-10"
      >
        <p className="section-label">{workflow.label}</p>
        <h3 className="mt-5 max-w-[12ch] font-display text-4xl leading-[1.02] tracking-[-0.045em] text-text-primary sm:text-5xl">
          {workflow.promise}
        </h3>
        <ul className="mt-8 space-y-4">
          {workflow.proof.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green-bg text-green">
                <Check aria-hidden className="h-3 w-3" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <aside className="flex flex-col bg-accent-bg-subtle p-5 sm:p-7">
        <div className="overflow-hidden rounded-2xl bg-bg-card shadow-sm">
          {/* The registry controls these real cabinet covers. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={cabinet.slug}
            src={cabinetCover(cabinet.slug)}
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover"
          />
          <div className="p-5">
            <p className="font-code text-[10px] uppercase tracking-[0.12em] text-text-tertiary">
              Inspectable cabinet
            </p>
            <h4 className="mt-3 font-display text-2xl tracking-[-0.04em] text-text-primary">
              {cabinet.name}
            </h4>
            <p className="mt-3 text-xs leading-relaxed text-text-secondary">{cabinet.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {cabinet.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-bg-warm px-2.5 py-1 font-code text-[9px] text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <a
          href={cabinetUrl(cabinet.slug)}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-text-primary px-5 py-3 text-sm font-semibold text-bg-card transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          Inspect and clone <ArrowRight aria-hidden className="h-4 w-4" />
        </a>
        <p className="mt-3 text-center text-[10px] leading-relaxed text-text-tertiary">
          Opens the full template page.
        </p>
      </aside>
    </div>
  );
}
