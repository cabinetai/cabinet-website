import type { Metadata } from "next";
import { HomePage } from "@/components/marketing/home-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://runcabinet.com/hi",
    languages: { en: "https://runcabinet.com/", hi: "https://runcabinet.com/hi" },
  },
  title: "Cabinet: वह AI वर्कस्पेस जो आपकी कंपनी का अपना है",
  description:
    "Cabinet आपका पूरा नॉलेज बेस और सारी फ़ाइलें एक जगह दिखाता है, उन पर AI विशेषज्ञों की टीम को काम पर लगाता है, और नतीजों को लाइव ऐप्स और डैशबोर्ड के रूप में सामने रखता है।",
  openGraph: {
    title: "Cabinet: वह AI वर्कस्पेस जो आपकी कंपनी का अपना है",
    description:
      "कंपनी का ज्ञान, काम करने वाली AI टीमें और लाइव ऐप्स, एक सेल्फ़-होस्टेड वर्कस्पेस में। अपना AI खुद चुनें।",
    url: "https://runcabinet.com/hi",
    locale: "hi_IN",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Cabinet कंपनी के ज्ञान, AI टीमों और लाइव ऐप्स को एक वर्कस्पेस में लाता है",
      },
    ],
  },
};

export default function Page() {
  return <HomePage locale="hi" />;
}
