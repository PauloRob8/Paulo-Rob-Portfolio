import type { Dict } from "@/lib/i18n";
import { LUX_URL, ext } from "@/lib/site";
import { T } from "../../Rich";
import { ArrowUpRight, FlutterIcon, GooglePlayIcon } from "../../icons";
import w from "../Work.module.css";
import s from "./Lux.module.css";

/** Three two-sided game cards: [top art, top numeral, bottom art, bottom numeral]. */
const CARDS = [
  { c: s.l1, top: ["09-the-hermit", "IX"], bot: ["02-the-moon-witch", "II"] },
  { c: s.l2, top: ["10-the-wheel", "X"], bot: ["06-the-twins", "VI"] },
  { c: s.l3, top: ["04-the-tower", "IV"], bot: ["07-the-voyager", "VII"] },
] as const;

function Half({ art, n, other, flip }: { art: string; n: string; other: string; flip?: boolean }) {
  return (
    <span className={flip ? `${s.half} ${s.flip}` : s.half}>
      {/* Small decorative SVGs: next/image would not optimise them. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/lux/${art}.svg`} alt="" loading="lazy" decoding="async" />
      <span className={s.tab}>{n}</span>
      <span className={s.c1}>{n}</span>
      <span className={s.c2}>{other}</span>
    </span>
  );
}

/** Lux Tenebre has a single link, so the whole card is one <a>. */
export function LuxCard({ d }: { d: Dict }) {
  return (
    <a className={`${w.big} ${s.card}`} href={LUX_URL} {...ext} data-tilt="">
      <span className={`${w.view} ${s.view}`} aria-hidden="true">
        <ArrowUpRight />
      </span>
      <div className={w.in}>
        <div className={`${w.txt} ${s.txt}`}>
          <T className={s.eb} k="v3.lux.eb" d={d} />
          <h3 className={s.title}>
            Lux
            <br />
            Tenebre
          </h3>
          <T as="p" k="v3.lux" d={d} />
          <div className={s.tags}>
            <span className={s.tag}>
              <FlutterIcon className={s.ico} />
              Flutter
            </span>
            <T className={s.tag} k="tag.game" d={d} />
            <span className={s.tag}>EN · PT · ES</span>
          </div>
          <span className={s.play}>
            <GooglePlayIcon className={s.ico} />
            <span>
              <T as="small" k="v3.soon" d={d} />
              <b>Google Play</b>
            </span>
          </span>
        </div>
        <div className={s.stage} data-stage="" aria-hidden="true">
          <span className={s.stars} />
          <span className={s.glow} />
          <span className={s.ring} />
          {CARDS.map(({ c, top, bot }) => (
            <span key={top[1]} className={`${s.lc} ${c}`}>
              <span className={s.lcIn}>
                <Half art={top[0]} n={top[1]} other={bot[1]} />
                <span className={s.mid}>
                  <i />
                </span>
                <Half art={bot[0]} n={bot[1]} other={top[1]} flip />
              </span>
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
