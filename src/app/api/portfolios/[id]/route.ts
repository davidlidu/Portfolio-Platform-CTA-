// src/app/api/portfolios/[id]/route.ts
// GET, PUT, DELETE para un portafolio específico

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { portfolioSchema } from "@/lib/validations";

interface Params {
  params: { id: string };
}

export async function GET(_req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: params.id },
      include: { projects: { orderBy: { order: "asc" } } },
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portafolio no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: portfolio });
  } catch (error) {
    console.error("Error al obtener portafolio:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = portfolioSchema.parse(body);

    // Verificar que el slug no esté en uso por otro portafolio
    const existing = await prisma.portfolio.findFirst({
      where: { slug: validated.slug, NOT: { id: params.id } },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Ya existe otro portafolio con ese slug" },
        { status: 409 }
      );
    }

    const portfolio = await prisma.portfolio.update({
      where: { id: params.id },
      data: validated,
    });

    return NextResponse.json({ success: true, data: portfolio });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Portafolio no encontrado" },
        { status: 404 }
      );
    }
    console.error("Error al actualizar portafolio:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    await prisma.portfolio.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Portafolio no encontrado" },
        { status: 404 }
      );
    }
    console.error("Error al eliminar portafolio:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
