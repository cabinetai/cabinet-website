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

/**
 * The single site-wide navbar. Pass `fixed` on the homepage (it overlays the
 * pinned scrollytelling scene); everywhere else it defaults to `sticky` so it
 * stays in flow and pins to the top on scroll without needing a content offset.
 */
export function SiteNavbar({ fixed = false }: { fixed?: boolean }) {
  const stars = useGitHubStars();

  return (
    <nav
      className={`${
        fixed ? "fixed inset-x-0 top-0" : "sticky top-0"
      } z-50 border-b border-border bg-bg-card/95 backdrop-blur-sm`}
    >
      <div className="max-w-7xl mx-auto px-6 min-h-16 py-3 flex items-center gap-5 lg:gap-8">
        <a href="/" className="flex shrink-0 items-center gap-3 pr-4 lg:pr-6">
          <Image src="/cabinet-icon.png" alt="Cabinet" width={36} height={36} className="rounded-lg" />
          <span className="whitespace-nowrap text-xl font-brand italic tracking-tight text-text-primary">
            Cabinet
          </span>
        </a>
        <div className="hidden min-[1100px]:flex flex-1 items-center gap-6 whitespace-nowrap text-sm font-medium text-text-secondary">
          <a href="/#features" className="hover:text-text-primary transition-colors">
            Features
          </a>
          <SolutionsMenu triggerClassName="text-text-secondary" />
          <a href="/compare" className="hover:text-text-primary transition-colors">
            Compare
          </a>
          <a href="/pricing" className="hover:text-text-primary transition-colors">
            Pricing
          </a>
          <a
            href="https://docs.runcabinet.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            Docs
          </a>
          <a href="/media" className="hover:text-text-primary transition-colors">
            Media
          </a>
        </div>
        <div className="ml-auto flex items-center gap-4 sm:gap-5">
          {/* quiet social proof — not a CTA, so no box */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Star Cabinet on GitHub (${formatStarCount(stars)} stars)`}
            className="hidden items-center gap-1.5 whitespace-nowrap text-sm font-medium text-text-tertiary transition-colors hover:text-text-primary sm:inline-flex"
          >
            <GithubIcon className="w-4 h-4" />
            <Star className="w-3.5 h-3.5 fill-current text-accent" />
            {formatStarCount(stars)}
          </a>
          {/* secondary action — light text button */}
          <a
            href="/demo"
            className="hidden whitespace-nowrap text-sm font-medium text-text-secondary transition-colors hover:text-text-primary sm:inline-flex"
          >
            Book a demo
          </a>
          {/* the one primary CTA */}
          <a
            href="/#get-started"
            className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-warm"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
