// src/app/not-found.tsx
// Página 404 personalizada

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "#0A0A0A" }}
    >
      <div className="text-center max-w-md">
        <h1
          className="font-syne font-extrabold text-[8rem] leading-none"
          style={{ color: "#10B981", opacity: 0.15 }}
        >
          404
        </h1>
        <h2 className="font-syne font-extrabold text-2xl text-white -mt-6 mb-4">
          Portafolio no encontrado
        </h2>
        <p className="text-[#888] text-sm mb-8 leading-relaxed">
          Este portafolio no existe o no ha sido publicado todavía.
        </p>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#10B981]/90 text-black font-bold px-6 py-3 rounded-full transition-all text-sm"
        >
          ← Ir al panel
        </Link>
      </div>
    </div>
  );
}
