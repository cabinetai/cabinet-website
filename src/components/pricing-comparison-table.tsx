import { Check, X } from "lucide-react";

type Cell = boolean | string;
type Row = {
  feature: string;
  selfHosted: Cell;
  pro: Cell;
  max: Cell;
  enterprise: Cell;
};

const ROWS: Row[] = [
  {
    feature: "Hosting",
    selfHosted: "Your machine",
    pro: "Managed container",
    max: "Managed container",
    enterprise: "Dedicated infra",
  },
  {
    feature: "Container size",
    selfHosted: "N/A",
    pro: "2 GB RAM",
    max: "4 GB RAM",
    enterprise: "Custom",
  },
  {
    feature: "Storage",
    selfHosted: "Unlimited (your disk)",
    pro: "20 GB",
    max: "100 GB",
    enterprise: "Custom",
  },
  {
    feature: "Daily backups",
    selfHosted: "DIY",
    pro: "7-day retention",
    max: "30-day retention",
    enterprise: "Custom retention",
  },
  {
    feature: "Encrypted backups",
    selfHosted: "DIY",
    pro: false,
    max: true,
    enterprise: true,
  },
  {
    feature: "Point-in-time restore",
    selfHosted: false,
    pro: false,
    max: true,
    enterprise: true,
  },
  {
    feature: "Custom domain",
    selfHosted: "Yours",
    pro: false,
    max: true,
    enterprise: true,
  },
  {
    feature: "AI access (BYOAI)",
    selfHosted: "BYOAI",
    pro: "BYOAI · Managed add-on",
    max: "BYOAI · Managed add-on",
    enterprise: "Custom",
  },
  {
    feature: "Support response",
    selfHosted: "Community",
    pro: "Email · 24h",
    max: "Instant chat · <1h",
    enterprise: "Dedicated Slack",
  },
  {
    feature: "Multi-user / shared workspaces",
    selfHosted: false,
    pro: false,
    max: false,
    enterprise: true,
  },
  {
    feature: "SSO (SAML / OIDC)",
    selfHosted: false,
    pro: false,
    max: false,
    enterprise: true,
  },
  {
    feature: "SLA",
    selfHosted: false,
    pro: false,
    max: false,
    enterprise: "99.9%",
  },
  {
    feature: "Security review docs",
    selfHosted: false,
    pro: false,
    max: false,
    enterprise: true,
  },
  {
    feature: "Migration in / out",
    selfHosted: "Markdown export",
    pro: "Markdown export",
    max: "Markdown export",
    enterprise: "Markdown export",
  },
];

function renderCell(value: Cell) {
  if (value === true) {
    return <Check className="mx-auto h-4 w-4 text-accent" aria-label="Yes" />;
  }
  if (value === false) {
    return <X className="mx-auto h-4 w-4 text-text-muted" aria-label="No" />;
  }
  return <span className="text-text-primary">{value}</span>;
}

export function PricingComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-bg-card">
      <table className="w-full min-w-[760px] text-sm">
        <thead>
          <tr className="border-b border-border-dark">
            <th
              scope="col"
              className="text-left py-4 px-5 font-medium text-text-secondary"
            >
              Feature
            </th>
            <th
              scope="col"
              className="text-center py-4 px-4 font-semibold text-text-primary"
            >
              Self-Hosted
            </th>
            <th
              scope="col"
              className="text-center py-4 px-4 font-semibold text-text-primary"
            >
              Pro
            </th>
            <th
              scope="col"
              className="text-center py-4 px-4 font-semibold text-accent"
            >
              Max
            </th>
            <th
              scope="col"
              className="text-center py-4 px-4 font-semibold text-text-primary"
            >
              Enterprise
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr
              key={row.feature}
              className="border-b border-border-light last:border-b-0 hover:bg-bg-warm/50"
            >
              <th
                scope="row"
                className="py-3.5 px-5 text-left font-normal text-text-primary"
              >
                {row.feature}
              </th>
              <td className="py-3.5 px-4 text-center text-text-secondary">
                {renderCell(row.selfHosted)}
              </td>
              <td className="py-3.5 px-4 text-center text-text-secondary">
                {renderCell(row.pro)}
              </td>
              <td className="py-3.5 px-4 text-center text-text-secondary">
                {renderCell(row.max)}
              </td>
              <td className="py-3.5 px-4 text-center text-text-secondary">
                {renderCell(row.enterprise)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
