"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Download,
  Languages,
  Menu,
  X,
} from "lucide-react";
import { SolutionsMenu } from "@/components/solutions-menu";
import { useLocale } from "@/components/locale-provider";
import { usePlatformDownloadHref } from "@/lib/platform-download";
import {
  localeAlternates,
  LOCALE_LABELS,
  LOCALE_STORAGE_KEY,
  LOCALES,
  type Locale,
} from "@/lib/i18n";

const RESOURCE_LINKS = [
  {
    key: "templates",
    href: "/templates",
    external: false,
    icon: "/brand/ui/boxes.png",
  },
  {
    key: "docs",
    href: "https://docs.runcabinet.com/",
    external: true,
    icon: "/brand/ui/book.png",
  },
  {
    key: "compare",
    href: "/compare",
    external: false,
    icon: "/brand/ui/scale.png",
  },
  {
    key: "download",
    href: "/download",
    external: false,
    icon: "/brand/ui/rocket.png",
  },
] as const;

type ResourceKey = (typeof RESOURCE_LINKS)[number]["key"];

const COPY = {
  en: {
    home: "Cabinet home",
    nav: "Primary navigation",
    aiTeams: "AI teams",
    solutions: "Solutions",
    security: "Security",
    pricing: "Pricing",
    resources: "Resources",
    bookDemo: "Book a demo",
    download: "Download",
    openNav: "Open navigation",
    closeNav: "Close navigation",
    mobilePitch: "See Cabinet around one real company workflow.",
    mobileCta: "Book an executive demo",
    language: "Language",
    resourceLinks: {
      templates: { label: "Templates", description: "Inspect and clone working AI teams." },
      docs: { label: "Documentation", description: "Install, configure, and operate Cabinet." },
      compare: { label: "Compare", description: "Evaluate architecture, control, and fit." },
      download: { label: "Get Cabinet", description: "Download the desktop app or run the CLI." },
    } satisfies Record<ResourceKey, { label: string; description: string }>,
  },
  hi: {
    home: "Cabinet होम",
    nav: "मुख्य नेविगेशन",
    aiTeams: "AI टीमें",
    solutions: "समाधान",
    security: "सुरक्षा",
    pricing: "कीमतें",
    resources: "संसाधन",
    bookDemo: "डेमो बुक करें",
    download: "डाउनलोड",
    openNav: "नेविगेशन खोलें",
    closeNav: "नेविगेशन बंद करें",
    mobilePitch: "अपनी कंपनी के किसी असली वर्कफ़्लो पर Cabinet को चलते हुए देखें।",
    mobileCta: "एग्ज़ीक्यूटिव डेमो बुक करें",
    language: "भाषा",
    resourceLinks: {
      templates: { label: "टेम्पलेट", description: "काम कर रही AI टीमों को देखें और कॉपी करें।" },
      docs: { label: "डॉक्यूमेंटेशन", description: "Cabinet को इंस्टॉल, कॉन्फ़िगर और संचालित करें।" },
      compare: { label: "तुलना करें", description: "आर्किटेक्चर, नियंत्रण और उपयुक्तता परखें।" },
      download: { label: "Cabinet पाएँ", description: "डेस्कटॉप ऐप डाउनलोड करें या CLI चलाएँ।" },
    } satisfies Record<ResourceKey, { label: string; description: string }>,
  },
} as const;

// Shown only on pages that exist in every language. Picking a language is
// remembered so the Hindi auto-redirect in the root layout stops firing.
function rememberLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {}
}

