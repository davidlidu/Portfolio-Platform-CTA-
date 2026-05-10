#!/bin/sh
set -e

echo "⏳ Esperando que la base de datos esté lista..."

MAX_RETRIES=30
RETRY=0

until node -e "
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.\$connect().then(() => { p.\$disconnect(); process.exit(0); }).catch(() => { p.\$disconnect(); process.exit(1); });
" 2>/dev/null; do
  RETRY=$((RETRY + 1))
  if [ $RETRY -ge $MAX_RETRIES ]; then
    echo "❌ No se pudo conectar a la base de datos después de $MAX_RETRIES intentos."
    exit 1
  fi
  echo "   Intento $RETRY/$MAX_RETRIES — reintentando en 3s..."
  sleep 3
done

echo "✅ Base de datos lista. Ejecutando migraciones..."
node node_modules/prisma/build/index.js migrate deploy

echo "🌐 Iniciando nginx..."
nginx

echo "🚀 Iniciando servidor Next.js en puerto 3001..."
exec node server.js
