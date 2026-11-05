import type { Dict } from "@/lib/i18n";
import type { Extra } from "@/lib/strings";
import { MAILTO } from "@/lib/site";
import { LangToggle } from "./LangToggle";
import { NavSpy } from "./NavSpy";
import { ThemeToggle } from "./ThemeToggle";
import s from "./Header.module.css";

export const SECTION_IDS = ["top", "about", "experience", "work", "education", "contact"];

export function Header({ d, x, lang }: { d: Dict; x: Extra; lang: string }) {
  const items = [
    { id: "about", label: d["nav.about"] },
    { id: "experience", label: d["nav.exp"] },
    { id: "work", label: d["nav.work"] },
    { id: "contact", label: d["nav.contact"] },
  ];
  return (
    <header className={s.hdr}>
      <div className={`wrap ${s.bar}`}>
        <a className={s.logo} href="#top">
          PR<b>.</b>
          <span className="sr"> — {x.top}</span>
        </a>
        <NavSpy items={items} label={x.sections} watch={SECTION_IDS} />
        <LangToggle lang={lang} label={x.language} />
        <ThemeToggle toDark={x["mode.dark"]} toLight={x["mode.light"]} />
        <a className={`mag ${s.say}`} href={MAILTO} data-mag="" data-t="">
          {d["cta.hi"]}
        </a>
      </div>
    </header>
  );
}
