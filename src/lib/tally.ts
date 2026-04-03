export function ensureTallyWidget() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  const widgetScriptSrc = "https://tally.so/widgets/embed.js";

  if (typeof window.Tally !== "undefined") {
    return Promise.resolve();
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="${widgetScriptSrc}"]`,
  );

  if (existingScript) {
    return new Promise<void>((resolve) => {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => resolve(), { once: true });
    });
  }

  return new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.src = widgetScriptSrc;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });
}
