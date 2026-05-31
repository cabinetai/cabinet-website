import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: "Terms of Service: Cabinet",
  description:
    "Terms of Service for Cabinet (runcabinet.com) and the Cabinet open-source software. Use is at your own risk. No warranties. Limitations of liability apply.",
  alternates: { canonical: "https://runcabinet.com/terms" },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "April 24, 2026";
const LAST_UPDATED = "April 24, 2026";

export default function TermsPage() {
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
              Terms of <span className="italic gradient-text">Service</span>
            </h1>
            <p className="text-sm font-code text-text-tertiary">
              Effective Date: {EFFECTIVE_DATE} · Last Updated: {LAST_UPDATED}
            </p>
          </header>

          <div className="rounded-2xl border border-border bg-bg-card p-6 md:p-8 mb-10 shadow-sm">
            <p className="text-sm font-code uppercase tracking-wider text-accent mb-3">
              Please read carefully
            </p>
            <p className="text-text-secondary font-body-serif leading-relaxed">
              Cabinet is a free, open-source project provided on an{" "}
              <strong className="text-text-primary">&ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo;</strong>{" "}
              basis. Cabinet is designed to work with autonomous AI agents that may read, write,
              execute, and delete files, run shell commands, call external APIs, and take other
              actions on your computer and networks. You install, configure, and run Cabinet and any
              connected AI agents{" "}
              <strong className="text-text-primary">entirely at your own risk</strong>. If you do
              not accept these Terms, do not access the Site or use the Software.
            </p>
          </div>

          <article className="space-y-10 text-text-secondary font-body-serif leading-relaxed">
            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                These Terms of Service (the &ldquo;Terms&rdquo;) constitute a binding legal
                agreement between you (&ldquo;you,&rdquo; &ldquo;your,&rdquo; or
                &ldquo;User&rdquo;) and{" "}
                <strong className="text-text-primary">HOLY BIBLE APPS LTD</strong>, a company
                organized under the laws of the State of Israel and registered in Tirat Carmel,
                Israel, that owns and operates the Cabinet project, together with its affiliates,
                successors, assigns, officers, directors, employees, contractors, and the
                open-source maintainers and contributors acting under its direction (collectively,
                &ldquo;Cabinet,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). All notices, legal inquiries, and contact
                with us shall be directed to{" "}
                <a href="mailto:hi@runcabinet.com" className="text-accent hover:underline">
                  hi@runcabinet.com
                </a>
                . These Terms govern your access to and use of (a) the website located at{" "}
                <a href="https://runcabinet.com" className="text-accent hover:underline">
                  runcabinet.com
                </a>{" "}
                and any subdomains (the &ldquo;Site&rdquo;), and (b) the Cabinet open-source
                software, command-line interface, and related tools (collectively, the
                &ldquo;Software&rdquo;). The Site and the Software are referred to together as the
                &ldquo;Services.&rdquo;
              </p>
              <p>
                By accessing the Site, downloading, installing, executing, running, or otherwise
                using the Software, or clicking a button indicating acceptance, you acknowledge that
                you have read, understood, and agree to be bound by these Terms and our{" "}
                <Link href="/privacy" className="text-accent hover:underline">
                  Privacy Policy
                </Link>
                . If you are using the Services on behalf of an entity, you represent that you have
                authority to bind that entity, and &ldquo;you&rdquo; refers to that entity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                2. Open-Source License and Relationship to These Terms
              </h2>
              <p className="mb-4">
                The Software is made available by HOLY BIBLE APPS LTD under the MIT License (the
                &ldquo;License&rdquo;), the text of which is available in the Software&rsquo;s
                source repository. The License governs your rights to copy, modify, and
                redistribute the Software. These Terms govern your use of the Site and supplement
                the License with additional terms regarding your access to the Site, your
                relationship with us, and your use of the Services as a whole.
              </p>
              <p>
                Nothing in these Terms limits or waives the disclaimers of warranty or limitations
                of liability contained in the License; those disclaimers and limitations apply in
                full and are{" "}
                <strong className="text-text-primary">
                  incorporated into these Terms by reference
                </strong>
                . Where these Terms and the License overlap, the provision most protective of the
                Cabinet maintainers and contributors shall control to the maximum extent permitted
                by applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                3. Eligibility
              </h2>
              <p>
                You must be at least 13 years of age (or the minimum age of digital consent in your
                jurisdiction, whichever is higher) to use the Services. If you are between 13 and
                the age of majority, you represent that your parent or legal guardian has reviewed
                and agreed to these Terms on your behalf. You further represent that you are not
                barred from using the Services under applicable law, including Israeli, U.S., EU,
                UK, and UN export control and sanctions laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                4. The Software; Autonomous AI Agents; Assumption of Risk
              </h2>
              <p className="mb-4">
                <strong className="text-text-primary">
                  YOU UNDERSTAND AND EXPRESSLY ACKNOWLEDGE THAT CABINET IS DESIGNED TO INTEROPERATE
                  WITH AUTONOMOUS OR SEMI-AUTONOMOUS ARTIFICIAL INTELLIGENCE AGENTS (&ldquo;AI
                  AGENTS&rdquo;).
                </strong>{" "}
                Depending on how you configure and authorize them, AI Agents may, among other
                things:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>read, create, modify, overwrite, or delete files on your local filesystem, mounted volumes, or connected storage;</li>
                <li>execute shell commands, scripts, binaries, and arbitrary code on your computer or any system on which the Software is installed;</li>
                <li>install, remove, or modify software packages and system configurations;</li>
                <li>open network connections, make HTTP requests, upload data to third parties, and download remote resources;</li>
                <li>access, transmit, or disclose credentials, API keys, tokens, environment variables, private source code, customer data, or other sensitive information;</li>
                <li>commit, push, revert, or otherwise alter version-controlled repositories, branches, and tags;</li>
                <li>send messages, create issues, make payments, or otherwise take actions on third-party services where you have authorized access; and</li>
                <li>continue operating without per-action human confirmation where you have granted broad or &ldquo;all&rdquo; permissions.</li>
              </ul>
              <p className="mb-4">
                <strong className="text-text-primary">
                  YOU ARE SOLELY RESPONSIBLE FOR ALL ACTIONS TAKEN BY AI AGENTS RUNNING ON OR
                  THROUGH THE SOFTWARE ON YOUR SYSTEMS, FOR THE PERMISSIONS YOU GRANT THEM, AND FOR
                  THE CONSEQUENCES OF THOSE ACTIONS
                </strong>
                , including data loss, data corruption, data exfiltration, unauthorized disclosure,
                deletion of files or repositories, financial charges, regulatory violations,
                reputational harm, and any other direct or indirect harm. You expressly{" "}
                <strong className="text-text-primary">assume all risk</strong> arising from your
                decision to run AI Agents with elevated, broad, or unrestricted permissions.
              </p>
              <p className="mb-4">
                We strongly recommend that you: (a) review the Software&rsquo;s documentation before
                use; (b) run the Software in an isolated or sandboxed environment; (c) maintain
                current, tested backups of any data the Software can access; (d) use version
                control and branch protection; (e) use the narrowest permission scope that achieves
                your purpose; and (f) require human-in-the-loop confirmation for destructive or
                irreversible actions. Your failure to take such precautions is your own decision
                and does not shift responsibility to us.
              </p>
              <p>
                The Software may be used with third-party large language models and AI services
                (e.g., Anthropic, OpenAI, and others). We do not control and are not responsible
                for the outputs, availability, accuracy, safety, bias, hallucinations, or conduct
                of any third-party model or service. Your use of third-party services is governed
                solely by the terms and privacy policies of those third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                5. Your Content and Data
              </h2>
              <p className="mb-4">
                The Software is designed to run locally on systems you control. You retain all
                right, title, and interest in and to any content, files, code, documents,
                knowledge-base entries, prompts, and other data you create, input, store, or
                process using the Software (&ldquo;Your Content&rdquo;). We claim no ownership of
                Your Content.
              </p>
              <p>
                You are solely responsible for Your Content, for the legality of processing it, and
                for obtaining all necessary rights, consents, and authorizations (including, where
                applicable, under GDPR, CCPA/CPRA, HIPAA, and other privacy or data-protection
                laws) before submitting Your Content to any AI Agent or third-party service
                through the Software.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                6. Acceptable Use
              </h2>
              <p className="mb-4">You agree not to use the Services to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>violate any applicable law, regulation, contract, or third-party right;</li>
                <li>infringe intellectual-property, privacy, publicity, or confidentiality rights;</li>
                <li>access, tamper with, or disrupt any system, network, or account without authorization;</li>
                <li>develop, deploy, or distribute malware, ransomware, spyware, or other harmful code;</li>
                <li>generate or distribute content that is unlawful, defamatory, harassing, or sexually exploitative of minors;</li>
                <li>evade security features, rate limits, or access controls of the Services or any third-party service;</li>
                <li>use the Services in high-risk environments (e.g., life-safety systems, aviation, nuclear facilities, medical devices) where failure of the Software could foreseeably cause death, personal injury, or severe environmental or property damage; or</li>
                <li>re-export, transfer, or make the Software available to any person or destination prohibited by applicable export control or sanctions laws, including those administered by the State of Israel, the U.S. Office of Foreign Assets Control (OFAC), the European Union, the United Kingdom, or the United Nations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                7. Disclaimers of Warranty
              </h2>
              <p className="mb-4 uppercase text-sm font-code text-text-primary tracking-wider">
                THE SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE,&rdquo; WITH ALL FAULTS, AND WITHOUT WARRANTY OF ANY KIND.
              </p>
              <p className="mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, HOLY BIBLE APPS LTD, ITS
                OWNER(S) (INCLUDING HILA SHMUEL), OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS,
                AFFILIATES, SUCCESSORS, ASSIGNS, LICENSORS, AND THE OPEN-SOURCE MAINTAINERS AND
                CONTRIBUTORS TO THE SOFTWARE (COLLECTIVELY, THE &ldquo;CABINET PARTIES&rdquo;)
                EXPRESSLY DISCLAIM ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR
                OTHERWISE, INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, QUIET ENJOYMENT,
                ACCURACY, RELIABILITY, SECURITY, AVAILABILITY, AND ANY WARRANTIES ARISING OUT OF
                COURSE OF DEALING, COURSE OF PERFORMANCE, OR TRADE USAGE.
              </p>
              <p>
                WITHOUT LIMITING THE FOREGOING, THE CABINET PARTIES DO NOT WARRANT THAT THE SERVICES
                WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, FREE OF VIRUSES OR HARMFUL CODE, OR THAT
                DEFECTS WILL BE CORRECTED; THAT AI AGENT OUTPUTS OR ACTIONS WILL BE ACCURATE,
                COMPLETE, SAFE, APPROPRIATE, OR LAWFUL; OR THAT THE SERVICES WILL MEET YOUR
                REQUIREMENTS OR EXPECTATIONS. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF
                CERTAIN WARRANTIES, SO SOME OF THE ABOVE EXCLUSIONS MAY NOT APPLY TO YOU.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                8. Limitation of Liability
              </h2>
              <p className="mb-4 uppercase text-sm font-code text-text-primary tracking-wider">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL THE CABINET PARTIES BE LIABLE FOR:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  any indirect, incidental, special, consequential, exemplary, or punitive damages;
                </li>
                <li>
                  loss of profits, revenues, business, goodwill, reputation, data, use, or content;
                </li>
                <li>
                  costs of procurement of substitute goods or services;
                </li>
                <li>
                  damages resulting from unauthorized access to or alteration of your
                  transmissions, systems, or data;
                </li>
                <li>
                  damages resulting from the conduct, output, or omission of any AI Agent,
                  third-party model, or third-party service; or
                </li>
                <li>
                  damages resulting from the deletion, corruption, or exfiltration of files,
                  credentials, or code.
                </li>
              </ul>
              <p className="mb-4">
                THE FOREGOING APPLIES WHETHER THE CLAIM IS BASED ON CONTRACT, TORT (INCLUDING
                NEGLIGENCE), STRICT LIABILITY, STATUTE, OR ANY OTHER LEGAL THEORY, AND WHETHER OR
                NOT THE CABINET PARTIES HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, AND
                EVEN IF A REMEDY SET FORTH IN THESE TERMS IS FOUND TO HAVE FAILED OF ITS ESSENTIAL
                PURPOSE.
              </p>
              <p className="mb-4">
                <strong className="text-text-primary">Aggregate Cap.</strong> THE TOTAL AGGREGATE
                LIABILITY OF THE CABINET PARTIES ARISING OUT OF OR RELATING TO THESE TERMS OR THE
                SERVICES SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU HAVE PAID TO US FOR
                THE SERVICES IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE
                CLAIM, OR (B) ONE HUNDRED U.S. DOLLARS (US$100). YOU ACKNOWLEDGE THAT THE SOFTWARE
                IS PROVIDED FREE OF CHARGE AND THAT, ABSENT THESE LIMITATIONS, WE WOULD NOT MAKE
                THE SOFTWARE AVAILABLE.
              </p>
              <p>
                Some jurisdictions do not allow the exclusion or limitation of certain damages, so
                some of the above limitations may not apply to you. In such jurisdictions, the
                Cabinet Parties&rsquo; liability shall be limited to the greatest extent permitted
                by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                9. Indemnification
              </h2>
              <p>
                You agree to defend, indemnify, and hold harmless the Cabinet Parties from and
                against any and all claims, liabilities, damages, losses, and expenses (including
                reasonable attorneys&rsquo; fees and costs) arising out of or in any way connected
                with (a) your access to or use of the Services; (b) Your Content; (c) any action
                taken by, or omission of, an AI Agent operating on your systems or under your
                account, credentials, or permissions; (d) your violation of these Terms or any
                applicable law; or (e) your violation of any third-party right, including
                intellectual-property, privacy, or contractual rights. We reserve the right, at
                our own expense, to assume the exclusive defense and control of any matter
                otherwise subject to indemnification by you, and you agree to cooperate with our
                defense of such claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                10. Third-Party Services and Links
              </h2>
              <p>
                The Services may contain links to, or interoperate with, third-party websites,
                APIs, models, or services (including GitHub, Discord, YouTube, Tally, Google
                Analytics, and AI providers). The Cabinet Parties do not control and are not
                responsible for such third-party services. Your use of third-party services is
                subject to their terms and privacy policies, and any claim you have relating to a
                third-party service is between you and that third party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                11. Intellectual Property; Trademarks
              </h2>
              <p>
                Except as expressly licensed under the MIT License, all rights in and to the
                Services, including the Cabinet name, logo, and trade dress, are reserved. Nothing
                in these Terms grants you any right or license to use our trademarks, service
                marks, or trade names without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                12. Copyright Claims
              </h2>
              <p>
                If you believe that material available through the Services infringes your
                copyright, please send a notice to{" "}
                <a href="mailto:hi@runcabinet.com" className="text-accent hover:underline">
                  hi@runcabinet.com
                </a>{" "}
                identifying the work, the allegedly infringing material, your contact details, and
                a good-faith statement of infringement. We will address claims under the Israeli
                Copyright Law, 5768-2007 and, where applicable to content hosted on third-party
                platforms, the U.S. Digital Millennium Copyright Act (17 U.S.C. § 512). We reserve
                the right to remove allegedly infringing material and to terminate the access of
                repeat infringers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                13. Suspension and Termination
              </h2>
              <p>
                We may modify, suspend, or discontinue any portion of the Services at any time,
                with or without notice. We may terminate or suspend your access to the Site at our
                discretion, including for violation of these Terms. You may stop using the
                Services at any time. Sections that by their nature should survive termination
                (including Sections 4, 5, 7, 8, 9, 11, 14, 15, and 16) shall survive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                14. Governing Law; Exclusive Jurisdiction
              </h2>
              <p className="mb-4">
                These Terms and any dispute, claim, or controversy arising out of or relating to
                them, to the Services, or to the relationship between you and us (a
                &ldquo;Dispute&rdquo;) shall be governed by and construed in accordance with the
                laws of the <strong className="text-text-primary">State of Israel</strong>,
                without regard to its conflict-of-laws principles and excluding the United
                Nations Convention on Contracts for the International Sale of Goods.
              </p>
              <p>
                The competent courts sitting in{" "}
                <strong className="text-text-primary">Haifa, Israel</strong> (namely the Haifa
                Magistrate Court and the Haifa District Court, as appropriate to the matter) shall
                have exclusive jurisdiction and venue over any Dispute, these being the courts
                with territorial jurisdiction over the seat of HOLY BIBLE APPS LTD in Tirat
                Carmel. Each party irrevocably consents to personal jurisdiction and venue in
                those courts and waives any objection based on inconvenient forum or lack of
                personal jurisdiction. The foregoing does not prevent us from seeking injunctive
                or equitable relief in any court of competent jurisdiction to protect our
                intellectual-property rights or confidential information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                15. Class-Action Waiver
              </h2>
              <p className="mb-4 uppercase text-sm font-code text-text-primary tracking-wider">
                PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS.
              </p>
              <p>
                To the maximum extent permitted by applicable law, you and we each agree that any
                Dispute shall be brought and resolved only on an{" "}
                <strong className="text-text-primary">individual basis</strong> and{" "}
                <strong className="text-text-primary">not</strong> as a plaintiff, claimant, or
                class member in any purported class, collective, consolidated, or representative
                proceeding, including any class action under the Israeli Class Actions Law,
                5766-2006, or any analogous law of any other jurisdiction. If this class-action
                waiver is held unenforceable as to any particular claim, that claim shall be
                severed and may proceed in court on a class basis, while all other claims shall
                continue to be subject to this Section on an individual basis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                16. Miscellaneous
              </h2>
              <p className="mb-3">
                <strong className="text-text-primary">Entire Agreement.</strong> These Terms,
                together with the Privacy Policy and the MIT License, constitute the entire
                agreement between you and us regarding the Services and supersede all prior
                agreements and understandings.
              </p>
              <p className="mb-3">
                <strong className="text-text-primary">Severability.</strong> If any provision is
                held unenforceable, it shall be modified to the minimum extent necessary to make
                it enforceable, and the remaining provisions shall remain in full force and
                effect.
              </p>
              <p className="mb-3">
                <strong className="text-text-primary">No Waiver.</strong> Our failure to enforce
                any provision is not a waiver of that provision.
              </p>
              <p className="mb-3">
                <strong className="text-text-primary">Assignment.</strong> You may not assign or
                transfer these Terms without our prior written consent. We may assign these Terms
                without restriction.
              </p>
              <p className="mb-3">
                <strong className="text-text-primary">Force Majeure.</strong> We are not liable
                for any delay or failure caused by events beyond our reasonable control.
              </p>
              <p className="mb-3">
                <strong className="text-text-primary">Relationship.</strong> Nothing in these
                Terms creates any partnership, agency, employment, or joint-venture relationship.
              </p>
              <p>
                <strong className="text-text-primary">Changes.</strong> We may update these Terms
                from time to time. Material changes will be reflected by updating the
                &ldquo;Effective Date&rdquo; above and, where appropriate, by additional notice.
                Your continued use of the Services after changes take effect constitutes your
                acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-text-primary mb-4">
                17. Contact
              </h2>
              <p>
                Questions about these Terms should be directed to{" "}
                <a href="mailto:hi@runcabinet.com" className="text-accent hover:underline">
                  hi@runcabinet.com
                </a>
                .
              </p>
            </section>
          </article>

          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-code text-text-tertiary">
            <Link href="/privacy" className="hover:text-text-primary transition-colors">
              ← Privacy Policy
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
