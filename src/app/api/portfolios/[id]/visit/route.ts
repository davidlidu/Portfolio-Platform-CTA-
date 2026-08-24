// src/app/api/portfolios/[id]/visit/route.ts
// POST público: registra una apertura del portafolio (beacon).
// GET protegido: devuelve la analítica agregada para el panel admin.

import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { visitSchema } from "@/lib/validations";
import { parseUserAgent } from "@/lib/useragent";
import { getSessionUser, canAccessPortfolio } from "@/lib/access";

interface Params {
  params: { id: string };
}

const VISITOR_COOKIE = "taphub_vid";
const CARD_COOKIE = "taphub_card";

// Registrar apertura (público)
export async function POST(req: NextRequest, { params }: Params) {
  try {
    const body = await req.json().catch(() => ({}));
    const { referrer } = visitSchema.parse(body);

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

    // Tarjeta NFC marcada por la ruta /t/<cardId> (si aplica).
    const rawCardId = req.cookies.get(CARD_COOKIE)?.value || null;
    let cardId: string | null = null;
    if (rawCardId) {
      const card = await prisma.nfcCard.findFirst({
        where: { id: rawCardId, portfolioId: portfolio.id, isActive: true },
        select: { id: true },
      });
      cardId = card?.id ?? null;
    }

    // Visitante anónimo (cookie estable para únicos y conversión).
    let visitorId = req.cookies.get(VISITOR_COOKIE)?.value || null;
    const isNewVisitor = !visitorId;
    if (!visitorId) visitorId = randomUUID();

    const ua = parseUserAgent(req.headers.get("user-agent"));

    await prisma.visit.create({
      data: {
        portfolioId: portfolio.id,
        cardId,
        visitorId,
        source: cardId ? "nfc" : "direct",
        device: ua.device,
        os: ua.os,
        browser: ua.browser,
        referrer: referrer || null,
      },
    });

    const res = NextResponse.json({ success: true }, { status: 201 });
    if (isNewVisitor) {
      res.cookies.set(VISITOR_COOKIE, visitorId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: "lax",
      });
    }
    return res;
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    console.error("Error al registrar visita:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Analítica agregada (admin o dueño del portafolio)
export async function GET(_req: NextRequest, { params }: Params) {
  const user = await getSessionUser();
  if (!canAccessPortfolio(user, params.id)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const [visits, cards, leads] = await Promise.all([
      prisma.visit.findMany({
        where: { portfolioId: params.id },
        select: {
          cardId: true,
          visitorId: true,
          device: true,
          source: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.nfcCard.findMany({
        where: { portfolioId: params.id },
        orderBy: { createdAt: "desc" },
      }),
      prisma.lead.findMany({
        where: { portfolioId: params.id },
        select: { cardId: true, visitorId: true },
      }),
    ]);

    const totalOpens = visits.length;
    const uniqueVisitors = new Set(
      visits.map((v) => v.visitorId).filter(Boolean)
    ).size;
    const totalLeads = leads.length;
    const nfcOpens = visits.filter((v) => v.source === "nfc").length;

    // Conversión: leads / aperturas.
    const conversion = totalOpens > 0 ? totalLeads / totalOpens : 0;

    // Aperturas por día (últimos 30 días).
    const byDayMap = new Map<string, number>();
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      byDayMap.set(d.toISOString().slice(0, 10), 0);
    }
    for (const v of visits) {
      const key = v.createdAt.toISOString().slice(0, 10);
      if (byDayMap.has(key)) byDayMap.set(key, (byDayMap.get(key) || 0) + 1);
    }
    const byDay = Array.from(byDayMap.entries()).map(([date, count]) => ({
      date,
      count,
    }));

    // Desglose por dispositivo.
    const byDevice: Record<string, number> = {};
    for (const v of visits) {
      byDevice[v.device] = (byDevice[v.device] || 0) + 1;
    }

    // Por tarjeta: aperturas y leads.
    const opensByCard = new Map<string, number>();
    for (const v of visits) {
      if (v.cardId) opensByCard.set(v.cardId, (opensByCard.get(v.cardId) || 0) + 1);
    }
    const leadsByCard = new Map<string, number>();
    for (const l of leads) {
      if (l.cardId) leadsByCard.set(l.cardId, (leadsByCard.get(l.cardId) || 0) + 1);
    }
    const perCard = cards.map((c) => ({
      id: c.id,
      label: c.label,
      isActive: c.isActive,
      createdAt: c.createdAt,
      opens: opensByCard.get(c.id) || 0,
      leads: leadsByCard.get(c.id) || 0,
    }));

    return NextResponse.json({
      success: true,
      data: {
        totalOpens,
        nfcOpens,
        uniqueVisitors,
        totalLeads,
        conversion,
        byDay,
        byDevice,
        perCard,
      },
    });
  } catch (error) {
    console.error("Error al obtener analítica:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
