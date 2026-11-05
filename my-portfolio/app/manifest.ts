import type { MetadataRoute } from "next";
import { NAME } from "@/lib/site";
import { getExtra } from "@/lib/i18n";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: NAME,
    short_name: NAME,
    description: getExtra("en")["seo.desc"],
    start_url: "/",
    display: "standalone",
    background_color: "#efedf8",
    theme_color: "#efedf8",
    icons: [
      { src: "/brand/icon-48.png", sizes: "48x48", type: "image/png" },
      { src: "/brand/icon-96.png", sizes: "96x96", type: "image/png" },
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
