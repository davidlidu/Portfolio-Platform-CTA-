"use client";

import { useEffect } from "react";
import { PALETTES, DEFAULT_PALETTE_ID } from "@/lib/palettes";

interface PortfolioThemeProps {
  paletteId: string;
}

// Applies the portfolio's chosen palette to the CSS variables on mount.
// Restores the default on unmount (relevant when admin navigates to preview).
export default function PortfolioTheme({ paletteId }: PortfolioThemeProps) {
  useEffect(() => {
    const palette =
      PALETTES.find((p) => p.id === paletteId) ??
      PALETTES.find((p) => p.id === DEFAULT_PALETTE_ID)!;

    const root = document.documentElement;
    root.style.setProperty("--accent", palette.accent);
    root.style.setProperty("--bg", palette.bg);
    root.style.setProperty("--card", palette.card);
    root.style.setProperty("--card-border", palette.cardBorder);
    root.style.setProperty("--text", palette.text);
    root.style.setProperty("--text-dim", palette.textDim);

    return () => {
      // Restore defaults when leaving the portfolio page
      const defaultPalette = PALETTES.find((p) => p.id === DEFAULT_PALETTE_ID)!;
      root.style.setProperty("--accent", defaultPalette.accent);
      root.style.setProperty("--bg", defaultPalette.bg);
      root.style.setProperty("--card", defaultPalette.card);
      root.style.setProperty("--card-border", defaultPalette.cardBorder);
      root.style.setProperty("--text", defaultPalette.text);
      root.style.setProperty("--text-dim", defaultPalette.textDim);
    };
  }, [paletteId]);

  return null;
}
