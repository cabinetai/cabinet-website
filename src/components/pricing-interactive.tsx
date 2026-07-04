"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Users } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { MACOS_DOWNLOAD_URL, WINDOWS_DOWNLOAD_URL } from "@/lib/site-config";
import type { PricingTier } from "@/lib/waitlist-client";
import { PricingTierCard } from "@/components/pricing-tier-card";
import { WoodIcon } from "@/components/wood-icon";
import {
  type BillingPeriod,
  PricingBillingToggle,
} from "@/components/pricing-billing-toggle";
import { PricingCloudModal } from "@/components/pricing-cloud-modal";

type Selection = "self-hosted" | PricingTier;

export function PricingInteractive() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const [selected, setSelected] = useState<Selection>("max");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTier, setModalTier] = useState<PricingTier>("pro");

  useEffect(() => {
    trackEvent("pricing_view");
  }, []);

  const openModal = (tier: PricingTier) => {
    setModalTier(tier);
    setModalOpen(true);
    trackEvent("pricing_tier_cta_click", { tier });
  };

  const select = (tier: Selection) => {
    setSelected(tier);
    trackEvent("pricing_tier_select", { tier });
  };

  const handleBillingChange = (next: BillingPeriod) => {
    setBilling(next);
    trackEvent("pricing_billing_toggle", { billing: next });
  };

  return (
    <>
      <div className="flex justify-center mb-12">
        <PricingBillingToggle value={billing} onChange={handleBillingChange} />
      </div>

      <div
        role="radiogroup"
        aria-label="Choose a plan"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch"
      >
        <PricingTierCard
          selectionId="tier-self-hosted"
          name="Self-Hosted"
          tagline="Always free, always yours."
          priceMonthly={null}
          priceAnnualEffective={null}
          priceOverrideLabel="Free"
          billingPeriod={billing}
          bullets={[
            "MIT licensed, run locally",
            "BYOAI · bring your own AI",
            "Every Cabinet feature",
            "Community support on Discord",
          ]}
          cta={{
            kind: "link",
            label: "Download for Mac",
            href: MACOS_DOWNLOAD_URL,
            external: true,
          }}
          ctaStyle="outline"
          selected={selected === "self-hosted"}
          onSelect={() => select("self-hosted")}
          footnote={
            <span>
              or{" "}
              <code className="font-code text-text-secondary">
                npx cabinetai run
              </code>
              {" · "}
              <a
                href={WINDOWS_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2"
              >
                Windows installer
              </a>
            </span>
          }
        />

        <PricingTierCard
          selectionId="tier-pro"
          name="Pro"
          tagline="Cabinet, hosted for you. Always on."
          priceMonthly={20}
          priceAnnualEffective={16}
          billingPeriod={billing}
          annualNote="$192 billed annually"
          bullets={[
            "One Cabinet across phone, laptop, and browser",
            "AI agents that keep working 24/7",
            "Daily backups · 7-day retention",
            "Automatic updates",
            "BYOAI · Managed AI add-on",
          ]}
          cta={{
            kind: "button",
            label: "Join the waitlist",
            onClick: () => openModal("pro"),
          }}
          ctaStyle="wood"
          selected={selected === "pro"}
          onSelect={() => select("pro")}
        />

        <PricingTierCard
          selectionId="tier-max"
          name="Max"
          tagline="More compute, hardened backups, instant support."
          badge="Recommended"
          highlighted
          priceMonthly={49}
          priceAnnualEffective={40}
          billingPeriod={billing}
          annualNote="$480 billed annually"
          inheritsFromLabel="Pro"
          bullets={[
            "Bigger container · longer agent runs",
            "Encrypted backups · 30-day · point-in-time restore",
            "Custom domain",
            "Instant chat support · under 1h",
            "Region pinning",
          ]}
          cta={{
            kind: "button",
            label: "Join the waitlist",
            onClick: () => openModal("max"),
          }}
          ctaStyle="wood"
          selected={selected === "max"}
          onSelect={() => select("max")}
        />

        <PricingTierCard
          selectionId="tier-enterprise"
          name="Enterprise"
          tagline="For teams and regulated industries."
          priceMonthly={null}
          priceAnnualEffective={null}
          priceOverrideLabel="Custom"
          billingPeriod={billing}
          inheritsFromLabel="Max"
          bullets={[
            "Multi-user / shared workspaces",
            "Dedicated infra · data residency",
            "SSO (SAML, OIDC) · 99.9% SLA",
            "Security review docs (SOC 2 prep)",
            "Dedicated Slack channel",
          ]}
          cta={{
            kind: "button",
            label: "Talk to us",
            onClick: () => openModal("enterprise"),
          }}
          ctaStyle="outline"
          selected={selected === "enterprise"}
          onSelect={() => select("enterprise")}
        />
      </div>

      {/* Team — early access callout */}
      <div className="mt-12 max-w-3xl mx-auto">
        <div className="soft-card px-6 py-5 md:px-7 md:py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
            <div className="flex items-start gap-3">
              <div className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-lg">
                <WoodIcon icon={Users} className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-display text-lg text-text-primary mb-0.5">
                  Working with a team?
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Shared workspaces are coming. Join early access and we&apos;ll
                  prioritize your team when multi-seat ships.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                trackEvent("pricing_team_early_click");
                openModal("team-early");
              }}
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-green/40 bg-green-bg-subtle px-4 py-2 text-sm font-medium text-green-warm transition-colors hover:bg-green-bg"
            >
              Join Team early access
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <PricingCloudModal
          initialTier={modalTier}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
