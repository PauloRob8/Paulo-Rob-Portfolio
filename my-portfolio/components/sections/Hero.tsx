import type { Dict } from "@/lib/i18n";
import { GITHUB, LINKEDIN, MAILTO, NAME, ext } from "@/lib/site";
import { T } from "../Rich";
import { GitHubIcon, LinkedInIcon } from "../icons";
import s from "./Hero.module.css";

export function Hero({ d }: { d: Dict }) {
  const facts = [
    ["f.loc", "v2.locv"],
    ["f.exp", "v2.expv"],
    ["f.focus", "v2.focus"],
    ["f.lang", "f.langv"],
    ["v2.avail", "v2.availv"],
  ] as const;

  return (
    <section className={`wrap ${s.hero}`} id="top" aria-labelledby="hero-name">
      <div>
        <span className={s.pill}>
          <span className={s.dot} aria-hidden="true" />
          <T k="v2.status" d={d} />
        </span>
        <h1 className={s.name} id="hero-name">
          <span className={s.ln}>
            <span>{NAME}</span>
          </span>
        </h1>
        <T as="p" className={s.role} k="hl.full" d={d} />
        <T as="p" className={s.tag} k="v3.hero" d={d} data-chars="" />
        <T as="p" className={s.intro} k="v2.c.intro" d={d} />
        <div className={s.row}>
          <a className="mag hot" href={MAILTO} data-mag="" data-t="">
            {d["cta.email"]}
          </a>
          <a className="mag out" href={LINKEDIN.url} {...ext}>
            <LinkedInIcon className="ico" />
            LinkedIn
          </a>
          <a className="mag out" href={GITHUB.url} {...ext}>
            <GitHubIcon className="ico" />
            GitHub
          </a>
        </div>
      </div>
      <dl className={s.facts}>
        {facts.map(([k, v]) => (
          <div key={k}>
            <T as="dt" k={k} d={d} />
            <T as="dd" k={v} d={d} />
          </div>
        ))}
      </dl>
    </section>
  );
}
