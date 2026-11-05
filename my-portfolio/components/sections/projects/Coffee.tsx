import type { Dict } from "@/lib/i18n";
import { PROJECT_URLS } from "@/lib/site";
import { Phone, ProjectCard } from "./ProjectCard";
import w from "../Work.module.css";
import s from "./Coffee.module.css";

const ITEMS = [
  { name: "Classic Latte", img: s.latte, price: "$2.50", fav: true },
  { name: "Americano", img: s.americano, price: "$3.50", fav: false },
  { name: "Espresso", img: s.espresso, price: "$4.50", fav: false },
  { name: "Cappuccino", img: s.cappuccino, price: "$5.00", fav: true },
];
const OPTS = [
  ["Size", "Small"],
  ["Flavor", "Vanilla"],
  ["Topping", "Whipped Cream"],
];

export function CoffeeCard({ d }: { d: Dict }) {
  return (
    <ProjectCard
      d={d}
      className={s.card}
      title="Coffee Shop"
      eb="pj.cof.eb"
      desc="pj.cof.p"
      stack="flutter"
      tags={["Cubit", "flutter_bloc", { k: "pj.cof.t" }, { k: "pj.cof.ui" }]}
      href={PROJECT_URLS.coffee}
      gh={PROJECT_URLS.coffee}
    >
      <span className={`${s.state} ${s.st1} ${w.float}`}>
        <small>ProductCubit</small>
        <b>
          <span className={s.a}>emit(Loaded)</span>
          <span className={s.b}>select(americano)</span>
        </b>
      </span>
      <span className={`${s.state} ${s.st2} ${w.float}`}>
        <small>CartCubit</small>
        <b>
          <span className={s.a}>items: 1</span>
          <span className={s.b}>items: 2</span>
        </b>
      </span>
      <Phone screen={s.screen}>
        <span className={s.home}>
          <span className={s.top}>
            <i className={s.avatar} />
            <i className={s.search} />
          </span>
          <span className={s.body}>
            <span className={s.tabs}>
              <span>Tea</span>
              <span className={s.on}>Coffee</span>
              <span>Recent</span>
            </span>
            <span className={s.grid}>
              {ITEMS.map((it) => (
                <span key={it.name} className={s.item}>
                  <span className={s.photo}>
                    <span className={`${s.img} ${it.img}`} />
                  </span>
                  <b>{it.name}</b>
                  <span className={s.row}>
                    <i className={it.fav ? `${s.heart} ${s.on}` : s.heart} />
                    {it.price}
                  </span>
                </span>
              ))}
            </span>
          </span>
          <span className={s.tap} />
          <span className={s.nav}>
            <i className={s.on} />
            <i />
            <i className={s.cart}>
              <em>1</em>
              <em className={s.n2}>2</em>
            </i>
          </span>
        </span>
        <span className={s.detail}>
          <span className={s.hero}>
            <span className={`${s.img} ${s.americano}`} />
          </span>
          <b className={s.name}>Classic Americano</b>
          <span className={s.price}>$ 3.50</span>
          <span className={s.opts}>
            {OPTS.map(([k, v]) => (
              <span key={k} className={s.opt}>
                <span>
                  <b>{k}</b>
                  <small>{v}</small>
                </span>
                <i>›</i>
              </span>
            ))}
          </span>
          <span className={s.qty}>
            <i>−</i>
            <span>
              <em>1</em>
              <em className={s.n2}>2</em>
            </span>
            <i>+</i>
          </span>
          <span className={s.add}>ADD TO CART</span>
        </span>
      </Phone>
    </ProjectCard>
  );
}
