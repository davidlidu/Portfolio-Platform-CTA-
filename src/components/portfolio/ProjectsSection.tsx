// src/components/portfolio/ProjectsSection.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@prisma/client";
import { getPortfolioTranslator, type PortfolioLang } from "@/lib/portfolio-translations";

interface ProjectsSectionProps {
  projects: Project[];
  language: PortfolioLang;
}

function ProjectModal({
  project,
  onClose,
  language,
}: {
  project: Project;
  onClose: () => void;
  language: PortfolioLang;
}) {
  const pt = getPortfolioTranslator(language);
  const [currentImage, setCurrentImage] = useState(0);

  // Deduplicar: thumbnail primero, luego galería sin repetir el thumbnail
  const galleryImages = (project.images ?? []).filter(
    (url) => url !== project.thumbnailUrl
  );
  const allImages = [
    ...(project.thumbnailUrl ? [project.thumbnailUrl] : []),
    ...galleryImages,
  ];

  const total = allImages.length;

  const prev = useCallback(() =>
    setCurrentImage((i) => (i === 0 ? total - 1 : i - 1)), [total]);
  const next = useCallback(() =>
    setCurrentImage((i) => (i === total - 1 ? 0 : i + 1)), [total]);

  // Teclado: ←  → Esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-card border border-card-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto"
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors text-base leading-none"
          aria-label="Cerrar"
        >
          ✕
        </button>

        {/* Galería */}
        {allImages.length > 0 && (
          <div className="flex flex-col">
            {/* Imagen principal */}
            <div className="relative bg-black rounded-t-2xl overflow-hidden" style={{ minHeight: "260px" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={allImages[currentImage]}
                  src={allImages[currentImage]}
                  alt={`${project.title} — ${currentImage + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full object-contain"
                  style={{ maxHeight: "420px" }}
                />
              </AnimatePresence>

              {/* Flechas de navegación */}
              {total > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors border border-white/10 text-lg"
                    aria-label="Anterior"
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors border border-white/10 text-lg"
                    aria-label="Siguiente"
                  >
                    ›
                  </button>

                  {/* Contador */}
                  <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-semibold px-2.5 py-1 rounded-full tabular-nums">
                    {currentImage + 1} / {total}
                  </span>
                </>
              )}
            </div>

            {/* Tira de miniaturas */}
            {total > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto bg-[#111] border-b border-card-border">
                {allImages.map((url, i) => (
                  <button
                    key={url + i}
                    onClick={() => setCurrentImage(i)}
                    className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      i === currentImage
                        ? "border-accent scale-[1.06] shadow-lg shadow-accent/20"
                        : "border-transparent hover:border-white/30 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={url}
                      alt={`miniatura ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Contenido */}
        <div className="p-6 md:p-8">
          <h3 className="font-playfair text-2xl font-bold text-white mb-3">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-accent/[0.08] border border-accent/[0.18] rounded-full px-3 py-1 text-xs text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-text-dim text-sm leading-relaxed whitespace-pre-line mb-6">
            {project.description}
          </p>

          {(project as any).projectUrl && (
            <a
              href={(project as any).projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:underline group/link"
            >
              {pt("projects.view_full")}
              <span className="group-hover/link:translate-x-1 transition-transform">→</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection({ projects, language }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const pt = getPortfolioTranslator(language);

  if (projects.length === 0) return null;

  return (
    <section id="portafolio" className="py-20 md:py-28 px-6 md:px-16 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <span className="text-accent text-xs font-semibold uppercase tracking-[0.1em] block mb-4">
          {pt("projects.label")}
        </span>
        <h2
          className="font-syne font-extrabold text-white leading-tight"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {pt("projects.title")} <span className="text-accent">{pt("projects.title_accent")}</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            whileHover={{ y: -4, scale: 1.01 }}
            onClick={() => setSelectedProject(project)}
            className="bg-card border border-card-border rounded-2xl overflow-hidden cursor-pointer group"
          >
            {/* Thumbnail */}
            <div className="relative h-48 md:h-56 overflow-hidden">
              {project.thumbnailUrl ? (
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-[#161616] flex items-center justify-center">
                  <span className="text-text-dim/30 text-4xl">◎</span>
                </div>
              )}
              {/* Badge de fotos si tiene galería */}
              {(project.images ?? []).length > 0 && (
                <span className="absolute top-3 right-3 bg-black/70 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span>◧</span>
                  {(project.images ?? []).length + (project.thumbnailUrl ? 1 : 0)}
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-white text-sm font-medium">
                  {pt("projects.view")}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-6">
              <h3 className="font-playfair text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-text-dim text-sm leading-relaxed line-clamp-2 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="bg-accent/[0.08] border border-accent/[0.18] rounded-full px-3 py-0.5 text-[11px] text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            language={language}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
