// src/types/next-auth.d.ts
// Extiende los tipos de NextAuth con rol y portfolioId.

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role?: string;
    portfolioId?: string | null;
  }
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      portfolioId?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    portfolioId?: string | null;
  }
}
