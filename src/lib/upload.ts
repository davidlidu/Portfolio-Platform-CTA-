// src/lib/upload.ts
// Manejo de uploads de imágenes al sistema de archivos local

import fs from "fs/promises";
import path from "path";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function saveImage(
  file: File,
  folder: string
): Promise<string> {
  // Validar tipo
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(
      `Tipo de archivo no permitido: ${file.type}. Usa JPG, PNG, WebP o GIF.`
    );
  }

  // Validar tamaño
  if (file.size > MAX_SIZE) {
    throw new Error("La imagen excede el tamaño máximo de 5MB.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  // Nombre único: timestamp + nombre sanitizado
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase();
  const filename = `${Date.now()}-${safeName}`;
  const dir = path.join(process.cwd(), "public", "uploads", folder);

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), buffer);

  return `/uploads/${folder}/${filename}`;
}

export async function deleteImage(imageUrl: string): Promise<void> {
  if (!imageUrl || !imageUrl.startsWith("/uploads/")) return;

  const filePath = path.join(process.cwd(), "public", imageUrl);
  try {
    await fs.unlink(filePath);
  } catch {
    // Archivo ya no existe, ignorar
  }
}
