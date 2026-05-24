import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { BYOAIInfo } from "@/components/byoai-info";

export type TierCta =
  | { kind: "link"; label: string; href: string; external?: boolean }
  | { kind: "button"; label: string; onClick: () => void };

export type PricingTierCardProps = {
  name: string;
  tagline: string;
  badge?: string;
  priceMonthly: number | null;
  priceAnnualEffective: number | null;
  billingPeriod: "monthly" | "annual";
  priceOverrideLabel?: string;
  priceSuffix?: string;
  annualNote?: string;
  bullets: string[];
  inheritsFromLabel?: string;
  cta: TierCta;
  ctaStyle?: "accent" | "green" | "outline";
  highlighted?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  selectionId?: string;
  footnote?: ReactNode;
};

export function PricingTierCard({
  name,
  tagline,
  badge,
  priceMonthly,
  priceAnnualEffective,
  billingPeriod,
  priceOverrideLabel,
  priceSuffix = "/mo",
  annualNote,
  bullets,
  inheritsFromLabel,
  cta,
  ctaStyle = "outline",
  highlighted = false,
  selected = false,
  onSelect,
  selectionId,
  footnote,
}: PricingTierCardProps) {
  const showNumeric =
    priceOverrideLabel === undefined &&
    priceMonthly !== null &&
    priceAnnualEffective !== null;

  const displayPrice = showNumeric
    ? `$${billingPeriod === "annual" ? priceAnnualEffective! : priceMonthly!}`
    : priceOverrideLabel ?? "";

  const ctaClass =
    ctaStyle === "green"
      ? "bg-green text-white hover:bg-green-warm shadow-sm"
      : ctaStyle === "accent"
      ? "bg-accent text-white hover:bg-accent-warm shadow-sm"
      : "border border-border-dark text-text-primary hover:bg-bg-card-hover bg-bg-card";

  // Uniform card surface — no gradients. Highlighted Max gets a soft warm tint
  // and accent border; selection adds a green ring.
  const cardBg = highlighted ? "bg-accent-bg-subtle" : "bg-bg-card";
  const cardBorder = highlighted ? "border-accent/40" : "border-border";
  const ring = selected
    ? "ring-2 ring-green ring-offset-2 ring-offset-bg"
    : highlighted
    ? "ring-1 ring-accent/15"
    : "";

  // Use a div (not a button) for the card so the inner CTA and BYOAI info
  // buttons remain valid HTML — nested buttons cause hydration errors. We
  // keep radio semantics + keyboard activation manually.
  const interactive = onSelect
    ? "cursor-pointer hover:shadow-[0_8px_28px_-10px_rgba(59,47,47,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    : "";

  return (
    <div
      onClick={onSelect}
      onKeyDown={
        onSelect
          ? (e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                onSelect();
              }
            }
          : undefined
      }
      role={onSelect ? "radio" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-checked={onSelect ? selected : undefined}
      aria-labelledby={selectionId}
      className={`relative overflow-hidden rounded-2xl border ${cardBorder} ${cardBg} ${ring} ${interactive} flex flex-col w-full text-left transition-all`}
    >
      {selected && (
        <div className="absolute right-4 top-4 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-green text-white shadow-md">
          <Check className="h-4 w-4" strokeWidth={3} />
        </div>
      )}

      <div className="flex flex-1 flex-col p-7 md:p-8">
        {/* Tier name + optional badge — uniform row */}
        <div className="mb-2 flex items-center gap-2 min-h-[1.875rem]">
          <h3
            id={selectionId}
            className="font-display text-xl text-text-primary leading-none"
          >
            {name}
          </h3>
          {badge && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-[0.55rem] font-code uppercase tracking-[0.16em] text-white shadow-sm">
              {badge}
            </span>
          )}
        </div>

        {/* Tagline — fixed min-height (~2 lines) */}
        <p className="text-sm text-text-secondary leading-relaxed mb-7 min-h-[2.75rem]">
          {tagline}
        </p>

        {/* Price row — uniform height regardless of suffix */}
        <div className="flex items-baseline gap-1 min-h-[2.5rem]">
          <span className="font-display text-4xl text-text-primary leading-none">
            {displayPrice}
          </span>
          {showNumeric && (
            <span className="text-sm text-text-tertiary">{priceSuffix}</span>
          )}
        </div>

        {/* Billing subline — always rendered, occupies same height */}
        <p className="mt-1.5 mb-7 text-xs font-code min-h-[1rem]">
          {showNumeric && annualNote && billingPeriod === "annual" ? (
            <span className="text-green-warm">{annualNote}</span>
          ) : showNumeric ? (
            <span className="text-text-tertiary">billed monthly</span>
          ) : (
            <span aria-hidden>&nbsp;</span>
          )}
        </p>

        {/* Inheritance line — always rendered (placeholder when absent) */}
        <div className="mb-3 min-h-[1.5rem]">
          {inheritsFromLabel ? (
            <p className="text-sm font-medium">
              <span className="text-text-tertiary">Everything in</span>{" "}
              <span className="text-green-warm">{inheritsFromLabel}</span>
              <span className="text-text-tertiary">, and</span>
            </p>
          ) : null}
        </div>

        {/* Bullets — flex-1 absorbs vertical slack so CTA aligns at bottom */}
        <ul className="mb-7 space-y-2.5 text-sm text-text-primary leading-relaxed flex-1">
          {bullets.map((bullet) => {
            const hasByoai = bullet.includes("BYOAI");
            return (
              <li key={bullet} className="flex items-start gap-2">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-green"
                  strokeWidth={2.5}
                />
                <span>
                  {bullet}
                  {hasByoai && <BYOAIInfo />}
                </span>
              </li>
            );
          })}
        </ul>

        {/* CTA — pinned to bottom across all cards */}
        <div className="mt-auto">
          {cta.kind === "link" ? (
            <a
              href={cta.href}
              {...(cta.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              onClick={(e) => e.stopPropagation()}
              className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all ${ctaClass}`}
            >
              {cta.label}
            </a>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                cta.onClick();
              }}
              className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all ${ctaClass}`}
            >
              {cta.label}
            </button>
          )}
          {footnote && (
            <p className="mt-2.5 text-center text-xs text-text-tertiary min-h-[1.1rem]">
              {footnote}
            </p>
          )}
          {!footnote && <div className="mt-2.5 min-h-[1.1rem]" aria-hidden />}
        </div>
      </div>
    </div>
  );
}
