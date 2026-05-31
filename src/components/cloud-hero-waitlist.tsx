"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
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

type Props = {
  source: WaitlistSource;
  originPage?: string;
  className?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Big centered email field — used on the /cloud landing page. Distinct from
// WaitlistCapture (the two-column card used in the homepage section).
export function CloudHeroWaitlist({ source, originPage, className = "" }: Props) {
  const pathname = usePathname();
  const resolvedOriginPage = originPage ?? pathname;
  const startedRef = useRef(false);
  const viewTrackedRef = useRef(false);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "already" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Read submission flag + record view after mount (avoids hydration mismatch).
  useEffect(() => {
    if (hasWaitlistSubmission()) {
      setStatus("already");
    }
    if (!viewTrackedRef.current) {
      viewTrackedRef.current = true;
      recordWaitlistView(source);
      trackEvent("waitlist_inline_view", { source, originPage: resolvedOriginPage });
    }
  }, [resolvedOriginPage, source]);

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
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error");
      setErrorMsg("Enter a valid email.");
      return;
    }
    trackEvent("waitlist_cta_click", { source, originPage: resolvedOriginPage });

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

  if (status === "success" || status === "already") {
    return (
      <div className={className}>
        <div className="flex items-start gap-3 rounded-3xl border border-accent/40 bg-accent-bg-subtle px-6 py-5 text-text-primary leading-relaxed shadow-[0_8px_30px_rgba(62,43,18,0.08)]">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <span className="text-base">
            {status === "already"
              ? "You're already on the list. We'll be in touch as soon as Cabinet Cloud opens up."
              : "You're on the list. We'll email you when Cabinet Cloud opens up."}
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col gap-3 rounded-full border border-border bg-bg-card/95 p-2 shadow-[0_20px_60px_rgba(62,43,18,0.10)] backdrop-blur-sm sm:flex-row sm:items-center sm:gap-2 sm:p-1.5">
        <label htmlFor="cabinet-cloud-hero-email" className="sr-only">
          Email
        </label>
        <input
          id="cabinet-cloud-hero-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => handleInput(e.target.value)}
          disabled={status === "submitting"}
          className={`min-w-0 flex-1 rounded-full bg-transparent px-6 py-3 text-base text-text-primary outline-none placeholder:text-text-tertiary sm:text-lg ${status === "error" ? "ring-1 ring-red-500" : ""}`}
        />
        <button
          type="submit"
          disabled={status === "submitting" || email.trim().length === 0}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-medium text-white shadow-sm transition-all hover:bg-accent-warm disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Join waitlist
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      {errorMsg ? (
        <p className="mt-2 text-center text-xs text-red-600">{errorMsg}</p>
      ) : (
        <p className="mt-3 text-center text-xs font-code text-text-tertiary">
          Connect from anywhere. Your AI team works 24/7.
        </p>
      )}
    </form>
  );
}
