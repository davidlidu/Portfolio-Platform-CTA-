"use client";

// src/components/admin/UsersPanel.tsx
// Gestión de usuarios con acceso a un portafolio (solo admin global).

import { useCallback, useEffect, useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";

interface PortfolioUser {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
  status: "active" | "pending";
}

interface UsersPanelProps {
  portfolioId: string;
}

export default function UsersPanel({ portfolioId }: UsersPanelProps) {
  const { t } = useAdmin();
  const [users, setUsers] = useState<PortfolioUser[] | null>(null);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [manualLink, setManualLink] = useState("");
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    setError("");
    try {
      const res = await fetch(`/api/portfolios/${portfolioId}/users`);
      if (!res.ok) throw new Error("request-failed");
      const json = await res.json();
      setUsers(json.data as PortfolioUser[]);
    } catch {
      setError(t("users.error"));
    }
  }, [portfolioId, t]);

  useEffect(() => {
    load();
  }, [load]);

  const invite = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setNotice("");
    setManualLink("");
    try {
      const res = await fetch(`/api/portfolios/${portfolioId}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t("users.error"));
        return;
      }
      setEmail("");
      setName("");
      if (data.emailed) {
        setNotice(t("users.emailed"));
      } else if (data.inviteUrl) {
        setManualLink(data.inviteUrl);
      }
      await load();
    } catch {
      setError(t("users.error"));
    } finally {
      setSubmitting(false);
    }
  };

  const resend = async (id: string) => {
    setNotice("");
    setManualLink("");
    const res = await fetch(`/api/portfolios/${portfolioId}/users/${id}`, {
      method: "POST",
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      if (data.emailed) setNotice(t("users.emailed"));
      else if (data.inviteUrl) setManualLink(data.inviteUrl);
    }
  };

  const remove = async (id: string) => {
    if (!confirm(t("users.delete_confirm"))) return;
    await fetch(`/api/portfolios/${portfolioId}/users/${id}`, {
      method: "DELETE",
    });
    await load();
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(manualLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div>
      <p className="text-text-dim text-xs mb-4">{t("users.hint")}</p>

      {/* Formulario de invitación */}
      <form onSubmit={invite} className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("users.invite_email")}
          className="flex-1 rounded-lg border border-card-border bg-bg px-3 py-2 text-sm text-text-main placeholder:text-text-dim/60 outline-none focus:border-accent"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("users.invite_name")}
          className="flex-1 rounded-lg border border-card-border bg-bg px-3 py-2 text-sm text-text-main placeholder:text-text-dim/60 outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-accent text-black hover:bg-accent/90 disabled:opacity-60 whitespace-nowrap"
        >
          {t("users.invite_btn")}
        </button>
      </form>

      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
      {notice && <p className="text-accent text-sm mb-3">{notice}</p>}
      {manualLink && (
        <div className="mb-4 rounded-lg border border-card-border bg-bg p-3">
          <p className="text-text-dim text-xs mb-2">{t("users.link_manual")}</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs text-accent break-all">
              {manualLink}
            </code>
            <button
              type="button"
              onClick={copyLink}
              className="px-2.5 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-white/10 text-text-main whitespace-nowrap"
            >
              {copied ? t("users.copied") : t("users.copy")}
            </button>
          </div>
        </div>
      )}

      {/* Lista de usuarios */}
      {users === null && !error && (
        <p className="text-text-dim text-sm text-center py-8">
          {t("users.loading")}
        </p>
      )}
      {users && users.length === 0 && (
        <p className="text-text-dim text-sm text-center py-8">
          {t("users.empty")}
        </p>
      )}
      {users && users.length > 0 && (
        <div className="space-y-2">
          {users.map((u) => (
            <div
              key={u.id}
              className="bg-card border border-card-border rounded-xl p-3 flex items-center gap-3"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-medium truncate">
                    {u.name || u.email}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      u.status === "active"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-yellow-500/15 text-yellow-500"
                    }`}
                  >
                    {u.status === "active"
                      ? t("users.status_active")
                      : t("users.status_pending")}
                  </span>
                </div>
                {u.name && (
                  <p className="text-text-dim text-xs mt-0.5 truncate">
                    {u.email}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {u.status === "pending" && (
                  <button
                    type="button"
                    onClick={() => resend(u.id)}
                    className="px-2.5 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-white/10 text-text-main whitespace-nowrap"
                  >
                    {t("users.resend")}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(u.id)}
                  className="px-2 py-1.5 text-xs rounded-lg text-red-400 hover:bg-red-500/10"
                >
                  {t("users.delete")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
