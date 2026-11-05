import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["en", "pt"];

/** pr-lang cookie (set by the toggle) → Accept-Language (pt-* → pt) → en. */
function pickLocale(req: NextRequest) {
  const saved = req.cookies.get("pr-lang")?.value;
  if (saved && LOCALES.includes(saved)) return saved;
  const accept = req.headers.get("accept-language") ?? "";
  const first = accept
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((p) => p.tag && p.tag !== "*")
    .sort((a, b) => b.q - a.q)
    .find((p) => p.tag.startsWith("pt") || p.tag.startsWith("en"));
  return first?.tag.startsWith("pt") ? "pt" : "en";
}

export function proxy(req: NextRequest) {
  // Only page visits get the language redirect. Beacons (e.g. Vercel Analytics posting
  // to its per-project /<unique-path>/view) must reach their endpoint untouched.
  if (req.method !== "GET" && req.method !== "HEAD") return;
  const { pathname } = req.nextUrl;
  if (LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const url = req.nextUrl.clone();
  url.pathname = `/${pickLocale(req)}${pathname === "/" ? "" : pathname}`;
  const res = NextResponse.redirect(url, 307);
  res.headers.set("Vary", "Accept-Language, Cookie");
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export const config = {
  // Skip Next and Vercel internals, locale paths, metadata routes and any file with an extension.
  matcher: [
    "/((?!_next/|_vercel/|en(?:/|$)|pt(?:/|$)|icon|apple-icon|opengraph-image|twitter-image|sitemap|robots|manifest|.*\\.[^/]+$).*)",
  ],
};
