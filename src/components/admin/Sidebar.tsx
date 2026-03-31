// src/components/admin/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "◫" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-card-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-card-border">
        <Link href="/admin">
          <h1 className="font-syne font-extrabold text-xl text-white">
            <span className="text-accent">CTA</span>+ Admin
          </h1>
        </Link>
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-text-dim hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer del sidebar */}
      <div className="p-4 border-t border-card-border">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-dim hover:text-red-400 hover:bg-red-400/5 transition-colors"
        >
          <span>↩</span>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
