import type { Dict } from "@/lib/i18n";
import type { Extra } from "@/lib/strings";
import { MAILTO, NAME } from "@/lib/site";
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
        <a className={s.logo} href="#top" aria-label={`${NAME}, ${x.top}`}>
          {/* Terminal-tile mark. The letters are outlined paths, so no font is needed. */}
          <svg viewBox="0 0 34 34" width="34" height="34" aria-hidden="true">
            <g className={s.tile}>
              <rect width="34" height="34" rx="9" fill="currentColor" />
              <path
                className={s.txt}
                d="M9.32 21.48V25.61H7.26V14.67H9.32V15.85Q9.65 15.17 10.18 14.82Q10.71 14.47 11.43 14.47Q12.79 14.47 13.54 15.56Q14.29 16.65 14.29 18.64Q14.29 20.65 13.53 21.72Q12.77 22.80 11.36 22.80Q10.72 22.80 10.21 22.47Q9.71 22.14 9.32 21.48ZM12.21 18.62Q12.21 17.48 11.83 16.82Q11.45 16.17 10.78 16.17Q10.10 16.17 9.71 16.82Q9.32 17.48 9.32 18.62Q9.32 19.77 9.71 20.42Q10.10 21.07 10.78 21.07Q11.45 21.07 11.83 20.42Q12.21 19.77 12.21 18.62ZM22.46 16.85Q22.12 16.54 21.67 16.39Q21.21 16.23 20.66 16.23Q20.01 16.23 19.51 16.46Q19.02 16.69 18.75 17.13Q18.58 17.40 18.52 17.78Q18.45 18.16 18.45 18.94V22.6H16.37V14.67H18.45V15.90Q18.75 15.22 19.38 14.85Q20.01 14.47 20.86 14.47Q21.28 14.47 21.69 14.58Q22.09 14.68 22.46 14.88Z"
              />
              <rect className={s.cur} x="24" y="19.5" width="5" height="3" rx="1" />
            </g>
          </svg>
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
