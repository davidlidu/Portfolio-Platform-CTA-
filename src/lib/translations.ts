// src/lib/translations.ts
export type Lang = "es" | "en";

const translations = {
  es: {
    // Sidebar
    "nav.dashboard": "Dashboard",
    "nav.logout": "Cerrar sesión",

    // Dashboard
    "dash.title": "Portafolios",
    "dash.count_one": "portafolio creado",
    "dash.count_many": "portafolios creados",
    "dash.create": "+ Crear nuevo",
    "dash.empty": "No hay portafolios creados aún",
    "dash.create_first": "Crear el primero →",
    "dash.col.name": "Nombre",
    "dash.col.slug": "Slug / URL",
    "dash.col.projects": "Proyectos",
    "dash.col.status": "Estado",
    "dash.col.actions": "Acciones",
    "dash.status.published": "Publicado",
    "dash.status.draft": "Borrador",
    "dash.action.edit": "Editar",
    "dash.action.delete": "Eliminar",
    "dash.action.delete_confirm": "Sí, eliminar",
    "dash.action.cancel": "Cancelar",

    // Portfolio Form — header & tabs
    "form.create_title": "Crear portafolio",
    "form.edit_title": "Editar portafolio",
    "form.save": "Guardar cambios",
    "form.saving": "Guardando...",
    "form.create_btn": "Crear portafolio",
    "form.creating": "Creando...",
    "form.delete": "Eliminar",
    "form.tab.basic": "Básico",
    "form.tab.whatsapp": "WhatsApp",
    "form.tab.socials": "Redes",
    "form.tab.intro": "Intro",
    "form.tab.services": "Servicios",
    "form.tab.approach": "Enfoque",
    "form.tab.contact": "Contacto",
    "form.tab.leads": "Leads",
    "leads.count": "leads",
    "leads.refresh": "Actualizar",
    "leads.loading": "Cargando leads...",
    "leads.empty": "Aún no hay leads para este portafolio.",
    "leads.error": "No se pudieron cargar los leads.",
    "leads.col.name": "Nombre",
    "leads.col.contact": "Contacto",
    "leads.col.type": "Tipo",
    "leads.col.date": "Fecha",
    "leads.type.email": "Correo",
    "leads.type.phone": "Celular",
    "leads.type.unknown": "Sin clasificar",

    // Tab BÁSICO
    "basic.heroName": "Nombre completo (usa Enter para saltos)",
    "basic.slug": "Slug / URL",
    "basic.badge": "Badge de disponibilidad",
    "basic.role": "Rol / Título (usa Enter para saltos)",
    "basic.photo": "Foto de perfil",
    "basic.initials": "Iniciales (footer)",
    "basic.footerName": "Nombre footer",
    "basic.published": "Publicado",
    "basic.draft": "Borrador",
    "basic.palette": "Color de marca del portafolio",
    "basic.palette_hint": "Se aplica en el portafolio público",
    "basic.language": "Idioma del portafolio público",
    "basic.language_hint": "Aplica en textos fijos: navbar, footer, sección de proyectos",
    "basic.language_es": "Español",
    "basic.language_en": "English",

    // Tab WHATSAPP
    "wa.number": "Número de WhatsApp (con código de país, solo dígitos)",
    "wa.number_hint": "Ejemplo: 573001234567 (57 = Colombia)",
    "wa.message": "Mensaje predefinido del CTA",
    "wa.chars": "caracteres",
    "wa.preview": "Preview del link",
    "wa.cta1": "Label botón CTA Intro",
    "wa.cta2": "Label botón CTA Intro (secundario)",
    "wa.cta3": "Label botón CTA Contacto",
    "wa.cta4": "Label botón CTA Contacto (secundario)",

    // Tab REDES
    "socials.network": "Red",
    "socials.remove": "Eliminar",
    "socials.platform": "Plataforma",
    "socials.label": "Label visible",
    "socials.url": "URL",
    "socials.add": "+ Agregar red social",

    // Tab INTRO
    "intro.quote": "Frase principal",
    "intro.tags": "Tags",

    // Tab SERVICIOS
    "services.section_label": "Etiqueta de sección",
    "services.section_title": "Título de sección",
    "services.description": "Descripción general",
    "services.pillars": "Pilares",
    "services.pillar": "PILAR",
    "services.pillar_remove": "Eliminar",
    "services.icon": "Icono",
    "services.title": "Título",
    "services.pillar_desc": "Descripción",
    "services.pillar_tags": "Tags del pilar",
    "services.add_pillar": "+ Agregar pilar",

    // Tab ENFOQUE
    "approach.label": "Etiqueta",
    "approach.title": "Título (usa Enter para saltos)",
    "approach.description": "Descripción",
    "approach.steps": "Pasos",
    "approach.add_step": "+ Agregar paso",

    // Tab CONTACTO
    "contact.label": "Etiqueta",
    "contact.title": "Título",
    "contact.description": "Descripción",

    // Projects section in portfolio form
    "projects.title": "Proyectos",
    "projects.new": "+ Nuevo proyecto",
    "projects.empty": "Aún no hay proyectos",
    "projects.add_first": "Agrega el primer proyecto →",
    "projects.edit": "Editar",
    "projects.order": "Orden",
    "projects.tags": "tags",
    "projects.images": "imágenes",
    "projects.no_img": "Sin img",
  },
  en: {
    // Sidebar
    "nav.dashboard": "Dashboard",
    "nav.logout": "Sign out",

    // Dashboard
    "dash.title": "Portfolios",
    "dash.count_one": "portfolio created",
    "dash.count_many": "portfolios created",
    "dash.create": "+ Create new",
    "dash.empty": "No portfolios created yet",
    "dash.create_first": "Create the first one →",
    "dash.col.name": "Name",
    "dash.col.slug": "Slug / URL",
    "dash.col.projects": "Projects",
    "dash.col.status": "Status",
    "dash.col.actions": "Actions",
    "dash.status.published": "Published",
    "dash.status.draft": "Draft",
    "dash.action.edit": "Edit",
    "dash.action.delete": "Delete",
    "dash.action.delete_confirm": "Yes, delete",
    "dash.action.cancel": "Cancel",

    // Portfolio Form — header & tabs
    "form.create_title": "Create portfolio",
    "form.edit_title": "Edit portfolio",
    "form.save": "Save changes",
    "form.saving": "Saving...",
    "form.create_btn": "Create portfolio",
    "form.creating": "Creating...",
    "form.delete": "Delete",
    "form.tab.basic": "Basic",
    "form.tab.whatsapp": "WhatsApp",
    "form.tab.socials": "Socials",
    "form.tab.intro": "Intro",
    "form.tab.services": "Services",
    "form.tab.approach": "Approach",
    "form.tab.contact": "Contact",
    "form.tab.leads": "Leads",
    "leads.count": "leads",
    "leads.refresh": "Refresh",
    "leads.loading": "Loading leads...",
    "leads.empty": "No leads for this portfolio yet.",
    "leads.error": "Couldn't load leads.",
    "leads.col.name": "Name",
    "leads.col.contact": "Contact",
    "leads.col.type": "Type",
    "leads.col.date": "Date",
    "leads.type.email": "Email",
    "leads.type.phone": "Phone",
    "leads.type.unknown": "Unclassified",

    // Tab BASIC
    "basic.heroName": "Full name (use Enter for line breaks)",
    "basic.slug": "Slug / URL",
    "basic.badge": "Availability badge",
    "basic.role": "Role / Title (use Enter for line breaks)",
    "basic.photo": "Profile photo",
    "basic.initials": "Initials (footer)",
    "basic.footerName": "Footer name",
    "basic.published": "Published",
    "basic.draft": "Draft",
    "basic.palette": "Portfolio brand color",
    "basic.palette_hint": "Applied on the public portfolio",
    "basic.language": "Public portfolio language",
    "basic.language_hint": "Applies to fixed texts: navbar, footer, projects section",
    "basic.language_es": "Español",
    "basic.language_en": "English",

    // Tab WHATSAPP
    "wa.number": "WhatsApp number (with country code, digits only)",
    "wa.number_hint": "Example: 573001234567 (57 = Colombia)",
    "wa.message": "Default CTA message",
    "wa.chars": "characters",
    "wa.preview": "Link preview",
    "wa.cta1": "Intro CTA button label",
    "wa.cta2": "Intro CTA button label (secondary)",
    "wa.cta3": "Contact CTA button label",
    "wa.cta4": "Contact CTA button label (secondary)",

    // Tab SOCIALS
    "socials.network": "Network",
    "socials.remove": "Remove",
    "socials.platform": "Platform",
    "socials.label": "Display label",
    "socials.url": "URL",
    "socials.add": "+ Add social network",

    // Tab INTRO
    "intro.quote": "Main quote",
    "intro.tags": "Tags",

    // Tab SERVICES
    "services.section_label": "Section label",
    "services.section_title": "Section title",
    "services.description": "General description",
    "services.pillars": "Pillars",
    "services.pillar": "PILLAR",
    "services.pillar_remove": "Remove",
    "services.icon": "Icon",
    "services.title": "Title",
    "services.pillar_desc": "Description",
    "services.pillar_tags": "Pillar tags",
    "services.add_pillar": "+ Add pillar",

    // Tab APPROACH
    "approach.label": "Label",
    "approach.title": "Title (use Enter for line breaks)",
    "approach.description": "Description",
    "approach.steps": "Steps",
    "approach.add_step": "+ Add step",

    // Tab CONTACT
    "contact.label": "Label",
    "contact.title": "Title",
    "contact.description": "Description",

    // Projects section in portfolio form
    "projects.title": "Projects",
    "projects.new": "+ New project",
    "projects.empty": "No projects yet",
    "projects.add_first": "Add the first project →",
    "projects.edit": "Edit",
    "projects.order": "Order",
    "projects.tags": "tags",
    "projects.images": "images",
    "projects.no_img": "No img",
  },
} as const;

export type TranslationKey = keyof typeof translations.es;

export function getTranslator(lang: Lang) {
  return (key: TranslationKey): string =>
    (translations[lang] as Record<string, string>)[key] ??
    (translations.es as Record<string, string>)[key] ??
    key;
}
