"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Download,
  Menu,
  Star,
  X,
} from "lucide-react";
import { GithubIcon } from "@/components/site-icons";
import { SolutionsMenu } from "@/components/solutions-menu";
import { GITHUB_URL } from "@/lib/site-config";

const RESOURCE_LINKS = [
  {
    label: "Templates",
    description: "Inspect and clone working AI teams.",
    href: "/templates",
    external: false,
    icon: "/brand/ui/boxes.png",
  },
  {
    label: "Documentation",
    description: "Install, configure, and operate Cabinet.",
    href: "https://docs.runcabinet.com/",
    external: true,
    icon: "/brand/ui/book.png",
  },
  {
    label: "Compare",
    description: "Evaluate architecture, control, and fit.",
    href: "/compare",
    external: false,
    icon: "/brand/ui/scale.png",
  },
  {
    label: "GitHub",
    description: "Inspect the source and follow releases.",
    href: GITHUB_URL,
    external: true,
    icon: GithubIcon,
  },
  {
    label: "Get Cabinet",
    description: "Download the desktop app or run the CLI.",
    href: "/download",
    external: false,
    icon: "/brand/ui/rocket.png",
  },
] as const;

// GitHub keeps its brand mark; everything else uses the wooden icon set.
function ResourceIcon({ icon, className }: { icon: (typeof RESOURCE_LINKS)[number]["icon"]; className: string }) {
  if (typeof icon === "string") {
    return <Image src={icon} alt="" width={30} height={30} className="h-7 w-7 object-contain" />;
  }
  const Icon = icon;
  return <Icon aria-hidden className={className} />;
}

const GITHUB_API_URL = GITHUB_URL.replace("github.com/", "api.github.com/repos/");

function useGitHubStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    // ponytail: unauthenticated GitHub API, 60 req/hr per visitor IP is plenty here
    fetch(GITHUB_API_URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((repo) => {
        if (typeof repo?.stargazers_count === "number") setStars(repo.stargazers_count);
      })
      .catch(() => {});
  }, []);

  return stars;
}

const formatStars = (n: number) =>
  new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);

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
  const stars = useGitHubStars();

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
      aria-label="Primary navigation"
      className={`site-navbar ${fixed ? "fixed inset-x-0 top-0" : "sticky top-0"} isolate z-50 pointer-events-none`}
    >
      <div className="pointer-events-auto mx-auto flex max-w-7xl items-center gap-2.5 px-4 pb-3 pt-3 sm:px-6 lg:gap-3">
        <Link
          href="/"
          aria-label="Cabinet home"
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
          <GlassNavLink href="/templates">AI teams</GlassNavLink>
          <SolutionsMenu triggerClassName="text-text-secondary" />
          <GlassNavLink href="/enterprise/security">Security</GlassNavLink>
          <GlassNavLink href="/pricing">Pricing</GlassNavLink>

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
                Resources
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
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        role="menuitem"
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-bg-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                      >
                        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-bg text-accent">
                          <ResourceIcon icon={item.icon} className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <strong className="block text-sm text-text-primary">{item.label}</strong>
                          <span className="mt-1 block text-xs leading-relaxed text-text-tertiary">
                            {item.description}
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
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Cabinet on GitHub"
            className="glass-pill group hidden h-10 items-center px-3.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 sm:inline-flex"
          >
            <span className="liquid-glass__refract" aria-hidden />
            <span className="relative z-10 inline-flex items-center gap-1.5 whitespace-nowrap">
              <GithubIcon className="h-4 w-4" />
              GitHub
              {stars !== null && (
                <span className="ml-0.5 inline-flex items-center gap-1 rounded-full bg-accent-bg px-2 py-0.5 text-xs font-semibold text-accent">
                  <Star aria-hidden className="h-3 w-3 fill-current" />
                  {formatStars(stars)}
                </span>
              )}
            </span>
          </a>

          <Link
            href="/demo"
            className="btn-wood hidden h-11 items-center justify-center whitespace-nowrap rounded-full px-4 text-sm font-semibold sm:px-5 md:inline-flex"
          >
            Book a demo
          </Link>

          <Link
            href="/download"
            className="btn-wood inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-sm font-semibold sm:px-5"
          >
            <Download aria-hidden className="h-4 w-4" />
            Download
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
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
            <MobileLink href="/templates" label="AI teams" onNavigate={() => setMobileOpen(false)} />
            <MobileLink href="/solutions" label="Solutions" onNavigate={() => setMobileOpen(false)} />
            <MobileLink
              href="/enterprise/security"
              label="Security"
              onNavigate={() => setMobileOpen(false)}
            />
            <MobileLink href="/pricing" label="Pricing" onNavigate={() => setMobileOpen(false)} />
          </div>

          <div className="my-4 h-px bg-border" />
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-tertiary">
            Resources
          </p>
          <div className="grid gap-1 sm:grid-cols-2">
            {RESOURCE_LINKS.map((item) => {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-bg text-accent">
                    <ResourceIcon icon={item.icon} className="h-4 w-4" />
                  </span>
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="mt-5 rounded-2xl bg-accent-bg-subtle px-5 py-5 text-text-primary shadow-sm">
            <p className="font-display text-2xl leading-tight tracking-[-0.04em]">
              See Cabinet around one real company workflow.
            </p>
            <Link
              href="/demo"
              className="btn-wood mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              Book an executive demo <ArrowRight aria-hidden className="h-4 w-4" />
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
