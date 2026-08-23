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

const CABINET_AI_MONTHLY = 10;

export function PricingInteractive() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const [cabinetAi, setCabinetAi] = useState(false);
  const [selected, setSelected] = useState<Selection>("max");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTier, setModalTier] = useState<PricingTier>("pro");
  const addOn = cabinetAi ? CABINET_AI_MONTHLY : 0;

  useEffect(() => {
    trackEvent("pricing_view");
  }, []);

  const toggleCabinetAi = () => {
    const next = !cabinetAi;
    setCabinetAi(next);
    trackEvent("pricing_cabinet_ai_toggle", { enabled: next });
  };

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
      <div className="mb-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <PricingBillingToggle value={billing} onChange={handleBillingChange} />
        <button
          type="button"
          onClick={toggleCabinetAi}
          aria-pressed={cabinetAi}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-colors ${
            cabinetAi
              ? "bg-accent text-white"
              : "bg-bg-card text-text-secondary hover:text-text-primary"
          }`}
        >
          <span
            aria-hidden
            className={`h-2 w-2 rounded-full ${cabinetAi ? "bg-white" : "bg-accent"}`}
          />
          Add Cabinet AI
          <span className={cabinetAi ? "text-white/80" : "text-text-tertiary"}>
            +${CABINET_AI_MONTHLY}/mo
          </span>
        </button>
      </div>

      <fieldset className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
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
            "Open source and free to run",
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
          priceMonthly={20 + addOn}
          priceAnnualEffective={16 + addOn}
          billingPeriod={billing}
          annualNote={`$${(16 + addOn) * 12} billed annually`}
          bullets={[
            "Access across phone, laptop, and browser",
            "Agents can keep scheduled work moving",
            "Daily backups with 7-day retention",
            "Automatic updates",
            cabinetAi ? "Cabinet AI included" : "Bring your own AI or add Cabinet AI",
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
          priceMonthly={49 + addOn}
          priceAnnualEffective={40 + addOn}
          billingPeriod={billing}
          annualNote={`$${(40 + addOn) * 12} billed annually`}
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

      <div className="mx-auto mt-5 max-w-3xl">
        <div className="home-product-surface flex flex-col items-center gap-3 rounded-full bg-green-bg-subtle px-6 py-2.5 sm:flex-row sm:justify-center">
          <p className="flex items-center gap-2.5 text-sm text-text-secondary">
            <WoodIcon icon={Users} className="h-6 w-6 shrink-0" />
            <span>
              <span className="font-section text-text-primary">Working with a team?</span>{" "}
              Shared workspaces are coming.
            </span>
          </p>
          <button
            type="button"
            onClick={() => {
              trackEvent("pricing_team_early_click");
              openModal("team-early");
            }}
            className="ent-btn-secondary shrink-0 justify-center px-4 py-1.5 text-sm text-green-warm"
          >
            Join Team early access
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
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
