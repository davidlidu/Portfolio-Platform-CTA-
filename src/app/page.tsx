
// src/app/page.tsx
// Landing page principal TapHub
import type { Metadata } from "next";
import LandingHome from "../components/LandingHome"; // componente separado


export const metadata: Metadata = {
  title: "TapHub — Un toque. Tu mundo completo.",
  description:
    "TapHub convierte cada contacto físico en una oportunidad real. Tu hub digital + tu tarjeta NFC — sin apps, sin fricciones, sin tarjetas que se pierden.",
};

export default function Home() {
  return <LandingHome />;
}
