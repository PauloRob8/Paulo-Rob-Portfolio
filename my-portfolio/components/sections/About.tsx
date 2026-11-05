import type { Dict, Key } from "@/lib/i18n";
import { T } from "../Rich";
import s from "./About.module.css";

type Chip = string | { k: Key };
const CHIPS: Chip[] = [
  "Offline-first",
  { k: "v2.sk.sd" },
  "Clean Architecture",
  "BLoC / Cubit",
  "Provider · MobX",
  "REST · GraphQL",
  "Swift · Kotlin",
  { k: "v2.sk.node" },
];

type Skill = { n: string; title: string | { k: Key }; sub: Key };
const SKILLS: Skill[] = [
  { n: "01", title: "Flutter & Dart", sub: "sk.flutter" },
  { n: "02", title: "Firebase", sub: "v2.sk.firebase" },
  { n: "03", title: { k: "sk.tests.t" }, sub: "sk.tests" },
  { n: "04", title: { k: "sk.deploy.t" }, sub: "v2.sk.deploy" },
];

export function About({ d }: { d: Dict }) {
  return (
    <section className="s3" id="about" aria-labelledby="about-h">
      <h2 className="lbl" id="about-h">
        <T k="v3.about.h" d={d} />
      </h2>
      <div className={s.about}>
        <div>
          <T as="p" className="rv" k="v2.about.1" d={d} />
          <T as="p" className="rv" k="v2.about.2" d={d} />
          <T as="p" className="rv" k="v2.about.3" d={d} />
          <div className={`${s.chips} rv`}>
            {CHIPS.map((c) =>
              typeof c === "string" ? <span key={c}>{c}</span> : <T key={c.k} k={c.k} d={d} />,
            )}
          </div>
        </div>
        <div className={s.skl}>
          {SKILLS.map((sk) => (
            <div key={sk.n} className="rv">
              <i aria-hidden="true">{sk.n}</i>
              <span>
                {typeof sk.title === "string" ? <b>{sk.title}</b> : <T as="b" k={sk.title.k} d={d} />}
                <T k={sk.sub} d={d} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
