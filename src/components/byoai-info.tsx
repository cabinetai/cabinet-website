"use client";

import { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";

const PROVIDERS = [
  "OpenAI",
  "Anthropic",
  "Google Gemini",
  "xAI Grok",
  "DeepSeek",
  "Ollama (local)",
];

const PROVIDERS_INLINE = PROVIDERS.join(" · ") + " · and more";

export function BYOAIInfo() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  // Close on outside click (so tap-to-open on mobile is dismissible).
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <span ref={wrapRef} className="relative inline-block align-middle ml-1.5">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-label="See supported AI providers"
        title={`Works with ${PROVIDERS_INLINE}`}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-bg-card text-text-tertiary border border-border-light hover:border-border-dark hover:text-text-primary transition-colors"
      >
        <Info className="h-2.5 w-2.5" strokeWidth={2.5} />
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-30 w-max max-w-[260px] rounded-xl border border-border bg-bg-card px-3.5 py-2.5 text-xs leading-relaxed text-text-secondary shadow-[0_10px_30px_-10px_rgba(40,28,12,0.25)] text-left font-normal normal-case tracking-normal"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <span className="block mb-1.5 font-display text-sm text-text-primary">
            Bring your own AI
          </span>
          <span className="block">
            Plug in {PROVIDERS_INLINE}.
          </span>
        </span>
      )}
    </span>
  );
}
