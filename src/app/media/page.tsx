import type { Metadata } from "next";
import { DiscordIcon } from "@/components/site-icons";
import { SiteNavbar } from "@/components/site-navbar";
import { DISCORD_URL } from "@/lib/site-config";

type VideoItem = {
  kind: "video";
  id: string;
  title: string;
  authorName: string;
  authorHandle: string;
  channelUrl: string;
  publishedAt: string; // ISO date (YYYY-MM-DD)
  blurb: string;
};

type ArticleItem = {
  kind: "article";
  url: string;
  title: string;
  authorName: string;
  publication: string;
  publicationUrl: string;
  publishedAt: string; // ISO date (YYYY-MM-DD)
  blurb: string;
  quotes: string[];
};

type MediaItem = VideoItem | ArticleItem;

const CHANNEL_URL = "https://www.youtube.com/@SyntaxGTM";

const MEDIA: MediaItem[] = [
  {
    kind: "video",
    id: "k4Bo2QolYTQ",
    title: "Stop Losing Context in AI Conversations: Meet Cabinet, the Open Source Fix",
    authorName: "Tom Granot",
    authorHandle: "SyntaxGTM",
    channelUrl: CHANNEL_URL,
    publishedAt: "2026-04-21",
    blurb:
      "Tom Granot walks through the problem every AI-native developer hits: context evaporates between sessions, prompts, and tools. Cabinet is the open-source fix: a persistent, file-based knowledge base your agents can actually read from and write to.",
  },
  {
    kind: "article",
    url: "https://www.donotchurn.com/p/churn-is-just-graduation",
    title: "Churn is just graduation you didn't design for.",
    authorName: "Daria Littlefield",
    publication: "Do Not Churn",
    publicationUrl: "https://www.donotchurn.com",
    publishedAt: "2026-04-15",
    blurb:
      "Daria Littlefield analyses why personal knowledge bases churn when users outgrow them, and groups Cabinet with Mem and NotebookLM as products that have to design for that ceiling.",
    quotes: [
      "Cabinet, Mem, and NotebookLM show what happens when a personal knowledge base hits its ceiling.",
      "Cabinet is optimized for what I'd call autonomous compounding: a system where the knowledge base writes itself, continuously, without the user's active participation.",
      "Hila Shmuel is a former Engineering Manager at Apple who left to build Cabinet in public, with the open-source community.",
      "Cabinet was her answer to that. Launched in 2026, it's free, self-hosted, and built on the belief that your AI context should live on your machine, not in a vendor's cloud.",
      "The tagline says it plainly: one knowledge base, AI agents that remember everything.",
      "Cabinet needs a quality signal: some way for users to see whether agent outputs are being used, or quietly accumulating unread.",
    ],
  },
  {
    kind: "video",
    id: "mK91g0QZpSk",
    title: "LLM Knowledge Bases, The Karpathy Effect & The Solution",
    authorName: "Tom Granot",
    authorHandle: "SyntaxGTM",
    channelUrl: CHANNEL_URL,
    publishedAt: "2026-04-13",
    blurb:
      "A deep dive into why LLM knowledge bases are the next frontier for AI-powered development. It explores Andrej Karpathy's vision for software 2.0, why context quality determines AI output quality, and how Cabinet solves the knowledge gap for developer teams.",
  },
];

const VIDEOS = MEDIA.filter((item): item is VideoItem => item.kind === "video");

const FEATURED = VIDEOS[0];
const FEATURED_THUMBNAIL = `https://i.ytimg.com/vi/${FEATURED.id}/hqdefault.jpg`;

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function formatDate(iso: string): string {
  return DATE_FORMATTER.format(new Date(`${iso}T00:00:00Z`));
}

