"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LazyVideo } from "@/components/lazy-video";
import { useLocale } from "@/components/locale-provider";
import { DownloadButtons } from "@/components/marketing/download-buttons";
import type { Locale } from "@/lib/i18n";

type ShowcaseCopy = {
  // Hero: "Meet Cabinet / your <phrase>". `meetBefore`/`meetAfter` wrap the
  // brand name; `your` is the underlined word ahead of the typed phrase, and
  // is empty where the possessive lives inside each phrase instead.
  meetBefore: string;
  meetAfter: string;
  your: string;
  // Closing CTA: "Download Cabinet / your <phrase>".
  downloadBefore: string;
  downloadAfter: string;
  phrases: string[];
  body: string;
};

// Hindi possessives agree with the noun (आपका नॉलेज बेस, आपकी AI टीम, आपके
// वर्कफ़्लो), so one fixed "your" cannot precede all four phrases. The Hindi
// phrases carry their own possessive and skip the hand-drawn underline, which
// would collide with the vowel signs on the line below.
const COPY: Record<Locale, ShowcaseCopy> = {
  en: {
    meetBefore: "Meet ",
    meetAfter: "",
    your: "your",
    downloadBefore: "Download ",
    downloadAfter: "",
    phrases: ["knowledge base", "AI team", "workflows", "AI workspace"],
    body: "is the AI workspace where your knowledge base, AI team, and workflows live in one beautiful home.",
  },
  hi: {
    meetBefore: "मिलिए ",
    meetAfter: " से",
    your: "",
    downloadBefore: "",
    downloadAfter: " डाउनलोड करें",
    phrases: ["आपका नॉलेज बेस", "आपकी AI टीम", "आपके वर्कफ़्लो", "आपका AI वर्कस्पेस"],
    body: "वह AI वर्कस्पेस है जहाँ आपका नॉलेज बेस, आपकी AI टीम और आपके वर्कफ़्लो एक ही सुव्यवस्थित जगह पर रहते हैं।",
  },
};

// Splits text into what a reader sees as single characters. Devanagari builds
// one visible letter from several code points (क + ् + ष = क्ष), so typing by
// UTF-16 index would flash half-formed conjuncts and stray vowel signs.
// Engines on older Unicode data still split a conjunct at the virama, so a
// cluster ending in one is joined to the next.
function graphemes(text: string): string[] {
  const parts =
    typeof Intl !== "undefined" && "Segmenter" in Intl
      ? Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text), (s) => s.segment)
      : Array.from(text);
  const out: string[] = [];
  for (const part of parts) {
    if (out.length && out[out.length - 1].endsWith("\u094D")) out[out.length - 1] += part;
    else out.push(part);
  }
  return out;
}

// Types each phrase out, holds it, deletes it, moves to the next. Same timing
// and markup as the shared TypingText, but steps by grapheme so Hindi never
// renders a half-built letter.
function TypingPhrases({ texts }: { texts: string[] }) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const current = graphemes(texts[textIndex] ?? "");

  useEffect(() => {
    const length = graphemes(texts[textIndex] ?? "").length;
    const timeout = deleting ? 30 : 60;

    if (!deleting && charIndex === length) {
      const timer = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(timer);
    }
    if (deleting && charIndex === 0) {
      const timer = setTimeout(() => {
        setDeleting(false);
        setTextIndex((index) => (index + 1) % texts.length);
      }, timeout);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCharIndex((index) => index + (deleting ? -1 : 1));
    }, timeout);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, textIndex, texts]);

  return (
    <span className="text-accent">
      {current.slice(0, charIndex).join("")}
      <span className="cursor-blink text-accent-light">|</span>
    </span>
  );
}

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
  const locale = useLocale();
  const t = COPY[locale];
  const brand = <span className="font-brand italic">Cabinet</span>;
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
            {t.meetBefore}
            {brand}
            {t.meetAfter}
            <br />
            {t.your && (
              <>
                <span className="relative inline-block">
                  {t.your}
                  <HandDrawnUnderline />
                </span>{" "}
              </>
            )}
            {/* every phrase is stacked invisibly in one grid cell, so the cell
                is as wide as the widest one and the line never recenters:
                "your" stays put while the text types */}
            <span className="relative inline-grid whitespace-nowrap text-left align-baseline">
              {t.phrases.map((phrase) => (
                <span key={phrase} aria-hidden className="invisible [grid-area:1/1]">
                  {phrase}|
                </span>
              ))}
              <span className="[grid-area:1/1]">
                <TypingPhrases texts={t.phrases} />
              </span>
            </span>
          </h1>
        ) : (
          <>
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
              {t.downloadBefore}
              {brand}
              {t.downloadAfter}
              <br />
              {t.your && `${t.your} `}
              <TypingPhrases texts={t.phrases} />
            </h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto leading-relaxed font-body-serif">
              {brand}{" "}{t.body}
            </p>
          </>
        )}
        <DownloadButtons locale={locale} />
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
