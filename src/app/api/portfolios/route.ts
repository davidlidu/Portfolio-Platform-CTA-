// src/app/api/portfolios/route.ts
// GET: listar portafolios | POST: crear portafolio

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { portfolioSchema } from "@/lib/validations";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const portfolios = await prisma.portfolio.findMany({
      include: { projects: { select: { id: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: portfolios });
  } catch (error) {
    console.error("Error al listar portafolios:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = portfolioSchema.parse(body);

    // Verificar unicidad del slug
    const existing = await prisma.portfolio.findUnique({
      where: { slug: validated.slug },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Ya existe un portafolio con ese slug" },
        { status: 409 }
      );
    }

    const portfolio = await prisma.portfolio.create({
      data: validated,
    });

    return NextResponse.json({ success: true, data: portfolio }, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error al crear portafolio:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