export const metadata: Metadata = {
  title: "In the Wild | Cabinet | Stop Losing Context in AI Conversations",
  description:
    "Real demos, community builds, and coverage of Cabinet from around the web. Watch Tom Granot (SyntaxGTM) explain why Cabinet is the open-source fix for context loss in AI-native development.",
  openGraph: {
    title: "Stop Losing Context in AI Conversations: Meet Cabinet, the Open Source Fix",
    description:
      "Tom Granot (SyntaxGTM) walks through why context evaporates in AI workflows, and how Cabinet's persistent, file-based knowledge base fixes it.",
    images: [{ url: FEATURED_THUMBNAIL, width: 480, height: 360, alt: FEATURED.title }],
    type: "video.other",
    url: "https://runcabinet.com/media",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop Losing Context in AI Conversations: Meet Cabinet, the Open Source Fix",
    description:
      "Tom Granot (SyntaxGTM) on why Cabinet is the open-source fix for context loss in AI-native development.",
    images: [FEATURED_THUMBNAIL],
  },
};

export default function MediaPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* JSON-LD entries for Google rich results */}
      {MEDIA.map((item) => {
        if (item.kind === "video") {
          return (
            <script
              key={item.id}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "VideoObject",
                  name: item.title,
                  description: item.blurb,
                  uploadDate: item.publishedAt,
                  thumbnailUrl: `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`,
                  embedUrl: `https://www.youtube.com/embed/${item.id}`,
                  url: `https://youtu.be/${item.id}`,
                  author: {
                    "@type": "Person",
                    name: item.authorName,
                    url: item.channelUrl,
                  },
                }),
              }}
            />
          );
        }
        return (
          <script
            key={item.url}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                headline: item.title,
                description: item.blurb,
                datePublished: item.publishedAt,
                url: item.url,
                author: { "@type": "Person", name: item.authorName },
                publisher: { "@type": "Organization", name: item.publication },
              }),
            }}
          />
        );
      })}

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

          {/* Media list */}
          <div className="space-y-14 mb-14">
            {MEDIA.map((item) => {
              if (item.kind === "video") {
                const videoUrl = `https://youtu.be/${item.id}`;
                return (
                  <div key={item.id}>
                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-block mb-4"
                    >
                      <h2 className="text-xl md:text-2xl font-display text-text-primary leading-snug group-hover:text-accent transition-colors">
                        {item.title}
                      </h2>
                    </a>

                    <div className="rounded-2xl overflow-hidden border border-border shadow-lg bg-bg-card">
                      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                        <iframe
                          src={`https://www.youtube.com/embed/${item.id}`}
                          title={item.title}
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
                          href={item.channelUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          {item.authorName}
                        </a>
                        {" · "}
                        <a
                          href={item.channelUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-text-primary transition-colors"
                        >
                          {item.authorHandle}
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
                        {" · "}
                        <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
                      </p>
                      <p className="text-sm text-text-secondary font-body-serif leading-relaxed">
                        {item.blurb}
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-block mb-4"
                  >
                    <h2 className="text-xl md:text-2xl font-display text-text-primary leading-snug group-hover:text-accent transition-colors">
                      {item.title}
                    </h2>
                  </a>

                  <div className="rounded-2xl border border-border shadow-lg bg-bg-card p-6 md:p-8">
                    <ul className="space-y-4">
                      {item.quotes.map((quote) => (
                        <li
                          key={quote}
                          className="border-l-2 border-accent/60 pl-4 text-text-primary font-body-serif italic leading-relaxed"
                        >
                          &ldquo;{quote}&rdquo;
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-code text-text-tertiary mb-2">
                      by{" "}
                      <span className="text-accent">{item.authorName}</span>
                      {" in "}
                      <a
                        href={item.publicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-text-primary transition-colors"
                      >
                        {item.publication}
                      </a>
                      {" · "}
                      <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
                    </p>
                    <p className="text-sm text-text-secondary font-body-serif leading-relaxed">
                      {item.blurb}
                    </p>
                    <p className="mt-3 text-sm">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline font-code"
                      >
                        Read the full article →
                      </a>
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
                Every time you start a new session, that context is gone. The Karpathy Effect
                (the compounding value of feeding rich, structured context into a model) only works
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
                matters: your docs, decisions, architecture, and tribal knowledge, all indexed and
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
