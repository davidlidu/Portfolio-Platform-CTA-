// src/components/admin/MultiImageUploader.tsx
"use client";

import { useState, useRef } from "react";

interface MultiImageUploaderProps {
  values: string[];
  onChange: (urls: string[]) => void;
  folder: string;
  label?: string;
}

export default function MultiImageUploader({
  values,
  onChange,
  folder,
  label = "Galería de imágenes",
}: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError("");
    setUploading(true);

    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name} excede 5MB, se omitió`);
        continue;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();

        if (res.ok && data.url) {
          newUrls.push(data.url);
        }
      } catch {
        setError("Error al subir algunas imágenes");
      }
    }

    onChange([...values, ...newUrls]);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= values.length) return;
    const newValues = [...values];
    const [item] = newValues.splice(from, 1);
    newValues.splice(to, 0, item);
    onChange(newValues);
  };

  return (
    <div>
      <label className="block text-text-dim text-xs font-semibold uppercase tracking-wider mb-2">
        {label}
      </label>

      {/* Grid de imágenes existentes */}
      {values.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-3">
          {values.map((url, i) => (
            <div key={`${url}-${i}`} className="relative group aspect-square">
              <img
                src={url}
                alt={`Imagen ${i + 1}`}
                className="w-full h-full object-cover rounded-lg border border-card-border"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(i, i - 1)}
                    className="w-7 h-7 bg-white/10 text-white text-xs rounded hover:bg-white/20 transition-colors"
                  >
                    ←
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="w-7 h-7 bg-red-500/30 text-red-400 text-xs rounded hover:bg-red-500/40 transition-colors"
                >
                  ✕
                </button>
                {i < values.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(i, i + 1)}
                    className="w-7 h-7 bg-white/10 text-white text-xs rounded hover:bg-white/20 transition-colors"
                  >
                    →
                  </button>
                )}
              </div>
              {i === 0 && (
                <span className="absolute top-1 left-1 bg-accent/80 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                  Principal
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Botón para agregar */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full py-4 border-2 border-dashed border-card-border rounded-lg flex items-center justify-center gap-2 hover:border-accent/50 transition-colors disabled:opacity-50 text-text-dim text-sm"
      >
        {uploading ? "Subiendo..." : "+ Agregar imágenes"}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        onChange={handleUpload}
        className="hidden"
      />

      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
}
