// src/lib/translations.ts
export type Lang = "es" | "en";

const translations = {
  es: {
    // Sidebar
    "nav.dashboard": "Dashboard",
    "nav.logout": "Cerrar sesión",
    "nav.language_toggle": "English",
    "nav.palette_title": "Paleta de Marca",
    "nav.palette_btn": "Paleta de colores",

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

    // Portfolio Form
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
    "nav.language_toggle": "Español",
    "nav.palette_title": "Brand Palette",
    "nav.palette_btn": "Color palette",

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

    // Portfolio Form
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
