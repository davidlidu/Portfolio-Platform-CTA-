// src/app/api/portfolios/[id]/cards/route.ts
// GET: lista las tarjetas NFC del portafolio. POST: crea una nueva. Solo admin.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nfcCardSchema } from "@/lib/validations";
import { getSessionUser, canAccessPortfolio } from "@/lib/access";

interface Params {
  params: { id: string };
}

export async function GET(_req: NextRequest, { params }: Params) {
  const user = await getSessionUser();
  if (!canAccessPortfolio(user, params.id)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const cards = await prisma.nfcCard.findMany({
      where: { portfolioId: params.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: cards });
  } catch (error) {
    console.error("Error al listar tarjetas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  const user = await getSessionUser();
  if (!canAccessPortfolio(user, params.id)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { label } = nfcCardSchema.parse(body);

    const portfolio = await prisma.portfolio.findUnique({
      where: { id: params.id },
      select: { id: true },
    });
    if (!portfolio) {
      return NextResponse.json(
        { error: "Portafolio no encontrado" },
        { status: 404 }
      );
    }

    const card = await prisma.nfcCard.create({
      data: { portfolioId: portfolio.id, label },
    });
    return NextResponse.json({ success: true, data: card }, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    console.error("Error al crear tarjeta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
