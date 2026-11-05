import type { Dict } from "@/lib/i18n";
import { URLS, ext } from "@/lib/site";
import { T } from "../Rich";
import s from "./Experience.module.css";

export function Experience({ d }: { d: Dict }) {
  return (
    <section className="s3" id="experience" aria-labelledby="exp-h">
      <h2 className="lbl" id="exp-h">
        <T k="nav.exp" d={d} />
        <span>2019 — 2026</span>
      </h2>
      <ol className={s.tl}>
        <li className="rv">
          <T className={s.d} k="v2.d.3s" d={d} />
          <div>
            <h3>
              <T k="v2.r.senior" d={d} /> · 3S Checkout
            </h3>
            <span className={s.at}>
              <a href={URLS.ifood} {...ext} data-t="">
                {d["v2.ifoodeco"]}
              </a>
            </span>
            <ul>
              <T as="li" k="v2.3s.1" d={d} />
              <T as="li" k="v2.3s.2" d={d} />
              <T as="li" k="v2.3s.3" d={d} />
            </ul>
          </div>
        </li>

        <li className="rv">
          <T className={s.d} k="v2.d.air2" d={d} />
          <div>
            <h3>
              <T k="v2.r.senior" d={d} /> ·{" "}
              <a href={URLS.air} {...ext}>
                AirCompany
              </a>
            </h3>
            <span className={s.at}>
              <T k="b.consult" d={d} />{" "}
              <a href={URLS.veloe} {...ext}>
                Veloe
              </a>
              ,{" "}
              <a href={URLS.copastur} {...ext}>
                Copastur
              </a>
              ,{" "}
              <a href={URLS.ancar} {...ext}>
                Ancar
              </a>
            </span>
            <ul>
              <T as="li" k="v2.air.1" d={d} />
              <T as="li" k="v2.air.2" d={d} />
              <T as="li" k="j1.3" d={d} />
            </ul>
          </div>
        </li>

        <li className="rv">
          <T className={s.d} k="v2.d.air1" d={d} />
          <div>
            <h3>
              <T k="v2.r.mobile" d={d} /> · AirCompany
            </h3>
            <ul>
              <T as="li" k="v2.air.3" d={d} />
              <T as="li" k="v2.air.4" d={d} />
            </ul>
          </div>
        </li>

        <li className="rv">
          <T className={s.d} k="v2.d.blu" d={d} />
          <div>
            <h3>
              <T k="v2.r.mse" d={d} /> · Blu by BS2
            </h3>
            <ul>
              <T as="li" k="v2.blu.1" d={d} />
              <T as="li" k="v2.blu.2" d={d} />
            </ul>
          </div>
        </li>

        <li className={`rv ${s.sm}`}>
          <T className={s.d} k="v2.d.short" d={d} />
          <div>
            <h3>Cliqx · aiqfome</h3>
            <T as="p" k="v2.short" d={d} />
          </div>
        </li>

        <li className={`rv ${s.sm}`}>
          <T className={s.d} k="v2.d.vs" d={d} />
          <div>
            <h3>
              <T k="v2.r.fd" d={d} /> · Vetor Solar
            </h3>
            <T as="p" k="v2.vs" d={d} />
          </div>
        </li>
      </ol>
    </section>
  );
}
