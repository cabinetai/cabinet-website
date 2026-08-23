"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export function TypingText({ texts }: { texts: string[] }) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const timeout = deleting ? 30 : 60;

    if (!deleting && charIndex === current.length) {
      const timer = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(timer);
    }
    if (deleting && charIndex === 0) {
      const timer = setTimeout(() => {
        setDeleting(false);
        setTextIndex((index) => (index + 1) % texts.length);
      }, timeout);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCharIndex((index) => index + (deleting ? -1 : 1));
    }, timeout);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, textIndex, texts]);

  return (
    <span className="text-accent">
      {texts[textIndex].slice(0, charIndex)}
      <span className="cursor-blink text-accent-light">|</span>
    </span>
  );
}

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="shrink-0 rounded p-1 text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-200"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-400" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

const TERMINAL_LINES = [
  { prompt: true, text: "npx cabinetai run" },
  { prompt: false, text: "Creating knowledge base..." },
  { prompt: false, text: "Setting up AI agents..." },
  { prompt: false, text: "" },
  { prompt: false, text: "  CEO Agent        ready    strategic planning" },
  { prompt: false, text: "  Content Writer   ready    blog, social, SEO" },
  { prompt: false, text: "  Editor           ready    KB maintenance" },
  { prompt: false, text: "" },
  { prompt: false, text: "Cabinet is running at http://localhost:3000" },
  { prompt: false, text: "Your AI team is ready." },
] as const;

export function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        let index = 0;
        const interval = setInterval(() => {
          index += 1;
          setVisibleLines(index);
          if (index >= TERMINAL_LINES.length) clearInterval(interval);
        }, 300);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );

    const container = containerRef.current;
    if (container) observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="terminal-chrome scanline relative">
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-500/70" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
        <div className="h-3 w-3 rounded-full bg-green-500/70" />
        <span className="ml-3 font-code text-xs text-zinc-500">cabinet ~ zsh</span>
      </div>
      <div className="min-h-[280px] p-5 font-code text-sm leading-relaxed">
        {TERMINAL_LINES.slice(0, visibleLines).map((line, index) => (
          <div key={index} className="flex">
            {line.prompt ? (
              <>
                <span className="mr-2 text-green-400">$</span>
                <span className="text-zinc-200">{line.text}</span>
              </>
            ) : (
              <span
                className={
                  line.text.startsWith("  ") && !line.text.startsWith("  Cabinet")
                    ? "text-amber-300"
                    : line.text.startsWith("Cabinet") || line.text.startsWith("Your")
                      ? "font-semibold text-green-400"
                      : "text-zinc-500"
                }
              >
                {line.text}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
