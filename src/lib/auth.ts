// src/lib/auth.ts
// Configuración de autenticación con NextAuth.js
// - Admin global: credenciales del entorno (ADMIN_EMAIL / ADMIN_PASSWORD).
// - Usuarios de portafolio: validados contra la tabla User (contraseña hasheada).

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;
        if (!email || !password) return null;

        // 1) Admin global (entorno)
        const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
        if (email === adminEmail && password === process.env.ADMIN_PASSWORD) {
          return {
            id: "admin",
            email: adminEmail,
            name: "Admin CTA+",
            role: "admin",
            portfolioId: null,
          };
        }

        // 2) Usuario de portafolio (DB)
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) return null;
        if (!verifyPassword(password, user.passwordHash)) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          role: user.role,
          portfolioId: user.portfolioId,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.portfolioId = (user as any).portfolioId ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).portfolioId = token.portfolioId ?? null;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
