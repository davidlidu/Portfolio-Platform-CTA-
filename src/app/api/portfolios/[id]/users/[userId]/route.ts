// src/app/api/portfolios/[id]/users/[userId]/route.ts
// DELETE: elimina el acceso de un usuario. POST: reenvía / regenera la invitación.
// Solo admin global.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser, isAdmin } from "@/lib/access";
import { generateToken } from "@/lib/password";
import { isMailConfigured, sendInvitationEmail } from "@/lib/mailer";

interface Params {
  params: { id: string; userId: string };
}

const INVITE_TTL_DAYS = 7;

export async function DELETE(_req: NextRequest, { params }: Params) {
  const user = await getSessionUser();
  if (!isAdmin(user)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const result = await prisma.user.deleteMany({
    where: { id: params.userId, portfolioId: params.id },
  });
  if (result.count === 0) {
    return NextResponse.json(
      { error: "Usuario no encontrado" },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true });
}

// Reenviar invitación: regenera el token y (si hay SMTP) reenvía el correo.
export async function POST(req: NextRequest, { params }: Params) {
  const user = await getSessionUser();
  if (!isAdmin(user)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const target = await prisma.user.findFirst({
    where: { id: params.userId, portfolioId: params.id },
    include: { portfolio: { select: { heroName: true } } },
  });
  if (!target) {
    return NextResponse.json(
      { error: "Usuario no encontrado" },
      { status: 404 }
    );
  }
  if (target.passwordHash) {
    return NextResponse.json(
      { error: "El usuario ya activó su cuenta" },
      { status: 409 }
    );
  }

  const token = generateToken();
  await prisma.user.update({
    where: { id: target.id },
    data: {
      inviteToken: token,
      inviteExpires: new Date(
        Date.now() + INVITE_TTL_DAYS * 24 * 60 * 60 * 1000
      ),
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;
  const inviteUrl = `${baseUrl}/invite/${token}`;

  if (isMailConfigured()) {
    try {
      await sendInvitationEmail({
        to: target.email,
        inviteUrl,
        portfolioName: (target.portfolio?.heroName || "").replace(/\n/g, " "),
      });
      return NextResponse.json({ success: true, emailed: true, inviteUrl });
    } catch (e) {
      console.error("Error al reenviar invitación:", e);
    }
  }
  return NextResponse.json({ success: true, emailed: false, inviteUrl });
}
