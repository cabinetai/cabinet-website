"use client";

export type BillingPeriod = "monthly" | "annual";

type Props = {
  value: BillingPeriod;
  onChange: (value: BillingPeriod) => void;
  savingsLabel?: string;
};

export function PricingBillingToggle({
  value,
  onChange,
  savingsLabel = "save ~17%",
}: Props) {
  return (
    <div
      role="radiogroup"
      aria-label="Billing period"
      className="inline-flex items-center gap-1 rounded-full border border-border bg-bg-card p-1 shadow-sm"
    >
      <button
        type="button"
        role="radio"
        aria-checked={value === "monthly"}
        onClick={() => onChange("monthly")}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          value === "monthly"
            ? "bg-accent text-white shadow-sm"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        Monthly
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={value === "annual"}
        onClick={() => onChange("annual")}
        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          value === "annual"
            ? "bg-accent text-white shadow-sm"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        Annual
        <span
          className={`rounded-full px-1.5 py-0.5 text-[0.65rem] font-code uppercase tracking-wider ${
            value === "annual"
              ? "bg-white/20 text-white"
              : "bg-accent-bg text-accent"
          }`}
        >
          {savingsLabel}
        </span>
      </button>
    </div>
  );
}
