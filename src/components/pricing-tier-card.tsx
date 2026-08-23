import type { ReactNode } from "react";
import { Check } from "lucide-react";

export type TierCta =
  | { kind: "link"; label: string; href: string; external?: boolean; onClick?: () => void }
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
  ctaStyle?: "accent" | "green" | "outline" | "wood";
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
    ctaStyle === "wood"
      ? "btn-wood"
      : ctaStyle === "green"
      ? "bg-green text-white hover:bg-green-warm shadow-sm"
      : ctaStyle === "accent"
      ? "bg-accent text-white hover:bg-accent-warm shadow-sm"
      : "ent-btn-secondary";

  const cardBg = highlighted ? "bg-accent-bg-subtle" : "bg-bg-card";
  const cardShadow = highlighted
    ? "shadow-[0_20px_52px_-18px_rgba(150,108,68,0.45)]"
    : "shadow-[0_8px_30px_-14px_rgba(150,108,68,0.32)]";

  return (
    <article
      className={`relative flex w-full flex-col overflow-hidden rounded-[26px] text-left ${cardBg} ${cardShadow} ${
        selected ? "shadow-[0_24px_58px_-18px_rgba(90,122,79,0.38)]" : ""
      } transition-shadow duration-300`}
    >
      <div className="flex flex-1 flex-col p-5">
        {onSelect && selectionId ? (
          <label htmlFor={selectionId} className="mb-3 flex cursor-pointer items-start justify-between gap-4">
            <span className="flex min-w-0 flex-wrap items-center gap-2">
              <span className="font-section text-xl leading-none text-text-primary">{name}</span>
              {badge && (
                <span className="rounded-full bg-accent px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-white">
                  {badge}
                </span>
              )}
            </span>
            <span className="relative grid h-7 w-7 shrink-0 place-items-center">
              <input
                id={selectionId}
                type="radio"
                name="pricing-plan"
                value={name}
                checked={selected}
                onChange={onSelect}
                className="peer sr-only"
              />
              <span className="absolute inset-0 rounded-full bg-bg-warm shadow-inner transition peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg-card peer-checked:bg-green" />
              <Check
                aria-hidden
                className="relative h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                strokeWidth={3}
              />
              <span className="sr-only">Select {name}</span>
            </span>
          </label>
        ) : (
          <div className="mb-3 flex items-center gap-2">
            <h3 className="font-section text-xl leading-none text-text-primary">{name}</h3>
            {badge && (
              <span className="rounded-full bg-accent px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-white">
                {badge}
              </span>
            )}
          </div>
        )}

        <p className="text-[13px] text-text-secondary leading-snug mb-2.5 min-h-[2.25rem]">
          {tagline}
        </p>

        <div className="flex items-baseline gap-1 min-h-[2rem]">
          <span className="font-section text-3xl text-text-primary leading-none">
            {displayPrice}
          </span>
          {showNumeric && (
            <span className="text-sm text-text-tertiary">{priceSuffix}</span>
          )}
        </div>

        <p className="mt-1 mb-2 text-xs font-code min-h-[1rem]">
          {showNumeric && annualNote && billingPeriod === "annual" ? (
            <span className="text-green-warm">{annualNote}</span>
          ) : showNumeric ? (
            <span className="text-text-tertiary">billed monthly</span>
          ) : (
            <span aria-hidden>&nbsp;</span>
          )}
        </p>

        <div className="mb-2 min-h-[1.25rem]">
          {inheritsFromLabel ? (
            <p className="text-[13px] font-medium">
              <span className="text-text-tertiary">Everything in</span>{" "}
              <span className="text-green-warm">{inheritsFromLabel}</span>
              <span className="text-text-tertiary">, and</span>
            </p>
          ) : null}
        </div>

        <ul className="mb-4 space-y-1.5 text-[13px] text-text-primary leading-snug flex-1">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <Check
                aria-hidden
                className="mt-0.5 h-4 w-4 shrink-0 text-green"
                strokeWidth={2.5}
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          {cta.kind === "link" ? (
            <a
              href={cta.href}
              {...(cta.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              onClick={cta.onClick}
              className={`inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${ctaClass}`}
            >
              {cta.label}
            </a>
          ) : (
            <button
              type="button"
              onClick={cta.onClick}
              className={`inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${ctaClass}`}
            >
              {cta.label}
            </button>
          )}
          {footnote && (
            <p className="mt-2 text-center text-xs text-text-tertiary">
              {footnote}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
