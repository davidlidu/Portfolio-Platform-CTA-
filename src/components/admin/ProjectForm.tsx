// src/components/admin/ProjectForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@prisma/client";
import ImageUploader from "./ImageUploader";
import MultiImageUploader from "./MultiImageUploader";
import TagInput from "./TagInput";

interface ProjectFormProps {
  portfolioId: string;
  portfolioSlug: string;
  project?: Project;
  isNew?: boolean;
}

export default function ProjectForm({
  portfolioId,
  portfolioSlug,
  project,
  isNew = false,
}: ProjectFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: project?.title || "",
    description: project?.description || "",
    tags: project?.tags || ([] as string[]),
    thumbnailUrl: project?.thumbnailUrl || (null as string | null),
    images: project?.images || ([] as string[]),
    order: project?.order || 0,
  });

  const updateForm = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setError("");
    setSaving(true);

    try {
      const url = isNew
        ? `/api/portfolios/${portfolioId}/projects`
        : `/api/portfolios/${portfolioId}/projects/${project?.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al guardar");
        setSaving(false);
        return;
      }

      router.push(`/admin/portfolios/${portfolioId}`);
      router.refresh();
    } catch {
      setError("Error de conexión");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!project?.id) return;
    if (!confirm("¿Eliminar este proyecto?")) return;

    try {
      await fetch(`/api/portfolios/${portfolioId}/projects/${project.id}`, {
        method: "DELETE",
      });
      router.push(`/admin/portfolios/${portfolioId}`);
      router.refresh();
    } catch {
      setError("Error al eliminar");
    }
  };

  const inputClass =
    "w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-text-main text-sm outline-none focus:border-accent transition-colors";
  const labelClass =
    "block text-text-dim text-xs font-semibold uppercase tracking-wider mb-2";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={() => router.push(`/admin/portfolios/${portfolioId}`)}
            className="text-text-dim hover:text-white text-sm mb-2 inline-block"
          >
            ← Volver al portafolio
          </button>
          <h1 className="font-syne font-extrabold text-2xl text-white">
            {isNew ? "Nuevo proyecto" : "Editar proyecto"}
          </h1>
        </div>
        {!isNew && (
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            Eliminar
          </button>
        )}
      </div>

      <div className="bg-card border border-card-border rounded-2xl p-8 space-y-6 max-w-2xl">
        <div>
          <label className={labelClass}>Título del proyecto</label>
          <input
            value={form.title}
            onChange={(e) => updateForm("title", e.target.value)}
            className={inputClass}
            placeholder="Plataforma de Automatización..."
          />
        </div>

        <div>
          <label className={labelClass}>Descripción</label>
          <textarea
            rows={5}
            value={form.description}
            onChange={(e) => updateForm("description", e.target.value)}
            className={inputClass}
            placeholder="Descripción detallada del proyecto..."
          />
        </div>

        <TagInput
          values={form.tags}
          onChange={(tags) => updateForm("tags", tags)}
          label="Tags"
          placeholder="AI, E-commerce..."
        />

        <div>
          <label className={labelClass}>Orden</label>
          <input
            type="number"
            value={form.order}
            onChange={(e) => updateForm("order", parseInt(e.target.value) || 0)}
            className={`${inputClass} max-w-[120px]`}
          />
        </div>

        <ImageUploader
          value={form.thumbnailUrl}
          onChange={(url) => updateForm("thumbnailUrl", url)}
          folder={`${portfolioSlug}/projects`}
          label="Thumbnail principal"
        />

        <MultiImageUploader
          values={form.images}
          onChange={(urls) => updateForm("images", urls)}
          folder={`${portfolioSlug}/projects`}
          label="Galería de imágenes"
        />
      </div>

      {/* Footer con acciones */}
      <div className="sticky bottom-0 bg-bg border-t border-card-border -mx-8 px-8 py-4 flex items-center justify-between mt-6">
        <div>{error && <p className="text-red-400 text-sm">{error}</p>}</div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push(`/admin/portfolios/${portfolioId}`)}
            className="px-6 py-2.5 text-sm text-text-dim hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-accent hover:bg-accent/90 text-black font-bold px-8 py-2.5 rounded-lg transition-all text-sm disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar proyecto"}
          </button>
        </div>
      </div>
    </div>
  );
}
