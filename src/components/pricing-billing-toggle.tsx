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
    <fieldset className="inline-flex items-center gap-1 rounded-full bg-bg-card p-1 shadow-sm">
      <legend className="sr-only">Billing period</legend>
      <label
        className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-bg ${
          value === "monthly"
            ? "bg-accent text-white shadow-sm"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        <input
          type="radio"
          name="billing-period"
          value="monthly"
          checked={value === "monthly"}
          onChange={() => onChange("monthly")}
          className="sr-only"
        />
        Monthly
      </label>
      <label
        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-bg ${
          value === "annual"
            ? "bg-accent text-white shadow-sm"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        <input
          type="radio"
          name="billing-period"
          value="annual"
          checked={value === "annual"}
          onChange={() => onChange("annual")}
          className="sr-only"
        />
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
      </label>
    </fieldset>
  );
}
