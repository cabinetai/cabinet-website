import { CopyButton } from "@/components/marketing/legacy-interactive-primitives";
import { MACOS_DOWNLOAD_URL, WINDOWS_DOWNLOAD_URL } from "@/lib/site-config";

// Cabinet's installers ship as GitHub release artifacts on
// github.com/cabinetai/cabinet (see MACOS_DOWNLOAD_URL / WINDOWS_DOWNLOAD_URL in
// site-config, currently the v0.5.0 .dmg and .Setup.exe). Mac leads with the
// .dmg; `npx cabinetai run` starts it without installing; Windows gets the
// installer link. Plain static links, no OS-detection and no build-time script.
export function DownloadButtons({ align = "center" }: { align?: "center" | "left" }) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-xl" : ""}>
      {/* Install Options */}
      <div
        className={`flex flex-col sm:flex-row items-stretch gap-3 ${centered ? "justify-center" : ""}`}
      >
        <a
          href={MACOS_DOWNLOAD_URL}
          className="btn-wood inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-base font-semibold"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Download for Mac
        </a>
        <span className="hidden items-center font-code text-sm text-text-muted sm:flex">or</span>
        <div
          className="terminal-chrome flex flex-1 items-center justify-between rounded-xl px-5 py-4"
          style={{ overflow: "visible" }}
        >
          <div className="flex items-center gap-2 font-code text-sm">
            <span className="shrink-0 text-green-400">$</span>
            <span className="whitespace-nowrap text-zinc-200">npx cabinetai run</span>
          </div>
          <CopyButton text="npx cabinetai run" />
        </div>
      </div>
      <p
        className={`mt-4 font-body-serif text-sm text-text-tertiary ${centered ? "text-center" : ""}`}
      >
        On Windows?{" "}
        <a
          href={WINDOWS_DOWNLOAD_URL}
          className="text-accent underline underline-offset-2 hover:text-accent-warm"
        >
          Download the installer
        </a>
      </p>
    </div>
  );
}
