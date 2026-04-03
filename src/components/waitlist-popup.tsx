"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  dismissWaitlistPopup,
  hasWaitlistSubmission,
  markWaitlistSubmitted,
  shouldSuppressWaitlistPopup,
  TALLY_WAITLIST_FORM_ID,
  WAITLIST_POPUP_DELAY_MS,
} from "@/lib/waitlist";
import { ensureTallyWidget } from "@/lib/tally";

type PopupHiddenFields = {
  source: "popup";
  originPage: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

export function WaitlistPopup() {
  const dismissedBySubmitRef = useRef(false);
  const popupReadyAtRef = useRef(0);
  const formId = TALLY_WAITLIST_FORM_ID;

  useEffect(() => {
    if (shouldSuppressWaitlistPopup() || !formId) {
      return;
    }

    const url = new URL(window.location.href);
    const hiddenFields: PopupHiddenFields = {
      source: "popup",
      originPage: url.pathname || "/",
    };

    for (const key of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ] as const) {
      const value = url.searchParams.get(key);
      if (value) {
        hiddenFields[key] = value;
      }
    }

    const popupOptions = {
      key: "cabinet-cloud-popup",
      layout: "modal" as const,
      emoji: {
        text: "☁️",
        animation: "rubber-band" as const,
      },
      autoClose: 1000,
      doNotShowAfterSubmit: true,
      hiddenFields,
    };

    popupReadyAtRef.current = Date.now() + WAITLIST_POPUP_DELAY_MS;
    const timer = window.setTimeout(async () => {
      if (hasWaitlistSubmission()) {
        return;
      }

      await ensureTallyWidget();

      if (typeof window.Tally?.openPopup !== "function") {
        return;
      }

      window.Tally.openPopup(formId, {
        ...popupOptions,
        onOpen: () => {
          if (Date.now() < popupReadyAtRef.current) {
            return;
          }

          trackEvent("waitlist_popup_open", {
            source: "popup",
            originPage: hiddenFields.originPage,
          });
        },
        onClose: () => {
          if (dismissedBySubmitRef.current || hasWaitlistSubmission()) {
            dismissedBySubmitRef.current = false;
            return;
          }

          dismissWaitlistPopup();
          trackEvent("waitlist_popup_dismiss", {
            source: "popup",
            originPage: hiddenFields.originPage,
          });
        },
        onSubmit: (payload) => {
          dismissedBySubmitRef.current = true;
          markWaitlistSubmitted("popup", payload.id);
        },
      });
    }, WAITLIST_POPUP_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [formId]);

  return null;
}
