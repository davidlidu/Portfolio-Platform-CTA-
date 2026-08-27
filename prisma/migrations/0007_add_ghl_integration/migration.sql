-- Integración con GoHighLevel (GHL): envío de leads por portafolio.
-- ghlEnabled: enciende/apaga el envío a GHL (la conexión/credenciales son globales).
-- ghlTag: identificador que se envía como tag y campo personalizado (vacío => usa el slug).
ALTER TABLE "Portfolio" ADD COLUMN "ghlEnabled" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Portfolio" ADD COLUMN "ghlTag" TEXT;