function LanguageSelect({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const current = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const alternates = localeAlternates(pathname);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    // Touch browsers don't always blur the button on an outside tap.
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  if (!alternates) return null;

  return (
    <div
      ref={rootRef}
      className={`relative ${className}`}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-label={COPY[current].language}
        aria-expanded={open}
        aria-haspopup="menu"
        className="glass-pill group inline-flex h-11 items-center gap-1 px-3 text-sm font-medium sm:gap-1.5 sm:px-4 text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="liquid-glass__refract" aria-hidden />
        <Languages aria-hidden className="relative z-10 h-4 w-4" />
        <span className="relative z-10 hidden sm:inline">{LOCALE_LABELS[current]}</span>
        <ChevronDown
          aria-hidden
          className={`relative z-10 h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 w-44 pt-3" role="menu">
          <div className="liquid-glass-panel rounded-2xl p-1.5">
            {LOCALES.map((locale) => (
              <Link
                key={locale}
                href={alternates[locale]}
                hrefLang={locale}
                lang={locale}
                role="menuitemradio"
                aria-checked={locale === current}
                onClick={() => {
                  rememberLocale(locale);
                  setOpen(false);
                }}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-bg-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                {LOCALE_LABELS[locale]}
                {locale === current && <Check aria-hidden className="h-4 w-4 text-accent" />}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ResourceIcon({ icon }: { icon: (typeof RESOURCE_LINKS)[number]["icon"] }) {
  return <Image src={icon} alt="" width={30} height={30} className="h-7 w-7 object-contain" />;
}
function GlassNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="glass-pill group inline-flex h-10 items-center px-4 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
    >
      <span className="liquid-glass__refract" aria-hidden />
      <span className="relative z-10">{children}</span>
    </Link>
  );
}

export function SiteNavbar({ fixed = false }: { fixed?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const downloadHref = usePlatformDownloadHref();
  const locale = useLocale();
  const t = COPY[locale];
  const homeHref = locale === "hi" ? "/hi" : "/";

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1100) setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  return (
    <nav
      aria-label={t.nav}
      className={`site-navbar ${fixed ? "fixed inset-x-0 top-0" : "sticky top-0"} isolate z-50 pointer-events-none`}
    >
      <div className="pointer-events-auto mx-auto flex max-w-7xl items-center gap-2.5 px-4 pb-3 pt-3 sm:px-6 lg:gap-3">
        <Link
          href={homeHref}
          aria-label={t.home}
          className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
        >
          <Image
            src="/brand/cabinet-drawers-logo.png"
            alt=""
            width={20}
            height={28}
            className="h-7 w-auto object-contain"
            priority
          />
          <span className="whitespace-nowrap text-xl font-brand italic tracking-tight text-text-primary">
            Cabinet
          </span>
        </Link>

        <div className="hidden min-[1100px]:flex items-center gap-2">
          <GlassNavLink href="/templates">{t.aiTeams}</GlassNavLink>
          <SolutionsMenu triggerClassName="text-text-secondary" />
          <GlassNavLink href="/enterprise/security">{t.security}</GlassNavLink>
          <GlassNavLink href="/pricing">{t.pricing}</GlassNavLink>

          <div
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
            onFocus={() => setResourcesOpen(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setResourcesOpen(false);
              }
            }}
          >
            <button
              type="button"
              aria-expanded={resourcesOpen}
              aria-haspopup="menu"
              className="glass-pill group inline-flex h-10 items-center px-4 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
              onClick={() => setResourcesOpen((open) => !open)}
            >
              <span className="liquid-glass__refract" aria-hidden />
              <span className="relative z-10 inline-flex items-center gap-1">
                {t.resources}
                <ChevronDown
                  aria-hidden
                  className={`h-3.5 w-3.5 transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
                />
              </span>
            </button>

            {resourcesOpen && (
              <div className="absolute right-0 top-full z-50 w-[360px] pt-3" role="menu">
                <div className="liquid-glass-panel rounded-2xl p-2.5">
                  {RESOURCE_LINKS.map((item) => {
                    const text = t.resourceLinks[item.key];
                    return (
                      <a
                        key={item.key}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        role="menuitem"
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-bg-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                      >
                        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-bg text-accent">
                          <ResourceIcon icon={item.icon} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <strong className="block text-sm text-text-primary">{text.label}</strong>
                          <span className="mt-1 block text-xs leading-relaxed text-text-tertiary">
                            {text.description}
                          </span>
                        </span>
                        <ArrowRight
                          aria-hidden
                          className="mt-2 h-3.5 w-3.5 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <LanguageSelect />

          <Link
            href="/demo"
            className="btn-wood hidden h-11 items-center justify-center whitespace-nowrap rounded-full px-4 text-sm font-semibold sm:px-5 md:inline-flex"
          >
            {t.bookDemo}
          </Link>

          <a
            href={downloadHref}
            className="btn-wood inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-sm font-semibold sm:px-5"
          >
            <Download aria-hidden className="h-4 w-4" />
            {t.download}
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? t.closeNav : t.openNav}
            aria-expanded={mobileOpen}
            aria-controls="mobile-site-navigation"
            className="glass-pill relative grid h-11 w-11 place-items-center text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 min-[1100px]:hidden"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="liquid-glass__refract" aria-hidden />
            {mobileOpen ? (
              <X aria-hidden className="relative z-10 h-5 w-5" />
            ) : (
              <Menu aria-hidden className="relative z-10 h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-site-navigation"
          className="mobile-nav-panel pointer-events-auto fixed inset-x-3 bottom-3 top-[76px] z-40 overflow-y-auto overscroll-contain rounded-[28px] p-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))] backdrop-blur-2xl min-[1100px]:hidden"
        >
          <div className="grid gap-1">
            <MobileLink href="/templates" label={t.aiTeams} onNavigate={() => setMobileOpen(false)} />
            <MobileLink href="/solutions" label={t.solutions} onNavigate={() => setMobileOpen(false)} />
            <MobileLink
              href="/enterprise/security"
              label={t.security}
              onNavigate={() => setMobileOpen(false)}
            />
            <MobileLink href="/pricing" label={t.pricing} onNavigate={() => setMobileOpen(false)} />
          </div>


          <div className="my-4 h-px bg-border" />
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-tertiary">
            {t.resources}
          </p>
          <div className="grid gap-1 sm:grid-cols-2">
            {RESOURCE_LINKS.map((item) => {
              return (
                <a
                  key={item.key}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-bg text-accent">
                    <ResourceIcon icon={item.icon} />
                  </span>
                  {t.resourceLinks[item.key].label}
                </a>
              );
            })}
          </div>

          <div className="mt-5 rounded-2xl bg-accent-bg-subtle px-5 py-5 text-text-primary shadow-sm">
            <p className="font-display text-2xl leading-tight tracking-[-0.04em]">
              {t.mobilePitch}
            </p>
            <Link
              href="/demo"
              className="btn-wood mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              {t.mobileCta} <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function MobileLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-semibold text-text-primary transition-colors hover:bg-bg-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      onClick={onNavigate}
    >
      {label}
      <ArrowRight aria-hidden className="h-4 w-4 text-text-tertiary" />
    </Link>
  );
}
