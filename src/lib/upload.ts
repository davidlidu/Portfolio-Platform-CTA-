// src/lib/upload.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024;

export async function saveImage(file: File, folder: string): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(`Tipo no permitido: ${file.type}`);
  }
  if (file.size > MAX_SIZE) {
    throw new Error("La imagen excede 5MB.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: `portfolio/${folder}` }, (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      })
      .end(buffer);
  });
}

export async function deleteImage(imageUrl: string): Promise<void> {
  if (!imageUrl || !imageUrl.includes("cloudinary.com")) return;
  // Extraer public_id de la URL
  const parts = imageUrl.split("/");
  const file = parts[parts.length - 1].split(".")[0];
  const folder = parts[parts.length - 2];
  await cloudinary.uploader.destroy(`${folder}/${file}`);
}