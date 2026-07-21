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

    // Formulario de acceso (lead gate)
    "gate.title": "Antes de continuar",
    "gate.subtitle": "Déjame tus datos para ver el portafolio.",
    "gate.name_label": "Nombre completo",
    "gate.name_placeholder": "Tu nombre completo",
    "gate.contact_label": "Celular o correo",
    "gate.contact_placeholder": "Ej: 3001234567 o tu@correo.com",
    "gate.submit": "Ver portafolio",
    "gate.submitting": "Enviando...",
    "gate.error": "No pudimos enviar tus datos. Inténtalo de nuevo.",
    "gate.privacy": "Usaremos tus datos solo para contactarte.",
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

    // Access form (lead gate)
    "gate.title": "Before you continue",
    "gate.subtitle": "Leave your details to view the portfolio.",
    "gate.name_label": "Full name",
    "gate.name_placeholder": "Your full name",
    "gate.contact_label": "Phone or email",
    "gate.contact_placeholder": "e.g. +1 555 123 4567 or you@email.com",
    "gate.submit": "View portfolio",
    "gate.submitting": "Sending...",
    "gate.error": "We couldn't send your details. Please try again.",
    "gate.privacy": "We'll only use your details to contact you.",
  },
} as const;

export type PortfolioTranslationKey = keyof typeof portfolioTranslations.es;

export function getPortfolioTranslator(lang: PortfolioLang) {
  return (key: PortfolioTranslationKey): string =>
    (portfolioTranslations[lang] as Record<string, string>)[key] ??
    (portfolioTranslations.es as Record<string, string>)[key] ??
    key;
}
