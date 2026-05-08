"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Lang, getTranslator, TranslationKey } from "@/lib/translations";

// Admin panel is always fixed to this teal brand color (#24FEBF = 36 254 191)
const ADMIN_ACCENT = "36 254 191";
const ADMIN_BG = "10 10 10";
const ADMIN_CARD = "17 17 17";
const ADMIN_CARD_BORDER = "30 30 30";
const ADMIN_TEXT = "229 229 229";
const ADMIN_TEXT_DIM = "136 136 136";

interface AdminContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load persisted language preference
  useEffect(() => {
    const savedLang = localStorage.getItem("admin-lang") as Lang | null;
    if (savedLang === "es" || savedLang === "en") {
      setLangState(savedLang);
    }
  }, []);

  // Lock admin CSS variables to the fixed orange palette (never changes)
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", ADMIN_ACCENT);
    root.style.setProperty("--bg", ADMIN_BG);
    root.style.setProperty("--card", ADMIN_CARD);
    root.style.setProperty("--card-border", ADMIN_CARD_BORDER);
    root.style.setProperty("--text", ADMIN_TEXT);
    root.style.setProperty("--text-dim", ADMIN_TEXT_DIM);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("admin-lang", l);
  };

  const t = getTranslator(lang);

  return (
    <AdminContext.Provider value={{ lang, setLang, t, sidebarOpen, setSidebarOpen }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
