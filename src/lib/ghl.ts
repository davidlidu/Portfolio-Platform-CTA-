// src/lib/ghl.ts
// Integración con GoHighLevel (GHL) — API v2 (LeadConnect).
//
// La conexión es GLOBAL (misma credencial para todos los portafolios) y vive en
// variables de entorno. Cada portafolio decide si envía o no sus leads a GHL con
// el toggle `ghlEnabled`. Al capturar un lead, si el portafolio tiene el envío
// activado, se hace un "upsert" del contacto en GHL con:
//   - un TAG (el identificador del portafolio: `ghlTag` o, si está vacío, el slug)
//   - un CAMPO PERSONALIZADO con ese mismo identificador
// El tag/campo son los que disparan las automatizaciones dentro de GHL.
//
// Variables de entorno:
//   GHL_API_KEY            Token de la integración privada (Location / Private
//                          Integration token). Se envía como "Bearer <token>".
//   GHL_LOCATION_ID        ID de la location (sub-cuenta) de GHL.
//   GHL_PORTFOLIO_FIELD_KEY  (opcional) "Unique Key" del campo personalizado en
//                          GHL donde se guarda el identificador. Def: "portfolio_slug".
//   GHL_API_VERSION        (opcional) Versión de la API. Def: "2021-07-28".

const GHL_BASE_URL = "https://services.leadconnectorhq.com";
const UPSERT_ENDPOINT = `${GHL_BASE_URL}/contacts/upsert`;
const DEFAULT_API_VERSION = "2021-07-28";
const DEFAULT_FIELD_KEY = "portfolio_slug";
// Tag que se envía SIEMPRE, en todos los portafolios, además del identificador
// propio de cada uno. Sirve para automatizaciones globales de todos los leads de
// TapHub. Se puede sobrescribir con GHL_DEFAULT_TAG.
const DEFAULT_TAG = "taphub-lead";
const REQUEST_TIMEOUT_MS = 8000;

// ¿Están configuradas las credenciales globales de GHL?
export function isGhlConfigured(): boolean {
  return Boolean(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID);
}

interface UpsertContactInput {
  fullName: string;
  email?: string | null;
  phone?: string | null;
  // Identificador del portafolio (se usa como tag y valor del campo personalizado)
  identifier: string;
  // De dónde viene el lead (aparece en el contacto como "source")
  source?: string;
}

export interface GhlUpsertResult {
  ok: boolean;
  status?: number;
  error?: string;
}

// Crea o actualiza el contacto en GHL. Best-effort: nunca lanza; devuelve el
// resultado para poder loguearlo sin romper la captura del lead.
export async function upsertGhlContact(
  input: UpsertContactInput
): Promise<GhlUpsertResult> {
  if (!isGhlConfigured()) {
    return { ok: false, error: "GHL no configurado" };
  }

  const apiVersion = process.env.GHL_API_VERSION || DEFAULT_API_VERSION;
  const fieldKey = process.env.GHL_PORTFOLIO_FIELD_KEY || DEFAULT_FIELD_KEY;
  const defaultTag = process.env.GHL_DEFAULT_TAG || DEFAULT_TAG;

  // Tag global + identificador del portafolio (sin duplicados si coinciden).
  const tags = Array.from(new Set([defaultTag, input.identifier].filter(Boolean)));

  // Cuerpo del upsert. GHL localiza el contacto por email/phone dentro de la
  // location; enviamos lo que tengamos. El tag y el campo personalizado llevan
  // el identificador del portafolio para disparar las automatizaciones.
  const body: Record<string, unknown> = {
    locationId: process.env.GHL_LOCATION_ID,
    name: input.fullName,
    tags,
    customFields: [{ key: fieldKey, field_value: input.identifier }],
    source: input.source || "Portfolio lead form",
  };
  if (input.email) body.email = input.email;
  if (input.phone) body.phone = input.phone;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(UPSERT_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_KEY}`,
        Version: apiVersion,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, status: res.status, error: text.slice(0, 500) };
    }
    return { ok: true, status: res.status };
  } catch (err: any) {
    return {
      ok: false,
      error: err?.name === "AbortError" ? "timeout" : String(err?.message || err),
    };
  } finally {
    clearTimeout(timeout);
  }
}
