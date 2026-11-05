import type { ReactNode } from "react";
import type { Dict, Key } from "@/lib/i18n";
import { ext } from "@/lib/site";
import { T } from "../../Rich";
import { ArrowUpRight, FlutterIcon, GitHubIcon, SwiftIcon } from "../../icons";
import s from "../Work.module.css";

type Props = {
  d: Dict;
  /** The card's palette class (sets the --pj-* variables) from its own module. */
  className: string;
  /** Desktop only: put the art column on the left. */
  flip?: boolean;
  title: string;
  eb: Key;
  desc: Key;
  /** First tag, shown with its icon. */
  stack: "flutter" | "swift";
  tags: Array<string | { k: Key }>;
  /** The card's primary link (full-card cover, pointer only). */
  href: string;
  gh: string;
  web?: string;
  children: ReactNode;
};

/**
 * Shared shell for the side-project cards. The card is not a link itself: a cover
 * link sits under the content and the buttons sit above it, so links never nest.
 * The cover duplicates one of the buttons, so it is a pointer convenience only:
 * keyboard and screen-reader users reach the same URL through the visible button.
 */
export function ProjectCard({ d, className, flip, title, eb, desc, stack, tags, href, gh, web, children }: Props) {
  return (
    <article className={`${s.big} ${s.pj} ${flip ? s.flip : ""} ${className}`} data-tilt="">
      <a className={s.cover} href={href} {...ext} tabIndex={-1} aria-hidden="true" />
      <span className={s.view} aria-hidden="true">
        <ArrowUpRight />
      </span>
      <div className={s.in}>
        <div className={s.txt}>
          <T className={s.eb} k={eb} d={d} />
          <h3 className={s.title}>{title}</h3>
          <T as="p" k={desc} d={d} />
          <div className={s.tags}>
            <span className={s.tag}>
              {stack === "flutter" ? <FlutterIcon className={s.ico} /> : <SwiftIcon className={s.ico} />}
              {stack === "flutter" ? "Flutter" : "Swift"}
            </span>
            {tags.map((t) =>
              typeof t === "string" ? (
                <span key={t} className={s.tag}>
                  {t}
                </span>
              ) : (
                <T key={t.k} className={s.tag} k={t.k} d={d} />
              ),
            )}
          </div>
          <div className={s.links}>
            {web && (
              <a className={s.web} href={web} {...ext}>
                <T k="pj.web" d={d} />
                <span aria-hidden="true">↗</span>
              </a>
            )}
            <a className={s.gh} href={gh} {...ext}>
              <GitHubIcon className={s.ico} />
              <T k="pj.gh" d={d} />
            </a>
          </div>
        </div>
        <div className={s.stage} data-stage="" aria-hidden="true">
          <span className={`${s.blob} ${s.b1}`} />
          <span className={`${s.blob} ${s.b2}`} />
          {children}
        </div>
      </div>
    </article>
  );
}

/** Phone frame used by the Clima, CEP Finder and Coffee Shop mockups. */
export function Phone({ screen, children }: { screen: string; children: ReactNode }) {
  return (
    <span className={`${s.phone} ${s.float}`}>
      <span className={`${s.screen} ${screen}`}>
        <span className={s.notch} />
        {children}
      </span>
    </span>
  );
}
