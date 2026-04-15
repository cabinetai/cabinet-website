import type { Metadata } from "next";
import { DiscordIcon } from "@/components/site-icons";
import { SiteNavbar } from "@/components/site-navbar";
import { DISCORD_URL } from "@/lib/site-config";

const VIDEO_URL = "https://youtu.be/mK91g0QZpSk";
const CHANNEL_URL = "https://www.youtube.com/@SyntaxGTM";
const VIDEO_TITLE = "LLM Knowledge Bases, The Karpathy Effect & The Solution";
const THUMBNAIL_URL = "https://i.ytimg.com/vi/mK91g0QZpSk/hqdefault.jpg";

export const metadata: Metadata = {
  title: "In the Wild — Cabinet | LLM Knowledge Bases & The Karpathy Effect",
  description:
    "Watch Tom Granot (SyntaxGTM) break down LLM knowledge bases, the Karpathy Effect, and why Cabinet is the solution for AI-native developer teams.",
  openGraph: {
    title: "LLM Knowledge Bases, The Karpathy Effect & The Solution — Cabinet",
    description:
      "Tom Granot (SyntaxGTM) dives into why context quality defines AI output quality — and how Cabinet solves the knowledge gap for developer teams.",
    images: [{ url: THUMBNAIL_URL, width: 480, height: 360, alt: VIDEO_TITLE }],
    type: "video.other",
    url: "https://runcabinet.com/media",
  },
  twitter: {
    card: "summary_large_image",
    title: "LLM Knowledge Bases, The Karpathy Effect & The Solution — Cabinet",
    description:
      "Tom Granot (SyntaxGTM) explains why your AI is only as good as its knowledge base — and how Cabinet fixes that.",
    images: [THUMBNAIL_URL],
  },
};

export default function MediaPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* JSON-LD VideoObject for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: VIDEO_TITLE,
            description:
              "Tom Granot (SyntaxGTM) breaks down LLM knowledge bases, the Karpathy Effect, and why Cabinet is the solution for AI-native developer teams.",
            thumbnailUrl: THUMBNAIL_URL,
            embedUrl: "https://www.youtube.com/embed/mK91g0QZpSk",
            url: VIDEO_URL,
            author: {
              "@type": "Person",
              name: "Tom Granot",
              url: CHANNEL_URL,
            },
          }),
        }}
      />

      <SiteNavbar />

      <section className="relative py-20 md:py-28 dot-grid overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">

          {/* Hero text */}
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-display text-text-primary tracking-tight leading-[1.05] mb-5">
              See Cabinet
              <br />
              <span className="italic gradient-text">in action</span>
            </h1>
            <p className="text-lg text-text-secondary font-body-serif leading-relaxed">
              Real demos, community builds, and coverage of Cabinet from around the web.
            </p>
          </div>

          {/* YouTube embed */}
          <div className="mb-14">
            <a
              href={VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block mb-4"
            >
              <h2 className="text-xl md:text-2xl font-display text-text-primary leading-snug group-hover:text-accent transition-colors">
                {VIDEO_TITLE}
              </h2>
            </a>

            <div className="rounded-2xl overflow-hidden border border-border shadow-lg bg-bg-card">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src="https://www.youtube.com/embed/mK91g0QZpSk"
                  title={VIDEO_TITLE}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm font-code text-text-tertiary mb-2">
                by{" "}
                <a
                  href={CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Tom Granot
                </a>
                {" · "}
                <a
                  href={CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text-primary transition-colors"
                >
                  SyntaxGTM
                </a>
                {" on "}
                <a
                  href={VIDEO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text-primary transition-colors"
                >
                  YouTube
                </a>
              </p>
              <p className="text-sm text-text-secondary font-body-serif leading-relaxed">
                A deep dive into why LLM knowledge bases are the next frontier for AI-powered
                development — exploring Andrej Karpathy&apos;s vision for software 2.0, why context
                quality determines AI output quality, and how Cabinet solves the knowledge gap for
                developer teams.
              </p>
            </div>
          </div>

          {/* Content below the video */}
          <div className="grid md:grid-cols-2 gap-12 mb-14">
            <div>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                Why knowledge bases matter now
              </h2>
              <p className="text-text-secondary font-body-serif leading-relaxed mb-4">
                LLMs don&apos;t know your codebase, your team&apos;s decisions, or your project history.
                Every time you start a new session, that context is gone. The Karpathy Effect —
                the compounding value of feeding rich, structured context into a model — only works
                if you have a place to store and retrieve that context reliably.
              </p>
              <p className="text-text-secondary font-body-serif leading-relaxed">
                Most developers are still copy-pasting files and hoping for the best. There&apos;s a
                better way.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                Cabinet is the solution
              </h2>
              <p className="text-text-secondary font-body-serif leading-relaxed mb-4">
                Cabinet gives your AI agents a persistent, structured memory of everything that
                matters: your docs, decisions, architecture, and tribal knowledge — all indexed and
                ready to inject into any LLM context window.
              </p>
              <p className="text-text-secondary font-body-serif leading-relaxed">
                Stop re-explaining your stack on every prompt. Let Cabinet handle the context so
                you can focus on building.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3 pt-6 border-t border-border">
            <p className="text-sm font-code text-text-tertiary flex-1">
              Want to discuss? Join the community.
            </p>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-medium transition-colors shadow-sm shadow-[#5865F2]/20"
            >
              <DiscordIcon className="w-4 h-4" />
              Join Discord
            </a>
          </div>

        </div>
      </section>
    </main>
  );
}
