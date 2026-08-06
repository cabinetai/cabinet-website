import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, GitBranch, ShieldCheck, Server } from "lucide-react";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { OsDownloadButtons, TerminalInstall } from "@/components/marketing/os-download";
import { SiteNavbar } from "@/components/site-navbar";
import { GithubIcon } from "@/components/site-icons";
import { GITHUB_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Download Cabinet",
  description:
    "Get the Cabinet desktop app for macOS, Windows, or Linux, or run it from the terminal. Free, open source, and self-hosted.",
  openGraph: {
    title: "Download Cabinet",
    description:
      "Get the Cabinet desktop app for macOS, Windows, or Linux, or run it from the terminal. Free, open source, and self-hosted.",
    type: "website",
    url: "https://runcabinet.com/download",
  },
};

const ASSURANCES = [
  {
    icon: Server,
    title: "Runs on your machine",
    body: "Your knowledge base and files stay where you put them. Nothing is shipped to us to make Cabinet work.",
  },
  {
    icon: ShieldCheck,
    title: "Your AI keys, your accounts",
    body: "Connect Claude, GPT, or Gemini with credentials your company already owns and controls.",
  },
  {
    icon: GitBranch,
    title: "Open source",
    body: "Read the code, build it yourself, and follow every release on GitHub.",
  },
];

export default function DownloadPage() {
  return (
    <main className="bg-bg text-text-primary">
      <SiteNavbar fixed />

      <section className="relative isolate overflow-hidden px-5 pb-16 pt-32 sm:px-6 lg:px-8 lg:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_78%)] dot-grid"
        />

        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label mb-5">Get Cabinet</p>
          <h1 className="font-display text-[clamp(2.4rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-text-primary">
            Download <span className="font-brand italic">Cabinet</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
            Free and open source. Install the desktop app, point it at your knowledge base, and
            put your first AI team to work in about two minutes.
          </p>

          <div className="mx-auto mt-10 max-w-3xl text-left">
            <OsDownloadButtons />
            <TerminalInstall className="mt-3" />
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-text-tertiary">
            <span className="inline-flex items-center gap-1.5">
              <Check aria-hidden className="h-3.5 w-3.5 text-green" /> No subscription
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check aria-hidden className="h-3.5 w-3.5 text-green" /> No trial clock
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check aria-hidden className="h-3.5 w-3.5 text-green" /> No vendor lock-in
            </span>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          {ASSURANCES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="card-skin rounded-2xl p-6">
              <Icon aria-hidden className="h-5 w-5 text-accent" />
              <h2 className="mt-4 font-display text-lg text-text-primary">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-bg-warm px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl text-text-primary">
            Rolling <span className="font-brand italic">Cabinet</span> out to a team?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-text-secondary">
            We will walk through one of your recurring workflows and the deployment shape that
            fits your security review.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/demo"
              className="btn-wood inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-sm font-semibold"
            >
              Book an executive demo <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="card-skin inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-card-hover"
            >
              <GithubIcon className="h-4 w-4" />
              View the source
            </a>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}
