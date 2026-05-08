"use client";

import Link from "next/link";
import { useAdmin } from "@/contexts/AdminContext";
import TapHubLogo from "@/components/admin/TapHubLogo";

export default function MobileTopBar() {
  const { setSidebarOpen } = useAdmin();

  return (
    <div className="md:hidden flex items-center justify-between px-4 py-3 bg-card border-b border-card-border">
      <button
        onClick={() => setSidebarOpen(true)}
        className="p-2 rounded-lg text-text-dim hover:text-white hover:bg-white/5 transition-colors"
        aria-label="Abrir menú"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <Link href="/admin">
        <TapHubLogo className="h-7 w-auto" />
      </Link>

      <div className="w-9" />
    </div>
  );
}
