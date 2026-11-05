import type { Dict } from "@/lib/i18n";
import { T } from "../Rich";
import { BinaryCard } from "./projects/Binary";
import { CepCard } from "./projects/Cep";
import { ClimaCard } from "./projects/Clima";
import { CoffeeCard } from "./projects/Coffee";
import { LuxCard } from "./projects/LuxCard";
import s from "./Work.module.css";

/** In display order; on desktop cards 2 and 4 put the art on the left. */
const PROJECTS = [LuxCard, ClimaCard, CepCard, BinaryCard, CoffeeCard];

export function Work({ d }: { d: Dict }) {
  return (
    <section className="s3" id="work" aria-labelledby="work-h">
      <h2 className="lbl" id="work-h">
        <T k="v3.proj" d={d} />
        <span>{String(PROJECTS.length).padStart(2, "0")}</span>
      </h2>
      <div className={s.list}>
        {PROJECTS.map((Card, i) => (
          <Card key={i} d={d} />
        ))}
      </div>
    </section>
  );
}
