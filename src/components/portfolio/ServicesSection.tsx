// src/components/portfolio/ServicesSection.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ServicePillar } from "@/types";

interface ServicesSectionProps {
  label: string;
  title: string;
  description: string;
  pillars: ServicePillar[];
}

function PillarCard({ pillar }: { pillar: ServicePillar }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 0, scale: 1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="bg-card border border-card-border rounded-2xl p-8 cursor-default relative overflow-hidden group h-full"
    >
      {/* Glow on hover */}
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-accent opacity-0 group-hover:opacity-[0.06] transition-opacity duration-400 blur-[50px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        className="w-12 h-12 rounded-xl bg-accent/[0.15] flex items-center justify-center mb-5 text-xl group-hover:scale-110 transition-transform"
      >
        {pillar.icon}
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="font-playfair text-xl font-bold text-white mb-3"
      >
        {pillar.title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-text-dim text-sm leading-relaxed mb-5"
      >
        {pillar.description}
      </motion.p>

      <div className="flex flex-wrap gap-2">
        {pillar.items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              delay: 0.3 + i * 0.06,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="bg-accent/[0.08] border border-accent/[0.18] rounded-full px-3.5 py-1 text-xs text-accent"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ServicesSection({
  label,
  title,
  description,
  pillars,
}: ServicesSectionProps) {
  // Resaltar la última palabra del título en accent
  const words = title.split(" ");
  const lastWord = words.pop();
  const titleStart = words.join(" ");

  return (
    <section id="servicios" className="py-20 md:py-28 px-6 md:px-16 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-16 max-w-2xl"
      >
        <span className="text-accent text-xs font-semibold uppercase tracking-[0.1em] block mb-4">
          {label}
        </span>
        <h2
          className="font-syne font-extrabold text-white leading-tight mb-5"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {titleStart}{" "}
          <span className="text-accent">{lastWord}</span>
        </h2>
        <p className="text-text-dim text-base leading-relaxed">{description}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((pillar, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
          >
            <PillarCard pillar={pillar} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
