"use client";

// src/components/portfolio/VisitTracker.tsx
// Beacon silencioso: registra una apertura del portafolio al cargar la página.
// Se dispara una sola vez por pestaña/sesión para no contar recargas.

import { useEffect } from "react";

interface VisitTrackerProps {
  portfolioId: string;
  slug: string;
}

export default function VisitTracker({ portfolioId, slug }: VisitTrackerProps) {
  useEffect(() => {
    const key = `taphub_visit_${slug}`;
    try {
      if (sessionStorage.getItem(key) === "1") return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Sin sessionStorage igual registramos (peor caso: alguna recarga extra).
    }

    fetch(`/api/portfolios/${portfolioId}/visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ referrer: document.referrer || null }),
      keepalive: true,
    }).catch(() => {
      /* la analítica nunca debe romper la página */
    });
  }, [portfolioId, slug]);

  return null;
}
