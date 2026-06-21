import type { Metadata } from "next";
import { SiteNavbar } from "@/components/site-navbar";
import { UseCasesBrowser } from "@/components/use-cases-browser";
import { USE_CASES } from "@/lib/use-cases";

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
            <p className="font-code text-xs uppercase tracking-[0.18em] text-accent mb-5">
              Use cases
            </p>
            <h1 className="text-4xl md:text-5xl font-display text-text-primary tracking-tight leading-[1.05] mb-5">
              How teams use <span className="italic gradient-text">Cabinet</span>
            </h1>
            <p className="text-lg text-text-secondary font-body-serif leading-relaxed">
              Real, end-to-end workflows people run in Cabinet, with the exact
              setup so you can steal it.
            </p>
          </div>

          <UseCasesBrowser items={USE_CASES} />
        </div>
      </section>
    </main>
  );
}
