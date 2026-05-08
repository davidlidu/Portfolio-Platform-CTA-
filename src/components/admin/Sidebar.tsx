"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useAdmin } from "@/contexts/AdminContext";
import { PALETTES } from "@/lib/palettes";

const NAV_ITEMS = [{ href: "/admin", labelKey: "nav.dashboard" as const, icon: "◫" }];

export default function Sidebar() {
  const pathname = usePathname();
  const { t, lang, setLang, palette, setPalette, sidebarOpen, setSidebarOpen } = useAdmin();
  const [paletteExpanded, setPaletteExpanded] = useState(false);

  const sidebarContent = (
    <aside className="w-64 min-h-screen bg-card border-r border-card-border flex flex-col">
      {/* Logo + close button (mobile) */}
      <div className="p-6 border-b border-card-border flex items-center justify-between">
        <Link href="/admin" onClick={() => setSidebarOpen(false)}>
          <h1 className="font-syne font-extrabold text-xl text-white">
            <span className="text-accent">CTA</span>+ Admin
          </h1>
        </Link>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden p-1.5 rounded-lg text-text-dim hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Cerrar menú"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-text-dim hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Palette picker */}
      <div className="px-4 pb-2">
        <button
          onClick={() => setPaletteExpanded((v) => !v)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-dim hover:text-white hover:bg-white/5 transition-colors"
        >
          <span
            className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0"
            style={{ backgroundColor: palette.preview }}
          />
          <span className="flex-1 text-left truncate">{t("nav.palette_btn")}</span>
          <svg
            className={`w-4 h-4 flex-shrink-0 transition-transform ${paletteExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {paletteExpanded && (
          <div className="mt-2 mb-1 px-1">
            <p className="text-text-dim text-xs font-semibold uppercase tracking-wider mb-3 px-3">
              {t("nav.palette_title")}
            </p>
            <div className="grid grid-cols-5 gap-2 px-1">
              {PALETTES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPalette(p.id)}
                  title={lang === "en" ? p.nameEn : p.name}
                  className={`group relative w-full aspect-square rounded-lg border-2 transition-all ${
                    palette.id === p.id
                      ? "border-white scale-110 shadow-lg"
                      : "border-transparent hover:border-white/40 hover:scale-105"
                  }`}
                  style={{ backgroundColor: p.preview }}
                >
                  {palette.id === p.id && (
                    <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold drop-shadow">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
            <p className="text-center text-text-dim text-xs mt-3 px-2">
              {lang === "en" ? palette.nameEn : palette.name}
            </p>
          </div>
        )}
      </div>

      {/* Footer: language toggle + logout */}
      <div className="p-4 border-t border-card-border space-y-1">
        {/* Language toggle */}
        <button
          onClick={() => setLang(lang === "es" ? "en" : "es")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-dim hover:text-white hover:bg-white/5 transition-colors"
        >
          <span className="text-base">🌐</span>
          {t("nav.language_toggle")}
        </button>

        {/* Sign out */}
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-dim hover:text-red-400 hover:bg-red-400/5 transition-colors"
        >
          <span>↩</span>
          {t("nav.logout")}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop: always visible */}
      <div className="hidden md:block sticky top-0 h-screen overflow-y-auto flex-shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile: slide-over overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar panel */}
          <div className="relative sidebar-enter">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
