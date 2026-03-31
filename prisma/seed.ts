// prisma/seed.ts
// Datos de ejemplo: portafolio de Juan Pablo Rojas

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Eliminar datos existentes
  await prisma.project.deleteMany();
  await prisma.portfolio.deleteMany();

  const portfolio = await prisma.portfolio.create({
    data: {
      slug: "juan-pablo-rojas",
      isPublished: true,
      heroName: "Juan Pablo\nRojas",
      heroBadge: "Disponible para proyectos",
      heroRole: "AI & Business\nDevelopment Partner",
      heroPhotoUrl: null,
      socials: [
        { icon: "linkedin", label: "LinkedIn", url: "https://linkedin.com" },
        { icon: "twitter", label: "Twitter", url: "https://twitter.com" },
        { icon: "instagram", label: "Instagram", url: "https://instagram.com" },
      ],
      introQuote:
        "Conecto tecnología, capital y crecimiento para ayudar a empresas y proyectos a escalar.",
      introTags: ["Automation", "Growth", "Strategic Opportunities", "AI"],
      introCta1Label: "Agendar conversación",
      introCta2Label: "Explorar proyectos",
      servicesLabel: "// Servicios",
      servicesTitle: "Cómo genero valor",
      servicesDescription:
        "Mi trabajo consiste en identificar oportunidades y diseñar soluciones que combinen tecnología, automatización y estrategia comercial.",
      servicePillars: [
        {
          icon: "⚡",
          title: "Inteligencia Artificial y Automatización",
          description:
            "Diseño soluciones que utilizan AI y automatización para optimizar procesos empresariales. El objetivo es que las empresas puedan hacer más con menos recursos y con mayor eficiencia.",
          items: ["Marketing", "Ventas", "Operaciones", "Asistentes AI"],
        },
        {
          icon: "📈",
          title: "Desarrollo de Negocios",
          description:
            "Apoyo a empresas y proyectos en expansión comercial, posicionamiento y generación de oportunidades de crecimiento.",
          items: [
            "Estrategia de crecimiento",
            "Apertura de mercados",
            "Alianzas estratégicas",
            "Estructuración",
          ],
        },
        {
          icon: "🔗",
          title: "Conexión entre Tecnología y Capital",
          description:
            "Participo en proyectos donde la tecnología se combina con modelos de inversión o financiación para generar crecimiento sostenible.",
          items: ["Inversión", "Tokenización", "Financiación", "Proyectos tech"],
        },
      ],
      approachLabel: "// Mi enfoque",
      approachTitle: "A través de alianzas\ne iniciativas",
      approachDescription:
        "Participo en proyectos que buscan optimizar operaciones, generar crecimiento y conectar oportunidades de negocio.",
      approachSteps: [
        "Implementación de inteligencia artificial en procesos empresariales",
        "Automatización de flujos comerciales y operativos",
        "Diseño de estrategias de crecimiento",
        "Conexión entre empresas, inversionistas y tecnología",
      ],
      contactLabel: "// Conectemos",
      contactTitle: "¿Tienes un proyecto en mente?",
      contactDescription:
        "Hablemos sobre cómo la tecnología, la automatización y una buena estrategia pueden impulsar tu próximo paso.",
      contactCta1Label: "Agendar conversación",
      contactCta2Label: "Guardar contacto",
      whatsappNumber: "573001234567",
      whatsappMessage:
        "Hola Juan Pablo, me interesa conocer más sobre tus servicios.",
      footerInitials: "JP",
      footerName: "Juan Pablo Rojas",
      projects: {
        create: [
          {
            title: "Plataforma de Automatización para E-commerce",
            description:
              "Desarrollo e implementación de una plataforma integral de automatización para un e-commerce de moda, incluyendo chatbots de atención, automatización de marketing por email y segmentación de audiencias con IA.",
            tags: ["AI", "E-commerce", "Automatización", "Marketing"],
            thumbnailUrl: null,
            images: [],
            order: 1,
          },
          {
            title: "Estrategia de Expansión Regional",
            description:
              "Diseño y ejecución de la estrategia de entrada al mercado latinoamericano para una fintech europea, incluyendo alianzas estratégicas, cumplimiento regulatorio y posicionamiento de marca.",
            tags: ["Fintech", "Estrategia", "LATAM", "Expansión"],
            thumbnailUrl: null,
            images: [],
            order: 2,
          },
        ],
      },
    },
  });

  console.log(`✅ Portafolio creado: ${portfolio.slug} (${portfolio.id})`);
  console.log(`   URL: /juan-pablo-rojas`);
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
