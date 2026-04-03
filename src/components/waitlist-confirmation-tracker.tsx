"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { consumePendingWaitlistSubmission, WAITLIST_STORAGE_KEYS } from "@/lib/waitlist";

export function WaitlistConfirmationTracker() {
  const searchParams = useSearchParams();
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) {
      return;
    }

    const querySource = searchParams.get("source");
    const pending = consumePendingWaitlistSubmission();
    const source = querySource || pending?.source;

    if (!source) {
      return;
    }

    trackedRef.current = true;
    window.localStorage.setItem(WAITLIST_STORAGE_KEYS.submitted, "1");
    trackEvent("waitlist_signup_success", { source });
  }, [searchParams]);

  return null;
}
