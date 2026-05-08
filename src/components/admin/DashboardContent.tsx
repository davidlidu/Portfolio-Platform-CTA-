"use client";

import Link from "next/link";
import { useAdmin } from "@/contexts/AdminContext";
import DeletePortfolioButton from "./DeletePortfolioButton";

interface Portfolio {
  id: string;
  heroName: string;
  heroRole: string;
  slug: string;
  isPublished: boolean;
  projects: { id: string }[];
}

interface DashboardContentProps {
  portfolios: Portfolio[];
  baseUrl: string;
}

export default function DashboardContent({ portfolios, baseUrl }: DashboardContentProps) {
  const { t } = useAdmin();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="font-syne font-extrabold text-xl md:text-2xl text-white">
            {t("dash.title")}
          </h1>
          <p className="text-text-dim text-sm mt-1">
            {portfolios.length}{" "}
            {portfolios.length === 1 ? t("dash.count_one") : t("dash.count_many")}
          </p>
        </div>
        <Link
          href="/admin/portfolios/new"
          className="flex-shrink-0 bg-accent hover:bg-accent/90 text-black font-bold px-4 md:px-6 py-2.5 md:py-3 rounded-lg transition-all text-sm"
        >
          {t("dash.create")}
        </Link>
      </div>

      {/* Portfolio list */}
      {portfolios.length === 0 ? (
        <div className="bg-card border border-card-border rounded-2xl p-12 text-center">
          <p className="text-text-dim text-lg mb-4">{t("dash.empty")}</p>
          <Link href="/admin/portfolios/new" className="text-accent hover:underline text-sm">
            {t("dash.create_first")}
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-card border border-card-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left px-6 py-4 text-text-dim text-xs font-semibold uppercase tracking-wider">
                      {t("dash.col.name")}
                    </th>
                    <th className="text-left px-6 py-4 text-text-dim text-xs font-semibold uppercase tracking-wider">
                      {t("dash.col.slug")}
                    </th>
                    <th className="text-center px-6 py-4 text-text-dim text-xs font-semibold uppercase tracking-wider">
                      {t("dash.col.projects")}
                    </th>
                    <th className="text-center px-6 py-4 text-text-dim text-xs font-semibold uppercase tracking-wider">
                      {t("dash.col.status")}
                    </th>
                    <th className="text-right px-6 py-4 text-text-dim text-xs font-semibold uppercase tracking-wider">
                      {t("dash.col.actions")}
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
                        <p className="text-text-dim text-xs mt-0.5">
                          {p.heroRole.replace(/\n/g, " · ")}
                        </p>
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
                        <span className="text-text-dim text-sm">{p.projects.length}</span>
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
                          {p.isPublished ? t("dash.status.published") : t("dash.status.draft")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/portfolios/${p.id}`}
                            className="px-3 py-1.5 text-xs font-medium text-text-dim hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            {t("dash.action.edit")}
                          </Link>
                          <DeletePortfolioButton
                            id={p.id}
                            name={p.heroName.replace(/\n/g, " ")}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {portfolios.map((p) => (
              <div
                key={p.id}
                className="bg-card border border-card-border rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <p className="text-white font-medium text-sm leading-tight">
                      {p.heroName.replace(/\n/g, " ")}
                    </p>
                    <p className="text-text-dim text-xs mt-0.5 truncate">
                      {p.heroRole.replace(/\n/g, " · ")}
                    </p>
                  </div>
                  <span
                    className={`flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
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
                    {p.isPublished ? t("dash.status.published") : t("dash.status.draft")}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <a
                    href={`${baseUrl}/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent text-xs hover:underline truncate max-w-[160px]"
                  >
                    /{p.slug}
                  </a>
                  <span className="text-text-dim text-xs">
                    {p.projects.length} {t("dash.col.projects").toLowerCase()}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-card-border">
                  <Link
                    href={`/admin/portfolios/${p.id}`}
                    className="flex-1 text-center px-3 py-2 text-xs font-medium text-text-dim hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {t("dash.action.edit")}
                  </Link>
                  <DeletePortfolioButton
                    id={p.id}
                    name={p.heroName.replace(/\n/g, " ")}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
