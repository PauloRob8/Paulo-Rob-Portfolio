import type { ElementType, HTMLAttributes } from "react";
import type { Dict, Key } from "@/lib/i18n";

type Props = HTMLAttributes<HTMLElement> & {
  k: Key;
  d: Dict;
  as?: ElementType;
};

/**
 * Renders a translated string. Values may contain trusted inline HTML from
 * content/*.json (<strong>, <b>, <em>, <a>, &amp;), so they are not escaped.
 * `data-t` hooks the language-swap crossfade.
 */
export function T({ k, d, as: Tag = "span", ...rest }: Props) {
  return <Tag data-t="" {...rest} dangerouslySetInnerHTML={{ __html: d[k] }} />;
}
