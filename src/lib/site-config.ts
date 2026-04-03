export const DISCORD_URL = "https://discord.gg/rxd8BYnN";
export const GITHUB_URL = "https://github.com/hilash/cabinet";

// Replace this with your published Tally share URL, or set NEXT_PUBLIC_TALLY_WAITLIST_FORM_URL at build time.
export const TALLY_WAITLIST_FORM_URL =
  process.env.NEXT_PUBLIC_TALLY_WAITLIST_FORM_URL?.trim() ||
  "https://tally.so/r/Y5YkOv";

export const WAITLIST_COPY = {
  title: "Join the Cabinet Cloud waitlist",
  body: "Hosted version coming soon. No setup, automatic updates.",
  scarcity: "First 500 early supporters get priority access.",
  button: "Join Waitlist",
  consent: "Get launch updates by email. Unsubscribe anytime.",
} as const;
