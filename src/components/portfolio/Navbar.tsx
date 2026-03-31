// src/components/portfolio/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NavbarProps {
  name: string;
  hasProjects: boolean;
  whatsappUrl: string;
}

export default function Navbar({ name, hasProjects, whatsappUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems = [
    { href: "#servicios", label: "Servicios" },
    ...(hasProjects ? [{ href: "#portafolio", label: "Portafolio" }] : []),
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 h-16 flex items-center justify-between transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid #1a1a1a"
          : "1px solid transparent",
      }}
    >
      <span className="font-syne font-extrabold text-sm text-white tracking-wider">
        © {name.split("\n")[0]}
      </span>

      <div className="flex items-center gap-6 md:gap-10">
        {navItems.map((item, i) => (
          <motion.a
            key={item.href}
            href={item.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="text-text-dim text-xs md:text-sm font-medium hover:text-white transition-colors tracking-wider"
          >
            {item.label}
          </motion.a>
        ))}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-black text-xs font-bold px-4 py-2 rounded-full transition-all"
        >
          WhatsApp
        </motion.a>
      </div>
    </motion.nav>
  );
}
