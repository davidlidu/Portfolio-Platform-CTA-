// src/lib/useragent.ts
// Parseo mínimo del User-Agent para clasificar dispositivo, SO y navegador.
// Suficiente para analítica agregada; no pretende ser exhaustivo.

export type Device = "mobile" | "tablet" | "desktop" | "unknown";

export interface ParsedUA {
  device: Device;
  os: string | null;
  browser: string | null;
}

export function parseUserAgent(ua: string | null | undefined): ParsedUA {
  const s = (ua ?? "").toLowerCase();
  if (!s) return { device: "unknown", os: null, browser: null };

  // Dispositivo
  let device: Device = "desktop";
  if (/ipad|tablet|(android(?!.*mobile))/.test(s)) device = "tablet";
  else if (/mobi|iphone|ipod|android.*mobile|windows phone/.test(s))
    device = "mobile";

  // Sistema operativo
  let os: string | null = null;
  if (/iphone|ipad|ipod/.test(s)) os = "iOS";
  else if (/android/.test(s)) os = "Android";
  else if (/windows/.test(s)) os = "Windows";
  else if (/mac os x|macintosh/.test(s)) os = "macOS";
  else if (/linux/.test(s)) os = "Linux";

  // Navegador (orden importa: Edge/Chrome antes que Safari)
  let browser: string | null = null;
  if (/edg\//.test(s)) browser = "Edge";
  else if (/opr\/|opera/.test(s)) browser = "Opera";
  else if (/chrome|crios/.test(s)) browser = "Chrome";
  else if (/firefox|fxios/.test(s)) browser = "Firefox";
  else if (/safari/.test(s)) browser = "Safari";

  return { device, os, browser };
}
