import type { Metadata } from "next";
import { DiscordIcon } from "@/components/site-icons";
import { SiteNavbar } from "@/components/site-navbar";
import { DISCORD_URL } from "@/lib/site-config";

type Video = {
  id: string;
  title: string;
  authorName: string;
  authorHandle: string;
  channelUrl: string;
  blurb: string;
};

const CHANNEL_URL = "https://www.youtube.com/@SyntaxGTM";

const VIDEOS: Video[] = [
  {
    id: "k4Bo2QolYTQ",
    title: "Stop Losing Context in AI Conversations — Meet Cabinet, the Open Source Fix",
    authorName: "Tom Granot",
    authorHandle: "SyntaxGTM",
    channelUrl: CHANNEL_URL,
    blurb:
      "Tom Granot walks through the problem every AI-native developer hits: context evaporates between sessions, prompts, and tools. Cabinet is the open-source fix — a persistent, file-based knowledge base your agents can actually read from and write to.",
  },
  {
    id: "mK91g0QZpSk",
    title: "LLM Knowledge Bases, The Karpathy Effect & The Solution",
    authorName: "Tom Granot",
    authorHandle: "SyntaxGTM",
    channelUrl: CHANNEL_URL,
    blurb:
      "A deep dive into why LLM knowledge bases are the next frontier for AI-powered development — exploring Andrej Karpathy's vision for software 2.0, why context quality determines AI output quality, and how Cabinet solves the knowledge gap for developer teams.",
  },
];

const FEATURED = VIDEOS[0];
const FEATURED_THUMBNAIL = `https://i.ytimg.com/vi/${FEATURED.id}/hqdefault.jpg`;

export const metadata: Metadata = {
  title: "In the Wild — Cabinet | Stop Losing Context in AI Conversations",
  description:
    "Real demos, community builds, and coverage of Cabinet from around the web. Watch Tom Granot (SyntaxGTM) explain why Cabinet is the open-source fix for context loss in AI-native development.",
  openGraph: {
    title: "Stop Losing Context in AI Conversations — Meet Cabinet, the Open Source Fix",
    description:
      "Tom Granot (SyntaxGTM) walks through why context evaporates in AI workflows — and how Cabinet's persistent, file-based knowledge base fixes it.",
    images: [{ url: FEATURED_THUMBNAIL, width: 480, height: 360, alt: FEATURED.title }],
    type: "video.other",
    url: "https://runcabinet.com/media",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop Losing Context in AI Conversations — Meet Cabinet, the Open Source Fix",
    description:
      "Tom Granot (SyntaxGTM) on why Cabinet is the open-source fix for context loss in AI-native development.",
    images: [FEATURED_THUMBNAIL],
  },
};

export default function MediaPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* JSON-LD VideoObject entries for Google rich results */}
      {VIDEOS.map((video) => (
        <script
          key={video.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: video.title,
              description: video.blurb,
              thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
              embedUrl: `https://www.youtube.com/embed/${video.id}`,
              url: `https://youtu.be/${video.id}`,
              author: {
                "@type": "Person",
                name: video.authorName,
                url: video.channelUrl,
              },
            }),
          }}
        />
      ))}

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

          {/* Video list */}
          <div className="space-y-14 mb-14">
            {VIDEOS.map((video) => {
              const videoUrl = `https://youtu.be/${video.id}`;
              return (
                <div key={video.id}>
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-block mb-4"
                  >
                    <h2 className="text-xl md:text-2xl font-display text-text-primary leading-snug group-hover:text-accent transition-colors">
                      {video.title}
                    </h2>
                  </a>

                  <div className="rounded-2xl overflow-hidden border border-border shadow-lg bg-bg-card">
                    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
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
                        href={video.channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        {video.authorName}
                      </a>
                      {" · "}
                      <a
                        href={video.channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-text-primary transition-colors"
                      >
                        {video.authorHandle}
                      </a>
                      {" on "}
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-text-primary transition-colors"
                      >
                        YouTube
                      </a>
                    </p>
                    <p className="text-sm text-text-secondary font-body-serif leading-relaxed">
                      {video.blurb}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Content below the videos */}
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
