import type { Dict } from "@/lib/i18n";
import { PROJECT_URLS } from "@/lib/site";
import { ProjectCard } from "./ProjectCard";
import s from "./Binary.module.css";

export function BinaryCard({ d }: { d: Dict }) {
  return (
    <ProjectCard
      d={d}
      className={s.card}
      flip
      title="Binary Calculator"
      eb="pj.bin.eb"
      desc="pj.bin.p"
      stack="flutter"
      tags={["Flutter Web", { k: "pj.live" }]}
      href={PROJECT_URLS.binWeb}
      cta="pj.web"
      gh={PROJECT_URLS.binGh}
      web={PROJECT_URLS.binWeb}
    >
      {/* Mockup copy is the app's own UI (Portuguese) and decorative. */}
      <span className={s.win}>
        <span className={s.bar}>
          <i />
          <i />
          <i />
          <span>ready-cream.surge.sh</span>
        </span>
        <span className={s.app}>
          <span className={s.appbar}>Binary Calculator</span>
          <span className={s.calc} />
          <span className={s.hint}>Calcule números binários de 0 a 255</span>
          <span className={s.input}>
            <small>Número binário</small>
            <span className={`${s.v} ${s.v1}`}>1011</span>
          </span>
          <span className={s.input}>
            <small>Número binário</small>
            <span className={`${s.v} ${s.v2}`}>0110</span>
          </span>
          <span className={s.ops}>
            <i className={s.on}>+</i>
            <i>−</i>
            <i>×</i>
            <i>÷</i>
            <i>%</i>
          </span>
          <span className={s.res}>
            <span>
              Resultado Binário: <b>10001</b>
            </span>
            <span>
              Resultado Decimal: <b>17</b>
            </span>
          </span>
        </span>
      </span>
    </ProjectCard>
  );
}
