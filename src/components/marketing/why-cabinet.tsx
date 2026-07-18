import { MotionReveal } from "./motion-primitives";

export function WhyCabinet() {
  return (
    <section
      id="why-cabinet"
      className="home-snap-section scroll-mt-24 px-5 py-[clamp(4.5rem,8svh,7rem)] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <MotionReveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="section-label">Why Cabinet</p>
            <h2 className="mt-3 font-section text-[clamp(2.15rem,3.5vw,3.2rem)] leading-[1.03] text-text-primary">
              The only AI workspace you actually own.
            </h2>
          </div>
        </MotionReveal>

        <MotionReveal variant="pop" delay={0.1}>
          <div className="home-product-surface mx-auto mt-12 max-w-5xl rounded-[34px] bg-bg-warm px-6 py-12 text-center sm:px-12 sm:py-16">
            <p className="font-section text-[clamp(1.3rem,2.2vw,1.8rem)] leading-snug text-text-tertiary">
              Search tools find.
            </p>
            <p className="mt-2 font-section text-[clamp(1.3rem,2.2vw,1.8rem)] leading-snug text-text-tertiary">
              Chatbots answer.
            </p>
            <p className="mt-6 font-display text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[1.02] tracking-[-0.035em] text-text-primary">
              Cabinet does the work.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              On your files, your models, your infrastructure.
            </p>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
