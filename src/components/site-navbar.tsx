"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Download, Star } from "lucide-react";
import { GithubIcon } from "@/components/site-icons";
import { SolutionsMenu } from "@/components/solutions-menu";
import { GITHUB_URL } from "@/lib/site-config";

type GitHubRepoResponse = {
  stargazers_count?: number;
};

function formatStarCount(stars: number | null) {
  if (stars === null) return "Star on GitHub";
  return new Intl.NumberFormat("en", {
    notation: stars >= 1000 ? "compact" : "standard",
    maximumFractionDigits: stars >= 1000 ? 1 : 0,
  }).format(stars);
}

function getGitHubRepoPath(url: string) {
  const match = url.match(/github\.com\/([^/]+\/[^/?#]+)/i);
  return match?.[1] ?? null;
}

function useGitHubStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const repoPath = getGitHubRepoPath(GITHUB_URL);
    if (!repoPath) return;
    const controller = new AbortController();

    async function loadStars() {
      try {
        const response = await fetch(`https://api.github.com/repos/${repoPath}`, {
          signal: controller.signal,
          headers: { Accept: "application/vnd.github+json" },
        });
        if (!response.ok) return;
        const data = (await response.json()) as GitHubRepoResponse;
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error("Unable to load GitHub stars", error);
        }
      }
    }

    loadStars();
    return () => controller.abort();
  }, []);

  return stars;
}

/** A single floating liquid-glass nav button. */
function GlassNavLink({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a
      href={href}
      {...ext}
      className="glass-pill group inline-flex h-10 items-center px-4 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
    >
      <span className="liquid-glass__refract" aria-hidden />
      <span className="relative z-10">{children}</span>
    </a>
  );
}

/**
 * The single site-wide navbar, rendered as floating liquid-glass buttons that
 * sit on top of the page. Pass `fixed` on the homepage (it overlays the pinned
 * scrollytelling scene); everywhere else it defaults to `sticky` so it stays in
 * flow and pins to the top on scroll.
 */
export function SiteNavbar({ fixed = false }: { fixed?: boolean }) {
  const stars = useGitHubStars();

  return (
    <nav
      className={`${
        fixed ? "fixed inset-x-0 top-0" : "sticky top-0"
      } z-50 pointer-events-none`}
    >
      <div className="pointer-events-auto max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-3 flex items-center gap-2.5 lg:gap-3">
        {/* Logo button */}
        <a
          href="/"
          className="glass-pill group inline-flex h-11 shrink-0 items-center gap-2.5 pl-2.5 pr-4"
        >
          <span className="liquid-glass__refract" aria-hidden />
          <span className="relative z-10 inline-flex items-center gap-2.5">
            <Image
              src="/brand/cabinet-logo-face-2-512.png"
              alt="Cabinet"
              width={38}
              height={40}
              className="h-9 w-auto object-contain"
            />
            <span className="whitespace-nowrap text-xl font-brand italic tracking-tight text-text-primary">
              Cabinet
            </span>
          </span>
        </a>

        {/* Section buttons */}
        <div className="hidden min-[1100px]:flex items-center gap-2">
          <GlassNavLink href="/#features">Features</GlassNavLink>
          <SolutionsMenu triggerClassName="text-text-secondary" />
          <GlassNavLink href="/compare">Compare</GlassNavLink>
          <GlassNavLink href="/pricing">Pricing</GlassNavLink>
          <GlassNavLink href="https://docs.runcabinet.com/" external>
            Docs
          </GlassNavLink>
          <GlassNavLink href="/media">Media</GlassNavLink>
        </div>

        {/* Action buttons */}
        <div className="ml-auto flex items-center gap-2.5">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Star Cabinet on GitHub (${formatStarCount(stars)} stars)`}
            className="glass-pill group hidden h-10 items-center px-3.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary sm:inline-flex"
          >
            <span className="liquid-glass__refract" aria-hidden />
            <span className="relative z-10 inline-flex items-center gap-1.5 whitespace-nowrap">
              <GithubIcon className="w-4 h-4" />
              <Star className="w-3.5 h-3.5 fill-current text-accent" />
              {formatStarCount(stars)}
            </span>
          </a>
          <a
            href="/demo"
            className="glass-pill group hidden h-10 items-center px-4 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary sm:inline-flex"
          >
            <span className="liquid-glass__refract" aria-hidden />
            <span className="relative z-10 whitespace-nowrap">Book a demo</span>
          </a>
          {/* primary CTA — stays solid so it reads as the one action */}
          <a
            href="/#get-started"
            className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-sm font-semibold btn-wood"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
