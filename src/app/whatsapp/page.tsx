import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WhatsApp",
  description: "Connect your phone to your cabinet.",
  robots: { index: false, follow: false },
};

// Cabi tells people on WhatsApp to open runcabinet.com/whatsapp, which is short enough to
// type from a chat. The page itself lives in the panel, so this forwards there. The site is
// a static export, so the forward is a script plus a visible link, not a server redirect.
const TARGET = "https://app.runcabinet.com/whatsapp";

export default function WhatsAppForward() {
  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-6 py-16">
      <script
        dangerouslySetInnerHTML={{ __html: `window.location.replace(${JSON.stringify(TARGET)});` }}
      />
      <div className="max-w-xl w-full text-center">
        <p className="text-lg">
          Taking you to your WhatsApp settings. If nothing happens,{" "}
          <a className="underline" href={TARGET}>
            open them here
          </a>
          .
        </p>
      </div>
    </main>
  );
}
