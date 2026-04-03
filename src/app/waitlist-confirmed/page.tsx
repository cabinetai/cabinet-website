import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { DiscordIcon, GithubIcon } from "@/components/site-icons";
import { WaitlistConfirmationTracker } from "@/components/waitlist-confirmation-tracker";
import { DISCORD_URL, GITHUB_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cabinet Cloud Waitlist Confirmed",
  description:
    "You’re on the Cabinet Cloud waitlist. Join Discord, star the repo, or try Cabinet now while we build the hosted version.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WaitlistConfirmedPage() {
  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-6 py-16">
      <Suspense fallback={null}>
        <WaitlistConfirmationTracker />
      </Suspense>

      <div className="max-w-2xl w-full text-center dict-card px-8 py-10 md:px-12 md:py-12">
        <Image
          src="/cabinet-icon.png"
          alt="Cabinet"
          width={72}
          height={72}
          className="mx-auto mb-6 rounded-2xl"
        />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-accent-bg-subtle text-xs font-code text-accent mb-6">
          <CheckCircle2 className="w-3.5 h-3.5" />
          waitlist confirmed
        </div>

        <h1 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
          You’re on the Cabinet Cloud waitlist
        </h1>

        <p className="text-lg text-text-secondary font-body-serif leading-relaxed mb-3">
          Hosted version coming soon. Thanks for getting in early.
        </p>

        <p className="text-sm font-code text-accent mb-8">
          First 500 early supporters get priority access.
        </p>

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
    </main>
  );
}
