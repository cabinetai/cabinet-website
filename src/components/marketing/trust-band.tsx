import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  History,
  KeyRound,
  LockKeyhole,
  ScrollText,
  Server,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { MotionReveal } from "./motion-primitives";

const ASSURANCES = [
  {
    icon: ScrollText,
    title: "Open source",
    body: "Every line is readable. No black box.",
  },
  {
    icon: Server,
    title: "Self-hosted",
    body: "Runs on your laptops, your VPC, or an offline machine.",
  },
  {
    icon: KeyRound,
    title: "Your AI keys",
    body: "Model calls go straight to your provider. We never see the keys.",
  },
  {
    icon: ShieldCheck,
    title: "No training on your data",
    body: "Your files never train anyone's model.",
  },
  {
    icon: History,
    title: "Audit log and git history",
    body: "Every action and every change is attributable.",
  },
  {
    icon: UserCheck,
    title: "Human approval",
    body: "Agents stop for sign-off before anything leaves.",
  },
  {
    icon: LockKeyhole,
    title: "SSO and data residency",
    body: "SAML, OIDC, and region pinning on Enterprise.",
  },
  {
    icon: BadgeCheck,
    title: "SOC 2 readiness",
    body: "A documented readiness plan, shared on request.",
  },
];

export function TrustBand() {
  return (
    <section
      id="security"
      className="home-snap-section scroll-mt-24 px-5 py-[clamp(4.5rem,8svh,7rem)] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <MotionReveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="section-label">Security and control</p>
            <h2 className="mt-3 font-section text-[clamp(2.15rem,3.5vw,3.2rem)] leading-[1.03] text-text-primary">
              Built to clear your security review.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-text-secondary">
              Self-hosted by default, open for audit, and compatible with the AI accounts your
              company already approved.
            </p>
          </div>
        </MotionReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ASSURANCES.map((item, index) => (
            <MotionReveal key={item.title} variant="pop" delay={Math.min(index * 0.06, 0.3)}>
              <article className="card-skin-warm h-full rounded-[20px] p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-bg-card text-green shadow-sm">
                  <item.icon aria-hidden className="h-4 w-4" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">{item.body}</p>
              </article>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal delay={0.15}>
          <p className="mt-10 text-center">
            <Link
              href="/enterprise/security"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-warm"
            >
              Read the security overview <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
