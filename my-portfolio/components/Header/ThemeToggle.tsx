"use client";

import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "../icons";
import { reducedMotion } from "../client/flags";
import s from "./Header.module.css";

type Mode = "light" | "dark";
const root = () => document.documentElement;
const read = (): Mode => (root().getAttribute("data-mode") === "dark" ? "dark" : "light");
const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(root(), { attributes: true, attributeFilter: ["data-mode"] });
  return () => mo.disconnect();
};
const stored = (): Mode | null => {
  try {
    const v = localStorage.getItem("pr-mode");
    return v === "dark" || v === "light" ? v : null;
  } catch {
    return null;
  }
};

export function ThemeToggle({ toDark, toLight }: { toDark: string; toLight: string }) {
  const mode = useSyncExternalStore(subscribe, read, () => "light" as Mode);

  // Switching /en ⇄ /pt re-renders the root layout and React resets <html> attributes,
  // dropping data-mode. Re-apply it before paint so the theme never flips.
  useLayoutEffect(() => {
    root().setAttribute("data-mode", stored() ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  }, []);

  // Follow the OS until the user picks a theme.
  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const on = () => {
      if (!stored()) root().setAttribute("data-mode", mq.matches ? "dark" : "light");
    };
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Mode = read() === "dark" ? "light" : "dark";
    const commit = () => {
      root().setAttribute("data-mode", next);
      try {
        localStorage.setItem("pr-mode", next);
      } catch {}
    };
    if (!document.startViewTransition || reducedMotion()) return commit();

    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const t = document.startViewTransition(commit);
    t.ready
      .then(() => {
        root().animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
          { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  };

  const dark = mode === "dark";
  return (
    <button
      type="button"
      className={s.mode}
      aria-pressed={dark}
      aria-label={dark ? toLight : toDark}
      onClick={toggle}
    >
      <SunIcon className={s.sun} />
      <MoonIcon className={s.moon} />
    </button>
  );
}
