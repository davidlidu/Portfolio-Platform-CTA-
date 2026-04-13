// src/components/portfolio/IntroSection.tsx
"use client";

import { motion } from "framer-motion";

interface IntroSectionProps {
  quote: string;
  tags: string[];
  cta1Label: string;
  cta2Label: string;
  whatsappUrl: string;
}

export default function IntroSection({
  quote,
  tags,
  cta1Label,
  cta2Label,
  whatsappUrl,
}: IntroSectionProps) {
  return (
    <section className="py-20 px-6 md:px-16 max-w-4xl mx-auto text-center">
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-playfair italic text-text-main leading-relaxed max-w-2xl mx-auto"
        style={{ fontSize: "clamp(1.2rem, 2vw, 1.7rem)" }}
      >
        {quote}
      </motion.p>

      {/* Tags */}
      <div className="flex flex-wrap gap-3 justify-center mt-8">
        {tags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.3 + i * 0.06,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="bg-white/[0.03] border border-card-border rounded-full px-5 py-2 text-sm text-text-dim font-medium"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="flex flex-wrap gap-3 justify-center mt-9"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-black font-bold px-8 py-3.5 rounded-full transition-all hover:scale-[1.03] active:scale-[0.97] text-sm"
        >
          {cta1Label} <span>→</span>
        </a>
        <a
          href="#portafolio"
          className="inline-flex items-center gap-2 border border-[#333] hover:border-accent text-text-main hover:text-accent px-7 py-3.5 rounded-full transition-all text-sm font-semibold"
        >
          {cta2Label}
        </a>
      </motion.div>
    </section>
  );
}
