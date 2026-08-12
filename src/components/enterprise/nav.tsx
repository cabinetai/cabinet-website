"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/site-icons";
import { GITHUB_URL } from "@/lib/site-config";
import { useScrolled } from "@/lib/use-scrolled";

const PRIMARY_NAV = [
  { label: "Platform", href: "/enterprise/platform" },
  { label: "Security", href: "/enterprise/security" },
  { label: "Solutions", href: "/enterprise/solutions" },
  { label: "Pricing", href: "/pricing" },
];

export function EnterpriseNav() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();

  return (
    <header
      className={`sticky top-0 z-40 liquid-glass ${
        scrolled || open ? "" : "liquid-glass--top"
      }`}
    >
      <span className="liquid-glass__refract" aria-hidden />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center gap-8">
        {/* Logo */}
        <a href="/enterprise" className="flex shrink-0 items-center gap-3 group">
          <Image
            src="/brand/cabinet-drawers-logo.png"
            alt="Cabinet"
            width={34}
            height={36}
            className="h-8 w-auto object-contain"
          />
          <div className="flex items-center gap-2">
            <span className="font-brand italic text-[1.35rem] leading-none tracking-tight text-text-primary">
              Cabinet
            </span>
            <span className="hidden sm:inline-flex items-center rounded card-skin-warm px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-text-secondary uppercase">
              Enterprise
            </span>
          </div>
        </a>

        {/* Primary nav — Inter, not mono */}
        <nav className="hidden lg:flex items-center gap-8 ml-2">
          {PRIMARY_NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <a
                key={item.href}
                href={item.href}
                className={active ? "ent-nav-link ent-nav-link-active" : "ent-nav-link"}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* CTAs */}
        <div className="ml-auto flex items-center gap-2.5">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 h-10 px-3.5 rounded-full border border-border hover:border-border-dark hover:bg-bg-warm transition-all text-text-primary"
          >
            <GithubIcon className="w-4 h-4" />
            <span className="text-[13px] font-medium">Star</span>
          </a>
          <a
            href="/enterprise/briefing"
            className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-full text-[13px] font-semibold btn-wood"
          >
            Request briefing
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-text-primary hover:bg-bg-warm"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="relative z-10 lg:hidden liquid-glass-panel border-t border-white/40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {PRIMARY_NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="ent-nav-link py-2.5 px-3 rounded-md hover:bg-bg-warm"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/enterprise/briefing"
              onClick={() => setOpen(false)}
              className="mt-2 ent-btn-primary justify-center"
            >
              Request briefing
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
