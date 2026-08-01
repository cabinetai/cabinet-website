import Image from "next/image";
import Link from "next/link";
import { DISCORD_URL, GITHUB_URL } from "@/lib/site-config";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "AI teams", href: "/#product" },
      { label: "Templates", href: "/templates" },
      { label: "Connect knowledge", href: "/#knowledge" },
      { label: "Bring your own AI", href: "/#providers" },
      { label: "Security", href: "/enterprise/security" },
      { label: "Pricing", href: "/pricing" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "AI leadership", href: "/solutions/founders" },
      { label: "Operations", href: "/solutions/operations" },
      { label: "Product", href: "/solutions/product" },
      { label: "Engineering", href: "/solutions/engineering" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "https://docs.runcabinet.com/", external: true },
      { label: "GitHub", href: GITHUB_URL, external: true },
      { label: "Discord", href: DISCORD_URL, external: true },
      { label: "Compare", href: "/compare" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Careers", href: "/careers" },
      { label: "Media", href: "/media" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
] as const;

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-bg-warm">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-18">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Cabinet home">
              <Image
                src="/brand/cabinet-logo-face-2-512.png"
                alt=""
                width={36}
                height={38}
                className="h-9 w-auto"
              />
              <span className="font-brand text-2xl italic tracking-tight text-text-primary">
                Cabinet
              </span>
            </Link>
            <p className="mt-5 text-[15px] leading-relaxed text-text-secondary">
              Working AI teams, connected company knowledge, and live work in an environment your
              company controls.
            </p>
            <a
              href="mailto:hi@runcabinet.com"
              className="mt-5 inline-block text-sm font-semibold text-accent hover:text-accent-warm"
            >
              hi@runcabinet.com
            </a>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-tertiary">
                {column.title}
              </p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cabinet, Inc.</p>
          <p>Open source. Self-hosted. Bring your own AI.</p>
        </div>
      </div>
    </footer>
  );
}
