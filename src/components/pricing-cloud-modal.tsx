"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Cloud, Loader2, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import {
  type PricingTier,
  submitWaitlistEmail,
  type WaitlistAddOn,
} from "@/lib/waitlist-client";
import { markWaitlistSubmitted } from "@/lib/waitlist";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TIER_LABEL: Record<PricingTier, string> = {
  pro: "Pro · $20/mo",
  max: "Max · $49/mo",
  "team-early": "Team · early access",
  enterprise: "Enterprise · custom",
};

const TIER_TO_SOURCE: Record<PricingTier, string> = {
  pro: "pricing-pro",
  max: "pricing-max",
  "team-early": "pricing-team-early",
  enterprise: "pricing-enterprise",
};

type Props = {
  initialTier: PricingTier;
  onClose: () => void;
};

export function PricingCloudModal({ initialTier, onClose }: Props) {
  const [tier, setTier] = useState<PricingTier>(initialTier);
  const [email, setEmail] = useState("");
  const [managedAi, setManagedAi] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "already" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus + body scroll lock + Escape to close. Component is mounted only while
  // open, so state resets naturally on re-open (no setState-in-effect).
  useEffect(() => {
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 80);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const isEnterprise = tier === "enterprise";
  const isTeamEarly = tier === "team-early";
  const showAddOnsSection = !isTeamEarly && !isEnterprise;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error");
      setErrorMsg("Enter a valid email.");
      return;
    }

    const addOns: WaitlistAddOn[] = [];
    if (managedAi && showAddOnsSection) addOns.push("managed-ai");
    if (isTeamEarly) addOns.push("multi-seat-interest");

    const source = TIER_TO_SOURCE[tier];

    setStatus("submitting");
    const result = await submitWaitlistEmail(trimmed, source, {
      tier,
      addOns,
      message: isEnterprise ? message : undefined,
    });

    if (!result.ok) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
      return;
    }

    markWaitlistSubmitted(source, "");
    if (result.alreadyOnList) {
      setStatus("already");
      trackEvent("waitlist_submit_duplicate", { source, tier });
    } else {
      setStatus("success");
      trackEvent("pricing_modal_submit_success", {
        source,
        tier,
        addOns: addOns.join(",") || undefined,
      });
      trackEvent("waitlist_submit_success", { source, tier });
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pricing-cloud-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-border bg-[linear-gradient(180deg,rgba(252,249,244,0.98),rgba(247,241,232,0.96))] shadow-[0_24px_80px_rgba(40,28,12,0.32)]">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-dark/40 bg-white/70 text-text-secondary transition-colors hover:text-text-primary"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative z-[1] px-6 pb-7 pt-9 md:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-dark/60 bg-white/70 px-3 py-1.5 text-[11px] font-code uppercase tracking-[0.28em] text-accent">
            <Cloud className="h-3.5 w-3.5" />
            {isEnterprise
              ? "Enterprise enquiry"
              : isTeamEarly
              ? "Team · early access"
              : "Cabinet Cloud waitlist"}
          </div>

          <h3
            id="pricing-cloud-modal-title"
            className="mb-3 text-2xl font-display leading-tight text-text-primary"
          >
            {isEnterprise
              ? "Tell us about your team."
              : isTeamEarly
              ? "Reserve your team's spot."
              : "Join the waitlist."}
          </h3>

          <p className="mb-5 text-[15px] text-text-secondary font-body-serif leading-relaxed">
            {isEnterprise
              ? "We'll get back to you within one business day with a tailored proposal."
              : isTeamEarly
              ? "Multi-seat is shipping on the Team tier. We'll prioritize teams that sign up early."
              : "We'll email you when Cabinet Cloud opens up. Your selected tier and add-ons help us prioritize."}
          </p>

          {status === "success" || status === "already" ? (
            <div className="flex items-start gap-3 rounded-xl border border-accent/40 bg-accent-bg-subtle px-4 py-4 text-sm text-text-primary leading-relaxed">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span>
                {status === "already"
                  ? "You're already on the list. We'll be in touch."
                  : isEnterprise
                  ? "Got it. We'll reach out within one business day."
                  : "You're on the list. We'll email you when Cabinet Cloud opens up."}
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="pricing-modal-tier"
                  className="mb-1.5 block text-xs font-code uppercase tracking-wider text-text-tertiary"
                >
                  Interested in
                </label>
                <select
                  id="pricing-modal-tier"
                  value={tier}
                  onChange={(e) => setTier(e.target.value as PricingTier)}
                  disabled={status === "submitting"}
                  className="h-11 w-full rounded-xl border border-border-dark/70 bg-white px-4 text-[15px] text-text-primary outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                >
                  {(Object.keys(TIER_LABEL) as PricingTier[]).map((key) => (
                    <option key={key} value={key}>
                      {TIER_LABEL[key]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="pricing-modal-email"
                  className="mb-1.5 block text-xs font-code uppercase tracking-wider text-text-tertiary"
                >
                  Email
                </label>
                <input
                  id="pricing-modal-email"
                  ref={inputRef}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                    if (errorMsg) setErrorMsg(null);
                  }}
                  disabled={status === "submitting"}
                  className={`h-11 w-full rounded-xl border bg-white px-4 text-[15px] text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent focus:ring-2 focus:ring-accent/20 ${
                    status === "error"
                      ? "border-red-500"
                      : "border-border-dark/70"
                  }`}
                />
              </div>

              {showAddOnsSection && (
                <label className="flex items-start gap-2.5 cursor-pointer rounded-xl border border-border bg-white/60 px-3.5 py-3">
                  <input
                    type="checkbox"
                    checked={managedAi}
                    onChange={(e) => setManagedAi(e.target.checked)}
                    disabled={status === "submitting"}
                    className="mt-0.5 h-4 w-4 accent-accent"
                  />
                  <span className="text-sm text-text-primary leading-relaxed">
                    Add <strong>Managed AI</strong> to skip the API key.{" "}
                    <span className="text-text-tertiary">From $10/mo.</span>
                  </span>
                </label>
              )}

              {isEnterprise && (
                <div>
                  <label
                    htmlFor="pricing-modal-message"
                    className="mb-1.5 block text-xs font-code uppercase tracking-wider text-text-tertiary"
                  >
                    Anything we should know? (optional)
                  </label>
                  <textarea
                    id="pricing-modal-message"
                    rows={3}
                    placeholder="Team size, compliance needs, timeline…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={status === "submitting"}
                    className="w-full resize-none rounded-xl border border-border-dark/70 bg-white px-4 py-3 text-[15px] text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>
              )}

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
                    {isEnterprise ? "Talk to us" : "Join waitlist"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}
            </form>
          )}

          <p className="mt-4 text-xs text-text-tertiary font-code">
            Get launch updates by email. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
