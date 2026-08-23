"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bot, Clock, FolderTree, FileText, Search, ChevronRight } from "lucide-react";
import { StarButton } from "./star-button";
import type { RegistryEntry } from "@/lib/template-types";

function CabinetListItem({ entry }: { entry: RegistryEntry }) {
  return (
    <Link
      href={`/templates/${entry.slug}`}
      className="group flex items-center gap-4 rounded-xl border border-border bg-bg-card pr-5 py-3 pl-3 card-hover"
    >
      <div className="relative shrink-0 w-24 sm:w-32 aspect-[16/9] overflow-hidden rounded-lg bg-bg-warm">
        <Image
          src={`/covers/${entry.slug}.jpg`}
          alt={entry.meta.name}
          fill
          sizes="128px"
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-sans text-base font-semibold text-text-primary group-hover:text-accent transition-colors truncate">
            {entry.meta.name}
          </h3>
          <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[9px] font-code text-text-muted">
            v{entry.meta.version}
          </span>
        </div>
        <p className="text-sm text-text-secondary font-sans line-clamp-1">
          {entry.meta.description}
        </p>
      </div>

      <div className="hidden sm:flex items-center gap-4 text-xs text-text-tertiary shrink-0">
        <span className="flex items-center gap-1">
          <Bot className="h-3.5 w-3.5" />
          {entry.stats.totalAgents}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {entry.stats.totalJobs}
        </span>
        {entry.stats.totalCabinets > 1 && (
          <span className="flex items-center gap-1">
            <FolderTree className="h-3.5 w-3.5" />
            {entry.stats.totalCabinets}
          </span>
        )}
        <span className="flex items-center gap-1">
          <FileText className="h-3.5 w-3.5" />
          {entry.stats.totalPages}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <StarButton slug={entry.slug} size="sm" />
        <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
      </div>
    </Link>
  );
}

interface CabinetListProps {
  entries: RegistryEntry[];
  categories: { name: string; slug: string }[];
}

export function CabinetList({ entries, categories }: CabinetListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(
      (e) =>
        e.meta.name.toLowerCase().includes(q) ||
        e.meta.description.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [entries, query]);

  // Group into sections in the given order; any section with no cabinets is skipped.
  const sections = useMemo(
    () =>
      categories
        .map((c) => ({
          ...c,
          items: filtered.filter((e) => e.section === c.name),
        }))
        .filter((s) => s.items.length > 0),
    [filtered, categories]
  );

  const searching = query.trim().length > 0;

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cabinets..."
          className="w-full rounded-lg border border-border bg-bg-card pl-9 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
        />
      </div>

      {searching ? (
        // Flat results across all sections while searching.
        <div className="space-y-3">
          {filtered.map((entry) => (
            <CabinetListItem key={entry.slug} entry={entry} />
          ))}
        </div>
      ) : (
        // Collapsible section groups by default.
        <div className="space-y-4">
          {sections.map((s) => (
            <details key={s.name} id={s.slug} open className="group/section scroll-mt-24">
              <summary className="flex cursor-pointer items-center gap-2 list-none py-2 select-none">
                <ChevronRight className="h-4 w-4 text-text-muted transition-transform group-open/section:rotate-90" />
                <h3 className="font-sans text-base font-semibold text-text-primary">
                  {s.name}
                </h3>
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-code text-text-muted">
                  {s.items.length}
                </span>
              </summary>
              <div className="space-y-3 pt-2">
                {s.items.map((entry) => (
                  <CabinetListItem key={entry.slug} entry={entry} />
                ))}
              </div>
            </details>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-text-tertiary font-body-serif">No cabinets match your search.</p>
        </div>
      )}
    </div>
  );
}
