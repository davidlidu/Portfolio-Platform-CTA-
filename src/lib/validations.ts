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
  heroRole: z.string().min(1, "El rol es requerido"),
  heroPhotoUrl: z.string().nullable().optional(),

  // Socials
  socials: z.array(socialSchema).max(6).default([]),

  // Intro
  introQuote: z.string().min(1, "La frase principal es requerida"),
  introTags: z.array(z.string()).default([]),
  introCta1Label: z.string().default("Agendar conversación"),
  introCta2Label: z.string().default("Explorar proyectos"),

  // Servicios
  servicesLabel: z.string().default("// Servicios"),
  servicesTitle: z.string().default("Cómo genero valor"),
  servicesDescription: z.string().min(1, "La descripción de servicios es requerida"),
  servicePillars: z.array(pillarSchema).max(3).default([]),

  // Enfoque
  approachLabel: z.string().default("// Mi enfoque"),
  approachTitle: z.string().min(1, "El título de enfoque es requerido"),
  approachDescription: z.string().min(1, "La descripción de enfoque es requerida"),
  approachSteps: z.array(z.string()).max(6).default([]),

  // Contacto
  contactLabel: z.string().default("// Conectemos"),
  contactTitle: z.string().default("¿Tienes un proyecto en mente?"),
  contactDescription: z.string().min(1, "La descripción de contacto es requerida"),
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
  footerName: z.string().min(1, "El nombre del footer es requerido"),
});

// Esquema para crear/actualizar proyecto
export const projectSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  tags: z.array(z.string()).default([]),
  thumbnailUrl: z.string().nullable().optional(),
  images: z.array(z.string()).default([]),
  order: z.number().int().default(0),
});

export type PortfolioInput = z.infer<typeof portfolioSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
