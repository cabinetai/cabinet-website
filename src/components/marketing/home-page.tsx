import { Check } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { CabinetLibrary } from "@/components/marketing/cabinet-library";
import { HeroProductReveal } from "@/components/marketing/hero-product-reveal";
import { KnowledgeNetwork } from "@/components/marketing/knowledge-network";
import {
  LegacyByoai,
  LegacyCloudWaitlist,
  LegacyCta,
  LegacyFeaturesGrid,
  LegacyHero,
  LegacyIntegrationScene,
  LegacyIntegrationsMarquee,
  LegacyOrgBadges,
  LegacyPrinciples,
  LegacySocialProofBar,
  LegacySolutions,
  LegacyTestimonials,
  LegacyWhyTriad,
} from "@/components/marketing/legacy-sections";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { HeroHeadline, MotionReveal } from "@/components/marketing/motion-primitives";
import { SectionBadge } from "@/components/marketing/section-badge";
import { DownloadButtons } from "@/components/marketing/download-buttons";
import { LocaleProvider } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";

const HERO_COPY = {
  en: {
    eyebrow: "The AI workspace your company owns",
    body: "Cabinet shows your entire knowledge base and files, puts a team of AI specialists to work on it, and renders results as live apps and dashboards. Self-hosted, and connected to the AI providers you already trust.",
    selfHosted: "Self-hosted",
    providers: "Claude, GPT, and Gemini",
  },
  hi: {
    eyebrow: "वह AI वर्कस्पेस जो आपकी कंपनी का अपना है",
    body: "Cabinet आपका पूरा नॉलेज बेस और सारी फ़ाइलें एक जगह दिखाता है, उन पर AI विशेषज्ञों की एक टीम को काम पर लगाता है, और नतीजों को लाइव ऐप्स और डैशबोर्ड के रूप में सामने रखता है। यह आपके अपने सर्वर पर चलता है और उन्हीं AI प्रोवाइडर्स से जुड़ता है जिन पर आप पहले से भरोसा करते हैं।",
    selfHosted: "सेल्फ़-होस्टेड",
    providers: "Claude, GPT और Gemini",
  },
} as const;

// Shared by `/` and `/hi`. Client components read the locale from
// LocaleProvider; server components get it as a prop.
export function HomePage({ locale }: { locale: Locale }) {
  const hero = HERO_COPY[locale];
  return (
    <LocaleProvider locale={locale}>
    <main lang={locale} className="home-scroll-snap overflow-clip bg-bg text-text-primary">
      <SiteNavbar fixed />

      <SectionBadge n="27" title="Integration scene" origin="main">
        <LegacyIntegrationScene locale={locale} />
      </SectionBadge>

      <SectionBadge n="28" title="Cloud waitlist" origin="main">
        <LegacyCloudWaitlist locale={locale} />
      </SectionBadge>

      <SectionBadge n="31" title="Testimonials: 10x work" origin="main">
        <LegacyTestimonials locale={locale} />
      </SectionBadge>

      <SectionBadge n="01" title="Hero: AI workspace" origin="kimi">
      <section className="home-snap-section relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pb-[clamp(3rem,7vh,6rem)] pt-[clamp(7rem,12vh,9rem)] sm:px-6 lg:px-8">
        <div
          aria-hidden
          className="home-hero-wash pointer-events-none absolute inset-0 -z-20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_72%)] dot-grid"
        />

        <div className="mx-auto grid w-full max-w-[1500px] items-center gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12 xl:gap-16">
          <div className="max-w-2xl">
            <MotionReveal delay={0.04} amount={0.1}>
              <p className="section-label mb-5">{hero.eyebrow}</p>
            </MotionReveal>
            <HeroHeadline />
            <MotionReveal delay={0.5} amount={0.1}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl">
              {hero.body}
            </p>
            </MotionReveal>

            <MotionReveal delay={0.6} amount={0.1}>
              <div className="mt-8">
                <DownloadButtons align="left" locale={locale} />
              </div>
            </MotionReveal>

            <MotionReveal delay={0.7} amount={0.1}>
            <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-text-tertiary sm:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <Check aria-hidden className="h-3.5 w-3.5 text-green" /> {hero.selfHosted}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check aria-hidden className="h-3.5 w-3.5 text-green" /> {hero.providers}
              </span>
            </div>
            </MotionReveal>
          </div>

          <div className="min-w-0 lg:-mr-6 lg:pt-2 xl:-mr-10">
            <HeroProductReveal locale={locale} />
          </div>
        </div>
      </section>
      </SectionBadge>

      <SectionBadge n="06" title="Outcome explorer" origin="kimi">
        <div id="product" className="scroll-mt-24">
          <CabinetLibrary />
        </div>
      </SectionBadge>

      <SectionBadge n="02" title="Hero: knowledge base + typing" origin="main">
        <LegacyHero locale={locale} />
      </SectionBadge>

      <SectionBadge n="05" title="Why Cabinet: triad" origin="main">
        <LegacyWhyTriad locale={locale} />
      </SectionBadge>

      <SectionBadge n="09" title="Features grid: 12 cards" origin="main">
        <LegacyFeaturesGrid locale={locale} />
      </SectionBadge>

      <SectionBadge n="17" title="Solutions: every team" origin="main">
        <LegacySolutions locale={locale} />
      </SectionBadge>

      <SectionBadge n="18" title="Integrations: directory" origin="kimi">
        <KnowledgeNetwork locale={locale} />
      </SectionBadge>

      <SectionBadge n="19" title="Integrations: marquee" origin="main">
        <LegacyIntegrationsMarquee locale={locale} />
      </SectionBadge>

      <SectionBadge n="21" title="BYOAI: logo grid" origin="main">
        <LegacyByoai locale={locale} />
      </SectionBadge>

      <SectionBadge n="24" title="Built for organizations" origin="main">
        <LegacyOrgBadges locale={locale} />
      </SectionBadge>

      <SectionBadge n="25" title="Principles showcase" origin="main">
        <LegacyPrinciples locale={locale} />
      </SectionBadge>

      <SectionBadge n="29" title="Social proof bar" origin="main">
        <LegacySocialProofBar locale={locale} />
      </SectionBadge>

      <SectionBadge n="34" title="CTA: build your AI team" origin="main">
        <LegacyCta locale={locale} />
      </SectionBadge>

      <MarketingFooter locale={locale} />
    </main>
    </LocaleProvider>
  );
}
