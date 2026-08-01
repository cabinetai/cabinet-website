"use client";

import { useEffect } from "react";
import { create } from "zustand";

// Anything at or below this width doesn't have room for wide, desktop-tuned
// layouts (e.g. the integration scene's scattered tile cloud).
const MOBILE_QUERY = "(max-width: 767px)";

type MobileStore = {
  isMobile: boolean;
  listening: boolean;
};

const useMobileStore = create<MobileStore>(() => ({
  isMobile: false,
  listening: false,
}));

// One matchMedia listener shared by every useIsMobile() caller, set up on
// the first mount that needs it instead of once per component.
function ensureListener() {
  if (typeof window === "undefined" || useMobileStore.getState().listening) return;
  const mq = window.matchMedia(MOBILE_QUERY);
  useMobileStore.setState({ isMobile: mq.matches, listening: true });
  mq.addEventListener("change", (event) => useMobileStore.setState({ isMobile: event.matches }));
}

export function useIsMobile() {
  useEffect(ensureListener, []);
  return useMobileStore((state) => state.isMobile);
}
