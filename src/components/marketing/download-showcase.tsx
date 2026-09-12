import Image from "next/image";
import { LazyVideo } from "@/components/lazy-video";
import { DownloadButtons } from "@/components/marketing/download-buttons";
import { TypingText } from "@/components/marketing/legacy-interactive-primitives";

const HERO_PHRASES = ["knowledge base", "AI team", "workflows", "AI workspace"];

// Two loose pen strokes under a word, as if someone underlined it by hand.
// Sized to the word it sits in (100% wide), so it scales with the heading.
function HandDrawnUnderline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 14"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-[0.32em] left-0 h-[0.36em] w-full text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 5.2C22 3.4 41 2.6 60.5 3.1c13.4.3 25.6 1.3 37 2.6" />
      <path d="M6 11.3c17.5-1.9 35.2-2.7 53-2.4 11.4.2 22.6.9 33.5 2.3" />
    </svg>
  );
}

// "Download Cabinet / your <typing>" next to the product recording. Shared by
// the homepage opener (hero) and the closing CTA / download page so the two
// never drift apart.
export function DownloadShowcase({ hero = false }: { hero?: boolean }) {
  return (
    <div
      className={`grid items-center gap-10 px-6 text-center lg:grid-cols-[2fr_3fr] lg:gap-14 lg:pr-0 ${
        hero
          ? "dot-grid min-h-[100svh] bg-[#f2ece4] pb-12 pt-[clamp(6rem,11vh,8rem)]"
          : "mb-16"
      }`}
    >
      <div className="mx-auto w-full max-w-xl">
        {!hero && (
          <Image src="/cabinet-icon.png" alt="Cabinet" width={64} height={64} className="mx-auto mb-6 rounded-xl" />
        )}
        {hero ? (
          <h1 className="text-3xl md:text-4xl font-display text-text-primary mb-12 leading-[1.2]">
            Meet <span className="font-brand italic">Cabinet</span>
            <br />
            <span className="relative inline-block">
              your
              <HandDrawnUnderline />
            </span>{" "}
            {/* every phrase is stacked invisibly in one grid cell, so the cell
                is as wide as the widest one and the line never recenters:
                "your" stays put while the text types */}
            <span className="relative inline-grid whitespace-nowrap text-left align-baseline">
              {HERO_PHRASES.map((phrase) => (
                <span key={phrase} aria-hidden className="invisible [grid-area:1/1]">
                  {phrase}|
                </span>
              ))}
              <span className="[grid-area:1/1]">
                <TypingText texts={HERO_PHRASES} />
              </span>
            </span>
          </h1>
        ) : (
          <>
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
              Download <span className="font-brand italic">Cabinet</span>
              <br />
              your <TypingText texts={["knowledge base", "AI team", "workflows", "AI workspace"]} />
            </h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto leading-relaxed font-body-serif">
              <span className="font-brand italic">Cabinet</span>{" "}is the AI workspace where your knowledge base, AI team, and workflows live in one beautiful home.
            </p>
          </>
        )}
        <DownloadButtons />
      </div>
      {/* Wrapper clips the 2px border baked into the recording */}
      <div className="overflow-hidden rounded-2xl shadow-lg lg:rounded-r-none">
        <LazyVideo
          width={2880}
          height={1794}
          className="-m-[2px] w-[calc(100%+4px)] max-w-none"
          playbackRate={0.5}
          sources={[
            { src: "/new-cabinet.mp4", type: "video/mp4" },
            { src: "/new-cabinet.webm", type: "video/webm" },
          ]}
          mobileSources={[{ src: "/new-cabinet-mobile.mp4", type: "video/mp4" }]}
        />
      </div>
    </div>
  );
}
