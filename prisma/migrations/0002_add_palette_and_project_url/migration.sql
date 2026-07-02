-- Agrega columnas faltantes: Portfolio.paletteId y Project.projectUrl
-- (existían en schema.prisma pero nunca se migraron a la base de datos)

ALTER TABLE "Portfolio" ADD COLUMN "paletteId" TEXT NOT NULL DEFAULT 'emerald';

ALTER TABLE "Project" ADD COLUMN "projectUrl" TEXT;