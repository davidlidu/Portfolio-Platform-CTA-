// src/lib/validations.ts
// Esquemas de validación con Zod

import { z } from "zod";

// Validación de slug: solo letras minúsculas, números y guiones
const slugRegex = /^[a-z0-9-]+$/;

// Validación de número WhatsApp: solo dígitos
const whatsappRegex = /^\d+$/;

// Esquema de red social
const socialSchema = z.object({
  icon: z.string().min(1),
  label: z.string().min(1),
  url: z.string().url(),
});

// Esquema de pilar de servicio
const pillarSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  items: z.array(z.string()).default([]),
});

// Esquema para crear/actualizar portafolio
export const portfolioSchema = z.object({
  slug: z
    .string()
    .min(3, "El slug debe tener al menos 3 caracteres")
    .max(100)
    .regex(slugRegex, "Solo letras minúsculas, números y guiones"),
  isPublished: z.boolean().default(false),

  // Hero
  heroName: z.string().min(1, "El nombre es requerido"),
  heroBadge: z.string().default("Disponible para proyectos"),
  // El resto de campos son opcionales: se puede crear un portafolio solo con el
  // nombre y completarlo después (o dejar que el usuario asignado lo termine).
  heroRole: z.string().default(""),
  heroPhotoUrl: z.string().nullable().optional(),

  // Socials
  socials: z.array(socialSchema).max(6).default([]),

  // Intro
  introQuote: z.string().default(""),
  introTags: z.array(z.string()).default([]),
  introCta1Label: z.string().default("Agendar conversación"),
  introCta2Label: z.string().default("Explorar proyectos"),

  // Servicios
  servicesLabel: z.string().default("// Servicios"),
  servicesTitle: z.string().default("Cómo genero valor"),
  servicesDescription: z.string().default(""),
  servicePillars: z.array(pillarSchema).max(3).default([]),

  // Enfoque
  approachLabel: z.string().default("// Mi enfoque"),
  approachTitle: z.string().default(""),
  approachDescription: z.string().default(""),
  approachSteps: z.array(z.string()).max(6).default([]),

  // Contacto
  contactLabel: z.string().default("// Conectemos"),
  contactTitle: z.string().default("¿Tienes un proyecto en mente?"),
  contactDescription: z.string().default(""),
  contactCta1Label: z.string().default("Agendar conversación"),
  contactCta2Label: z.string().default("Guardar contacto"),

  // WhatsApp
  whatsappNumber: z
    .string()
    .regex(whatsappRegex, "Solo dígitos, incluye código de país")
    .nullable()
    .optional(),
  whatsappMessage: z.string().nullable().optional(),

  // Footer
  footerInitials: z.string().default("JP"),
  footerName: z.string().default(""),

  // Tema de color
  paletteId: z.string().default("emerald"),

  // Idioma del portafolio público
  language: z.enum(["es", "en"]).default("es"),

  // Formulario de acceso (LeadGate) encendido/apagado
  leadGateEnabled: z.boolean().default(true),

  // Integración GoHighLevel (GHL): envío de leads encendido/apagado por
  // portafolio, y el identificador (tag + campo personalizado) que se envía.
  ghlEnabled: z.boolean().default(false),
  ghlTag: z.string().trim().max(80).nullable().optional(),
});

// Esquema para crear/actualizar una tarjeta NFC (panel admin)
export const nfcCardSchema = z.object({
  label: z.string().trim().max(80).default(""),
  isActive: z.boolean().optional(),
});

// Esquema para registrar una apertura desde el beacon público
export const visitSchema = z.object({
  referrer: z.string().max(500).nullish(),
});

// Esquema para crear/actualizar proyecto
export const projectSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  tags: z.array(z.string()).default([]),
  thumbnailUrl: z.string().nullable().optional(),
  images: z.array(z.string()).default([]),
  projectUrl: z.string().nullable().optional(),
  order: z.number().int().default(0),
});

// Esquema para capturar un lead desde el formulario de acceso público
export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "El nombre completo es requerido")
    .max(120),
  contact: z
    .string()
    .trim()
    .min(3, "Ingresa tu celular o correo")
    .max(120),
});

// Invitar un usuario a un portafolio (admin)
export const inviteSchema = z.object({
  email: z.string().trim().toLowerCase().email("Correo inválido"),
  name: z.string().trim().max(120).optional(),
});

// Aceptar invitación y fijar contraseña
export const acceptInviteSchema = z.object({
  token: z.string().min(10),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(200),
});

export type PortfolioInput = z.infer<typeof portfolioSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
export type NfcCardInput = z.infer<typeof nfcCardSchema>;
export type VisitInput = z.infer<typeof visitSchema>;
