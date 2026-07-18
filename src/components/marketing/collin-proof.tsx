import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { MotionReveal } from "./motion-primitives";

const LINKEDIN_URL = "https://www.linkedin.com/in/collinedavis/";

export function CollinProof() {
  return (
    <section className="home-snap-section home-proof-section px-5 sm:px-6 lg:px-8">
      <MotionReveal variant="pop" className="w-full">
      <figure className="home-cta-surface relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-accent-bg-subtle px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <div aria-hidden className="home-light-cta-wash pointer-events-none absolute inset-0" />
        <Image
          src="/brand/ui/quote.png"
          alt=""
          width={220}
          height={220}
          className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 object-contain opacity-[0.22] sm:h-56 sm:w-56"
        />

        <div className="relative z-10 grid items-end gap-10 lg:grid-cols-[1fr_270px] lg:gap-16">
          <div>
            <p className="section-label">The reason Cabinet matters</p>
            <blockquote className="mt-5 max-w-[18ch] font-display text-[clamp(2.25rem,4.6vw,4.4rem)] leading-[1.01] tracking-[-0.052em] text-text-primary">
              “Cabinet is a big unlock for how I think about operating a business with AI.”
            </blockquote>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary">
              Every business has different workflows. Cabinet makes it possible to turn those
              workflows into an AI team that has the right context, runs the work, and keeps the
              result.
            </p>
          </div>

          <figcaption className="rounded-2xl bg-bg-card p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-4">
              <Image
                src="/testimonials/collin-davis.jpg"
                alt="Collin Davis"
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover shadow-sm"
              />
              <span>
                <strong className="block text-sm text-text-primary">Collin Davis</strong>
                <span className="mt-1 block text-xs leading-relaxed text-text-tertiary">
                  Chief Product Officer, Clover
                </span>
              </span>
            </div>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-warm"
            >
              View profile <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
            </a>
          </figcaption>
        </div>
      </figure>
      </MotionReveal>
    </section>
  );
}
