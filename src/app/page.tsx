// src/app/page.tsx
// Página principal - redirige al admin o muestra landing
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/admin");
}
