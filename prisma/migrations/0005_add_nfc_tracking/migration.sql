-- Añade el interruptor del formulario de acceso, las tarjetas NFC y el registro de aperturas (visitas).

-- 1) Interruptor del LeadGate por portafolio
ALTER TABLE "Portfolio" ADD COLUMN "leadGateEnabled" BOOLEAN NOT NULL DEFAULT true;

-- 2) Atribución de leads a tarjeta NFC / visitante anónimo
ALTER TABLE "Lead" ADD COLUMN "cardId" TEXT;
ALTER TABLE "Lead" ADD COLUMN "visitorId" TEXT;

-- 3) Tarjeta NFC física (su id es el token de la URL grabada)
CREATE TABLE "NfcCard" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "label" TEXT NOT NULL DEFAULT '',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NfcCard_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "NfcCard_portfolioId_idx" ON "NfcCard"("portfolioId");

-- 4) Apertura / visita registrada
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "cardId" TEXT,
    "visitorId" TEXT,
    "source" TEXT NOT NULL DEFAULT 'direct',
    "device" TEXT NOT NULL DEFAULT 'unknown',
    "os" TEXT,
    "browser" TEXT,
    "referrer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Visit_portfolioId_createdAt_idx" ON "Visit"("portfolioId", "createdAt");
CREATE INDEX "Visit_cardId_idx" ON "Visit"("cardId");
CREATE INDEX "Visit_visitorId_idx" ON "Visit"("visitorId");

-- 5) Índice y claves foráneas
CREATE INDEX "Lead_cardId_idx" ON "Lead"("cardId");

ALTER TABLE "NfcCard" ADD CONSTRAINT "NfcCard_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Visit" ADD CONSTRAINT "Visit_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "NfcCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Lead" ADD CONSTRAINT "Lead_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "NfcCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
