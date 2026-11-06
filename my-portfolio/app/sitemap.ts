import type { MetadataRoute } from "next";
import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";

// Google ignores changefreq/priority but uses an accurate lastmod.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${SITE_URL}/en`, "pt-BR": `${SITE_URL}/pt`, "x-default": `${SITE_URL}/` };
  return (["en", "pt"] as const).map((l) => ({
    url: `${SITE_URL}/${l}`,
    lastModified: CONTENT_UPDATED,
    alternates: { languages },
  }));
}
