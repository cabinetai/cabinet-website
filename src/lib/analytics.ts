type AnalyticsValue = string | number | boolean | undefined;

export function trackEvent(
  eventName: string,
  params?: Record<string, AnalyticsValue>,
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

