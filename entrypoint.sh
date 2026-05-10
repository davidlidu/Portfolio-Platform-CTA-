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

# Verificar si las tablas ya existen (migración aplicada parcial o totalmente)
TABLES_EXIST=$(node -e "
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.\$queryRaw\`SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'Portfolio'\`
  .then(r => { p.\$disconnect(); process.stdout.write(r[0].count.toString()); process.exit(0); })
  .catch(() => { p.\$disconnect(); process.stdout.write('0'); process.exit(0); });
" 2>/dev/null || echo "0")

echo "🔍 Tablas encontradas: $TABLES_EXIST"

# Resolver migración fallida según el estado real de la DB
echo "🔧 Resolviendo migraciones fallidas si existen..."

if [ "$TABLES_EXIST" = "1" ]; then
  echo "   → Tablas ya existen, marcando migración como aplicada..."
  node node_modules/prisma/build/index.js migrate resolve --applied 0001_init 2>/dev/null && echo "   ✓ Marcada como aplicada" || echo "   (ya estaba resuelta)"
else
  echo "   → Tablas no existen, marcando migración como rolled-back..."
  node node_modules/prisma/build/index.js migrate resolve --rolled-back 0001_init 2>/dev/null && echo "   ✓ Marcada como rolled-back" || echo "   (ya estaba resuelta)"
fi

echo "📦 Aplicando migraciones..."
node node_modules/prisma/build/index.js migrate deploy

echo "🚀 Iniciando Next.js en puerto ${PORT:-3000}..."
exec node server.js