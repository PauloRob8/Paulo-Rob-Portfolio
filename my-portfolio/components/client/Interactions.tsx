"use client";

import { useEffect, useLayoutEffect } from "react";
import { finePointer, flags, reducedMotion } from "./flags";

declare global {
  interface Window {
    __prReady?: boolean;
  }
}

/**
 * One small client island for page-wide motion:
 * scroll reveal (.rv), magnetic CTAs ([data-mag]), 3D tilt ([data-tilt]),
 * and the text crossfade after a language switch.
 */
export function Interactions({ lang }: { lang: string }) {
  // Scroll reveal: elements already on screen stagger in, the rest reveal on scroll.
  // Layout effect so nothing flashes before it is armed. After a language switch the
  // tree remounts: content that was already on screen is shown instantly instead.
  useLayoutEffect(() => {
    window.__prReady = true;
    document.documentElement.classList.add("js"); // re-add after a root-layout re-render resets <html>
    const instant = flags.swap;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv:not(.in)"));
    if (reducedMotion()) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    const timers: number[] = [];
    els.forEach((el, i) => {
      if (el.getBoundingClientRect().top > innerHeight * 0.92) {
        io.observe(el);
      } else if (instant) {
        el.style.transition = "none";
        el.classList.add("in");
        void el.offsetWidth;
        el.style.transition = "";
      } else {
        el.style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("in")));
        timers.push(window.setTimeout(() => (el.style.transitionDelay = ""), 1200));
      }
    });
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  // Magnetic buttons + card tilt, fine pointers only.
  useEffect(() => {
    if (reducedMotion() || !finePointer()) return;
    const offs: Array<() => void> = [];
    const on = (el: HTMLElement, type: string, fn: (e: PointerEvent) => void) => {
      el.addEventListener(type, fn as EventListener);
      offs.push(() => el.removeEventListener(type, fn as EventListener));
    };
    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((c) => {
      on(c, "pointermove", (e) => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
      });
      on(c, "pointerleave", () => (c.style.transform = ""));
    });
    document.querySelectorAll<HTMLElement>("[data-mag]").forEach((b) => {
      on(b, "pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      on(b, "pointerleave", () => (b.style.transform = ""));
    });
    return () => offs.forEach((f) => f());
  }, []);

  // Project art animates only while on screen. Reduced motion: CSS shows a still frame.
  useEffect(() => {
    if (reducedMotion()) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.target.toggleAttribute("data-play", en.isIntersecting)),
      { threshold: 0.15 },
    );
    document.querySelectorAll("[data-stage]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Language crossfade once the new text is in the DOM.
  useEffect(() => {
    if (!flags.swap) return;
    flags.swap = false;
    if (reducedMotion()) return;
    const b = document.body;
    b.classList.remove("swap");
    void b.offsetWidth;
    b.classList.add("swap");
    const t = window.setTimeout(() => b.classList.remove("swap"), 500);
    return () => clearTimeout(t);
  }, [lang]);

  return null;
}
