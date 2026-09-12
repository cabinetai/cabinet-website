"use client";

import { useEffect, useRef, useState } from "react";

type Source = { src: string; type: string };

type LazyVideoProps = {
  sources: Source[];
  /**
   * Lighter encode for phones. Chosen at load time, so a phone never pulls the
   * full-resolution master just to letterbox it into a 390px-wide screen.
   */
  mobileSources?: Source[];
  className?: string;
  width?: number;
  height?: number;
  /** Extra distance beyond the viewport that still counts as "near". */
  rootMargin?: string;
  /** Fires once the first frame is decodable (or the fetch failed outright). */
  onReady?: () => void;
  /** 1 is natural speed; 0.5 plays at half speed. */
  playbackRate?: number;
};

// Matches the phone staging used elsewhere on the homepage.
const PHONE_QUERY = "(max-width: 767px)";

/**
 * Autoplaying video that holds off on fetching until it is close to the
 * viewport.
 *
 * The point is not only bandwidth. A <video preload="auto"> sitting in the
 * prerendered HTML is found by the preload scanner before a single line of our
 * JavaScript runs, so a multi-megabyte clip starts downloading alongside the
 * bundle the page needs in order to hydrate. On a phone the two share one thin
 * pipe and hydration loses, which leaves the visitor looking at an unhydrated
 * page until the clip finishes. Keeping the sources out of the server HTML
 * gives the bundle the connection to itself; the clip starts once React runs.
 */
export function LazyVideo({
  sources,
  mobileSources,
  className,
  width,
  height,
  rootMargin = "600px 0px",
  onReady,
  playbackRate = 1,
}: LazyVideoProps) {
  // Null until the element is near the viewport. Doubles as the "in view" flag
  // and as the chosen encode, so both are decided in one state update.
  const [active, setActive] = useState<Source[] | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Props are read through a ref so callers can pass inline arrays and arrow
  // functions without the observer being torn down on every render. Refreshed
  // in its own effect, declared first so it commits before the effects below.
  const propsRef = useRef({ sources, mobileSources, onReady });
  useEffect(() => {
    propsRef.current = { sources, mobileSources, onReady };
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const { sources: full, mobileSources: small } = propsRef.current;
        const phone = small && window.matchMedia(PHONE_QUERY).matches;
        setActive(phone ? small : full);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [rootMargin]);

  // Sources appear only once the element is in view, so the media element has
  // to be told to pick one up. `autoplay` does not re-arm by itself after a
  // load(), and play() rejects on browsers holding autoplay back.
  useEffect(() => {
    if (!active) return;
    const video = videoRef.current;
    if (!video) return;
    video.load();
    // load() resets the rate on some browsers, so it is set after, not before
    video.defaultPlaybackRate = playbackRate;
    video.playbackRate = playbackRate;
    void video.play().catch(() => {});
  }, [active, playbackRate]);

  // `loadeddata` can fire before this effect attaches on a warm cache, so the
  // readyState is checked up front. `error` reports too, otherwise a failed
  // fetch would leave a caller's placeholder up forever.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const ready = () => propsRef.current.onReady?.();
    if (video.readyState >= 2 || video.error) {
      ready();
      return;
    }

    video.addEventListener("loadeddata", ready);
    video.addEventListener("error", ready);
    return () => {
      video.removeEventListener("loadeddata", ready);
      video.removeEventListener("error", ready);
    };
  }, [active]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload={active ? "auto" : "none"}
      width={width}
      height={height}
      className={className}
    >
      {active?.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}
