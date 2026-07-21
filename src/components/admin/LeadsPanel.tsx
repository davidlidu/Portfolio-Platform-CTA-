"use client";

// src/components/admin/LeadsPanel.tsx
// Lista los leads capturados por el formulario de acceso de un portafolio.

import { useEffect, useState, useCallback } from "react";
import { useAdmin } from "@/contexts/AdminContext";

interface Lead {
  id: string;
  fullName: string;
  contact: string;
  email: string | null;
  phone: string | null;
  contactType: string;
  createdAt: string;
}

interface LeadsPanelProps {
  portfolioId: string;
}

const TYPE_STYLES: Record<string, string> = {
  email: "bg-blue-500/15 text-blue-400",
  phone: "bg-emerald-500/15 text-emerald-400",
  unknown: "bg-white/10 text-text-dim",
};

export default function LeadsPanel({ portfolioId }: LeadsPanelProps) {
  const { t } = useAdmin();
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    try {
      const res = await fetch(`/api/portfolios/${portfolioId}/leads`);
      if (!res.ok) throw new Error("request-failed");
      const json = await res.json();
      setLeads(json.data as Lead[]);
    } catch {
      setError(t("leads.error"));
    }
  }, [portfolioId, t]);

  useEffect(() => {
    load();
  }, [load]);

  const typeLabel = (type: string) =>
    type === "email"
      ? t("leads.type.email")
      : type === "phone"
        ? t("leads.type.phone")
        : t("leads.type.unknown");

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-text-dim text-sm">
          {leads ? `${leads.length} ${t("leads.count")}` : ""}
        </p>
        <button
          type="button"
          onClick={load}
          className="px-3 py-1.5 text-xs text-text-dim hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
        >
          {t("leads.refresh")}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {leads === null && !error && (
        <p className="text-text-dim text-sm text-center py-8">
          {t("leads.loading")}
        </p>
      )}

      {leads && leads.length === 0 && (
        <p className="text-text-dim text-sm text-center py-8">
          {t("leads.empty")}
        </p>
      )}

      {leads && leads.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-text-dim border-b border-card-border">
                <th className="py-2 pr-4 font-medium">{t("leads.col.name")}</th>
                <th className="py-2 pr-4 font-medium">
                  {t("leads.col.contact")}
                </th>
                <th className="py-2 pr-4 font-medium">{t("leads.col.type")}</th>
                <th className="py-2 font-medium">{t("leads.col.date")}</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-card-border/50 last:border-0"
                >
                  <td className="py-3 pr-4 text-white">{lead.fullName}</td>
                  <td className="py-3 pr-4 text-text-dim">
                    {lead.email || lead.phone || lead.contact}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs ${TYPE_STYLES[lead.contactType] ?? TYPE_STYLES.unknown
                        }`}
                    >
                      {typeLabel(lead.contactType)}
                    </span>
                  </td>
                  <td className="py-3 text-text-dim whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
