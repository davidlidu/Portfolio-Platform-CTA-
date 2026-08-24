// src/app/api/portfolios/[id]/projects/[projectId]/route.ts
// PUT, DELETE para un proyecto específico

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations";
import { getSessionUser, canAccessPortfolio } from "@/lib/access";

interface Params {
  params: { id: string; projectId: string };
}

export async function PUT(req: NextRequest, { params }: Params) {
  const user = await getSessionUser();
  if (!canAccessPortfolio(user, params.id)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = projectSchema.parse(body);

    const project = await prisma.project.update({
      where: { id: params.projectId, portfolioId: params.id },
      data: validated,
    });

    return NextResponse.json({ success: true, data: project });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }
    console.error("Error al actualizar proyecto:", error);
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
    await prisma.project.delete({
      where: { id: params.projectId, portfolioId: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }
    console.error("Error al eliminar proyecto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
