import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getExtra, hasLocale } from "@/lib/i18n";

/** Square share image: just the terminal-tile mark, so link previews show a small icon thumbnail. */
const size = { width: 600, height: 600 };

// Read once at module scope so the route stays static. The square corners make the
// tile full-bleed; apps round or crop the thumbnail themselves.
const svg = (await readFile(join(process.cwd(), "app/icon.svg"), "utf8")).replace(' rx="9"', "");
const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

/** One image per locale, with a localized alt text. */
export async function generateImageMetadata({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const { lang } = await params;
  const x = getExtra(hasLocale(lang) ? lang : "en");
  return [{ id: "card", alt: x["seo.ogAlt"], size, contentType: "image/png" }];
}

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={src} width={size.width} height={size.height} />
      </div>
    ),
    size,
  );
}
