import type { Metadata } from "next";
import { SiteNavbar } from "@/components/site-navbar";
import { UseCasesBrowser } from "@/components/use-cases-browser";
import { USE_CASES } from "@/lib/use-cases";
import {
  WORKFLOW_CABINET_SLUGS,
  cabinetBySlug,
  cabinetUrl,
  cabinetCover,
} from "@/lib/cabinets";

const SITE = "https://runcabinet.com";

export const metadata: Metadata = {
  title: "How teams use Cabinet | Use cases",
  description:
    "Real, end-to-end workflows people run in Cabinet, with the exact setup so you can steal it. Product audits, agent swarms, and more.",
  alternates: { canonical: "/use-cases" },
  openGraph: {
    title: "How teams use Cabinet",
    description:
      "Real, end-to-end workflows people run in Cabinet, with the exact setup so you can steal it.",
    type: "website",
    url: `${SITE}/use-cases`,
    images: [USE_CASES[0].cover],
  },
  twitter: {
    card: "summary_large_image",
    title: "How teams use Cabinet",
    description:
      "Real, end-to-end workflows people run in Cabinet, with the exact setup so you can steal it.",
    images: [USE_CASES[0].cover],
  },
};

export default function UseCasesPage() {
  return (
    <main className="min-h-screen bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "How teams use Cabinet",
            description:
              "Real, end-to-end workflows people run in Cabinet, with the exact setup so you can steal it.",
            url: `${SITE}/use-cases`,
            hasPart: USE_CASES.map((u) => ({
              "@type": "BlogPosting",
              headline: u.title,
              description: u.blurb,
              url: `${SITE}/use-cases/${u.slug}`,
              datePublished: u.date,
              keywords: u.tags.join(", "),
              author: { "@type": "Person", name: u.author },
              publisher: { "@type": "Organization", name: "Cabinet" },
            })),
          }),
        }}
      />
      <SiteNavbar />
      <section className="relative py-20 md:py-28 dot-grid overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero */}
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <p className="font-code text-xs uppercase tracking-[0.08em] text-accent mb-5">
              Use cases
            </p>
            <h1 className="text-4xl md:text-5xl font-display text-text-primary tracking-tight leading-[1.05] mb-5">
              How teams use <span className="font-brand italic">Cabinet</span>
            </h1>
            <p className="text-lg text-text-secondary font-body-serif leading-relaxed">Real, end-to-end workflows people run in <span className="font-brand italic">Cabinet</span>, with the exact
                            setup so you can steal it.
                          </p>
          </div>

          <UseCasesBrowser items={USE_CASES} />
        </div>
      </section>
      {/* Assistant workflows: the daily-operating set, each a real registry
          cabinet you can clone (see TOWN.md for the competitive mapping). */}
      <section className="py-20 bg-bg-warm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Run your day in Cabinet</p>
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
              Your inbox, meetings, and answers, handled
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed">
              Each workflow below is a complete cabinet: agents, jobs, and
              knowledge. Clone it, connect your tools, and it starts working.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {WORKFLOW_CABINET_SLUGS.map((slug) => {
              const c = cabinetBySlug(slug);
              if (!c) return null;
              return (
                <a
                  key={c.slug}
                  href={cabinetUrl(c.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col overflow-hidden rounded-2xl card-skin card-hover"
                >
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ paddingBottom: "56%" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cabinetCover(c.slug)}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 font-display text-lg text-text-primary">
                      {c.name}
                    </h3>
                    <p className="mb-3 flex-1 text-sm text-text-secondary font-body-serif leading-relaxed">
                      {c.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {c.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-accent-bg px-2 py-0.5 font-code text-[11px] text-accent"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
