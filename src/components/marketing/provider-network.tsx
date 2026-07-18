import Image from "next/image";
import { MotionReveal } from "./motion-primitives";

const PROVIDERS = [
  { name: "Claude", src: "/brand/vendors/claude.png", position: "left-[7%] top-[8%] sm:left-[10%]" },
  { name: "OpenAI", src: "/brand/vendors/openai.png", position: "left-[39%] top-[2%]" },
  { name: "Gemini", src: "/brand/vendors/gemini.png", position: "right-[7%] top-[8%] sm:right-[10%]" },
  { name: "Grok", src: "/brand/vendors/grok.png", position: "right-[1%] top-[39%]" },
  { name: "Copilot", src: "/brand/vendors/copilot.png", position: "bottom-[6%] right-[7%] sm:right-[10%]" },
  { name: "Cursor", src: "/brand/vendors/cursor.png", position: "bottom-[1%] left-[39%]" },
  { name: "OpenCode", src: "/brand/vendors/opencode.png", position: "bottom-[6%] left-[3%] sm:left-[7%]" },
  { name: "Pi", src: "/brand/vendors/pi.png", position: "left-[1%] top-[39%]" },
] as const;

const PATHS = [
  "M125 85 C230 115 260 185 400 260",
  "M360 48 C365 125 380 175 400 260",
  "M675 85 C570 115 540 185 400 260",
  "M754 220 C625 220 550 240 400 260",
  "M675 435 C565 405 525 330 400 260",
  "M360 472 C365 390 380 335 400 260",
  "M120 435 C235 405 275 330 400 260",
  "M46 220 C175 220 250 240 400 260",
] as const;

const BENEFITS = [
  {
    image: "/brand/ui/team.png",
    title: "Choose per agent",
    body: "Use the right provider for research, writing, engineering, or operations.",
  },
  {
    image: "/brand/ui/key.png",
    title: "Keep company access",
    body: "Your company retains its accounts, quota, policy, and provider relationships.",
  },
  {
    image: "/brand/ui/migrate.png",
    title: "Change models, keep the team",
    body: "Roles, company context, jobs, artifacts, and history remain in Cabinet.",
  },
] as const;

export function ProviderNetwork() {
  return (
    <section
      id="providers"
      className="home-snap-section home-viewport-section relative isolate scroll-mt-24 overflow-hidden bg-green-bg-subtle px-5 sm:px-6 lg:px-8"
    >
      <div aria-hidden className="home-light-ai-wash pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:gap-16">
        <MotionReveal variant="left" className="order-2 lg:order-1">
          <div className="provider-network-canvas relative mx-auto h-[430px] w-full max-w-3xl overflow-hidden rounded-[30px] bg-bg-card shadow-[0_36px_90px_-54px_rgba(59,47,47,0.7)] sm:h-auto sm:aspect-[8/5]">
            <div aria-hidden className="dot-grid absolute inset-0 opacity-25 [mask-image:radial-gradient(circle_at_center,black,transparent_76%)]" />
            <svg
              aria-hidden
              viewBox="0 0 800 520"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              {PATHS.map((path, index) => (
                <path
                  key={path}
                  d={path}
                  pathLength="1"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  className="provider-connector"
                  style={{ animationDelay: `${index * 150}ms` }}
                />
              ))}
            </svg>

            {PROVIDERS.map((provider, index) => (
              <div
                key={provider.name}
                className={`provider-node absolute z-10 flex w-16 flex-col items-center sm:w-20 ${provider.position}`}
                style={{ animationDelay: `${220 + index * 100}ms` }}
              >
                <Image
                  src={provider.src}
                  alt=""
                  width={80}
                  height={80}
                  className="provider-token h-14 w-14 object-contain drop-shadow-[0_12px_14px_rgba(75,53,35,0.18)] sm:h-18 sm:w-18"
                  style={{ animationDelay: `${index * -0.55}s` }}
                />
                <span className="mt-1 rounded-full bg-bg-card/90 px-2 py-0.5 text-[8px] font-semibold text-text-secondary shadow-sm sm:text-[9px]">
                  {provider.name}
                </span>
              </div>
            ))}

            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="provider-core relative grid h-32 w-32 place-items-center rounded-[28px] bg-bg-card shadow-[0_28px_54px_-28px_rgba(59,47,47,0.62)] sm:h-38 sm:w-38">
                <Image
                  src="/brand/cabinet-logo-top-open-512.png"
                  alt="Cabinet"
                  width={152}
                  height={152}
                  className="h-28 w-28 object-contain drop-shadow-[0_15px_18px_rgba(59,47,47,0.18)] sm:h-34 sm:w-34"
                />
              </div>
              <span className="mt-3 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-green-bg px-3 py-1.5 text-[10px] font-semibold text-green-warm shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-green" /> Your AI connects to Cabinet
              </span>
            </div>
          </div>
        </MotionReveal>

        <MotionReveal variant="right" delay={0.08} className="order-1 lg:order-2">
          <p className="section-label">Bring your own AI</p>
          <h2 className="mt-5 max-w-[13ch] font-section text-[clamp(2.25rem,3.6vw,3.6rem)] leading-[1.02] text-text-primary">
            Works with the AI you already pay for.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Cabinet runs on your existing model accounts and subscriptions. There is no bundled
            inference marked up on top, and no new AI vendor to push through procurement. Point
            it at what your team already uses.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="flex items-center gap-3 rounded-2xl bg-bg-card/75 p-3.5 shadow-sm">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-bg-subtle">
                  <Image
                    src={benefit.image}
                    alt=""
                    width={44}
                    height={44}
                    className="h-10 w-10 object-contain"
                  />
                </span>
                <span>
                  <strong className="block text-xs text-text-primary">{benefit.title}</strong>
                  <span className="mt-1 block text-[11px] leading-relaxed text-text-secondary">
                    {benefit.body}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
