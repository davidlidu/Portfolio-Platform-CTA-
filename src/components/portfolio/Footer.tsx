// src/components/portfolio/Footer.tsx
"use client";

import { motion } from "framer-motion";
import type { Social } from "@/types";

interface FooterProps {
  initials: string;
  name: string;
  socials: Social[];
}

export default function Footer({ initials, name, socials }: FooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-card-border px-6 md:px-16 py-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
    >
      <span className="font-syne font-extrabold text-white text-sm">
        <span className="text-accent">{initials}</span>{" "}
        {name.split(" ").slice(-1)[0]}
      </span>

      <span className="text-text-dim text-xs">
        © {new Date().getFullYear()} {name}. Todos los derechos reservados.
      </span>

      <div className="flex gap-5">
        {socials.map((s) => (
          <motion.a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ color: "#10B981", y: -2 }}
            className="text-text-dim text-sm transition-colors"
          >
            {s.label}
          </motion.a>
        ))}
      </div>
    </motion.footer>
  );
}
