/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dynamic colors via CSS variables (RGB channel format for opacity support)
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-dim": "rgb(var(--accent) / 0.15)",
        bg: "rgb(var(--bg) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        "card-border": "rgb(var(--card-border) / <alpha-value>)",
        "text-main": "rgb(var(--text) / <alpha-value>)",
        "text-dim": "rgb(var(--text-dim) / <alpha-value>)",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        playfair: ["Playfair Display", "Georgia", "serif"],
        dm: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
