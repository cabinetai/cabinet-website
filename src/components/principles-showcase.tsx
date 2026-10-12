import Image from "next/image";
import {
  HardDrive,
  GitBranch,
  Boxes,
  Feather,
  ShieldCheck,
  Server,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { woodSrcFor } from "./wood-icon";

type PrincipleText = {
  name: string;
  tagline: string;
  body: string;
  takeaway: string;
};

type Principle = { icon: React.ElementType; text: Record<Locale, PrincipleText> };

const PRINCIPLES: Principle[] = [
  {
    icon: HardDrive,
    text: {
      en: {
        name: "Yours",
        tagline: "Own and export your data, anytime",
        body: "Your knowledge base is plain markdown on disk, not rows in a vendor's database. Move the folder and the whole cabinet moves with it. No export request, no proprietary format, no one between your team and its own files.",
        takeaway: "you can take everything and leave whenever you want.",
      },
      hi: {
        name: "आपका",
        tagline: "डेटा आपका, जब चाहें साथ ले जाएँ",
        body: "आपका नॉलेज बेस डिस्क पर साधारण markdown फ़ाइलों में रहता है, किसी वेंडर के डेटाबेस में नहीं। फ़ोल्डर कहीं भी ले जाएँ, पूरा cabinet साथ चला जाता है। न एक्सपोर्ट का अनुरोध, न कोई बंद फ़ॉर्मेट, और आपकी टीम व उसकी फ़ाइलों के बीच कोई तीसरा नहीं।",
        takeaway: "आप जब चाहें, सब कुछ लेकर जा सकते हैं।",
      },
    },
  },
  {
    icon: GitBranch,
    text: {
      en: {
        name: "Git everything",
        tagline: "Every change tracked and reversible",
        body: "Every save auto-commits, so your team can inspect diffs, review how knowledge evolved, and restore any page to an earlier state. The same accountability over your AI's output that you expect from production code.",
        takeaway: "nothing is ever silently lost or overwritten.",
      },
      hi: {
        name: "हर चीज़ Git में",
        tagline: "हर बदलाव दर्ज, हर बदलाव वापस लेने लायक",
        body: "हर सेव अपने आप कमिट होता है, इसलिए आपकी टीम बदलावों की तुलना कर सकती है, देख सकती है कि जानकारी कैसे बदली, और किसी भी पेज को पुरानी स्थिति में लौटा सकती है। AI के काम पर वही जवाबदेही, जिसकी उम्मीद आप प्रोडक्शन कोड से करते हैं।",
        takeaway: "कुछ भी चुपचाप खोता या ओवरराइट नहीं होता।",
      },
    },
  },
  {
    icon: Boxes,
    text: {
      en: {
        name: "BYOAI",
        tagline: "Use the AI you already pay for",
        body: "Cabinet connects to the model accounts your organization already holds: Claude, Codex, OpenCode, local models, and whatever ships next. Spend flows through contracts you control, not a markup layered on top.",
        takeaway: "no second subscription and no per-seat AI markup.",
      },
      hi: {
        name: "BYOAI",
        tagline: "वही AI, जिसके लिए आप पहले से भुगतान करते हैं",
        body: "Cabinet उन मॉडल अकाउंट्स से जुड़ता है जो आपके संगठन के पास पहले से हैं: Claude, Codex, OpenCode, लोकल मॉडल, और आगे जो भी आए। खर्च उन्हीं कॉन्ट्रैक्ट्स से होता है जिन पर आपका नियंत्रण है, ऊपर से कोई मार्कअप नहीं।",
        takeaway: "न दूसरा सब्सक्रिप्शन, न प्रति-यूज़र AI मार्कअप।",
      },
    },
  },
  {
    icon: Feather,
    text: {
      en: {
        name: "KISS",
        tagline: "Simple enough to audit",
        body: "Plain files and predictable behavior mean there is no black box to take on faith. The system is small enough for your engineers to reason about and verify themselves. If a capability can't be explained in a paragraph, it usually shouldn't ship.",
        takeaway: "your engineers can verify exactly what it does.",
      },
      hi: {
        name: "KISS",
        tagline: "इतना सरल कि खुद जाँच सकें",
        body: "साधारण फ़ाइलें और तय व्यवहार, यानी कोई ब्लैक बॉक्स नहीं जिस पर आँख मूँदकर भरोसा करना पड़े। सिस्टम इतना छोटा है कि आपके इंजीनियर उसे खुद समझ और जाँच सकें। जो क्षमता एक पैराग्राफ़ में न समझाई जा सके, उसे आम तौर पर प्रोडक्ट में नहीं आना चाहिए।",
        takeaway: "आपके इंजीनियर ठीक-ठीक जाँच सकते हैं कि यह क्या करता है।",
      },
    },
  },
  {
    icon: ShieldCheck,
    text: {
      en: {
        name: "Security",
        tagline: "Human approval before anything leaves",
        body: "Every dispatched task waits in a human approval queue before it sends an email, calls an API, or touches anything external. Exposure is limited by default, so giving agents autonomy never means giving up control.",
        takeaway: "an agent never acts on the outside world unsupervised.",
      },
      hi: {
        name: "सुरक्षा",
        tagline: "कुछ भी बाहर जाने से पहले इंसानी मंज़ूरी",
        body: "ईमेल भेजने, API कॉल करने या किसी बाहरी सिस्टम को छूने से पहले हर टास्क इंसानी मंज़ूरी की कतार में रुकता है। जोखिम डिफ़ॉल्ट रूप से सीमित रहता है, इसलिए एजेंटों को आज़ादी देने का मतलब नियंत्रण छोड़ना नहीं होता।",
        takeaway: "कोई एजेंट बिना निगरानी के बाहरी दुनिया में कदम नहीं उठाता।",
      },
    },
  },
  {
    icon: Server,
    text: {
      en: {
        name: "Self-hosted",
        tagline: "Runs in infrastructure you control",
        body: "Cabinet is self-hosted by default, so plans, research, and operating memory live where your existing policies already apply. The only data that leaves is the cloud-model call you explicitly invoke.",
        takeaway: "your context stays inside your own environment.",
      },
      hi: {
        name: "सेल्फ़-होस्टेड",
        tagline: "आपके नियंत्रण वाले इन्फ्रास्ट्रक्चर पर चलता है",
        body: "Cabinet डिफ़ॉल्ट रूप से सेल्फ़-होस्टेड है, इसलिए योजनाएँ, रिसर्च और कामकाज की जानकारी वहीं रहती है जहाँ आपकी मौजूदा नीतियाँ पहले से लागू हैं। बाहर सिर्फ़ वही डेटा जाता है जो आप खुद किसी क्लाउड मॉडल को भेजते हैं।",
        takeaway: "आपका संदर्भ आपके अपने एनवायरनमेंट के भीतर रहता है।",
      },
    },
  },
];

const BRAND = <span className="font-brand italic">Cabinet</span>;

const COPY: Record<Locale, { label: string; title: React.ReactNode; intro: string }> = {
  en: {
    label: "Principles",
    title: <>What {BRAND}{" "}is <span className="italic gradient-text">built on</span></>,
    intro: "A few principles we think matter deeply for the future of AI + data tools. Every product decision gets weighed against these.",
  },
  hi: {
    label: "सिद्धांत",
    title: <>{BRAND}{" "}की <span className="italic gradient-text">बुनियाद</span></>,
    intro: "कुछ सिद्धांत, जो हमारी नज़र में AI और डेटा टूल्स के भविष्य के लिए बेहद अहम हैं। हर प्रोडक्ट फ़ैसला इन्हीं की कसौटी पर परखा जाता है।",
  },
};

export function PrinciplesShowcase({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale];
  return (
    <div>
      <div className="mb-12 text-center">
        <p className="section-label mb-3">{t.label}</p>
        <h2 className="mb-4 font-display text-3xl text-text-primary md:text-4xl">{t.title}</h2>
        <p className="mx-auto max-w-2xl font-body-serif leading-relaxed text-text-secondary">
          {t.intro}
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PRINCIPLES.map((principle) => {
          const p = { icon: principle.icon, ...principle.text[locale] };
          const Icon = p.icon;
          const wsrc = woodSrcFor(p.icon);
          return (
            <div
              key={p.name}
              className="flex flex-col rounded-3xl bg-bg-card p-8 card-hover"
            >
              <div className="relative mb-5 flex h-32 items-center justify-center">
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(139,94,60,0.12), transparent 70%)",
                  }}
                />
                {wsrc ? (
                  <Image
                    src={wsrc}
                    alt=""
                    width={224}
                    height={224}
                    className="relative h-28 w-28 object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.10)]"
                  />
                ) : (
                  <Icon
                    aria-hidden
                    strokeWidth={1.5}
                    className="relative h-16 w-16 text-accent"
                  />
                )}
              </div>
              <span className="section-label">{p.tagline}</span>
              <h3 className="mb-2 mt-2 font-display text-xl text-text-primary">
                {p.name}
              </h3>
              <p className="mb-4 text-sm font-body-serif leading-relaxed text-text-secondary">
                {p.body}
              </p>
              <p className="mt-auto border-t border-border pt-4 text-sm font-body-serif italic leading-relaxed text-text-secondary">
                <span className="font-display font-semibold not-italic text-accent">
                  {p.name}
                </span>
                <span className="mx-2 text-accent">=</span>
                {p.takeaway}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
