"use client";

import { useSyncExternalStore } from "react";
import { MACOS_DOWNLOAD_URL, WINDOWS_DOWNLOAD_URL } from "@/lib/site-config";

// Installer for the visitor's OS. The server render and hydration pass link
// to the download page (safe for any platform); once React is running on the
// client, Mac and Windows visitors get their installer directly. Everything
// else (Linux, phones, tablets) keeps the page.
function detectDownloadHref(): string {
  const ua = navigator.userAgent;
  // uaData.platform is more reliable where available (Chromium)
  const uaData = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData;
  const platform = (uaData?.platform ?? navigator.platform ?? "").toLowerCase();

  const isWindows = platform.startsWith("win") || /Windows NT/i.test(ua);
  // iPadOS reports "MacIntel" with touch support; treat it as mobile
  const isMac =
    (platform.startsWith("mac") || /Macintosh/i.test(ua)) && navigator.maxTouchPoints <= 1;

  if (isWindows) return WINDOWS_DOWNLOAD_URL;
  if (isMac) return MACOS_DOWNLOAD_URL;
  return "/download";
}

const subscribe = () => () => {};

export function usePlatformDownloadHref(): string {
  return useSyncExternalStore(subscribe, detectDownloadHref, () => "/download");
}
