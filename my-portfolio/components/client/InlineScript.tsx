"use client";

/**
 * Inline script that runs during HTML parsing on a hard load, but renders as inert
 * text/plain during client renders (e.g. switching /en ⇄ /pt re-renders the root layout),
 * so React doesn't warn about <script> tags. suppressHydrationWarning accepts the type mismatch.
 * Pattern from the Next.js "Preventing flash before hydration" guide.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
