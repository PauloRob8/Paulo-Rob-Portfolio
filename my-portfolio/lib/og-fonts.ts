import { readFile } from "node:fs/promises";
import { join } from "node:path";

const dir = join(process.cwd(), "assets/fonts");

// Loaded once at module scope (not during render), so the image routes stay static
// under Cache Components. satori needs static TTFs, not woff2 / variable fonts.
const [unbounded, dmMedium, dmBold] = await Promise.all([
  readFile(join(dir, "Unbounded-ExtraBold.ttf")),
  readFile(join(dir, "DMSans-Medium.ttf")),
  readFile(join(dir, "DMSans-Bold.ttf")),
]);

export const OG_FONTS = [
  { name: "Unbounded", data: unbounded, weight: 800 as const, style: "normal" as const },
  { name: "DM Sans", data: dmMedium, weight: 500 as const, style: "normal" as const },
  { name: "DM Sans", data: dmBold, weight: 700 as const, style: "normal" as const },
];
