"use client";

// src/components/admin/AcceptInviteForm.tsx
// Formulario para que el invitado cree su contraseña y active su cuenta.

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AcceptInviteFormProps {
  token: string;
  email: string;
  portfolioName: string;
}

export default function AcceptInviteForm({
  token,
  email,
  portfolioName,
}: AcceptInviteFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/invitations/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No se pudo activar la cuenta.");
        setSubmitting(false);
        return;
      }
      setDone(true);
      setTimeout(() => router.push("/admin/login"), 1600);
    } catch {
      setError("Error de conexión.");
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="text-center py-6">
        <h1 className="text-xl font-semibold text-text-main mb-2">
          ¡Cuenta activada!
        </h1>
        <p className="text-text-dim text-sm">Redirigiendo al inicio de sesión…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold text-text-main">Crea tu contraseña</h1>
      <p className="mt-1.5 text-sm text-text-dim">
        Acceso a <strong className="text-text-main">{portfolioName}</strong>
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-main">
            Correo
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full rounded-lg border border-card-border bg-bg/50 px-4 py-2.5 text-text-dim outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-main">
            Contraseña
          </label>
          <input
            type="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres"
            className="w-full rounded-lg border border-card-border bg-bg px-4 py-2.5 text-text-main placeholder:text-text-dim/60 outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-main">
            Confirmar contraseña
          </label>
          <input
            type="password"
            required
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
        {submitting ? "Activando…" : "Activar mi cuenta"}
      </button>
    </form>
  );
}
