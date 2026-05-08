"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useAdmin } from "@/contexts/AdminContext";

const NAV_ITEMS = [{ href: "/admin", labelKey: "nav.dashboard" as const, icon: "◫" }];

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
    </svg>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { t, lang, setLang, sidebarOpen, setSidebarOpen } = useAdmin();

  const sidebarContent = (
    <aside className="w-64 min-h-screen bg-card border-r border-card-border flex flex-col">
      {/* Logo + close button (mobile only) */}
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

      <div className="flex-1" />

      {/* Footer: language toggle + logout */}
      <div className="p-4 border-t border-card-border space-y-1">
        {/* Language selector */}
        <div className="px-4 py-2">
          <p className="text-text-dim text-[10px] font-semibold uppercase tracking-widest mb-2">
            {lang === "es" ? "Idioma" : "Language"}
          </p>
          <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setLang("es")}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                lang === "es"
                  ? "bg-accent text-black"
                  : "text-text-dim hover:text-white"
              }`}
            >
              <GlobeIcon className="w-3.5 h-3.5" />
              ES
            </button>
            <button
              onClick={() => setLang("en")}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                lang === "en"
                  ? "bg-accent text-black"
                  : "text-text-dim hover:text-white"
              }`}
            >
              <GlobeIcon className="w-3.5 h-3.5" />
              EN
            </button>
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-dim hover:text-red-400 hover:bg-red-400/5 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
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
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative sidebar-enter">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
