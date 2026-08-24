// src/lib/password.ts
// Hash y verificación de contraseñas con scrypt (nativo de Node, sin dependencias).

import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

const KEYLEN = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, KEYLEN).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, stored: string | null): boolean {
  if (!stored) return false;
  const [salt, key] = stored.split(":");
  if (!salt || !key) return false;
  const keyBuf = Buffer.from(key, "hex");
  const derived = scryptSync(password, salt, KEYLEN);
  return keyBuf.length === derived.length && timingSafeEqual(keyBuf, derived);
}

// Token de invitación opaco (URL-safe).
export function generateToken(): string {
  return randomBytes(32).toString("hex");
}
