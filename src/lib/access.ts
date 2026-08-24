// src/lib/access.ts
// Utilidades de autorización para el panel admin.

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export interface SessionUser {
  email: string;
  role: string; // "admin" | "portfolio"
  portfolioId: string | null;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  return {
    email: session.user.email,
    role: (session.user as any).role ?? "portfolio",
    portfolioId: (session.user as any).portfolioId ?? null,
  };
}

export function isAdmin(user: SessionUser | null): boolean {
  return user?.role === "admin";
}

// Un admin accede a cualquier portafolio; un usuario de portafolio, solo al suyo.
export function canAccessPortfolio(
  user: SessionUser | null,
  portfolioId: string
): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;
  return user.portfolioId === portfolioId;
}
