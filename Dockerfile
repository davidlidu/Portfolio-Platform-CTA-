# Dockerfile
FROM node:20-alpine AS base

# --- Dependencias del Sistema ---
# Al ponerlo en la base, todos los stages (deps, builder, runner) tendrán OpenSSL
RUN apk add --no-cache openssl libc6-compat

# --- Dependencies ---
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci

# --- Builder ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generar Prisma Client
RUN npx prisma@5.15.0 generate

# Build de Next.js
RUN npm run build

# --- Runner ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copiar archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Crear directorio para uploads
RUN mkdir -p /app/public/uploads

EXPOSE 3000

# Ejecutar migraciones y luego iniciar la app en modo standalone
CMD npx prisma@5.15.0 migrate deploy && node server.js