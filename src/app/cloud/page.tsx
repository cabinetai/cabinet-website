import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ArrowRight, Check, MessageSquare } from "lucide-react";
import { DiscordIcon, GithubIcon } from "@/components/site-icons";
import { WaitlistCapture } from "@/components/waitlist-capture";
import { DISCORD_URL, GITHUB_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cabinet Cloud — Join the Waitlist",
  description:
    "Join the Cabinet Cloud waitlist for the hosted version of Cabinet. No setup, automatic updates, and priority access for early supporters.",
};

export default function CloudPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="relative py-20 md:py-28 dot-grid overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-bg-card text-xs font-code text-text-tertiary mb-8">
              <MessageSquare className="w-3.5 h-3.5 text-accent" />
              hosted version coming soon
            </div>

            <Image
              src="/cabinet-icon.png"
              alt="Cabinet"
              width={72}
              height={72}
              className="mx-auto mb-6 rounded-2xl"
            />

            <h1 className="text-4xl md:text-5xl font-display text-text-primary tracking-tight leading-[1.05] mb-5">
              Cabinet Cloud
              <br />
              <span className="italic gradient-text">without the setup friction</span>
            </h1>

            <p className="text-lg text-text-secondary font-body-serif leading-relaxed mb-10">
              Same Cabinet idea, but hosted for you. Join the waitlist if you want the knowledge base, agents, and updates without running it yourself.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="max-w-2xl mx-auto mb-12 dict-card px-6 py-6 md:px-8 md:py-7 min-h-[320px]" />
            }
          >
            <WaitlistCapture
              source="cloud-page"
              originPage="/cloud"
              trackView
              className="max-w-2xl mx-auto mb-12"
            />
          </Suspense>

          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
            <div className="rounded-xl border border-border bg-bg-card p-6">
              <Check className="w-5 h-5 text-accent mb-3" />
              <h2 className="font-display text-xl text-text-primary mb-2">No local setup</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Skip self-hosting when you just want to start using Cabinet right away.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-bg-card p-6">
              <Check className="w-5 h-5 text-accent mb-3" />
              <h2 className="font-display text-xl text-text-primary mb-2">Automatic updates</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Get new capabilities and improvements without managing the deployment yourself.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-bg-card p-6">
              <Check className="w-5 h-5 text-accent mb-3" />
              <h2 className="font-display text-xl text-text-primary mb-2">Priority access</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                First 500 early supporters get priority access when Cabinet Cloud opens up.
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
