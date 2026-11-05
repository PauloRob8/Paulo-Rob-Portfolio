import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${SITE_URL}/en`, "pt-BR": `${SITE_URL}/pt`, "x-default": `${SITE_URL}/` };
  return (["en", "pt"] as const).map((l) => ({
    url: `${SITE_URL}/${l}`,
    changeFrequency: "monthly",
    priority: l === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
