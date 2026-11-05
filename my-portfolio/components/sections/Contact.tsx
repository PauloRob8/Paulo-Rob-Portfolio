import type { Dict } from "@/lib/i18n";
import type { Extra } from "@/lib/strings";
import { EMAIL, GITHUB, LINKEDIN, MAILTO, ext } from "@/lib/site";
import { T } from "../Rich";
import { CopyEmail } from "../client/CopyEmail";
import { GitHubIcon, LinkedInIcon } from "../icons";
import s from "./Contact.module.css";

export function Contact({ d, x }: { d: Dict; x: Extra }) {
  return (
    <section className={`s3 ${s.contact}`} id="contact" aria-labelledby="contact-h">
      <T as="h2" className={s.giant} id="contact-h" k="c.h" d={d} />
      <T as="p" className={s.cp} k="v2.c.p" d={d} />
      <a className={s.em} href={MAILTO}>
        {EMAIL}
      </a>
      <div className={s.ctabs}>
        <a className="mag hot" href={MAILTO} data-mag="" data-t="">
          {d["cta.write"]}
        </a>
        <CopyEmail email={EMAIL} label={d["copy.email"]} toast={x.toast} />
      </div>
      <div className={s.socials}>
        <a href={LINKEDIN.url} {...ext}>
          <span className={s.si}>
            <LinkedInIcon />
          </span>
          <span className={s.st}>
            LinkedIn<small>{LINKEDIN.handle}</small>
          </span>
          <span className={s.arr} aria-hidden="true">
            ↗
          </span>
        </a>
        <a href={GITHUB.url} {...ext}>
          <span className={s.si}>
            <GitHubIcon />
          </span>
          <span className={s.st}>
            GitHub<small>{GITHUB.handle}</small>
          </span>
          <span className={s.arr} aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
