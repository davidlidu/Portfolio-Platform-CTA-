// src/app/api/portfolios/[id]/projects/route.ts
// GET: listar proyectos | POST: crear proyecto

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations";

interface Params {
  params: { id: string };
}

export async function GET(_req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const projects = await prisma.project.findMany({
      where: { portfolioId: params.id },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("Error al listar proyectos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    // Verificar que el portafolio existe
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: params.id },
    });
    if (!portfolio) {
      return NextResponse.json(
        { error: "Portafolio no encontrado" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const validated = projectSchema.parse(body);

    const project = await prisma.project.create({
      data: { ...validated, portfolioId: params.id },
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error al crear proyecto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
