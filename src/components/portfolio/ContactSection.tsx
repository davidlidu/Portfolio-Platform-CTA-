// src/components/portfolio/ContactSection.tsx
"use client";

import { motion } from "framer-motion";
import type { Social } from "@/types";

interface ContactSectionProps {
  label: string;
  title: string;
  description: string;
  cta1Label: string;
  cta2Label: string;
  whatsappUrl: string;
  // Para generar vCard
  fullName: string;
  whatsappNumber: string | null;
  socials: Social[];
}

// Generar y descargar archivo vCard (.vcf)
function downloadVCard(
  name: string,
  phone: string | null,
  socials: Social[]
) {
  const nameParts = name.replace(/\n/g, " ").trim().split(/\s+/);
  const lastName = nameParts.pop() || "";
  const firstName = nameParts.join(" ");

  let vcard = `BEGIN:VCARD\nVERSION:3.0\n`;
  vcard += `FN:${name.replace(/\n/g, " ")}\n`;
  vcard += `N:${lastName};${firstName};;;\n`;

  if (phone) {
    vcard += `TEL;TYPE=CELL:+${phone}\n`;
  }

  socials.forEach((s) => {
    if (s.url) {
      vcard += `URL;TYPE=${s.label}:${s.url}\n`;
    }
  });

  vcard += `END:VCARD`;

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name.replace(/\n/g, "-").replace(/\s+/g, "-")}.vcf`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ContactSection({
  label,
  title,
  description,
  cta1Label,
  cta2Label,
  whatsappUrl,
  fullName,
  whatsappNumber,
  socials,
}: ContactSectionProps) {
  return (
    <section
      id="contacto"
      className="py-20 md:py-28 px-6 md:px-16 max-w-6xl mx-auto text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <span className="text-accent text-xs font-semibold uppercase tracking-[0.1em] block mb-4">
          {label}
        </span>

        <motion.h2
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="font-syne font-extrabold text-white leading-tight mb-5"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
          }}
        >
          {title}
        </motion.h2>

        <p className="text-text-dim text-base leading-relaxed max-w-lg mx-auto mb-10">
          {description}
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-black font-bold px-8 py-3.5 rounded-full transition-all hover:scale-[1.03] active:scale-[0.97] text-sm"
          >
            {cta1Label} <span>→</span>
          </a>
          <button
            onClick={() => downloadVCard(fullName, whatsappNumber, socials)}
            className="inline-flex items-center gap-2 border border-[#333] hover:border-accent text-text-main hover:text-accent px-7 py-3.5 rounded-full transition-all text-sm font-semibold"
          >
            {cta2Label}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
