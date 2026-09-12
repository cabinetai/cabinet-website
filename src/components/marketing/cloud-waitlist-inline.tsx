"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { CheckCircle2, Cloud, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import {
  hasWaitlistSubmission,
  markWaitlistSubmitted,
  type WaitlistSource,
} from "@/lib/waitlist";
import { recordWaitlistStart, submitWaitlistEmail } from "@/lib/waitlist-client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const subscribe = () => () => {};

// One-line email capture for Cabinet Cloud, sized to sit under the download
// button. Same backend and storage as the larger WaitlistCapture card, so a
// visitor who signs up here is remembered everywhere else on the site.
export function CloudWaitlistInline({
  source = "hero",
  align = "center",
}: {
  source?: WaitlistSource;
  align?: "center" | "left";
}) {
  const pathname = usePathname();
  const startedRef = useRef(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "already" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const alreadySubmitted = useSyncExternalStore(subscribe, hasWaitlistSubmission, () => false);
  const displayStatus = status === "idle" && alreadySubmitted ? "already" : status;
  const centered = align === "center";

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
    trackEvent("waitlist_cta_click", { source, originPage: pathname });
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
      trackEvent("waitlist_submit_duplicate", { source, originPage: pathname });
    } else {
      setStatus("success");
      trackEvent("waitlist_submit_success", { source, originPage: pathname });
    }
  };

  if (displayStatus === "success" || displayStatus === "already") {
    return (
      <div
        className={`flex items-start gap-2.5 rounded-xl border border-accent/40 bg-accent-bg-subtle px-4 py-3.5 text-sm leading-relaxed text-text-primary ${centered ? "mx-auto max-w-md text-left" : "max-w-md"}`}
      >
        <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <span>
          {displayStatus === "already"
            ? "You're already on the list. We'll be in touch as soon as Cabinet Cloud opens up."
            : "You're on the list. We'll email you when Cabinet Cloud opens up."}
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={centered ? "mx-auto max-w-md" : "max-w-md"}>
      <p className={`mb-4 font-body-serif text-[15px] leading-snug text-text-secondary ${centered ? "text-center" : ""}`}>
        Want a team that keeps working after you close your laptop?
      </p>
      <div
        className={`flex flex-col gap-2 sm:flex-row sm:items-stretch ${status === "error" ? "[&_input]:border-red-500" : ""}`}
      >
        <label className="sr-only" htmlFor={`cloud-waitlist-${source}`}>
          Email
        </label>
        <input
          id={`cloud-waitlist-${source}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => handleInput(e.target.value)}
          disabled={status === "submitting"}
          className="h-12 min-w-0 flex-1 rounded-xl border border-border-dark/70 bg-white px-4 text-[15px] text-text-primary shadow-sm outline-none transition-colors placeholder:text-text-tertiary focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-wood inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-5 text-[15px] font-semibold disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              <Cloud aria-hidden className="h-4 w-4" />
              Join the Cloud waitlist
            </>
          )}
        </button>
      </div>
      {errorMsg && <p className={`mt-2 text-xs text-red-600 ${centered ? "text-center" : ""}`}>{errorMsg}</p>}
    </form>
  );
}
