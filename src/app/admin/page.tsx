// src/app/admin/page.tsx
// Dashboard principal: lista de portafolios

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeletePortfolioButton from "@/components/admin/DeletePortfolioButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const portfolios = await prisma.portfolio.findMany({
    include: { projects: { select: { id: true } } },
    orderBy: { createdAt: "desc" },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-syne font-extrabold text-2xl text-white">
            Portafolios
          </h1>
          <p className="text-text-dim text-sm mt-1">
            {portfolios.length} portafolio{portfolios.length !== 1 ? "s" : ""} creado{portfolios.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/portfolios/new"
          className="bg-accent hover:bg-accent/90 text-black font-bold px-6 py-3 rounded-lg transition-all text-sm"
        >
          + Crear nuevo
        </Link>
      </div>

      {/* Tabla de portafolios */}
      {portfolios.length === 0 ? (
        <div className="bg-card border border-card-border rounded-2xl p-12 text-center">
          <p className="text-text-dim text-lg mb-4">
            No hay portafolios creados aún
          </p>
          <Link
            href="/admin/portfolios/new"
            className="text-accent hover:underline text-sm"
          >
            Crear el primero →
          </Link>
        </div>
      ) : (
        <div className="bg-card border border-card-border rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left px-6 py-4 text-text-dim text-xs font-semibold uppercase tracking-wider">
                  Nombre
                </th>
                <th className="text-left px-6 py-4 text-text-dim text-xs font-semibold uppercase tracking-wider">
                  Slug / URL
                </th>
                <th className="text-center px-6 py-4 text-text-dim text-xs font-semibold uppercase tracking-wider">
                  Proyectos
                </th>
                <th className="text-center px-6 py-4 text-text-dim text-xs font-semibold uppercase tracking-wider">
                  Estado
                </th>
                <th className="text-right px-6 py-4 text-text-dim text-xs font-semibold uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {portfolios.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-card-border last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-white font-medium text-sm">
                      {p.heroName.replace(/\n/g, " ")}
                    </p>
                    <p className="text-text-dim text-xs mt-0.5">{p.heroRole.replace(/\n/g, " · ")}</p>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`${baseUrl}/${p.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent text-sm hover:underline"
                    >
                      /{p.slug}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-text-dim text-sm">
                      {p.projects.length}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        p.isPublished
                          ? "bg-accent/10 text-accent"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          p.isPublished ? "bg-accent" : "bg-yellow-500"
                        }`}
                      />
                      {p.isPublished ? "Publicado" : "Borrador"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/portfolios/${p.id}`}
                        className="px-3 py-1.5 text-xs font-medium text-text-dim hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        Editar
                      </Link>
                      <DeletePortfolioButton id={p.id} name={p.heroName.replace(/\n/g, " ")} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
