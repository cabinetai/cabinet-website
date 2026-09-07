"use client";

import { useEffect, useState } from "react";

// Email clients refuse to open custom-scheme links, so mail points here and this page fires the
// cabinet:// link itself. The desktop app registers the scheme; if nothing answers within a
// moment (no desktop install, or a browser that blocks the handoff) the fallback appears.
const DEEP_LINK = "cabinet://open";

export function OpenCabinetLauncher() {
  const [waited, setWaited] = useState(false);

  useEffect(() => {
    window.location.href = DEEP_LINK;
    const timer = window.setTimeout(() => setWaited(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <p className="text-lg text-text-secondary font-body-serif leading-relaxed mb-3" aria-live="polite">
      {waited
        ? "Nothing happened? Open Cabinet from your Applications folder or Start menu, or install it below."
        : "Opening Cabinet on this computer."}
    </p>
  );
}
