"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { rememberLang } from "../client/flags";
import s from "./Header.module.css";

const OPTIONS = [
  { l: "en", label: "EN", tag: "en", name: "English" },
  { l: "pt", label: "PT", tag: "pt-BR", name: "Português" },
] as const;

export function LangToggle({ lang, label }: { lang: string; label: string }) {
  const router = useRouter();

  const go = (e: MouseEvent<HTMLAnchorElement>, l: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (l === lang) return;
    rememberLang(l);
    router.push(`/${l}${location.hash}`, { scroll: false });
  };

  return (
    <div className={s.lang} role="group" aria-label={label}>
      {OPTIONS.map((o) => (
        <a
          key={o.l}
          href={`/${o.l}`}
          hrefLang={o.tag}
          lang={o.tag}
          aria-label={`${o.label} · ${o.name}`}
          aria-current={o.l === lang ? "true" : undefined}
          onClick={(e) => go(e, o.l)}
        >
          {o.label}
        </a>
      ))}
    </div>
  );
}
