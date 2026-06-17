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
        className={`glass-pill group inline-flex h-10 items-center px-4 text-sm font-medium transition-colors hover:text-text-primary ${triggerClassName}`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="liquid-glass__refract" aria-hidden />
        <span className="relative z-10 inline-flex items-center gap-1">
          Solutions
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
      </Link>

      {open && (
        <div className="absolute left-1/2 top-full z-50 w-[600px] -translate-x-1/2 pt-3">
          <div className="liquid-glass-panel overflow-hidden rounded-2xl border border-white/50 p-3">
            <div className="grid grid-cols-2 gap-x-2">
              {/* By team */}
              <div>
                <p className="px-3 pb-1 pt-2 font-code text-[11px] uppercase tracking-wider text-text-tertiary">
                  By team
                </p>
                {SOLUTIONS.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/solutions/${s.slug}`}
                    className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-bg-warm"
                  >
                    <img
                      src={`/brand/icons/${s.slug}.png`}
                      alt=""
                      className="h-9 w-9 shrink-0 object-contain transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-2"
                    />
                    <span className="font-display text-sm text-text-primary">{s.label}</span>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 -translate-x-1 text-text-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
              {/* By industry */}
              <div className="border-l border-border-light pl-2">
                <p className="px-3 pb-1 pt-2 font-code text-[11px] uppercase tracking-wider text-text-tertiary">
                  By industry
                </p>
                {INDUSTRIES.map((i) => (
                  <Link
                    key={i.slug}
                    href={`/industries/${i.slug}`}
                    className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-bg-warm"
                  >
                    <img
                      src={`/brand/icons/${i.slug}.png`}
                      alt=""
                      className="h-9 w-9 shrink-0 object-contain transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-2"
                    />
                    <span className="font-display text-sm text-text-primary">{i.label}</span>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 -translate-x-1 text-text-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100" />
                  </Link>
                ))}
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
