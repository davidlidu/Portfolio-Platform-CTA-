// src/middleware.ts
// Middleware para proteger rutas del admin

import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

// Proteger todas las rutas /admin excepto /admin/login
export const config = {
  matcher: ["/admin/((?!login).*)"],
};
