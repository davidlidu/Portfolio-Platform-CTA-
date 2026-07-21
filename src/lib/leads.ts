// src/lib/leads.ts
// Utilidad para abstraer el tipo de contacto (correo o celular) desde el
// valor libre que ingresa el visitante en el formulario de acceso.

export type ContactType = "email" | "phone" | "unknown";

export interface ParsedContact {
  contactType: ContactType;
  email: string | null;
  phone: string | null;
}

// Correo: patrón estándar suficientemente estricto para uso comercial.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Celular: entre 7 y 15 dígitos, admite prefijo + y separadores comunes
// (espacios, guiones, paréntesis) que se limpian antes de guardar.
const PHONE_SEPARATORS = /[\s().-]/g;
const PHONE_REGEX = /^\+?\d{7,15}$/;

/**
 * Detecta, por código, si el texto ingresado es un correo o un celular
 * y devuelve el valor normalizado en el campo correspondiente.
 */
export function parseContact(rawInput: string): ParsedContact {
  const value = (rawInput ?? "").trim();

  if (EMAIL_REGEX.test(value)) {
    return { contactType: "email", email: value.toLowerCase(), phone: null };
  }

  const phoneCandidate = value.replace(PHONE_SEPARATORS, "");
  if (PHONE_REGEX.test(phoneCandidate)) {
    return { contactType: "phone", email: null, phone: phoneCandidate };
  }

  // No se pudo clasificar: se conserva el valor crudo para revisión manual.
  return { contactType: "unknown", email: null, phone: null };
}
