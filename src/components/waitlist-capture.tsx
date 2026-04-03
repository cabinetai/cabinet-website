"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ArrowRight, Check, Cloud } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { WAITLIST_COPY } from "@/lib/site-config";
import {
  buildTallyShareUrl,
  IS_TALLY_WAITLIST_CONFIGURED,
  type WaitlistSource,
} from "@/lib/waitlist";

type WaitlistCaptureProps = {
  source: WaitlistSource;
  className?: string;
  compact?: boolean;
  originPage?: string;
  trackView?: boolean;
};

export function WaitlistCapture({
  source,
  className = "",
  compact = false,
  originPage,
  trackView = false,
}: WaitlistCaptureProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaTrackedRef = useRef(false);
  const viewTrackedRef = useRef(false);
  const resolvedOriginPage = originPage ?? pathname;
  const queryString = searchParams.toString();

  const ctaUrl = useMemo(
    () =>
      buildTallyShareUrl(
        source,
        resolvedOriginPage,
        new URLSearchParams(queryString),
      ),
    [queryString, resolvedOriginPage, source],
  );

  useEffect(() => {
    if (!trackView || !cardRef.current || viewTrackedRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || viewTrackedRef.current) {
          return;
        }

        viewTrackedRef.current = true;
        trackEvent("waitlist_inline_view", {
          source,
          originPage: resolvedOriginPage,
        });
        observer.disconnect();
      },
      { threshold: 0.55 },
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [resolvedOriginPage, source, trackView]);

  const trackCtaClick = () => {
    if (ctaTrackedRef.current) {
      return;
    }

    ctaTrackedRef.current = true;
    trackEvent("waitlist_cta_click", {
      source,
      originPage: resolvedOriginPage,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-[28px] border border-border bg-[linear-gradient(180deg,rgba(252,249,244,0.96),rgba(247,241,232,0.94))] shadow-[0_20px_60px_rgba(62,43,18,0.08)] ${compact ? "px-5 py-5" : "px-6 py-6 md:px-8 md:py-8"} ${className}`}
    >
      <div className={`relative grid gap-6 ${compact ? "" : "lg:grid-cols-[1.4fr_0.95fr] lg:items-center"}`}>
        <div className="text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-dark/60 bg-white/60 px-3 py-1.5 text-[11px] font-code uppercase tracking-[0.28em] text-accent mb-5">
            <Cloud className="h-3.5 w-3.5" />
            Cabinet Cloud
          </div>

          <h3 className={`${compact ? "text-2xl" : "text-2xl md:text-[2.15rem]"} font-display text-text-primary mb-3 leading-tight`}>
            {WAITLIST_COPY.title}
          </h3>

          <p className="max-w-2xl text-base md:text-lg text-text-secondary font-body-serif leading-relaxed mb-3">
            {WAITLIST_COPY.body}
          </p>

          <p className="text-sm font-code text-accent mb-6">
            {WAITLIST_COPY.scarcity}
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              "No setup",
              "Automatic updates",
              "Hosted for you",
            ].map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-2 text-sm text-text-secondary shadow-sm"
              >
                <Check className="h-4 w-4 text-accent" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-border bg-white/75 p-5 md:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <p className="text-xs font-code uppercase tracking-[0.28em] text-text-tertiary mb-3">
            Hosted version coming soon
          </p>

          <p className="text-text-secondary font-body-serif leading-relaxed mb-5">
            Get launch updates and early access when Cabinet Cloud is ready.
          </p>

          {IS_TALLY_WAITLIST_CONFIGURED ? (
            <a
              href={ctaUrl}
              onClick={trackCtaClick}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-white font-medium transition-all shadow-sm hover:bg-accent-warm"
            >
              {WAITLIST_COPY.button}
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : (
            <div className="rounded-xl border border-dashed border-border-dark bg-accent-bg-subtle px-4 py-4 text-sm text-text-secondary leading-relaxed">
              Add your published Tally form URL to <code className="font-code text-xs text-accent">NEXT_PUBLIC_TALLY_WAITLIST_FORM_URL</code> to activate the waitlist.
            </div>
          )}

          <p className="mt-4 text-xs text-text-tertiary font-code">
            {WAITLIST_COPY.consent}
          </p>
        </div>
      </div>
    </div>
  );
}
