import type { Dict } from "@/lib/i18n";
import { PROJECT_URLS } from "@/lib/site";
import { Phone, ProjectCard } from "./ProjectCard";
import s from "./Cep.module.css";

export function CepCard({ d }: { d: Dict }) {
  return (
    <ProjectCard
      d={d}
      className={s.card}
      title="CEP Finder"
      eb="pj.cep.eb"
      desc="pj.cep.p"
      stack="flutter"
      tags={["BLoC", "ViaCEP API", "SharedPreferences"]}
      href={PROJECT_URLS.cep}
      gh={PROJECT_URLS.cep}
    >
      {/* Mockup copy is the app's own UI (Portuguese) and decorative. */}
      <Phone screen={s.screen}>
        <span className={s.hi}>
          Olá,<b>Bem-vindo</b>
        </span>
        <span className={s.search}>
          <i className={s.mag} />
          <span className={s.q}>64000-020</span>
          <span className={s.caret} />
        </span>
        <span className={s.result}>
          <b>Av. Frei Serafim</b>
          <small>Centro · Teresina - PI</small>
          <i className={s.heart} />
        </span>
        <span className={s.ring}>
          <span className={s.n} />
          <small>CEPs pesquisados</small>
        </span>
        <span className={s.saved}>
          <i />
          CEPs salvos<b>›</b>
        </span>
        <span className={s.nav}>
          <i className={s.on} />
          <i />
          <i />
        </span>
      </Phone>
    </ProjectCard>
  );
}
