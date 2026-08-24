"use client";

// src/components/admin/InsightsPanel.tsx
// Analítica de aperturas + gestión de tarjetas NFC de un portafolio.

import { useCallback, useEffect, useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";

interface PerCard {
  id: string;
  label: string;
  isActive: boolean;
  createdAt: string;
  opens: number;
  leads: number;
}

interface Analytics {
  totalOpens: number;
  nfcOpens: number;
  uniqueVisitors: number;
  totalLeads: number;
  conversion: number;
  byDay: { date: string; count: number }[];
  byDevice: Record<string, number>;
  perCard: PerCard[];
}

interface InsightsPanelProps {
  portfolioId: string;
}

export default function InsightsPanel({ portfolioId }: InsightsPanelProps) {
  const { t } = useAdmin();
  const [data, setData] = useState<Analytics | null>(null);
  const [error, setError] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [creating, setCreating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const load = useCallback(async () => {
    setError("");
    try {
      const res = await fetch(`/api/portfolios/${portfolioId}/visit`);
      if (!res.ok) throw new Error("request-failed");
      const json = await res.json();
      setData(json.data as Analytics);
    } catch {
      setError(t("insights.error"));
    }
  }, [portfolioId, t]);

  useEffect(() => {
    load();
  }, [load]);

  const createCard = async () => {
    setCreating(true);
    try {
      const res = await fetch(`/api/portfolios/${portfolioId}/cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: newLabel.trim() }),
      });
      if (!res.ok) throw new Error("request-failed");
      setNewLabel("");
      await load();
    } catch {
      setError(t("insights.error"));
    } finally {
      setCreating(false);
    }
  };

  const toggleCard = async (card: PerCard) => {
    await fetch(`/api/portfolios/${portfolioId}/cards/${card.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !card.isActive }),
    });
    await load();
  };

  const deleteCard = async (card: PerCard) => {
    if (!confirm(t("insights.card_delete_confirm"))) return;
    await fetch(`/api/portfolios/${portfolioId}/cards/${card.id}`, {
      method: "DELETE",
    });
    await load();
  };

  const copyUrl = async (id: string) => {
    const url = `${origin}/t/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 2000);
    } catch {
      /* ignore clipboard errors */
    }
  };

  if (error && !data) {
    return <p className="text-red-400 text-sm py-8 text-center">{error}</p>;
  }
  if (!data) {
    return (
      <p className="text-text-dim text-sm text-center py-8">
        {t("insights.loading")}
      </p>
    );
  }

  const maxDay = Math.max(1, ...data.byDay.map((d) => d.count));
  const deviceEntries = Object.entries(data.byDevice).sort((a, b) => b[1] - a[1]);
  const totalDevice = deviceEntries.reduce((s, [, n]) => s + n, 0);

  const stats: { label: string; value: string }[] = [
    { label: t("insights.opens"), value: String(data.totalOpens) },
    { label: t("insights.nfc_opens"), value: String(data.nfcOpens) },
    { label: t("insights.unique"), value: String(data.uniqueVisitors) },
    { label: t("insights.leads"), value: String(data.totalLeads) },
    {
      label: t("insights.conversion"),
      value: `${Math.round(data.conversion * 100)}%`,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={load}
          className="px-3 py-1.5 text-xs text-text-dim hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
        >
          {t("insights.refresh")}
        </button>
      </div>

      {/* Tarjetas de métricas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-card border border-card-border rounded-xl p-4"
          >
            <p className="text-2xl font-syne font-extrabold text-white">
              {s.value}
            </p>
            <p className="text-text-dim text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Aperturas por día */}
      <div>
        <p className="text-sm font-medium text-text-main mb-3">
          {t("insights.by_day")}
        </p>
        <div className="flex items-end gap-0.5 h-28 bg-card border border-card-border rounded-xl p-3">
          {data.byDay.map((d) => (
            <div
              key={d.date}
              className="flex-1 group relative flex items-end h-full"
              title={`${d.date}: ${d.count}`}
            >
              <div
                className="w-full rounded-t bg-accent/70 group-hover:bg-accent transition-colors"
                style={{ height: `${(d.count / maxDay) * 100}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dispositivos */}
      <div>
        <p className="text-sm font-medium text-text-main mb-3">
          {t("insights.by_device")}
        </p>
        {totalDevice === 0 ? (
          <p className="text-text-dim text-sm">{t("insights.no_device")}</p>
        ) : (
          <div className="space-y-2">
            {deviceEntries.map(([device, n]) => (
              <div key={device} className="flex items-center gap-3 text-sm">
                <span className="w-20 text-text-dim capitalize">{device}</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent/70 rounded-full"
                    style={{ width: `${(n / totalDevice) * 100}%` }}
                  />
                </div>
                <span className="w-10 text-right text-text-main">{n}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gestión de tarjetas NFC */}
      <div className="border-t border-card-border pt-6">
        <p className="text-sm font-medium text-text-main">
          {t("insights.cards_title")}
        </p>
        <p className="text-text-dim text-xs mt-1 mb-4">
          {t("insights.cards_hint")}
        </p>

        <div className="flex gap-2 mb-4">
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder={t("insights.card_label_ph")}
            className="flex-1 rounded-lg border border-card-border bg-bg px-3 py-2 text-sm text-text-main placeholder:text-text-dim/60 outline-none focus:border-accent"
          />
          <button
            type="button"
            onClick={createCard}
            disabled={creating}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-accent text-black hover:bg-accent/90 disabled:opacity-60 whitespace-nowrap"
          >
            {t("insights.card_create")}
          </button>
        </div>

        {data.perCard.length === 0 ? (
          <p className="text-text-dim text-sm text-center py-6">
            {t("insights.card_empty")}
          </p>
        ) : (
          <div className="space-y-2">
            {data.perCard.map((card) => (
              <div
                key={card.id}
                className="bg-card border border-card-border rounded-xl p-3 flex flex-col md:flex-row md:items-center gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium truncate">
                      {card.label || card.id.slice(0, 8)}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        card.isActive
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-white/10 text-text-dim"
                      }`}
                    >
                      {card.isActive
                        ? t("insights.card_active")
                        : t("insights.card_inactive")}
                    </span>
                  </div>
                  <p className="text-text-dim text-xs mt-0.5 truncate font-mono">
                    {origin}/t/{card.id}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-text-dim">
                  <span>
                    {card.opens}{" "}
                    <span className="opacity-60">{t("insights.col_opens")}</span>
                  </span>
                  <span>
                    {card.leads}{" "}
                    <span className="opacity-60">{t("insights.col_leads")}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyUrl(card.id)}
                    className="px-2.5 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-white/10 text-text-main transition-colors whitespace-nowrap"
                  >
                    {copiedId === card.id
                      ? t("insights.card_copied")
                      : t("insights.card_copy")}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCard(card)}
                    className={`relative w-9 h-5 rounded-full transition-colors ${
                      card.isActive ? "bg-accent" : "bg-[#2A2A2A]"
                    }`}
                    aria-label="toggle"
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        card.isActive ? "translate-x-4" : ""
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteCard(card)}
                    className="px-2 py-1.5 text-xs rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    {t("insights.card_delete")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
