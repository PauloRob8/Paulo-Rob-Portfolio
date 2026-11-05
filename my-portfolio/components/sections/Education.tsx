import type { Dict } from "@/lib/i18n";
import { T } from "../Rich";
import s from "./Education.module.css";

export function Education({ d }: { d: Dict }) {
  return (
    <section className="s3" id="education" aria-labelledby="edu-h">
      <h2 className="lbl" id="edu-h">
        <T k="v2.edu.h" d={d} />
      </h2>
      <div className={s.facts}>
        <div className="rv">
          <b>Instituto Federal do Piauí</b>
          <T k="v2.edu" d={d} />
        </div>
        <div className="rv">
          <b>The Complete Flutter Developer Bootcamp</b>
          <T k="v2.cert" d={d} />
        </div>
      </div>
    </section>
  );
}
