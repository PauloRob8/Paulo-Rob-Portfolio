import type { Dict } from "@/lib/i18n";
import { LUX_URL, ext } from "@/lib/site";
import { T } from "../Rich";
import { ArrowUpRight } from "../icons";
import s from "./Work.module.css";

const CARDS = [
  { c: "c1", top: "III", mid: "✦", bot: "VIII" },
  { c: "c2", top: "X", mid: "☾", bot: "I" },
  { c: "c3", top: "V", mid: "✧", bot: "VI" },
] as const;

export function Work({ d }: { d: Dict }) {
  return (
    <section className="s3" id="work" aria-labelledby="work-h">
      <h2 className="lbl" id="work-h">
        <T k="v3.proj" d={d} />
        <span>01</span>
      </h2>
      <a className={s.big} href={LUX_URL} {...ext} data-tilt="">
        <span className={s.view} aria-hidden="true">
          <ArrowUpRight />
        </span>
        <div className={s.in}>
          <div className={s.txt}>
            <div className={s.tags}>
              <span>Flutter</span>
              <T k="tag.game" d={d} />
              <span>EN / PT</span>
            </div>
            <h3>
              Lux
              <br />
              Tenebre
            </h3>
            <T as="p" k="lux.short" d={d} />
            <div className={s.meta}>
              <div>
                <b>45</b>
                <T k="m.cards" d={d} />
              </div>
              <div>
                <b>2</b>
                <T k="m.rivals" d={d} />
              </div>
              <div>
                <b>9</b>
                <T k="m.tut" d={d} />
              </div>
            </div>
          </div>
          <div className={s.lux} aria-hidden="true">
            <span className={s.stars} />
            <span className={s.glow} />
            <span className={s.ring} />
            {CARDS.map((c) => (
              <span key={c.c} className={`${s.card} ${s[c.c]}`}>
                <span>{c.top}</span>
                <i>{c.mid}</i>
                <span className={s.r}>{c.bot}</span>
              </span>
            ))}
          </div>
        </div>
      </a>
    </section>
  );
}
