#!/bin/bash
# scripts/init.sh
# Script para inicializar la base de datos

echo "🔄 Ejecutando migraciones..."
npx prisma migrate deploy

echo "🌱 Ejecutando seed..."
npx tsx prisma/seed.ts

echo "✅ Base de datos lista!"
