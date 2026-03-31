// src/components/admin/ImageUploader.tsx
"use client";

import { useState, useRef } from "react";

interface ImageUploaderProps {
  value: string | null;
  onChange: (url: string | null) => void;
  folder: string;
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
  folder,
  label = "Imagen",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validación cliente
    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen excede 5MB");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (res.ok && data.url) {
        onChange(data.url);
      } else {
        setError(data.error || "Error al subir imagen");
      }
    } catch {
      setError("Error de conexión");
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-text-dim text-xs font-semibold uppercase tracking-wider mb-2">
        {label}
      </label>

      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-card-border"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-4 py-2 bg-white/10 text-white text-xs font-medium rounded-lg hover:bg-white/20 transition-colors"
            >
              Cambiar
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="px-4 py-2 bg-red-500/20 text-red-400 text-xs font-medium rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-48 border-2 border-dashed border-card-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-accent/50 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <span className="text-text-dim text-sm">Subiendo...</span>
          ) : (
            <>
              <span className="text-2xl text-text-dim">📷</span>
              <span className="text-text-dim text-sm">Click para subir imagen</span>
              <span className="text-text-dim/50 text-xs">JPG, PNG, WebP, GIF — Máx 5MB</span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleUpload}
        className="hidden"
      />

      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
}
