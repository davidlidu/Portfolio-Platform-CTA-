"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { PALETTES, ColorPalette, DEFAULT_PALETTE_ID } from "@/lib/palettes";
import { Lang, getTranslator, TranslationKey } from "@/lib/translations";

interface AdminContextValue {
  palette: ColorPalette;
  setPalette: (id: string) => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [paletteId, setPaletteId] = useState(DEFAULT_PALETTE_ID);
  const [lang, setLangState] = useState<Lang>("es");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const palette = PALETTES.find((p) => p.id === paletteId) ?? PALETTES[0];

  // Load persisted preferences on mount
  useEffect(() => {
    const savedPalette = localStorage.getItem("admin-palette");
    const savedLang = localStorage.getItem("admin-lang") as Lang | null;
    if (savedPalette && PALETTES.find((p) => p.id === savedPalette)) {
      setPaletteId(savedPalette);
    }
    if (savedLang === "es" || savedLang === "en") {
      setLangState(savedLang);
    }
  }, []);

  // Apply palette to CSS variables whenever it changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", palette.accent);
    root.style.setProperty("--bg", palette.bg);
    root.style.setProperty("--card", palette.card);
    root.style.setProperty("--card-border", palette.cardBorder);
    root.style.setProperty("--text", palette.text);
    root.style.setProperty("--text-dim", palette.textDim);
  }, [palette]);

  const setPalette = (id: string) => {
    setPaletteId(id);
    localStorage.setItem("admin-palette", id);
  };

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("admin-lang", l);
  };

  const t = getTranslator(lang);

  return (
    <AdminContext.Provider
      value={{ palette, setPalette, lang, setLang, t, sidebarOpen, setSidebarOpen }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
