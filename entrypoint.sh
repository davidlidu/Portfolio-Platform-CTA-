#!/bin/sh
set -e

echo "⏳ Esperando base de datos..."

MAX_RETRIES=30
RETRY=0

until node -e "
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.\$connect()
  .then(() => { p.\$disconnect(); process.exit(0); })
  .catch(() => { p.\$disconnect(); process.exit(1); });
" 2>/dev/null; do
  RETRY=$((RETRY + 1))
  if [ $RETRY -ge $MAX_RETRIES ]; then
    echo "❌ DB no disponible después de $MAX_RETRIES intentos."
    exit 1
  fi
  echo "   [$RETRY/$MAX_RETRIES] reintentando en 3s..."
  sleep 3
done

echo "✅ DB lista."

# Resolver migraciones fallidas antes de aplicar (error P3009)
echo "🔧 Resolviendo migraciones fallidas si existen..."
node node_modules/prisma/build/index.js migrate resolve --rolled-back 0001_init 2>/dev/null || true

echo "📦 Aplicando migraciones..."
node node_modules/prisma/build/index.js migrate deploy

echo "🚀 Iniciando Next.js en puerto ${PORT:-3000}..."
exec node server.js
