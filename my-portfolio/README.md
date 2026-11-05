# Paulo Roberto — portfolio

Bilingual (EN / PT) one-page portfolio. Next.js 16 (App Router, Cache Components), TypeScript, CSS Modules. Deployed on Vercel.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000 → redirects to /en or /pt
npm run build
npm run lint
```

## Where things live

- `content/en.json`, `content/pt.json` — all page copy (values may contain inline HTML)
- `lib/strings.ts` — UI labels and SEO title/description not in the copy files
- `lib/site.ts` — links, email, company list, site URL
- `app/[lang]/` — layout (metadata, theme script, fonts), page, Open Graph image
- `components/` — header, sections and the small client islands
- `proxy.ts` — sends `/` to `/en` or `/pt` (cookie `pr-lang`, then `Accept-Language`)
- `assets/fonts/` — static TTFs used only to render the Open Graph image

## Environment

`NEXT_PUBLIC_SITE_URL` — production origin used for canonical, hreflang, Open Graph and the sitemap. If unset, Vercel's production URL is used.
