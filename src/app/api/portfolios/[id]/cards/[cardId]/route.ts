// src/app/api/portfolios/[id]/cards/[cardId]/route.ts
// PATCH: actualiza etiqueta / estado activo. DELETE: elimina la tarjeta. Solo admin.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nfcCardSchema } from "@/lib/validations";
import { getSessionUser, canAccessPortfolio } from "@/lib/access";

interface Params {
  params: { id: string; cardId: string };
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const user = await getSessionUser();
  if (!canAccessPortfolio(user, params.id)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const data = nfcCardSchema.partial().parse(body);

    const card = await prisma.nfcCard.updateMany({
      where: { id: params.cardId, portfolioId: params.id },
      data,
    });
    if (card.count === 0) {
      return NextResponse.json(
        { error: "Tarjeta no encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    console.error("Error al actualizar tarjeta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const user = await getSessionUser();
  if (!canAccessPortfolio(user, params.id)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const result = await prisma.nfcCard.deleteMany({
      where: { id: params.cardId, portfolioId: params.id },
    });
    if (result.count === 0) {
      return NextResponse.json(
        { error: "Tarjeta no encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar tarjeta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
