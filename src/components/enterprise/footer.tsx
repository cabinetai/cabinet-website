import Image from "next/image";
import { DISCORD_URL, GITHUB_URL } from "@/lib/site-config";

const COLUMNS: { title: string; links: { label: string; href: string; ext?: boolean }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/enterprise/platform" },
      { label: "Security", href: "/enterprise/security" },
      { label: "Solutions", href: "/enterprise/solutions" },
      { label: "Pricing", href: "/pricing" },
      { label: "Cabinet Cloud", href: "/cloud" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "https://docs.runcabinet.com/", ext: true },
      { label: "GitHub", href: GITHUB_URL, ext: true },
      { label: "Discord", href: DISCORD_URL, ext: true },
      { label: "In the wild", href: "/media" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Founder", href: "/enterprise/about" },
      { label: "Request a briefing", href: "/enterprise/briefing" },
      { label: "Contact", href: "mailto:hi@runcabinet.com", ext: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export function EnterpriseFooter() {
  return (
    <footer className="bg-bg-warm border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-10">
          {/* Brand block */}
          <div className="max-w-sm">
            <a href="/enterprise" className="flex items-center gap-3">
              <Image
                src="/cabinet-icon.png"
                alt="Cabinet"
                width={32}
                height={32}
                className="rounded-md"
              />
              <span className="font-brand italic text-xl text-text-primary">Cabinet</span>
            </a>
            <p className="mt-4 text-[15px] text-text-secondary leading-relaxed font-body-serif">
              The substrate for strategy execution. Open source. File-based.
              Built for the office of the CEO — and every manager beneath.
            </p>
            <p className="mt-5 text-xs text-text-tertiary">
              Built by{" "}
              <a
                href="/enterprise/about"
                className="font-medium text-text-secondary hover:text-text-primary underline decoration-border-dark underline-offset-2"
              >
                Hila Shmuel
              </a>
              , ex-Apple AI &amp; Data Infrastructure.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.ext ? "_blank" : undefined}
                      rel={l.ext ? "noopener noreferrer" : undefined}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 justify-between">
          <p className="text-xs text-text-tertiary">
            © {new Date().getFullYear()} Cabinet. A product of Holy Bible Apps Ltd.
          </p>
          <p className="text-xs text-text-tertiary">
            Made with care in Tel Aviv · Open source · MIT licensed
          </p>
        </div>
      </div>
    </footer>
  );
}
