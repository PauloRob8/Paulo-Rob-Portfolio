import type { CSSProperties } from "react";
import type { Dict } from "@/lib/i18n";
import { COMPANIES, ext } from "@/lib/site";
import { T } from "../Rich";
import s from "./CompanyWall.module.css";

export function CompanyWall({ d }: { d: Dict }) {
  return (
    <section className={s.logos} aria-labelledby="logos-h">
      <div className={`wrap ${s.inner}`}>
        <T className={s.eb} k="b.worked" d={d} />
        <T as="h2" id="logos-h" k="v3.h" d={d} />
        <ul className={s.lg}>
          {COMPANIES.map((c) => (
            <li key={c.name} className="rv">
              <a href={c.url} {...ext}>
                <span
                  className={s.mark}
                  aria-hidden="true"
                  style={
                    {
                      "--src": `url(/logos/${c.logo}.png)`,
                      "--w": `${c.w}px`,
                      "--ar": c.ar,
                    } as CSSProperties
                  }
                />
                <b className="sr">{c.name}</b>
                <T as="small" k={c.role} d={d} />
                <span className={s.ext} aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
