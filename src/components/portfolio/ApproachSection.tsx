// src/components/portfolio/ApproachSection.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ApproachSectionProps {
  label: string;
  title: string;
  description: string;
  steps: string[];
}

function StepRow({ num, text, index }: { num: string; text: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4 items-start"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.12 + 0.1, type: "spring", stiffness: 200 }}
        className="font-syne text-xl font-extrabold text-accent/60 min-w-[36px]"
      >
        {num}
      </motion.span>
      <p className="text-text-main text-sm leading-relaxed">{text}</p>
    </motion.div>
  );
}

export default function ApproachSection({
  label,
  title,
  description,
  steps,
}: ApproachSectionProps) {
  const titleLines = title.split("\n");

  return (
    <section className="py-10 md:py-16 px-6 md:px-16 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-card to-[#0d1a14] border border-card-border rounded-2xl p-10 md:p-16 relative overflow-hidden"
      >
        {/* Decorative circles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full border border-accent/[0.06]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-accent/[0.04]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-accent text-xs font-semibold uppercase tracking-[0.1em] block mb-4">
              {label}
            </span>
            <h2
              className="font-syne font-extrabold text-white leading-tight mb-4 whitespace-pre-line"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
            >
              {titleLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < titleLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className="text-text-dim text-sm leading-relaxed">{description}</p>
          </motion.div>

          <div className="flex flex-col gap-5">
            {steps.map((step, i) => (
              <StepRow
                key={i}
                num={String(i + 1).padStart(2, "0")}
                text={step}
                index={i}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
