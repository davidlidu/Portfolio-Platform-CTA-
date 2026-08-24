// src/app/t/[cardId]/route.ts
// Punto de entrada de las tarjetas NFC. La URL grabada en la tarjeta es
// https://<dominio>/t/<cardId>. Aquí resolvemos el portafolio, dejamos una
// cookie que marca la tarjeta (para atribuir la apertura y el lead) y
// redirigimos al portafolio público. La apertura la registra el beacon de /[slug].

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface Params {
  params: { cardId: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  const card = await prisma.nfcCard.findUnique({
    where: { id: params.cardId },
    select: {
      isActive: true,
      portfolio: { select: { slug: true, isPublished: true } },
    },
  });

  // Tarjeta inexistente, inactiva o portafolio no publicado -> a la home.
  if (!card || !card.isActive || !card.portfolio?.isPublished) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const res = NextResponse.redirect(new URL(`/${card.portfolio.slug}`, req.url));

  // Marca la tarjeta para esta sesión de navegación (30 min).
  res.cookies.set("taphub_card", params.cardId, {
    path: "/",
    maxAge: 60 * 30,
    httpOnly: true,
    sameSite: "lax",
  });

  return res;
}
