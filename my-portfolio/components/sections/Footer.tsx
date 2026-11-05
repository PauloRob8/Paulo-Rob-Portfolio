import type { Dict } from "@/lib/i18n";
import { NAME } from "@/lib/site";
import { T } from "../Rich";
import s from "./Footer.module.css";

export function Footer({ d }: { d: Dict }) {
  return (
    <div className="wrap">
      <footer className={s.foot}>
        <span>© 2026 {NAME}</span>
        <T k="foot" d={d} />
      </footer>
    </div>
  );
}
