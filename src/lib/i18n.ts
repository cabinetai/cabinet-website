// Locale support for the static site. GitHub Pages serves plain files, so
// there is no server to read Accept-Language. Each translated page is built
// at its own path (`/hi` for the Hindi homepage) and an inline script in the
// root layout sends Hindi-language browsers there before first paint.

export const LOCALES = ["en", "hi"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

// Set when a visitor picks a language by hand, so detection never overrides it.
export const LOCALE_STORAGE_KEY = "cabinet-locale";

// English path -> Hindi path, for every page that has a Hindi version.
export const HINDI_PATHS: Record<string, string> = {
  "/": "/hi",
};

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
};

function normalizePath(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function localeFromPath(pathname: string): Locale {
  const path = normalizePath(pathname);
  return path === "/hi" || path.startsWith("/hi/") ? "hi" : "en";
}

// The current page in every locale, or null if it has no translation.
export function localeAlternates(pathname: string): Record<Locale, string> | null {
  const path = normalizePath(pathname);
  const english = path in HINDI_PATHS
    ? path
    : Object.entries(HINDI_PATHS).find(([, hi]) => hi === path)?.[0];
  return english ? { en: english, hi: HINDI_PATHS[english] } : null;
}

// Runs in <head> before paint: marks Hindi pages with lang="hi" and redirects
// first-time visitors whose browser prefers Hindi to the Hindi version.
// `?lang=hi` forces the redirect, which is handy for demos on a desktop.
export const LOCALE_BOOTSTRAP_SCRIPT = `(function(){try{
var map=${JSON.stringify(HINDI_PATHS)};
var p=location.pathname.replace(/\\/+$/,"")||"/";
if(p==="/hi"||p.indexOf("/hi/")===0){document.documentElement.lang="hi";return;}
var target=map[p];if(!target)return;
var q=new URLSearchParams(location.search);
var forced=q.get("lang")==="hi";
if(!forced){
if(localStorage.getItem("${LOCALE_STORAGE_KEY}"))return;
var langs=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""];
if(!/^hi\\b/i.test(langs[0]||""))return;
}
q.delete("lang");var s=q.toString();
location.replace(target+(s?"?"+s:"")+location.hash);
}catch(e){}})();`;
