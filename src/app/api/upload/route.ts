// src/app/api/upload/route.ts
// POST: subir imagen, retorna URL

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { saveImage } from "@/lib/upload";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó archivo" },
        { status: 400 }
      );
    }

    const url = await saveImage(file, folder);
    return NextResponse.json({ success: true, url });
  } catch (error: any) {
    console.error("Error al subir imagen:", error);
    return NextResponse.json(
      { error: error.message || "Error al subir imagen" },
      { status: 400 }
    );
  }
}
