/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#10B981",
        "accent-dim": "rgba(16,185,129,0.15)",
        bg: "#0A0A0A",
        card: "#111111",
        "card-border": "#1E1E1E",
        "text-main": "#E5E5E5",
        "text-dim": "#888888",
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
