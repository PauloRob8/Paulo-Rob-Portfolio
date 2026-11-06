import { notFound } from "next/navigation";
import { Header } from "@/components/Header/Header";
import { Interactions } from "@/components/client/Interactions";
import { About } from "@/components/sections/About";
import { CompanyWall } from "@/components/sections/CompanyWall";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { getDict, getExtra, hasLocale, htmlLang, plain, type Key } from "@/lib/i18n";
import { COMPANIES, CONTENT_UPDATED, EMAIL, GITHUB, LINKEDIN, LUX_URL, NAME, PROJECT_URLS, SITE_URL } from "@/lib/site";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const x = getExtra(lang);
  const url = `${SITE_URL}/${lang}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: NAME,
        givenName: "Paulo",
        familyName: "Roberto",
        jobTitle: plain(d["hl.full"]),
        description: x["seo.desc"],
        email: `mailto:${EMAIL}`,
        url,
        image: `${url}/opengraph-image/card`,
        address: {
          "@type": "PostalAddress",
          addressCountry: "BR",
        },
        sameAs: [LINKEDIN.url, GITHUB.url],
        knowsLanguage: ["en", "pt-BR"],
        knowsAbout: [
          "Flutter",
          "Dart",
          "Mobile app development",
          "iOS",
          "Android",
          "Firebase",
          "Offline-first architecture",
          "Clean Architecture",
          "BLoC",
          "CI/CD",
        ],
        alumniOf: { "@type": "CollegeOrUniversity", name: "Instituto Federal do Piauí" },
        worksFor: COMPANIES.filter((c) => c.role === "mq.emp").map((c) => ({
          "@type": "Organization",
          name: c.name,
          url: c.url,
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: NAME,
        inLanguage: htmlLang(lang),
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#page`,
        url,
        name: x["seo.title"],
        inLanguage: htmlLang(lang),
        dateModified: CONTENT_UPDATED,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
        hasPart: ([
          { name: "Lux Tenebre", url: LUX_URL, k: "v3.lux" },
          { name: "Clima", url: PROJECT_URLS.clima, k: "pj.clima.p" },
          { name: "CEP Finder", url: PROJECT_URLS.cep, k: "pj.cep.p" },
          { name: "Binary Calculator", url: PROJECT_URLS.binWeb, k: "pj.bin.p" },
          { name: "Coffee Shop", url: PROJECT_URLS.coffee, k: "pj.cof.p" },
        ] satisfies Array<{ name: string; url: string; k: Key }>).map((p) => ({
          "@type": "CreativeWork",
          name: p.name,
          url: p.url,
          description: plain(d[p.k]),
          creator: { "@id": `${SITE_URL}/#person` },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <a className="skip" href="#main">
        {x.skip}
      </a>
      <Header d={d} x={x} lang={lang} />
      <main id="main" tabIndex={-1}>
        <Hero d={d} />
        <CompanyWall d={d} />
        <div className="wrap">
          <About d={d} />
          <Experience d={d} />
          <Work d={d} />
          <Education d={d} />
          <Contact d={d} x={x} />
        </div>
      </main>
      <Footer d={d} />
      <Interactions lang={lang} />
    </>
  );
}
