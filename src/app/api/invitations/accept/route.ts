// src/app/api/invitations/accept/route.ts
// POST público: el invitado fija su contraseña con un token válido.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { acceptInviteSchema } from "@/lib/validations";
import { hashPassword } from "@/lib/password";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { token, password } = acceptInviteSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { inviteToken: token },
      select: { id: true, inviteExpires: true, passwordHash: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invitación inválida" },
        { status: 404 }
      );
    }
    if (user.passwordHash) {
      return NextResponse.json(
        { error: "Esta invitación ya fue usada" },
        { status: 409 }
      );
    }
    if (user.inviteExpires && user.inviteExpires.getTime() < Date.now()) {
      return NextResponse.json(
        { error: "La invitación caducó" },
        { status: 410 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashPassword(password),
        inviteToken: null,
        inviteExpires: null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error al aceptar invitación:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
