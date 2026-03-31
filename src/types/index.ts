// src/types/index.ts
// Tipos globales de la plataforma

import type { Portfolio, Project } from "@prisma/client";

// Portafolio con proyectos incluidos
export type PortfolioWithProjects = Portfolio & {
  projects: Project[];
};

// Tipo para las redes sociales (del JSON)
export interface Social {
  icon: string;
  label: string;
  url: string;
}

// Tipo para los pilares de servicio (del JSON)
export interface ServicePillar {
  icon: string;
  title: string;
  description: string;
  items: string[];
}

// Respuesta genérica de la API
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// Iconos disponibles para redes sociales
export const SOCIAL_ICONS: Record<string, string> = {
  linkedin: "in",
  twitter: "𝕏",
  instagram: "◉",
  youtube: "▶",
  github: "⌘",
  tiktok: "♪",
  web: "◎",
};
