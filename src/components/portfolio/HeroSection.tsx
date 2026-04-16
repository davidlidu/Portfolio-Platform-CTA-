// src/components/portfolio/HeroSection.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Social } from "@/types";

const SOCIAL_ICON_MAP: Record<string, string> = {
  linkedin: "in",
  twitter: "𝕏",
  instagram: "◉",
  youtube: "▶",
  github: "⌘",
  tiktok: "♪",
  web: "◎",
};

interface HeroSectionProps {
  name: string;
  badge: string;
  role: string;
  photoUrl: string | null;
  socials: Social[];
}

export default function HeroSection({
  name,
  badge,
  role,
  photoUrl,
  socials,
}: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const nameLines = name.split("\n");
  const roleLines = role.split("\n");

  return (
    <section
      ref={ref}
      className="h-screen relative overflow-hidden"
      style={{ background: "#0D0D0D" }}
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 z-[8] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Portrait */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: portraitY,
          marginTop: "-24%",
          width: "clamp(280px, 36vw, 480px)",
          height: "clamp(400px, 58vh, 700px)",
          zIndex: 2,
          scale: portraitScale,
          opacity: heroOpacity,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full rounded-lg overflow-hidden"
        >
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={name.replace(/\n/g, " ")}
              className="w-full h-full object-cover"
            />
          ) : (
            <PortraitPlaceholder />
          )}
        </motion.div>
      </motion.div>

      {/* Giant name with mix-blend-mode */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          zIndex: 3,
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          mixBlendMode: "difference",
          opacity: heroOpacity,
        }}
      >
        <motion.h1
          initial={{ opacity: 0, x: "4%", filter: "blur(12px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-syne font-extrabold text-white uppercase text-center whitespace-nowrap"
          style={{
            fontSize: "clamp(2.5rem, 10vw, 10rem)",
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
          }}
        >
          {nameLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < nameLines.length - 1 && <br />}
            </span>
          ))}
        </motion.h1>
      </motion.div>

      {/* Accent glow line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.4 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
        className="absolute z-[1]"
        style={{
          top: "44%",
          left: "50%",
          x: "-50%",
          width: "55vw",
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(16,185,129,0.27), transparent)",
          transformOrigin: "center",
        }}
      />

      {/* Social links — bottom left */}
      <div className="absolute left-6 md:left-10 bottom-16 md:bottom-24 z-[12] flex flex-col gap-4">
        {socials.map((social, i) => (
          <motion.a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.08, duration: 0.6 }}
            className="flex items-center gap-2.5 text-text-dim text-sm hover:text-white transition-colors group"
          >
            <span className="w-7 h-7 rounded-full border border-[#333] group-hover:border-accent flex items-center justify-center text-[11px] font-bold transition-colors">
              {SOCIAL_ICON_MAP[social.icon] || social.icon}
            </span>
            <span className="hidden md:inline">{social.label}</span>
          </motion.a>
        ))}
      </div>

      {/* Role — bottom right */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-6 md:right-10 bottom-16 md:bottom-24 z-[12] text-right"
      >
        <p
          className="font-syne font-extrabold text-white"
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 2.2rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="text-accent font-normal font-dm text-[0.65em]">
            //{" "}
          </span>
          {roleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < roleLines.length - 1 && <br />}
            </span>
          ))}
        </p>
      </motion.div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute top-20 inset-x-0 mx-auto w-fit max-w-[90vw] z-[12] px-4"
      >
        <div className="inline-flex items-center justify-center gap-2 bg-accent/[0.08] border border-accent/20 rounded-full px-4 py-1.5 text-center">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot shrink-0" />
          <span className="text-accent text-xs font-semibold uppercase tracking-wider">
            {badge}
          </span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[12] flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] text-text-dim uppercase tracking-[0.12em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-7"
          style={{
            background:
              "linear-gradient(to bottom, #10B981, transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}

// Placeholder SVG para cuando no hay foto
function PortraitPlaceholder() {
  return (
    <svg
      viewBox="0 0 520 760"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect width="520" height="760" fill="#121212" />
      <ellipse cx="260" cy="215" rx="88" ry="100" fill="#1C1C1C" />
      <ellipse
        cx="260"
        cy="215"
        rx="88"
        ry="100"
        stroke="#10B981"
        strokeWidth="0.7"
        strokeOpacity="0.15"
      />
      <path
        d="M172 185 C172 120 210 78 260 73 C310 78 348 120 348 185 C348 168 330 135 260 130 C190 135 172 168 172 185Z"
        fill="#1A1A1A"
      />
      <ellipse cx="232" cy="208" rx="9" ry="6.5" fill="#252525" />
      <ellipse cx="288" cy="208" rx="9" ry="6.5" fill="#252525" />
      <path
        d="M240 257 Q260 270 280 257"
        stroke="#2A2A2A"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="237" y="310" width="46" height="55" rx="6" fill="#1C1C1C" />
      <path
        d="M50 760 C50 540 140 415 260 395 C380 415 470 540 470 760"
        fill="#161616"
      />
      <path
        d="M225 425 L260 510 L295 425"
        stroke="#222"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M242 425 L260 510 L278 425 L278 400 Q260 392 242 400Z"
        fill="#1F1F1F"
      />
    </svg>
  );
}
