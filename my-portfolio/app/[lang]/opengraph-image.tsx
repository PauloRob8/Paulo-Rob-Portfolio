import { ImageResponse } from "next/og";
import { getDict, getExtra, hasLocale, plain } from "@/lib/i18n";
import { OG_FONTS } from "@/lib/og-fonts";
import { COMPANIES, NAME } from "@/lib/site";

const size = { width: 1200, height: 630 };

/** One card per locale, with a localized alt text. */
export async function generateImageMetadata({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const { lang } = await params;
  const x = getExtra(hasLocale(lang) ? lang : "en");
  return [{ id: "card", alt: x["seo.ogAlt"], size, contentType: "image/png" }];
}

const C = { bg: "#efedf8", ink: "#18142b", mute: "#5d5876", card: "#ffffff", hot: "#ff6a3d" };

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = hasLocale(raw) ? raw : "en";
  const d = getDict(lang);
  // "Flutter apps, from first sketch <em>to the stores.</em>"
  const [before, em = ""] = d["v3.hero"].split(/<em>|<\/em>/);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: C.bg,
          color: C.ink,
          fontFamily: "DM Sans",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", padding: "56px 72px 0", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", fontFamily: "Unbounded", fontSize: 34, letterSpacing: "-0.02em" }}>
              PR<span style={{ color: C.hot }}>.</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: C.card,
                borderRadius: 999,
                padding: "12px 22px",
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: 999, background: "#22c55e" }} />
              {plain(d["v2.status"])}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 44,
              fontFamily: "Unbounded",
              fontSize: 104,
              lineHeight: 0.95,
              letterSpacing: "-0.045em",
            }}
          >
            {NAME}
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 34, fontWeight: 700, color: C.hot }}>
            {plain(d["hl.full"])}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 18,
              fontFamily: "Unbounded",
              fontSize: 40,
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
              maxWidth: 900,
            }}
          >
            <span>{plain(before)}&nbsp;</span>
            <span style={{ color: C.hot }}>{plain(em)}</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: C.ink,
            color: C.bg,
            padding: "26px 72px",
            fontSize: 24,
            fontWeight: 500,
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            {COMPANIES.map((c) => (
              <span key={c.name} style={{ fontWeight: 700 }}>
                {c.name}
              </span>
            ))}
          </div>
          <span style={{ color: C.hot, fontWeight: 700 }}>Flutter · iOS · Android</span>
        </div>
      </div>
    ),
    { ...size, fonts: OG_FONTS },
  );
}
