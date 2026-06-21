"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import type { UseCase } from "@/lib/use-cases";

export function UseCasesBrowser({ items }: { items: UseCase[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.flatMap((i) => i.tags)))],
    [items],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      const matchCategory = category === "All" || i.tags.includes(category);
      const matchQuery =
        !q ||
        `${i.title} ${i.blurb} ${i.tags.join(" ")}`.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [items, query, category]);

  return (
    <>
      {/* Controls */}
      <div className="mb-12 flex flex-col items-center gap-5">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search use cases…"
            aria-label="Search use cases"
            className="h-11 w-full rounded-full border border-border bg-bg-card pl-11 pr-4 text-sm text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={active}
                className={`h-9 rounded-full px-4 text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent text-bg"
                    : "bg-bg-card text-text-secondary ring-1 ring-border hover:text-text-primary"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-text-secondary">
          No use cases match that yet. Try a different search or category.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2">
          {filtered.map((u) => (
            <article
              key={u.slug}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-bg-card shadow-[0_18px_44px_-22px_rgba(150,108,68,0.42)] ring-1 ring-[rgba(59,47,47,0.06)] transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="relative w-full" style={{ paddingBottom: "52.5%" }}>
                <Image
                  src={u.image}
                  alt={u.title}
                  width={1200}
                  height={630}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                {/* clickable tags sit above the stretched card link (z-10) */}
                <div className="relative z-10 mb-3 flex flex-wrap gap-1.5">
                  {u.tags.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setCategory(t)}
                      aria-label={`Filter by ${t}`}
                      className="rounded-full bg-accent-bg px-2.5 py-1 font-code text-[11px] uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-bg"
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <h2 className="mb-3 text-xl font-display leading-snug text-text-primary transition-colors group-hover:text-accent md:text-2xl">
                  <a
                    href={`/use-cases/${u.slug}/index.html`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {u.title}
                  </a>
                </h2>
                <p className="mb-5 text-[15px] leading-relaxed text-text-secondary">
                  {u.blurb}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-code text-xs text-text-tertiary">
                    {u.author} · {u.dateLabel} · {u.readingTime}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Read
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
