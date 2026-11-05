/**
 * Language-switch headline effect: each letter drops in from above and fades in,
 * staggered left to right, while the whole heading un-blurs once.
 *
 * Text nodes are wrapped temporarily (inline markup like <em> is kept) and the
 * original HTML is put back once the animations finish, so the DOM returns to
 * plain text. While split, the letters are aria-hidden and a visually hidden copy
 * of the text keeps the heading readable for screen readers.
 */
const STEP_MAX = 28; // ms between letters
const SPREAD_MAX = 560; // longest stagger for one heading, however long it is
const WJ = "⁠"; // word joiner: no line break where a word crosses an inline tag

type Split = { html: string; written: string };
const splits = new WeakMap<HTMLElement, Split>();

const graphemes: (s: string) => string[] =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? (() => {
        const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
        return (s: string) => Array.from(seg.segment(s), (x) => x.segment);
      })()
    : (s: string) => Array.from(s);

/** Put an element back to its original HTML, unless something else changed it since. */
function restore(el: HTMLElement, entry: Split) {
  if (splits.get(el) !== entry) return;
  splits.delete(el);
  if (el.innerHTML !== entry.written) return; // React (or anything) wrote new content: leave it
  el.innerHTML = entry.html;
  el.removeAttribute("data-split");
  el.style.removeProperty("--sw-total");
}

function split(el: HTMLElement) {
  const prev = splits.get(el);
  if (prev) restore(el, prev); // still split from a switch moments ago: start from clean HTML

  const html = el.innerHTML;
  const text = el.textContent ?? "";
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  const total = graphemes(text.replace(/\s/g, "")).length;
  if (!total) return;

  const step = Math.min(STEP_MAX, SPREAD_MAX / total);
  let i = 0;
  let midWord = false; // previous text node ended inside a word
  for (const t of nodes) {
    const frag = document.createDocumentFragment();
    const parts = t.data.split(/(\s+)/).filter(Boolean);
    parts.forEach((part, n) => {
      if (/^\s+$/.test(part)) {
        frag.append(part);
        return;
      }
      if (n === 0 && midWord) frag.append(WJ);
      const word = document.createElement("span");
      word.className = "sw-w";
      for (const g of graphemes(part)) {
        const c = document.createElement("span");
        c.className = "sw-c";
        c.textContent = g;
        c.style.animationDelay = `${Math.round(i++ * step)}ms`;
        word.append(c);
      }
      frag.append(word);
    });
    if (parts.length) midWord = !/\s$/.test(t.data);
    t.replaceWith(frag);
  }

  // Letters for the eye, one intact copy for assistive tech.
  const visual = document.createElement("span");
  visual.setAttribute("aria-hidden", "true");
  visual.append(...Array.from(el.childNodes));
  const sr = document.createElement("span");
  sr.className = "sr";
  sr.textContent = text;
  el.append(sr, visual);

  el.setAttribute("data-split", "");
  el.style.setProperty("--sw-total", `${Math.round(i * step)}ms`);
  const entry: Split = { html, written: el.innerHTML };
  splits.set(el, entry);

  // Restore when this heading's own animations end (no duration copied from CSS).
  const anims = el.getAnimations({ subtree: true });
  void Promise.allSettled(anims.map((a) => a.finished)).then(() => restore(el, entry));
}

export function dropInLetters(els: HTMLElement[]) {
  els.forEach(split);
}

/** Headlines worth the effect: the hero tagline and section headings on screen. */
export function swapHeadlines(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>("[data-chars], main h2[data-t], main h2 > [data-t]:first-child"),
  ).filter((el) => {
    if (!el.getClientRects().length) return false; // hidden (previous route kept by cacheComponents)
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < innerHeight;
  });
}
