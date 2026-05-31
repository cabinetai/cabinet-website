"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Cloud, Loader2, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { WaitlistCloudBackdrop } from "@/components/waitlist-cloud-backdrop";
import {
  dismissWaitlistPopup,
  hasWaitlistSubmission,
  markWaitlistSubmitted,
  shouldSuppressWaitlistPopup,
  WAITLIST_POPUP_DELAY_MS,
} from "@/lib/waitlist";
import {
  recordWaitlistStart,
  recordWaitlistView,
  submitWaitlistEmail,
} from "@/lib/waitlist-client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOURCE = "popup";

export function WaitlistPopup() {
  const [open, setOpen] = useState(false);
  const [originPage, setOriginPage] = useState("/");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "already" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const startedRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Open the popup once after the delay, unless suppressed.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (shouldSuppressWaitlistPopup()) return;

    const url = new URL(window.location.href);
    const path = url.pathname || "/";
    setOriginPage(path);

    const timer = window.setTimeout(() => {
      if (hasWaitlistSubmission()) return;
      setOpen(true);
      recordWaitlistView(SOURCE);
      trackEvent("waitlist_popup_open", {
        source: SOURCE,
        originPage: path,
      });
    }, WAITLIST_POPUP_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  // Focus the email field shortly after open + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 80);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Esc to dismiss.
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleDismiss = () => {
    if (!open) return;
    setOpen(false);
    if (status === "success" || status === "already") return;
    dismissWaitlistPopup();
    trackEvent("waitlist_popup_dismiss", {
      source: SOURCE,
      originPage,
    });
  };

  const handleInput = (value: string) => {
    setEmail(value);
    if (status === "error") setStatus("idle");
    if (errorMsg) setErrorMsg(null);
    if (!startedRef.current && value.length > 0) {
      startedRef.current = true;
      recordWaitlistStart(SOURCE);
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

    setStatus("submitting");
    const result = await submitWaitlistEmail(trimmed, SOURCE);
    if (!result.ok) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
      return;
    }

    markWaitlistSubmitted(SOURCE, "");
    if (result.alreadyOnList) {
      setStatus("already");
      trackEvent("waitlist_submit_duplicate", { source: SOURCE, originPage });
    } else {
      setStatus("success");
      trackEvent("waitlist_submit_success", { source: SOURCE, originPage });
    }

    // Auto-close success state after a moment.
    window.setTimeout(() => setOpen(false), 3500);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cabinet-waitlist-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={handleDismiss}
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-border bg-[linear-gradient(180deg,rgba(252,249,244,0.98),rgba(247,241,232,0.96))] shadow-[0_24px_80px_rgba(40,28,12,0.32)]">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <WaitlistCloudBackdrop />
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={handleDismiss}
          className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-dark/40 bg-white/70 text-text-secondary transition-colors hover:text-text-primary"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative z-[1] px-6 pb-7 pt-9 md:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-dark/60 bg-white/70 px-3 py-1.5 text-[11px] font-code uppercase tracking-[0.28em] text-accent">
            <Cloud className="h-3.5 w-3.5" />
            Cabinet Cloud ☁️ is coming soon
          </div>

          <h3
            id="cabinet-waitlist-title"
            className="mb-3 text-2xl font-display leading-tight text-text-primary"
          >
            Your Cabinet, anywhere.
            <br />
            Your AI team, always on.
          </h3>

          <p className="mb-5 text-[15px] text-text-secondary font-body-serif leading-relaxed">
            Open your Cabinet from any device while your AI agents keep working for
            you 24/7, even when your laptop is closed.
          </p>

          {status === "success" || status === "already" ? (
            <div className="flex items-start gap-3 rounded-xl border border-accent/40 bg-accent-bg-subtle px-4 py-4 text-sm text-text-primary leading-relaxed">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span>
                {status === "already"
                  ? "You're already on the list. We'll be in touch."
                  : "You're on the list. We'll email you when Cabinet Cloud opens up."}
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label htmlFor="cabinet-waitlist-popup-email" className="sr-only">
                Email
              </label>
              <input
                id="cabinet-waitlist-popup-email"
                ref={inputRef}
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
                    Join waitlist
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
              {errorMsg && (
                <p className="text-xs text-red-600">{errorMsg}</p>
              )}
            </form>
          )}

          <p className="mt-4 text-xs text-text-tertiary font-code">
            Connect from anywhere. Your AI team works 24/7.
          </p>
        </div>
      </div>
    </div>
  );
}
