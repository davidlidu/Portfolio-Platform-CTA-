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

# Si hay migraciones, las aplica; si no, sincroniza el schema directamente
if [ -d "./prisma/migrations" ] && [ "$(ls -A ./prisma/migrations 2>/dev/null)" ]; then
  echo "📦 Aplicando migraciones..."
  node node_modules/prisma/build/index.js migrate deploy
else
  echo "📦 Sin migraciones — sincronizando schema con db push..."
  node node_modules/prisma/build/index.js db push --accept-data-loss
fi

echo "🚀 Iniciando Next.js en puerto ${PORT:-3000}..."
exec node server.js
