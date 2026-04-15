"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { DiscordIcon, GithubIcon } from "@/components/site-icons";
import { DISCORD_URL, GITHUB_URL } from "@/lib/site-config";

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

export function SiteNavbar() {
  const stars = useGitHubStars();

  return (
    <nav className="relative z-20 border-b border-border bg-bg-card/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 min-h-16 py-3 flex items-center gap-6 lg:gap-10">
        <a href="/" className="flex shrink-0 items-center gap-3 pr-4 lg:pr-6">
          <Image src="/cabinet-icon.png" alt="Cabinet" width={36} height={36} className="rounded-lg" />
          <span className="whitespace-nowrap text-xl font-display italic tracking-tight text-text-primary">
            Cabinet
          </span>
        </a>
        <div className="hidden min-[1100px]:flex flex-1 items-center gap-8 text-sm font-code text-text-tertiary">
          <a href="/#features" className="hover:text-text-primary transition-colors">
            Features
          </a>
          <a href="/#karpathy" className="hover:text-text-primary transition-colors">
            Why Now
          </a>
          <a href="/#compare" className="hover:text-text-primary transition-colors">
            Compare
          </a>
          <a href="/#agents" className="hover:text-text-primary transition-colors">
            AI Agents
          </a>
          <a href="/media" className="text-text-primary transition-colors">
            In the Wild
          </a>
        </div>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 min-w-[11rem] items-center justify-between gap-3 rounded-full border border-border bg-bg-card px-4 text-sm font-semibold text-text-primary shadow-sm transition-all hover:border-border-dark hover:bg-bg-card-hover"
          >
            <span className="inline-flex items-center gap-2">
              <GithubIcon className="w-4 h-4" />
              <span>Star Cabinet</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-bg px-2.5 py-1 text-[0.72rem] font-semibold text-accent shadow-sm ring-1 ring-border-light">
              <Star className="w-3.5 h-3.5 fill-current" />
              {formatStarCount(stars)}
            </span>
          </a>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#5865F2] px-5 text-sm font-medium text-white transition-colors shadow-sm shadow-[#5865F2]/20 hover:bg-[#4752C4]"
          >
            <DiscordIcon className="w-4 h-4" />
            <span>Discord</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
