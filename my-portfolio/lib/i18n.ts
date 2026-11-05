import en from "@/content/en.json";
import pt from "@/content/pt.json";
import { EXTRA, type Extra } from "./strings";

export const LOCALES = ["en", "pt"] as const;
export type Locale = (typeof LOCALES)[number];

export type Dict = typeof en;
export type Key = keyof Dict;

const DICTS: Record<Locale, Dict> = { en, pt };

export const hasLocale = (v: string): v is Locale => (LOCALES as readonly string[]).includes(v);

export const getDict = (l: Locale) => DICTS[l];
export const getExtra = (l: Locale): Extra => EXTRA[l];

/** BCP-47 tag for <html lang> and hreflang. */
export const htmlLang = (l: Locale) => (l === "pt" ? "pt-BR" : "en");
/** Open Graph locale. */
export const ogLocale = (l: Locale) => (l === "pt" ? "pt_BR" : "en_US");

/** Strip tags and decode the few entities the JSON uses, for attributes/metadata. */
export const plain = (html: string) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
