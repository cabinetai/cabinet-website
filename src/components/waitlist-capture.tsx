"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { WAITLIST_COPY } from "@/lib/site-config";
import { ensureTallyWidget } from "@/lib/tally";
import {
  buildTallyEmbedUrl,
  getHiddenFieldValue,
  IS_TALLY_WAITLIST_CONFIGURED,
  markWaitlistSubmitted,
  TALLY_WAITLIST_FORM_ID,
  type WaitlistSource,
} from "@/lib/waitlist";

type WaitlistCaptureProps = {
  source: WaitlistSource;
  className?: string;
  compact?: boolean;
  originPage?: string;
  onSubmitted?: () => void;
  trackView?: boolean;
};

type TallySubmissionPayload = {
  id: string;
  formId: string;
  fields?: Array<{
    title?: string;
    type?: string;
    answer?: {
      value?: unknown;
      raw?: unknown;
    };
  }>;
};

export function WaitlistCapture({
  source,
  className = "",
  compact = false,
  originPage,
  onSubmitted,
  trackView = false,
}: WaitlistCaptureProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaTrackedRef = useRef(false);
  const viewTrackedRef = useRef(false);
  const resolvedOriginPage = originPage ?? pathname;
  const queryString = searchParams.toString();

  const embedUrl = useMemo(
    () =>
      buildTallyEmbedUrl(
        source,
        resolvedOriginPage,
        new URLSearchParams(queryString),
      ),
    [queryString, resolvedOriginPage, source],
  );

  useEffect(() => {
    if (!embedUrl) {
      return;
    }

    ensureTallyWidget().then(() => {
      if (typeof window.Tally !== "undefined") {
        window.Tally.loadEmbeds?.();
        return;
      }

      document
        .querySelectorAll<HTMLIFrameElement>("iframe[data-tally-src]:not([src])")
        .forEach((iframeEl) => {
          iframeEl.src = iframeEl.dataset.tallySrc ?? "";
        });
    });
  }, [embedUrl]);

  useEffect(() => {
    if (!trackView || !cardRef.current || viewTrackedRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || viewTrackedRef.current) {
          return;
        }

        viewTrackedRef.current = true;
        trackEvent("waitlist_inline_view", {
          source,
          originPage: resolvedOriginPage,
        });
        observer.disconnect();
      },
      { threshold: 0.55 },
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [resolvedOriginPage, source, trackView]);

  useEffect(() => {
    if (!TALLY_WAITLIST_FORM_ID) {
      return;
    }

    const onMessage = (event: MessageEvent) => {
      if (typeof event.data !== "string" || !event.data.includes("Tally.FormSubmitted")) {
        return;
      }

      let payload: TallySubmissionPayload | null = null;

      try {
        payload = JSON.parse(event.data).payload as TallySubmissionPayload;
      } catch {
        return;
      }

      if (!payload || payload.formId !== TALLY_WAITLIST_FORM_ID) {
        return;
      }

      const submittedSource = getHiddenFieldValue(payload.fields, "source");
      if (submittedSource !== source) {
        return;
      }

      markWaitlistSubmitted(submittedSource, payload.id);
      onSubmitted?.();

      const confirmationUrl = new URL("/waitlist-confirmed", window.location.origin);
      confirmationUrl.searchParams.set("source", submittedSource);
      window.location.assign(confirmationUrl.toString());
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onSubmitted, source]);

  const trackCtaClick = () => {
    if (ctaTrackedRef.current) {
      return;
    }

    ctaTrackedRef.current = true;
    trackEvent("waitlist_cta_click", {
      source,
      originPage: resolvedOriginPage,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`dict-card text-left ${compact ? "px-5 py-5" : "px-6 py-6 md:px-8 md:py-7"} ${className}`}
    >
      <p className="section-label mb-3">Cabinet Cloud</p>
      <h3 className={`${compact ? "text-2xl" : "text-2xl md:text-3xl"} font-display text-text-primary mb-3`}>
        {WAITLIST_COPY.title}
      </h3>
      <p className="text-text-secondary font-body-serif leading-relaxed mb-2">
        {WAITLIST_COPY.body}
      </p>
      <p className="text-sm font-code text-accent mb-5">
        {WAITLIST_COPY.scarcity}
      </p>

      {embedUrl && IS_TALLY_WAITLIST_CONFIGURED ? (
        <div className="rounded-xl border border-border bg-bg overflow-hidden">
          <iframe
            data-tally-src={embedUrl}
            loading="lazy"
            width="100%"
            height={compact ? "250" : "240"}
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title={WAITLIST_COPY.title}
            onFocus={trackCtaClick}
            onPointerDown={trackCtaClick}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border-dark bg-accent-bg-subtle px-4 py-4 text-sm text-text-secondary leading-relaxed">
          Add your published Tally form URL to <code className="font-code text-xs text-accent">NEXT_PUBLIC_TALLY_WAITLIST_FORM_URL</code> to activate the waitlist.
        </div>
      )}

      <p className="text-xs text-text-tertiary mt-4 font-code">
        {WAITLIST_COPY.consent}
      </p>
    </div>
  );
}
