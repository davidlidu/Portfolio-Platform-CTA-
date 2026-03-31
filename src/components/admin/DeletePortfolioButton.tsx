// src/components/admin/DeletePortfolioButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeletePortfolioButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/portfolios/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      }
    } catch {
      alert("Error al eliminar");
    }
    setDeleting(false);
    setConfirming(false);
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-3 py-1.5 text-xs font-medium text-red-400 bg-red-400/10 hover:bg-red-400/20 rounded-lg transition-colors disabled:opacity-50"
        >
          {deleting ? "..." : "Sí, eliminar"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-3 py-1.5 text-xs font-medium text-text-dim hover:text-white rounded-lg transition-colors"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="px-3 py-1.5 text-xs font-medium text-red-400/60 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-colors"
    >
      Eliminar
    </button>
  );
}
