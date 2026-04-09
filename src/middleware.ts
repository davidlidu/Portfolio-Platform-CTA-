// src/middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login", // NextAuth sabe que NO debe bloquear esta página
  },
});

// Proteger todas las rutas dentro de /admin
export const config = {
  matcher: ["/admin/:path*"],
};