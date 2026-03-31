// src/components/portfolio/ProjectsSection.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@prisma/client";

interface ProjectsSectionProps {
  projects: Project[];
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const allImages = [
    ...(project.thumbnailUrl ? [project.thumbnailUrl] : []),
    ...project.images,
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-card-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto"
      >
        {/* Galería de imágenes */}
        {allImages.length > 0 && (
          <div className="relative">
            <img
              src={allImages[currentImage]}
              alt={project.title}
              className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
            />
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImage((prev) =>
                      prev === 0 ? allImages.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={() =>
                    setCurrentImage((prev) =>
                      prev === allImages.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  →
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {allImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentImage ? "bg-accent" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Contenido */}
        <div className="p-8">
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
          <p className="text-text-dim text-sm leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>

        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors text-lg"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
          // Proyectos
        </span>
        <h2
          className="font-syne font-extrabold text-white leading-tight"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Trabajo <span className="text-accent">destacado</span>
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-white text-sm font-medium">
                  Ver proyecto →
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
          />
        )}
      </AnimatePresence>
    </section>
  );
}
