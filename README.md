# 🚀 Portfolio Platform — CTA+

Plataforma multi-tenant de portafolios profesionales.  
Cada portafolio tiene su propia URL: `tuportafolio.calltoactionplus.com/slug`

## Stack

- **Next.js 14** (App Router, TypeScript)
- **PostgreSQL** + **Prisma** ORM
- **NextAuth.js** (autenticación admin)
- **Tailwind CSS** + **Framer Motion** (frontend público)
- **Docker** para deploy

## Inicio rápido (desarrollo local)

```bash
# 1. Clonar e instalar
git clone https://github.com/TU_USUARIO/portfolio-platform.git
cd portfolio-platform
npm install

# 2. Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus valores (especialmente DATABASE_URL)

# 3. Crear base de datos y migrar
npx prisma migrate dev --name init

# 4. (Opcional) Cargar datos de ejemplo
npm run db:seed

# 5. Iniciar servidor de desarrollo
npm run dev
```

Abre http://localhost:3000/admin para el panel admin.  
Login: `tecnologia@calltoactionplus.com` / `Admin123**`

## Estructura del proyecto

```
src/
├── app/
│   ├── [slug]/page.tsx          ← Portafolio público
│   ├── admin/                   ← Panel de administración
│   │   ├── login/page.tsx
│   │   ├── page.tsx             ← Dashboard (lista portafolios)
│   │   └── portfolios/          ← CRUD portafolios y proyectos
│   └── api/                     ← API REST
│       ├── auth/
│       ├── portfolios/
│       └── upload/
├── components/
│   ├── portfolio/               ← Componentes del frontend público
│   │   ├── HeroSection.tsx
│   │   ├── IntroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ApproachSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── admin/                   ← Componentes del panel admin
├── lib/                         ← Utilidades (Prisma, auth, upload, validaciones)
└── types/                       ← Tipos TypeScript
```

## Deploy con Docker

```bash
# Build local
docker-compose up --build

# O solo el Dockerfile
docker build -t portfolio-platform .
```

## Deploy en Dokploy

1. Subir código a GitHub
2. En Dokploy: New Application → GitHub Repository
3. Crear servicio PostgreSQL en Dokploy
4. Agregar variables de entorno (ver `.env.local.example`)
5. Configurar dominio + SSL (Let's Encrypt)
6. Agregar volumen persistente: `/app/public/uploads`
7. Deploy

## Características

- ✅ Multi-tenant: múltiples portafolios con URLs únicas
- ✅ Panel admin completo con CRUD
- ✅ Frontend con animaciones Framer Motion
- ✅ Hero estilo Alex Graham (nombre gigante + retrato)
- ✅ WhatsApp CTAs configurables
- ✅ Sección de proyectos con galería modal
- ✅ Descarga de vCard (guardar contacto)
- ✅ Upload de imágenes local
- ✅ SEO dinámico por portafolio
- ✅ Responsive mobile-first
- ✅ 404 personalizado
- ✅ TypeScript estricto + Zod validations
