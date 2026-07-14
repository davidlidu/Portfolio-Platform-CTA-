// src/lib/portfolio-translations.ts
// Textos estáticos del portafolio público, traducibles por idioma del portfolio

export type PortfolioLang = "es" | "en";

const portfolioTranslations = {
  es: {
    // Navbar
    "nav.services": "Servicios",
    "nav.portfolio": "Portafolio",
    "nav.contact": "Contacto",

    // HeroSection
    "hero.scroll": "Scroll",

    // ProjectsSection
    "projects.label": "// Proyectos",
    "projects.title": "Trabajo",
    "projects.title_accent": "destacado",
    "projects.view": "Ver proyecto →",
    "projects.view_full": "Ver proyecto completo",

    // Footer
    "footer.rights": "Todos los derechos reservados.",
  },
  en: {
    // Navbar
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Contact",

    // HeroSection
    "hero.scroll": "Scroll",

    // ProjectsSection
    "projects.label": "// Projects",
    "projects.title": "Featured",
    "projects.title_accent": "work",
    "projects.view": "View project →",
    "projects.view_full": "View full project",

    // Footer
    "footer.rights": "All rights reserved.",
  },
} as const;

export type PortfolioTranslationKey = keyof typeof portfolioTranslations.es;

export function getPortfolioTranslator(lang: PortfolioLang) {
  return (key: PortfolioTranslationKey): string =>
    (portfolioTranslations[lang] as Record<string, string>)[key] ??
    (portfolioTranslations.es as Record<string, string>)[key] ??
    key;
}
