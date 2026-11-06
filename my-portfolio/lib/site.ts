const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "");

/** Absolute production origin, no trailing slash. */
export const SITE_URL = (fromEnv || "https://pauloaragaodev.com").replace(/\/+$/, "");

/**
 * Last real content change (sitemap lastmod, ProfilePage dateModified).
 * Bump it by hand when page content changes — not on every deploy, or Google stops trusting it.
 */
export const CONTENT_UPDATED = "2026-11-06";

export const NAME = "Paulo Roberto";
export const EMAIL = "paulo.rob159@gmail.com";
export const MAILTO = `mailto:${EMAIL}`;

export const LINKEDIN = {
  url: "https://www.linkedin.com/in/paulo-roberto-b19594185",
  handle: "paulo-roberto-b19594185",
};
export const GITHUB = { url: "https://github.com/PauloRob8", handle: "PauloRob8" };
export const LUX_URL = "https://play.google.com/apps/testing/com.paulo.dev.luxtenebre";

/** Side-project links (Projects section). */
export const PROJECT_URLS = {
  clima: "https://github.com/PauloRob8/clima-app",
  cep: "https://github.com/PauloRob8/CEP_FINDER",
  binWeb: "https://ready-cream.surge.sh/#/",
  binGh: "https://github.com/PauloRob8/Binary-Calculator",
  coffee: "https://github.com/PauloRob8/Coffe-Shop-App",
} as const;

export const URLS = {
  ifood: "https://www.ifood.com.br/",
  veloe: "https://veloe.com.br/",
  air: "https://aircompany.ai/pt/home/",
  ancar: "https://www.ancar.com.br/",
  aiqfome: "https://aiqfome.com/",
  copastur: "https://www.copastur.com.br/",
} as const;

/** Company wall, in spec order. `w` / `ar` match the reference's visual logo sizes. */
export const COMPANIES = [
  { name: "iFood", url: URLS.ifood, role: "mq.eco", logo: "ifood", w: 68, ar: "90/48" },
  { name: "Veloe", url: URLS.veloe, role: "mq.cli", logo: "veloe", w: 73, ar: "136/56" },
  { name: "AirCompany", url: URLS.air, role: "mq.emp", logo: "aircompany", w: 87, ar: "149/48" },
  { name: "Ancar", url: URLS.ancar, role: "mq.cli", logo: "ancar", w: 108, ar: "172/48" },
  { name: "aiqfome", url: URLS.aiqfome, role: "mq.emp", logo: "aiqfome", w: 129, ar: "207/48" },
  { name: "Copastur", url: URLS.copastur, role: "mq.cli", logo: "copastur", w: 151, ar: "255/32" },
] as const;

/** Props for every external link. */
export const ext = { target: "_blank", rel: "noopener" } as const;
