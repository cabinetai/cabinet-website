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
      <div className="mb-12 flex justify-center">
        <PricingBillingToggle value={billing} onChange={handleBillingChange} />
      </div>

      <fieldset className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
        <legend className="sr-only">Choose a Cabinet plan</legend>
        <PricingTierCard
          selectionId="tier-self-hosted"
          name="Self-Hosted"
          tagline="Run the complete product in an environment you control."
          priceMonthly={null}
          priceAnnualEffective={null}
          priceOverrideLabel="Free"
          billingPeriod={billing}
          bullets={[
            "MIT licensed and free to run",
            "Bring your own AI accounts",
            "The complete Cabinet product",
            "Community support on Discord",
          ]}
          cta={{
            kind: "link",
            label: "Download Cabinet for Mac",
            href: MACOS_DOWNLOAD_URL,
            external: true,
            onClick: () =>
              trackEvent("pricing_tier_cta_click", {
                tier: "self-hosted",
                action: "download-mac",
              }),
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
              {" · Linux coming soon"}
            </span>
          }
        />

        <PricingTierCard
          selectionId="tier-pro"
          name="Cabinet Cloud Pro"
          tagline="Managed hosting for one always-on Cabinet."
          priceMonthly={20}
          priceAnnualEffective={16}
          billingPeriod={billing}
          annualNote="$192 billed annually"
          bullets={[
            "Access across phone, laptop, and browser",
            "Agents can keep scheduled work moving",
            "Daily backups with 7-day retention",
            "Automatic updates",
            "Bring your own AI or add Managed AI",
          ]}
          cta={{
            kind: "button",
            label: "Join the Cloud Pro waitlist",
            onClick: () => openModal("pro"),
          }}
          ctaStyle="wood"
          selected={selected === "pro"}
          onSelect={() => select("pro")}
        />

        <PricingTierCard
          selectionId="tier-max"
          name="Cabinet Cloud Max"
          tagline="More capacity, hardened backups, and faster support."
          badge="Recommended"
          highlighted
          priceMonthly={49}
          priceAnnualEffective={40}
          billingPeriod={billing}
          annualNote="$480 billed annually"
          inheritsFromLabel="Cloud Pro"
          bullets={[
            "Larger container for longer agent runs",
            "Encrypted backups with 30-day retention",
            "Point-in-time restore",
            "Custom domain",
            "Chat support under one hour during business hours",
            "Region pinning",
          ]}
          cta={{
            kind: "button",
            label: "Join the Cloud Max waitlist",
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
          inheritsFromLabel="Cloud Max"
          bullets={[
            "Shared workspaces in early access",
            "Dedicated infrastructure and data residency",
            "SSO with SAML or OIDC",
            "99.9% SLA",
            "Security review material and SOC 2 readiness plan",
            "Dedicated Slack channel",
          ]}
          cta={{
            kind: "link",
            label: "Book a technical review",
            href: "/demo?source=pricing-enterprise",
            onClick: () =>
              trackEvent("pricing_tier_cta_click", {
                tier: "enterprise",
                action: "book-review",
              }),
          }}
          ctaStyle="outline"
          selected={selected === "enterprise"}
          onSelect={() => select("enterprise")}
        />
      </fieldset>

      <div className="mx-auto mt-12 max-w-3xl">
        <div className="home-product-surface rounded-[24px] bg-green-bg-subtle px-6 py-5 md:px-7 md:py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
            <div className="flex items-start gap-3">
              <div className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-lg">
                <WoodIcon icon={Users} className="h-8 w-8" />
              </div>
              <div>
                <h3 className="mb-0.5 font-section text-lg text-text-primary">
                  Working with a team?
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Shared workspaces are coming. Join early access and we will
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
              className="ent-btn-secondary shrink-0 justify-center px-4 py-2 text-sm text-green-warm"
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
