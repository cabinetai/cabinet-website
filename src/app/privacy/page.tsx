import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: "Privacy Policy — Cabinet",
  description:
    "Privacy Policy for Cabinet (runcabinet.com). The Cabinet software runs locally on your machine and does not transmit your files or knowledge base to us.",
  alternates: { canonical: "https://runcabinet.com/privacy" },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "April 24, 2026";
const LAST_UPDATED = "April 24, 2026";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg">
      <SiteNavbar />

      <section className="relative py-16 md:py-24 dot-grid overflow-hidden">
        <div className="max-w-3xl mx-auto px-6">
          <header className="mb-12 text-center">
            <p className="text-sm font-code uppercase tracking-wider text-text-tertiary mb-3">
              Legal
            </p>
            <h1 className="text-4xl md:text-5xl font-display text-text-primary tracking-tight leading-[1.05] mb-5">
              Privacy <span className="italic gradient-text">Policy</span>
            </h1>
            <p className="text-sm font-code text-text-tertiary">
              Effective Date: {EFFECTIVE_DATE} · Last Updated: {LAST_UPDATED}
            </p>
          </header>

          <div className="rounded-2xl border border-border bg-bg-card p-6 md:p-8 mb-10 shadow-sm">
            <p className="text-sm font-code uppercase tracking-wider text-accent mb-3">
              Short version
            </p>
            <p className="text-text-secondary font-body-serif leading-relaxed">
              Cabinet is an{" "}
              <strong className="text-text-primary">open-source tool that runs locally</strong> on
              your machine. The Software does{" "}
              <strong className="text-text-primary">not</strong> transmit your files, knowledge
              base, prompts, or source code to us. This website{" "}
              <a href="https://runcabinet.com" className="text-accent hover:underline">
                runcabinet.com
              </a>{" "}
              collects limited information — primarily analytics and, if you choose, an email
              address for the waitlist.
            </p>
          </div>

          <article className="space-y-10 text-text-secondary font-body-serif leading-relaxed">
            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                1. Who We Are; Data Controller
              </h2>
              <p className="mb-4">
                This Privacy Policy describes how{" "}
                <strong className="text-text-primary">HOLY BIBLE APPS LTD</strong>, a company
                organized under the laws of the State of Israel and registered in Tirat Carmel,
                Israel, that owns and operates the Cabinet project (&ldquo;Cabinet,&rdquo;
                &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), collects, uses, and
                shares information in connection with the website at{" "}
                <a href="https://runcabinet.com" className="text-accent hover:underline">
                  runcabinet.com
                </a>{" "}
                (the &ldquo;Site&rdquo;) and the Cabinet software (the &ldquo;Software&rdquo;).
                HOLY BIBLE APPS LTD is the data controller for personal information processed
                through the Site. All privacy inquiries and requests should be directed to{" "}
                <a href="mailto:hi@runcabinet.com" className="text-accent hover:underline">
                  hi@runcabinet.com
                </a>
                .
              </p>
              <p>
                This Policy does not cover third-party websites, services, or AI providers you
                connect to. Please also review our{" "}
                <Link href="/terms" className="text-accent hover:underline">
                  Terms of Service
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                2. The Software Runs Locally
              </h2>
              <p className="mb-4">
                The Cabinet Software is designed to operate on your own computer or infrastructure.
                Your knowledge base files, prompts, source code, credentials, environment
                variables, and other locally stored content remain on the systems you control.{" "}
                <strong className="text-text-primary">
                  We do not receive, store, or have access to the contents of your local Cabinet
                  knowledge base, and we do not operate servers that collect that data.
                </strong>
              </p>
              <p>
                When you configure the Software to communicate with third-party services — for
                example, AI providers (such as Anthropic or OpenAI), code hosts, or other APIs —
                data may be sent to those services under{" "}
                <strong className="text-text-primary">their</strong> privacy policies and{" "}
                <strong className="text-text-primary">your</strong> account credentials. We are
                not a party to, and are not responsible for, those transmissions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                3. Information We Collect Through the Site
              </h2>
              <p className="mb-4">
                When you visit the Site, we and our service providers collect the following
                limited categories of information:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className="text-text-primary">Analytics data (Google Analytics 4).</strong>{" "}
                  Pages viewed, referring URL, approximate location derived from IP, browser and
                  device type, operating system, language, screen size, session duration, and
                  interaction events. Google may assign a pseudonymous identifier via cookies or
                  similar technologies. We use analytics to understand aggregate site usage and
                  improve the Site.
                </li>
                <li>
                  <strong className="text-text-primary">Waitlist information (Tally).</strong> If
                  you submit the waitlist form, we receive the email address and any other
                  information you voluntarily provide. The form is hosted by Tally, which processes
                  submissions on our behalf.
                </li>
                <li>
                  <strong className="text-text-primary">Server logs.</strong> Standard web-server
                  logs (IP address, request time, URL requested, user-agent) may be retained by our
                  hosting and CDN providers for short periods for security, abuse prevention, and
                  operational purposes.
                </li>
                <li>
                  <strong className="text-text-primary">Embedded content.</strong> Some pages embed
                  third-party content (for example, YouTube videos and GitHub star counts). Those
                  providers may set their own cookies and collect information about your
                  interaction with their content when loaded.
                </li>
                <li>
                  <strong className="text-text-primary">Communications.</strong> If you email us
                  or join our Discord, we will receive the information you choose to share.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                4. How We Use Information
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>to operate, maintain, secure, and improve the Site;</li>
                <li>to respond to inquiries sent by email or form submission;</li>
                <li>to send you waitlist and launch updates if you have opted in;</li>
                <li>to understand aggregate traffic and usage patterns;</li>
                <li>to detect, investigate, and prevent security incidents, fraud, or abuse; and</li>
                <li>to comply with legal obligations and enforce our Terms of Service.</li>
              </ul>
              <p className="mt-4">
                We do not sell personal information. We do not use personal information collected
                through the Site for automated decision-making that produces legal or similarly
                significant effects.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                5. Legal Bases (EEA / UK Users)
              </h2>
              <p>
                If you are in the European Economic Area, United Kingdom, or Switzerland, we process
                your personal information on the following legal bases under the GDPR/UK GDPR: (a){" "}
                <strong className="text-text-primary">consent</strong> (for non-essential cookies
                and marketing emails); (b){" "}
                <strong className="text-text-primary">legitimate interests</strong> (for site
                security, fraud prevention, and aggregate analytics); (c){" "}
                <strong className="text-text-primary">performance of a contract</strong> (to
                respond to requests you submit to us); and (d){" "}
                <strong className="text-text-primary">legal obligation</strong> (to comply with
                applicable law).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                6. Cookies and Similar Technologies
              </h2>
              <p className="mb-4">
                The Site uses cookies and similar technologies for analytics (Google Analytics) and
                for third-party embeds (e.g., YouTube, Tally). You can control cookies through your
                browser settings and can opt out of Google Analytics using the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Google Analytics Opt-Out Browser Add-on
                </a>
                . Disabling cookies may affect Site functionality.
              </p>
              <p>
                We honor Global Privacy Control (GPC) signals where required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                7. How We Share Information
              </h2>
              <p className="mb-4">
                We share information only as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-primary">Service providers</strong> that process
                  information on our behalf under confidentiality obligations, such as Google
                  (analytics), Tally (forms), our hosting provider, and our email provider.
                </li>
                <li>
                  <strong className="text-text-primary">Legal and safety</strong> disclosures when
                  required by law, subpoena, court order, or to protect rights, property, or
                  safety.
                </li>
                <li>
                  <strong className="text-text-primary">Business transfers</strong> in connection
                  with a merger, acquisition, financing, or sale of assets, with appropriate
                  confidentiality protections.
                </li>
                <li>
                  <strong className="text-text-primary">With your direction or consent.</strong>
                </li>
              </ul>
              <p className="mt-4">
                We do not sell personal information, and we do not &ldquo;share&rdquo; personal
                information for cross-context behavioral advertising as those terms are defined
                under the California Consumer Privacy Act (CCPA/CPRA).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                8. International Data Transfers
              </h2>
              <p>
                Our service providers may process information in the United States and other
                countries whose data-protection laws may differ from those in your country. Where
                required, we rely on appropriate transfer mechanisms (such as the European
                Commission&rsquo;s Standard Contractual Clauses).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                9. Data Retention
              </h2>
              <p>
                We retain information only for as long as necessary for the purposes set out in
                this Policy, to comply with our legal obligations, to resolve disputes, and to
                enforce our agreements. Waitlist emails are retained until you unsubscribe or
                request deletion. Analytics data is retained for the period configured in Google
                Analytics (typically up to 14 months).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                10. Your Rights
              </h2>
              <p className="mb-4">
                Depending on where you live, you may have the right to (a) access, correct, or
                delete your personal information; (b) port your information; (c) object to or
                restrict certain processing; (d) withdraw consent; and (e) lodge a complaint with
                a supervisory authority. California residents have rights under the CCPA/CPRA,
                including the right to know, to delete, to correct, and to limit the use of
                sensitive personal information. Virginia, Colorado, Connecticut, Utah, and other
                U.S. state residents may have analogous rights. Residents of Israel have rights
                under the Israeli Privacy Protection Law, 5741-1981, including the right to
                review personal information held about them and to request correction or
                deletion.
              </p>
              <p>
                To exercise any of these rights, email{" "}
                <a href="mailto:hi@runcabinet.com" className="text-accent hover:underline">
                  hi@runcabinet.com
                </a>
                . We will not discriminate against you for exercising your rights. We may need to
                verify your identity before acting on your request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                11. Security
              </h2>
              <p>
                We use reasonable technical and organizational safeguards designed to protect the
                limited information we collect through the Site. However, no method of
                transmission or storage is completely secure, and we cannot guarantee absolute
                security. You are responsible for maintaining the confidentiality of any
                credentials, tokens, or API keys you use with the Software.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                12. Children&rsquo;s Privacy
              </h2>
              <p>
                The Site is not directed to children under 13, and we do not knowingly collect
                personal information from children under 13. If you believe a child under 13 has
                provided us with personal information, please contact us and we will delete it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                13. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Material changes will be
                reflected by updating the &ldquo;Effective Date&rdquo; above. Your continued use
                of the Services after changes take effect constitutes your acceptance of the
                updated Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                14. Contact
              </h2>
              <p>
                Questions, requests, or complaints about this Privacy Policy should be directed
                to{" "}
                <a href="mailto:hi@runcabinet.com" className="text-accent hover:underline">
                  hi@runcabinet.com
                </a>
                .
              </p>
            </section>
          </article>

          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-code text-text-tertiary">
            <Link href="/terms" className="hover:text-text-primary transition-colors">
              ← Terms of Service
            </Link>
            <Link href="/" className="hover:text-text-primary transition-colors">
              Back to home →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
