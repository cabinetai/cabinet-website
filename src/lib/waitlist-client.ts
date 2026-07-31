// Self-hosted waitlist client. Replaces the Tally embed.
// Posts to the cabinet-backend Worker at reports.runcabinet.com.

const DEFAULT_WAITLIST_HOST = "https://reports.runcabinet.com";
const VISIT_ID_KEY = "cabinet.waitlist.visit-id";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function resolveWaitlistHost(value: string | undefined) {
  if (!value?.trim()) return DEFAULT_WAITLIST_HOST;

  try {
    const url = new URL(value.trim());
    const isLocalDevelopment =
      url.protocol === "http:" &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1");

    if (url.protocol !== "https:" && !isLocalDevelopment) {
      return DEFAULT_WAITLIST_HOST;
    }

    return url.origin;
  } catch {
    return DEFAULT_WAITLIST_HOST;
  }
}

const WAITLIST_HOST = resolveWaitlistHost(
  process.env.NEXT_PUBLIC_CABINET_WAITLIST_HOST,
);

function uuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getVisitId(): string {
  if (typeof window === "undefined") return uuid();
  try {
    let id = sessionStorage.getItem(VISIT_ID_KEY);
    if (!id) {
      id = uuid();
      sessionStorage.setItem(VISIT_ID_KEY, id);
    }
    return id;
  } catch {
    return uuid();
  }
}

async function postJson(path: string, body: unknown): Promise<Response | null> {
  if (typeof fetch === "undefined") return null;
  try {
    return await fetch(WAITLIST_HOST + path, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      credentials: "omit",
      keepalive: true,
      referrerPolicy: "strict-origin-when-cross-origin",
    });
  } catch {
    return null;
  }
}

export function recordWaitlistView(source: string): void {
  void postJson("/waitlist/visit", { type: "view", source, visitId: getVisitId() });
}

export function recordWaitlistStart(source: string): void {
  void postJson("/waitlist/visit", { type: "start", source, visitId: getVisitId() });
}

export type WaitlistSubmitResult =
  | { ok: true; alreadyOnList: boolean }
  | { ok: false; error: string };

export type PricingTier = "pro" | "max" | "team-early" | "enterprise";
export type WaitlistAddOn = "managed-ai" | "multi-seat-interest";

export type WaitlistSubmitOptions = {
  tier?: PricingTier;
  addOns?: WaitlistAddOn[];
  message?: string;
};

export async function submitWaitlistEmail(
  email: string,
  source: string,
  options?: WaitlistSubmitOptions,
): Promise<WaitlistSubmitResult> {
  const normalizedEmail = email.trim();
  if (normalizedEmail.length > 254 || !EMAIL_RE.test(normalizedEmail)) {
    return { ok: false, error: "invalid_email" };
  }

  const payload: Record<string, unknown> = {
    email: normalizedEmail,
    source: source.slice(0, 64),
    visitId: getVisitId(),
  };
  if (options?.tier) payload.tier = options.tier;
  if (options?.addOns && options.addOns.length > 0) payload.addOns = options.addOns;
  if (options?.message && options.message.trim().length > 0) {
    payload.message = options.message.trim().slice(0, 2000);
  }
  const res = await postJson("/waitlist", payload);
  if (!res) return { ok: false, error: "network" };
  if (!res.ok) return { ok: false, error: "status_" + res.status };
  try {
    const body = (await res.json()) as { ok?: boolean; alreadyOnList?: boolean };
    return { ok: true, alreadyOnList: Boolean(body.alreadyOnList) };
  } catch {
    return { ok: true, alreadyOnList: false };
  }
}
