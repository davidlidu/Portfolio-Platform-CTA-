-- Usuarios por portafolio (acceso al panel por invitación).
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT,
    "role" TEXT NOT NULL DEFAULT 'portfolio',
    "portfolioId" TEXT,
    "inviteToken" TEXT,
    "inviteExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_inviteToken_key" ON "User"("inviteToken");
CREATE INDEX "User_portfolioId_idx" ON "User"("portfolioId");

ALTER TABLE "User" ADD CONSTRAINT "User_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
