// src/app/api/portfolios/[id]/leads/route.ts
// POST público: captura un lead desde el formulario de acceso.
// GET protegido: lista los leads del portafolio para el panel admin.

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validations";
import { parseContact } from "@/lib/leads";

interface Params {
  params: { id: string };
}

// Crear lead (público, sin autenticación)
export async function POST(req: NextRequest, { params }: Params) {
  try {
    const body = await req.json();
    const { fullName, contact } = leadSchema.parse(body);

    // Verificar que el portafolio exista y esté publicado
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: params.id, isPublished: true },
      select: { id: true },
    });
    if (!portfolio) {
      return NextResponse.json(
        { error: "Portafolio no encontrado" },
        { status: 404 }
      );
    }

    const { contactType, email, phone } = parseContact(contact);

    await prisma.lead.create({
      data: {
        portfolioId: portfolio.id,
        fullName,
        contact,
        email,
        phone,
        contactType,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error al registrar lead:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Listar leads (solo admin)
export async function GET(_req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const leads = await prisma.lead.findMany({
      where: { portfolioId: params.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    console.error("Error al obtener leads:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
