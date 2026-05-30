"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/solutions";
import { INDUSTRIES } from "@/lib/industries";

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
        <div className="absolute left-1/2 top-full z-50 w-[600px] -translate-x-1/2 pt-3">
          <div className="overflow-hidden rounded-2xl border border-border bg-bg-card p-3 shadow-xl shadow-black/10">
            <div className="grid grid-cols-2 gap-x-2">
              {/* By team */}
              <div>
                <p className="px-3 pb-1 pt-2 font-code text-[11px] uppercase tracking-wider text-text-tertiary">
                  By team
                </p>
                {SOLUTIONS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Link
                      key={s.slug}
                      href={`/solutions/${s.slug}`}
                      className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-bg-warm"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-bg text-accent">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-display text-sm text-text-primary">{s.label}</span>
                    </Link>
                  );
                })}
              </div>
              {/* By industry */}
              <div className="border-l border-border-light pl-2">
                <p className="px-3 pb-1 pt-2 font-code text-[11px] uppercase tracking-wider text-text-tertiary">
                  By industry
                </p>
                {INDUSTRIES.map((i) => {
                  const Icon = i.icon;
                  return (
                    <Link
                      key={i.slug}
                      href={`/industries/${i.slug}`}
                      className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-bg-warm"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-bg text-accent">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-display text-sm text-text-primary">{i.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="mt-1 grid grid-cols-2 gap-x-2 border-t border-border-light pt-2">
              <Link
                href="/solutions"
                className="flex items-center justify-between rounded-xl px-3 py-2.5 font-code text-xs text-accent transition-colors hover:text-accent-warm"
              >
                Every team <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/industries"
                className="flex items-center justify-between rounded-xl px-3 py-2.5 font-code text-xs text-accent transition-colors hover:text-accent-warm"
              >
                Every industry <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
