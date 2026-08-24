// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Los usuarios de portafolio solo pueden entrar a SU propio portafolio.
    if (token?.role === "portfolio") {
      const pid = token.portfolioId as string | null;

      // Sin portafolio asignado: fuera.
      if (!pid) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }

      const ownBase = `/admin/portfolios/${pid}`;

      // Dashboard global y creación: redirigir a su portafolio.
      if (path === "/admin" || path === "/admin/portfolios/new") {
        return NextResponse.redirect(new URL(ownBase, req.url));
      }

      // Cualquier otro portafolio: redirigir al suyo.
      if (
        path.startsWith("/admin/portfolios/") &&
        !path.startsWith(ownBase)
      ) {
        return NextResponse.redirect(new URL(ownBase, req.url));
      }
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/admin/login",
    },
  }
);

// Proteger todas las rutas dentro de /admin
export const config = {
  matcher: ["/admin/:path*"],
};
