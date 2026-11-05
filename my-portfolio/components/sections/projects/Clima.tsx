import type { ReactNode } from "react";
import type { Dict } from "@/lib/i18n";
import { PROJECT_URLS } from "@/lib/site";
import { Phone, ProjectCard } from "./ProjectCard";
import s from "./Clima.module.css";

const CloudSun = () => (
  <svg className={s.wx} viewBox="0 0 64 64">
    <g className={s.rays} stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity=".8">
      <path d="M24 4v6M6 22h6M11 9l4 4M37 9l-4 4" />
    </g>
    <circle cx="24" cy="22" r="9" fill="currentColor" opacity=".8" />
    <path className={s.cloud} d="M20 52h28a10 10 0 0 0 0-20 14 14 0 0 0-26.6 4.2A8 8 0 0 0 20 52z" fill="currentColor" />
  </svg>
);
const Sun = () => (
  <svg className={s.wx} viewBox="0 0 64 64">
    <g className={s.rays} stroke="currentColor" strokeWidth="4" strokeLinecap="round">
      <path d="M32 4v8M32 52v8M4 32h8M52 32h8M12.2 12.2l5.7 5.7M46.1 46.1l5.7 5.7M12.2 51.8l5.7-5.7M46.1 17.9l5.7-5.7" />
    </g>
    <circle cx="32" cy="32" r="12" fill="currentColor" />
  </svg>
);
const Rain = () => (
  <svg className={s.wx} viewBox="0 0 64 64">
    <path d="M18 40h28a10 10 0 0 0 0-20 14 14 0 0 0-26.6 4.2A8 8 0 0 0 18 40z" fill="currentColor" />
    <g className={s.drops} stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
      <path d="M22 47l-3 7M33 47l-3 7M44 47l-3 7" />
    </g>
  </svg>
);

const SLIDES: Array<{ c: string; city: string; t: number; icon: ReactNode }> = [
  { c: s.s1, city: "London", t: 21, icon: <CloudSun /> },
  { c: s.s2, city: "Teresina", t: 33, icon: <Sun /> },
  { c: s.s3, city: "São Paulo", t: 17, icon: <Rain /> },
];

export function ClimaCard({ d }: { d: Dict }) {
  return (
    <ProjectCard
      d={d}
      className={s.card}
      flip
      title="Clima"
      eb="pj.clima.eb"
      desc="pj.clima.p"
      stack="swift"
      tags={["UIKit", "CoreLocation", "OpenWeatherMap API"]}
      href={PROJECT_URLS.clima}
      cta="pj.gh"
      gh={PROJECT_URLS.clima}
    >
      <Phone screen={s.screen}>
        {SLIDES.map((sl) => (
          <span key={sl.city} className={`${s.slide} ${sl.c}`}>
            <span className={s.search}>
              <i className={s.loc} />
              <span className={s.field}>
                <span className={s.q}>{sl.city}</span>
              </span>
              <i className={s.mag} />
            </span>
            <span className={s.icon}>{sl.icon}</span>
            <span className={s.temp}>
              {sl.t}
              <small>°C</small>
            </span>
            <span className={s.city}>{sl.city}</span>
          </span>
        ))}
      </Phone>
    </ProjectCard>
  );
}
