import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Josefin_Sans, Unbounded } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { InlineScript } from "@/components/client/InlineScript";
import { getExtra, hasLocale, htmlLang, LOCALES, ogLocale } from "@/lib/i18n";
import { GITHUB, NAME, SITE_URL } from "@/lib/site";
import "../globals.css";

const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-unbounded", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], axes: ["opsz"], variable: "--font-dm-sans", display: "swap" });
// Only used for the EN/PT toggle and the project mockups, so not preloaded.
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-mono", display: "swap", preload: false });
// Projects section only: the Lux Tenebre card type.
const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-josefin", display: "swap", preload: false });

/**
 * Runs before first paint: applies the saved / OS theme (no flash), and flags JS so
 * scroll-reveal may hide content. If the app never hydrates, the flag is dropped so
 * content is never left invisible.
 */
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');try{var m=localStorage.getItem('pr-mode');if(m!=='dark'&&m!=='light')m=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.setAttribute('data-mode',m)}catch(e){}setTimeout(function(){if(!window.__prReady)d.classList.remove('js')},4000)})()`;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#efedf8" },
    { media: "(prefers-color-scheme: dark)", color: "#110e1c" },
  ],
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const x = getExtra(lang);
  const other = lang === "en" ? "pt" : "en";

  return {
    metadataBase: new URL(SITE_URL),
    title: x["seo.title"],
    description: x["seo.desc"],
    applicationName: NAME,
    authors: [{ name: NAME, url: SITE_URL }],
    creator: NAME,
    keywords: [
      "Paulo Roberto",
      "Flutter",
      "Flutter developer",
      "Senior Mobile Engineer",
      "Dart",
      "iOS",
      "Android",
      "mobile app developer",
      "offline-first",
      "freelance Flutter",
      "remote Flutter engineer",
      "Brazil",
    ],
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", "pt-BR": "/pt", "x-default": "/" },
    },
    openGraph: {
      type: "profile",
      firstName: "Paulo",
      lastName: "Roberto",
      username: GITHUB.handle,
      title: x["seo.title"],
      description: x["seo.desc"],
      url: `/${lang}`,
      siteName: NAME,
      locale: ogLocale(lang),
      alternateLocale: [ogLocale(other)],
    },
    twitter: {
      card: "summary",
      title: x["seo.title"],
      description: x["seo.desc"],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    formatDetection: { telephone: false, address: false, email: false },
    category: "technology",
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={htmlLang(lang)}
      className={`${unbounded.variable} ${dmSans.variable} ${mono.variable} ${josefin.variable}`}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={BOOT} />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
