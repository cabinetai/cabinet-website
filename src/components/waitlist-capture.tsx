"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Check, CheckCircle2, Cloud, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { WAITLIST_COPY } from "@/lib/site-config";
import {
  hasWaitlistSubmission,
  markWaitlistSubmitted,
  type WaitlistSource,
} from "@/lib/waitlist";
import {
  recordWaitlistStart,
  recordWaitlistView,
  submitWaitlistEmail,
} from "@/lib/waitlist-client";

type WaitlistCaptureProps = {
  source: WaitlistSource;
  className?: string;
  compact?: boolean;
  originPage?: string;
  trackView?: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistCapture({
  source,
  className = "",
  compact = false,
  originPage,
  trackView = false,
}: WaitlistCaptureProps) {
  const pathname = usePathname();
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaTrackedRef = useRef(false);
  const viewTrackedRef = useRef(false);
  const startedRef = useRef(false);
  const resolvedOriginPage = originPage ?? pathname;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "already" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // localStorage is unavailable during SSR, so reading it in the initial state
  // causes a hydration mismatch. Read it once after mount instead.
  useEffect(() => {
    if (hasWaitlistSubmission()) setStatus("already");
  }, []);

  // IntersectionObserver: fire backend "view" + analytics view-event when the
  // card is at least 55% on-screen.
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
        recordWaitlistView(source);
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

  const handleInput = (value: string) => {
    setEmail(value);
    if (status === "error") setStatus("idle");
    if (errorMsg) setErrorMsg(null);
    if (!startedRef.current && value.length > 0) {
      startedRef.current = true;
      recordWaitlistStart(source);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ctaTrackedRef.current) {
      ctaTrackedRef.current = true;
      trackEvent("waitlist_cta_click", {
        source,
        originPage: resolvedOriginPage,
      });
    }

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error");
      setErrorMsg("Enter a valid email.");
      return;
    }

    setStatus("submitting");
    const result = await submitWaitlistEmail(trimmed, source);
    if (!result.ok) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
      return;
    }

    markWaitlistSubmitted(source, "");
    if (result.alreadyOnList) {
      setStatus("already");
      trackEvent("waitlist_submit_duplicate", { source, originPage: resolvedOriginPage });
    } else {
      setStatus("success");
      trackEvent("waitlist_submit_success", { source, originPage: resolvedOriginPage });
    }
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

          {status === "success" || status === "already" ? (
            <div className="rounded-xl border border-accent/40 bg-accent-bg-subtle px-4 py-4 text-text-primary leading-relaxed">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div className="text-sm">
                  {status === "already"
                    ? "You're already on the list. We'll be in touch as soon as Cabinet Cloud opens up."
                    : "You're on the list. We'll email you when Cabinet Cloud opens up."}
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className="text-text-secondary font-body-serif leading-relaxed mb-5">
                Get launch updates and early access when Cabinet Cloud is ready.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label className="sr-only" htmlFor={`waitlist-email-${source}`}>
                  Email
                </label>
                <input
                  id={`waitlist-email-${source}`}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => handleInput(e.target.value)}
                  disabled={status === "submitting"}
                  className={`h-12 w-full rounded-full border bg-white px-5 text-[15px] text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent focus:ring-2 focus:ring-accent/20 ${status === "error" ? "border-red-500" : "border-border-dark/70"}`}
                />
                <button
                  type="submit"
                  disabled={status === "submitting" || email.trim().length === 0}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-white font-medium transition-all shadow-sm hover:bg-accent-warm disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      {WAITLIST_COPY.button}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                {errorMsg && (
                  <p className="text-xs text-red-600">{errorMsg}</p>
                )}
              </form>
            </>
          )}

          <p className="mt-4 text-xs text-text-tertiary font-code">
            {WAITLIST_COPY.consent}
          </p>
        </div>
      </div>
    </div>
  );
}
