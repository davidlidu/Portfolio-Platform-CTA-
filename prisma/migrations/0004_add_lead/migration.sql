-- Crea la tabla Lead para capturar los datos del formulario de acceso al portafolio
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "contactType" TEXT NOT NULL DEFAULT 'unknown',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Lead_portfolioId_createdAt_idx" ON "Lead"("portfolioId", "createdAt");

ALTER TABLE "Lead" ADD CONSTRAINT "Lead_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
