"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { ArrowRight, ChevronDown, Terminal } from "lucide-react";
import { CopyButton } from "@/components/marketing/legacy-interactive-primitives";
import { MotionReveal } from "@/components/marketing/motion-primitives";
import { AppleIcon, LinuxIcon, WindowsIcon } from "@/components/marketing/os-icons";
import { GITHUB_URL, MACOS_DOWNLOAD_URL, WINDOWS_DOWNLOAD_URL } from "@/lib/site-config";

export type DesktopOs = "macos" | "windows" | "linux";

type OsOption = {
  id: DesktopOs;
  name: string;
  label: string;
  href: string;
  Icon: (props: { className?: string }) => React.JSX.Element;
  newTab: boolean;
};

export const OS_OPTIONS: readonly OsOption[] = [
  {
    id: "macos",
    name: "macOS",
    label: "Download for Mac",
    href: MACOS_DOWNLOAD_URL,
    Icon: AppleIcon,
    newTab: false,
  },
  {
    id: "windows",
    name: "Windows",
    label: "Download for Windows",
    href: WINDOWS_DOWNLOAD_URL,
    Icon: WindowsIcon,
    newTab: false,
  },
  {
    id: "linux",
    // No packaged Linux build ships in the release yet, so this points at the repo.
    name: "Linux",
    label: "Linux via GitHub",
    href: GITHUB_URL,
    Icon: LinuxIcon,
    newTab: true,
  },
];

const DEFAULT_OS: DesktopOs = "macos";

function detectOs(): DesktopOs {
  if (typeof navigator === "undefined") return DEFAULT_OS;

  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string };
    platform?: string;
  };
  // navigator.platform is deprecated but still the only signal in Safari/Firefox.
  const platform = nav.userAgentData?.platform ?? nav.platform ?? "";
  const hint = `${platform} ${nav.userAgent ?? ""}`;

  if (/Windows|Win32|Win64|WOW64/i.test(hint)) return "windows";
  // Android reports "Linux" too, so it has to be ruled out before the Linux check.
  if (/Linux|X11|CrOS/i.test(hint) && !/Android/i.test(hint)) return "linux";
  if (/Mac|iPhone|iPad|iPod/i.test(hint)) return "macos";
  return DEFAULT_OS;
}

/**
 * Resolves after mount so the prerendered HTML stays stable. Until then every
 * visitor sees the macOS build, which is the most common one for this audience.
 */
export function useDetectedOs(): DesktopOs {
  const [os, setOs] = useState<DesktopOs>(DEFAULT_OS);

  useEffect(() => {
    setOs(detectOs());
  }, []);

  return os;
}

function orderedForOs(os: DesktopOs) {
  const primary = OS_OPTIONS.find((option) => option.id === os) ?? OS_OPTIONS[0];
  const others = OS_OPTIONS.filter((option) => option.id !== primary.id);
  return { primary, others };
}

function linkTarget(option: OsOption) {
  return option.newTab
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};
}

/**
 * Hero call to action. Phones keep the demo as the primary action and a quiet
 * availability list, because a desktop app is not installable from a phone.
 * Tablet and up leads with the build that matches the visitor's OS and offers
 * the remaining two underneath.
 */
export function HeroDownloadCta() {
  const os = useDetectedOs();
  const { primary, others } = orderedForOs(os);

  return (
    <>
      <MotionReveal delay={0.61} amount={0.1}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/demo"
            className="btn-wood inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-sm font-semibold sm:hidden"
          >
            Book an executive demo <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
          <a
            href={primary.href}
            {...linkTarget(primary)}
            className="btn-wood hidden h-13 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-sm font-semibold sm:inline-flex sm:px-6 sm:text-base"
          >
            <primary.Icon className="h-4 w-4" />
            {primary.label}
          </a>
          <a
            href="#workflows"
            className="inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap px-3 text-sm font-semibold text-text-primary transition-colors hover:text-accent sm:text-base"
          >
            Explore AI teams <ArrowRight aria-hidden className="h-4 w-4" />
          </a>
        </div>
      </MotionReveal>

      <MotionReveal delay={0.66} amount={0.1}>
        {/* Mobile: a quiet, non-interactive OS availability list */}
        <div className="mt-5 sm:hidden" aria-label="Desktop app availability">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
            Available on
          </p>
          <div className="mt-2.5 flex flex-col gap-2">
            {OS_OPTIONS.map(({ id, name, Icon }) => (
              <span
                key={id}
                className="card-skin inline-flex h-10 items-center gap-2.5 rounded-full px-4 text-sm font-semibold text-text-primary"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-accent" />
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Tablet/desktop: the builds the visitor is not on, offered under the primary */}
        <div className="mt-5 hidden sm:block">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
            Also available for
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-2.5 text-xs font-semibold">
            {others.map((option) => (
              <a
                key={option.id}
                href={option.href}
                {...linkTarget(option)}
                className="card-skin inline-flex h-10 items-center gap-2 rounded-full px-4 text-text-primary transition-transform hover:-translate-y-0.5"
              >
                <option.Icon className="h-3.5 w-3.5 text-accent" />
                {option.label}
              </a>
            ))}
          </div>
        </div>
      </MotionReveal>
    </>
  );
}

const INSTALL_COMMAND = "npx cabinetai run";

/**
 * The CLI path, folded away by default. Most visitors want the desktop app, so
 * the terminal option stays available without competing with the buttons.
 */
export function TerminalInstall({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={`card-skin overflow-hidden rounded-xl ${className}`.trim()}>
      <button
        type="button"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-3.5 text-left text-sm font-semibold text-text-primary transition-colors hover:text-accent"
      >
        <span className="inline-flex items-center gap-2">
          <Terminal aria-hidden className="h-4 w-4 text-accent" />
          Terminal install
        </span>
        <ChevronDown
          aria-hidden
          className={`h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-300 ease-out motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* 0fr -> 1fr animates to the content's natural height without measuring it. */}
      <div
        id={panelId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`px-3 pb-3 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
              open ? "opacity-100 delay-75" : "opacity-0"
            }`}
          >
            <div className="terminal-chrome flex items-center justify-between gap-3 rounded-lg px-4 py-3.5">
              <div className="font-code text-sm flex items-center gap-2">
                <span className="text-green-400 shrink-0">$</span>
                <span className="text-zinc-200 whitespace-nowrap">{INSTALL_COMMAND}</span>
              </div>
              <CopyButton text={INSTALL_COMMAND} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Three equal-weight download buttons, detected OS first. Used where the page
 * has room to give every platform the same treatment instead of pushing
 * Windows and Linux into a footnote.
 */
export function OsDownloadButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`grid gap-3 sm:grid-cols-3 ${className}`.trim()}>
      {OS_OPTIONS.map((option) => (
        <a
          key={option.id}
          href={option.href}
          {...linkTarget(option)}
          className="btn-wood inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-xl px-4 py-4 text-[15px] font-semibold cursor-pointer"
        >
          <option.Icon className="h-5 w-5 shrink-0" />
          {option.label}
        </a>
      ))}
    </div>
  );
}
