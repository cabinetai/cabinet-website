import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ArrowRight, Check, Cloud, MessageSquare } from "lucide-react";
import { DiscordIcon, GithubIcon } from "@/components/site-icons";
import { CloudHeroWaitlist } from "@/components/cloud-hero-waitlist";
import { WaitlistCloudBackdrop } from "@/components/waitlist-cloud-backdrop";
import { DISCORD_URL, GITHUB_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cabinet Cloud: Join the Waitlist",
  description:
    "Cabinet Cloud is coming. Connect to your Cabinet from anywhere while your AI team works 24/7: no setup, automatic updates, priority access for early supporters.",
};

export default function CloudPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="relative py-20 md:py-28 dot-grid overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-90">
          <WaitlistCloudBackdrop />
        </div>

        <div className="relative z-[1] max-w-5xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-bg-card text-xs font-code text-text-tertiary mb-8">
              <Cloud className="w-3.5 h-3.5 text-accent" />
              Cabinet Cloud is coming soon
            </div>

            <Image
              src="/cabinet-icon.png"
              alt="Cabinet"
              width={72}
              height={72}
              className="mx-auto mb-6 rounded-2xl"
            />

            <h1 className="text-4xl md:text-5xl font-display text-text-primary tracking-tight leading-[1.05] mb-5">
              Your Cabinet, anywhere.
              <br />
              <span className="italic gradient-text">Your AI team, always on.</span>
            </h1>

            <p className="text-lg text-text-secondary font-body-serif leading-relaxed">
              Open your Cabinet from any device while your AI agents keep working
              (drafting, researching, organizing) even when your laptop is closed.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="max-w-xl mx-auto mb-6 h-[160px] rounded-[28px] border border-border bg-bg-card/50" />
            }
          >
            <CloudHeroWaitlist
              source="cloud-page"
              originPage="/cloud"
              className="max-w-xl mx-auto mb-6"
            />
          </Suspense>

          <p className="mb-12 text-center text-sm text-text-tertiary font-code">
            <a
              href="/pricing"
              className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-text-primary transition-colors"
            >
              See pricing
              <ArrowRight className="h-3 w-3" />
            </a>
          </p>

          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
            <div className="rounded-xl border border-border bg-bg-card p-6">
              <Check className="w-5 h-5 text-accent mb-3" />
              <h2 className="font-display text-xl text-text-primary mb-2">Connect from anywhere</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                One Cabinet across phone, laptop, and browser. Pick up exactly where
                you left off, no setup required.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-bg-card p-6">
              <Check className="w-5 h-5 text-accent mb-3" />
              <h2 className="font-display text-xl text-text-primary mb-2">Agents that don&apos;t sleep</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Your AI team keeps running 24/7 in the background. Wake up to drafts
                written, inboxes triaged, and research done.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-bg-card p-6">
              <Check className="w-5 h-5 text-accent mb-3" />
              <h2 className="font-display text-xl text-text-primary mb-2">Priority access</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                First 500 early supporters get priority access when Cabinet Cloud
                opens up.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium transition-colors shadow-sm shadow-[#5865F2]/20"
            >
              <DiscordIcon className="w-4 h-4" />
              Join Discord
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-border hover:border-border-dark text-text-secondary hover:text-text-primary font-medium transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              Star on GitHub
            </a>
            <a
              href="/#get-started"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent hover:bg-accent-warm text-white font-medium transition-all shadow-sm"
            >
              Try Cabinet now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
