/** Strings the design JSON doesn't carry (UI labels and SEO). */
export const EXTRA = {
  en: {
    toast: "Email copied",
    "mode.dark": "Switch to dark theme",
    "mode.light": "Switch to light theme",
    top: "Back to top",
    sections: "Sections",
    language: "Language",
    skip: "Skip to content",
    "seo.title": "Paulo Roberto — Senior Mobile Engineer · Flutter",
    "seo.desc":
      "Senior Mobile Engineer with 7 years of Flutter. I build iOS and Android apps for payments, retail and fintech, from first sketch to the stores. Available now.",
    "seo.ogAlt": "Paulo Roberto, Senior Mobile Engineer · Flutter",
  },
  pt: {
    toast: "E-mail copiado",
    "mode.dark": "Ativar tema escuro",
    "mode.light": "Ativar tema claro",
    top: "Voltar ao topo",
    sections: "Seções",
    language: "Idioma",
    skip: "Pular para o conteúdo",
    "seo.title": "Paulo Roberto — Engenheiro Mobile Sênior · Flutter",
    "seo.desc":
      "Engenheiro Mobile Sênior com 7 anos de Flutter. Crio apps iOS e Android para pagamentos, varejo e fintech, do primeiro rascunho até as lojas. Disponível agora.",
    "seo.ogAlt": "Paulo Roberto, Engenheiro Mobile Sênior · Flutter",
  },
} as const;

export type Extra = Record<keyof (typeof EXTRA)["en"], string>;
