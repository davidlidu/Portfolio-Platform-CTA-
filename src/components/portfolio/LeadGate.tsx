"use client";

// src/components/portfolio/LeadGate.tsx
// Overlay que bloquea el portafolio hasta que el visitante deja sus datos.
// Recuerda el envío por localStorage para no volver a pedirlo en el mismo navegador.

import { useEffect, useState } from "react";
import {
  getPortfolioTranslator,
  type PortfolioLang,
} from "@/lib/portfolio-translations";

interface LeadGateProps {
  portfolioId: string;
  slug: string;
  language: PortfolioLang;
}

export default function LeadGate({
  portfolioId,
  slug,
  language,
}: LeadGateProps) {
  const t = getPortfolioTranslator(language);
  const storageKey = `taphub_lead_${slug}`;

  // `null` mientras se resuelve el estado inicial para evitar parpadeo.
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      setUnlocked(localStorage.getItem(storageKey) === "1");
    } catch {
      setUnlocked(false);
    }
  }, [storageKey]);

  // Bloquear el scroll del fondo mientras el gate está visible.
  useEffect(() => {
    if (unlocked === false) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [unlocked]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`/api/portfolios/${portfolioId}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, contact }),
      });
      if (!res.ok) throw new Error("request-failed");

      try {
        localStorage.setItem(storageKey, "1");
      } catch {
        /* ignore storage errors */
      }
      setUnlocked(true);
    } catch {
      setError(t("gate.error"));
    } finally {
      setSubmitting(false);
    }
  }

  // No renderizar nada hasta conocer el estado, o si ya está desbloqueado.
  if (unlocked === null || unlocked) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-dm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-gate-title"
    >
      {/* Fondo del portafolio difuminado */}
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-xl" />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md rounded-2xl border border-card-border bg-card p-7 shadow-2xl"
      >
        <h2
          id="lead-gate-title"
          className="text-2xl font-semibold text-text-main"
        >
          {t("gate.title")}
        </h2>
        <p className="mt-1.5 text-sm text-text-dim">{t("gate.subtitle")}</p>

        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="lead-name"
              className="mb-1.5 block text-sm font-medium text-text-main"
            >
              {t("gate.name_label")}
            </label>
            <input
              id="lead-name"
              type="text"
              required
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t("gate.name_placeholder")}
              className="w-full rounded-lg border border-card-border bg-bg px-4 py-2.5 text-text-main placeholder:text-text-dim/60 outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>

          <div>
            <label
              htmlFor="lead-contact"
              className="mb-1.5 block text-sm font-medium text-text-main"
            >
              {t("gate.contact_label")}
            </label>
            <input
              id="lead-contact"
              type="text"
              required
              inputMode="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder={t("gate.contact_placeholder")}
              className="w-full rounded-lg border border-card-border bg-bg px-4 py-2.5 text-text-main placeholder:text-text-dim/60 outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-lg bg-accent px-4 py-3 font-semibold text-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? t("gate.submitting") : t("gate.submit")}
        </button>

        <p className="mt-3 text-center text-xs text-text-dim">
          {t("gate.privacy")}
        </p>
      </form>
    </div>
  );
}
