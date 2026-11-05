"use client";

import { useEffect, useRef, useState } from "react";
import s from "./Header.module.css";

type Item = { id: string; label: string };

/** Section nav with scroll spy. Plain anchors, so it works (and smooth-scrolls) without JS. */
export function NavSpy({ items, label, watch }: { items: Item[]; label: string; watch: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ids = new Set(items.map((i) => i.id));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const id = en.target.id;
          // Sections without a nav entry (e.g. education) keep the previous highlight,
          // except the hero, which clears it.
          if (ids.has(id)) setActive(id);
          else if (id === "top") setActive(null);
        }),
      { rootMargin: "-35% 0px -55% 0px" },
    );
    watch.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items, watch]);

  // On phones the nav scrolls sideways: keep the active pill in view.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !active || nav.scrollWidth <= nav.clientWidth) return;
    const a = nav.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!a) return;
    const left = a.offsetLeft - (nav.clientWidth - a.offsetWidth) / 2;
    nav.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav ref={navRef} className={s.nav} aria-label={label}>
      {items.map((i) => (
        <a
          key={i.id}
          href={`#${i.id}`}
          className={active === i.id ? s.on : undefined}
          aria-current={active === i.id ? "location" : undefined}
          data-t=""
        >
          {i.label}
        </a>
      ))}
    </nav>
  );
}
