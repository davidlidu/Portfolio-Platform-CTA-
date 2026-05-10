-- prisma/migrations/0001_init/migration.sql
-- Migración inicial: crear tablas Portfolio y Project

CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    -- Hero
    "heroName" TEXT NOT NULL,
    "heroBadge" TEXT NOT NULL DEFAULT 'Disponible para proyectos',
    "heroRole" TEXT NOT NULL,
    "heroPhotoUrl" TEXT,

    -- Socials (JSON)
    "socials" JSONB NOT NULL DEFAULT '[]',

    -- Intro
    "introQuote" TEXT NOT NULL,
    "introTags" TEXT[],
    "introCta1Label" TEXT NOT NULL DEFAULT 'Agendar conversación',
    "introCta2Label" TEXT NOT NULL DEFAULT 'Explorar proyectos',

    -- Servicios
    "servicesLabel" TEXT NOT NULL DEFAULT '// Servicios',
    "servicesTitle" TEXT NOT NULL DEFAULT 'Cómo genero valor',
    "servicesDescription" TEXT NOT NULL,
    "servicePillars" JSONB NOT NULL DEFAULT '[]',

    -- Enfoque
    "approachLabel" TEXT NOT NULL DEFAULT '// Mi enfoque',
    "approachTitle" TEXT NOT NULL,
    "approachDescription" TEXT NOT NULL,
    "approachSteps" TEXT[],

    -- Contacto
    "contactLabel" TEXT NOT NULL DEFAULT '// Conectemos',
    "contactTitle" TEXT NOT NULL DEFAULT '¿Tienes un proyecto en mente?',
    "contactDescription" TEXT NOT NULL,
    "contactCta1Label" TEXT NOT NULL DEFAULT 'Agendar conversación',
    "contactCta2Label" TEXT NOT NULL DEFAULT 'Guardar contacto',

    -- WhatsApp
    "whatsappNumber" TEXT,
    "whatsappMessage" TEXT,

    -- Footer
    "footerInitials" TEXT NOT NULL DEFAULT 'JP',
    "footerName" TEXT NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Portfolio_slug_key" ON "Portfolio"("slug");

CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "thumbnailUrl" TEXT,
    "images" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Project"
    ADD CONSTRAINT "Project_portfolioId_fkey"
    FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
