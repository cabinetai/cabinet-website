"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/solutions";

/**
 * "Cabinet for…" navbar dropdown. Opens on hover and on keyboard focus so it
 * works for mouse and keyboard users alike. Shared by the homepage navbar and
 * the SiteNavbar.
 */
export function SolutionsMenu({ triggerClassName = "" }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href="/solutions"
        className={`inline-flex items-center gap-1 transition-colors hover:text-text-primary ${triggerClassName}`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Solutions
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </Link>

      {open && (
        <div className="absolute left-1/2 top-full z-50 w-[340px] -translate-x-1/2 pt-3">
          <div className="overflow-hidden rounded-2xl border border-border bg-bg-card p-2 shadow-xl shadow-black/10">
            <p className="px-3 pb-1 pt-2 font-code text-[11px] uppercase tracking-wider text-text-tertiary">
              Cabinet for…
            </p>
            {SOLUTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/solutions/${s.slug}`}
                  className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-bg-warm"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-bg text-accent">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-sm text-text-primary">{s.label}</div>
                    <div className="truncate font-code text-[11px] text-text-tertiary">
                      {s.menuBlurb}
                    </div>
                  </div>
                </Link>
              );
            })}
            <Link
              href="/solutions"
              className="mt-1 flex items-center justify-between rounded-xl border-t border-border-light px-3 py-3 font-code text-xs text-accent transition-colors hover:text-accent-warm"
            >
              Cabinet for every team
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
