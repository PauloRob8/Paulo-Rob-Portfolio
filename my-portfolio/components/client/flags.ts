/** Module-level client state that survives route changes inside the SPA. */
export const flags = { swap: false };

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Remember the language (localStorage per spec + cookie for the proxy) and arm the crossfade. */
export function rememberLang(l: string) {
  try {
    localStorage.setItem("pr-lang", l);
  } catch {}
  document.cookie = `pr-lang=${l}; path=/; max-age=31536000; SameSite=Lax`;
  flags.swap = true;
}
