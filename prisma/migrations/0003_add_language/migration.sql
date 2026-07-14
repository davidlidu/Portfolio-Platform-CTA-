-- Agrega columna language a Portfolio para idioma del portafolio público
ALTER TABLE "Portfolio" ADD COLUMN "language" TEXT NOT NULL DEFAULT 'es';
