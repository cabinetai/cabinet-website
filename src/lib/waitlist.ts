import { TALLY_WAITLIST_FORM_URL } from "@/lib/site-config";

export type WaitlistSource =
  | "hero"
  | "homepage-section"
  | "popup"
  | "cloud-page"
  | "waitlist-link"
  | "wishlist-link";

export const WAITLIST_STORAGE_KEYS = {
  submitted: "cabinet.waitlist.submitted",
  popupDismissedUntil: "cabinet.waitlist.popupDismissedUntil",
  pendingSubmission: "cabinet.waitlist.pendingSubmission",
} as const;

export const WAITLIST_POPUP_DELAY_MS = 10_000;
export const WAITLIST_POPUP_DISMISS_MS = 7 * 24 * 60 * 60 * 1000;

export function extractTallyFormId(formUrl: string) {
  try {
    const url = new URL(formUrl);
    const parts = url.pathname.split("/").filter(Boolean);

    if (parts.length === 0) {
      return null;
    }

    if (parts[0] === "r" || parts[0] === "embed") {
      return parts[1] ?? null;
    }

    if (parts[0] === "forms") {
      return parts[1] ?? null;
    }

    return parts.at(-1) ?? null;
  } catch {
    return null;
  }
}

export const TALLY_WAITLIST_FORM_ID = extractTallyFormId(TALLY_WAITLIST_FORM_URL);
export const IS_TALLY_WAITLIST_CONFIGURED =
  Boolean(TALLY_WAITLIST_FORM_ID) &&
  !TALLY_WAITLIST_FORM_URL.includes("YOUR_FORM_ID");

export function buildTallyEmbedUrl(
  source: WaitlistSource,
  originPage: string,
  searchParams: URLSearchParams,
) {
  if (!TALLY_WAITLIST_FORM_ID) {
    return null;
  }

  const url = new URL(`https://tally.so/embed/${TALLY_WAITLIST_FORM_ID}`);

  url.searchParams.set("alignLeft", "1");
  url.searchParams.set("hideTitle", "1");
  url.searchParams.set("transparentBackground", "1");
  url.searchParams.set("dynamicHeight", "1");
  url.searchParams.set("source", source);
  url.searchParams.set("originPage", originPage);

  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ]) {
    const value = searchParams.get(key);
    if (value) {
      url.searchParams.set(key, value);
    }
  }

  return url.toString();
}

export function buildTallyShareUrl(
  source: WaitlistSource,
  originPage: string,
  searchParams = new URLSearchParams(),
) {
  const url = new URL(TALLY_WAITLIST_FORM_URL);

  url.searchParams.set("source", source);
  url.searchParams.set("originPage", originPage);

  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ]) {
    const value = searchParams.get(key);
    if (value) {
      url.searchParams.set(key, value);
    }
  }

  return url.toString();
}

type TallyField = {
  title?: string;
  type?: string;
  answer?: {
    value?: unknown;
    raw?: unknown;
  };
};

export function getHiddenFieldValue(fields: TallyField[] | undefined, key: string) {
  if (!fields) {
    return null;
  }

  for (const field of fields) {
    if (
      field.type === "HIDDEN_FIELDS" &&
      typeof field.answer?.value === "object" &&
      field.answer.value !== null &&
      key in (field.answer.value as Record<string, unknown>)
    ) {
      const value = (field.answer.value as Record<string, unknown>)[key];
      return typeof value === "string" ? value : String(value ?? "");
    }

    if (
      field.type === "HIDDEN_FIELDS" &&
      typeof field.answer?.raw === "object" &&
      field.answer.raw !== null &&
      key in (field.answer.raw as Record<string, unknown>)
    ) {
      const value = (field.answer.raw as Record<string, unknown>)[key];
      return typeof value === "string" ? value : String(value ?? "");
    }

    if (field.title === key && typeof field.answer?.value === "string") {
      return field.answer.value;
    }
  }

  return null;
}

export function markWaitlistSubmitted(source: string, submissionId: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(WAITLIST_STORAGE_KEYS.submitted, "1");
  window.localStorage.removeItem(WAITLIST_STORAGE_KEYS.popupDismissedUntil);
  window.sessionStorage.setItem(
    WAITLIST_STORAGE_KEYS.pendingSubmission,
    JSON.stringify({ source, submissionId }),
  );
}

export function hasWaitlistSubmission() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(WAITLIST_STORAGE_KEYS.submitted) === "1";
}

export function dismissWaitlistPopup() {
  if (typeof window === "undefined") {
    return;
  }

  const dismissUntil = Date.now() + WAITLIST_POPUP_DISMISS_MS;
  window.localStorage.setItem(
    WAITLIST_STORAGE_KEYS.popupDismissedUntil,
    String(dismissUntil),
  );
}

export function shouldSuppressWaitlistPopup() {
  if (typeof window === "undefined") {
    return true;
  }

  if (hasWaitlistSubmission()) {
    return true;
  }

  const dismissedUntil = Number(
    window.localStorage.getItem(WAITLIST_STORAGE_KEYS.popupDismissedUntil) ?? "0",
  );

  return dismissedUntil > Date.now();
}

export function consumePendingWaitlistSubmission() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.sessionStorage.getItem(WAITLIST_STORAGE_KEYS.pendingSubmission);
  if (!raw) {
    return null;
  }

  window.sessionStorage.removeItem(WAITLIST_STORAGE_KEYS.pendingSubmission);

  try {
    return JSON.parse(raw) as { source?: string; submissionId?: string };
  } catch {
    return null;
  }
}
