// src/app/api/portfolios/[id]/users/route.ts
// GET: lista los usuarios del portafolio. POST: invita a un nuevo usuario.
// Solo el admin global puede gestionar usuarios.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser, isAdmin } from "@/lib/access";
import { inviteSchema } from "@/lib/validations";
import { generateToken } from "@/lib/password";
import { isMailConfigured, sendInvitationEmail } from "@/lib/mailer";

interface Params {
  params: { id: string };
}

const INVITE_TTL_DAYS = 7;

export async function GET(_req: NextRequest, { params }: Params) {
  const user = await getSessionUser();
  if (!isAdmin(user)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    where: { portfolioId: params.id },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      passwordHash: true,
      inviteExpires: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // No exponer el hash; derivar estado.
  const data = users.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    createdAt: u.createdAt,
    status: u.passwordHash ? "active" : "pending",
  }));

  return NextResponse.json({ success: true, data });
}

export async function POST(req: NextRequest, { params }: Params) {
  const user = await getSessionUser();
  if (!isAdmin(user)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { email, name } = inviteSchema.parse(body);

    const portfolio = await prisma.portfolio.findUnique({
      where: { id: params.id },
      select: { id: true, heroName: true },
    });
    if (!portfolio) {
      return NextResponse.json(
        { error: "Portafolio no encontrado" },
        { status: 404 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Ya existe un usuario con ese correo" },
        { status: 409 }
      );
    }

    const token = generateToken();
    const inviteExpires = new Date(
      Date.now() + INVITE_TTL_DAYS * 24 * 60 * 60 * 1000
    );

    await prisma.user.create({
      data: {
        email,
        name: name || null,
        role: "portfolio",
        portfolioId: portfolio.id,
        inviteToken: token,
        inviteExpires,
      },
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;
    const inviteUrl = `${baseUrl}/invite/${token}`;

    if (!isMailConfigured()) {
      // Sin SMTP configurado: devolvemos el enlace para compartir manualmente.
      return NextResponse.json(
        {
          success: true,
          emailed: false,
          inviteUrl,
          warning:
            "SMTP no configurado: comparte el enlace manualmente.",
        },
        { status: 201 }
      );
    }

    try {
      await sendInvitationEmail({
        to: email,
        inviteUrl,
        portfolioName: portfolio.heroName.replace(/\n/g, " "),
      });
    } catch (mailError) {
      console.error("Error al enviar invitación:", mailError);
      // El usuario quedó creado; devolvemos el enlace como respaldo.
      return NextResponse.json(
        {
          success: true,
          emailed: false,
          inviteUrl,
          warning: "No se pudo enviar el correo; comparte el enlace.",
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { success: true, emailed: true, inviteUrl },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error al invitar usuario:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
