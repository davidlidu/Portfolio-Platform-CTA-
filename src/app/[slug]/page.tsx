// src/app/[slug]/page.tsx
// Página pública del portafolio — Server Component con metadata dinámica

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import type { Social, ServicePillar } from "@/types";

import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import IntroSection from "@/components/portfolio/IntroSection";
import ServicesSection from "@/components/portfolio/ServicesSection";
import ApproachSection from "@/components/portfolio/ApproachSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";

// Generar metadata dinámica para SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const portfolio = await prisma.portfolio.findUnique({
    where: { slug: params.slug, isPublished: true },
    select: { heroName: true, heroRole: true, introQuote: true },
  });

  if (!portfolio) {
    return { title: "Portafolio no encontrado" };
  }

  const name = portfolio.heroName.replace(/\n/g, " ");
  const role = portfolio.heroRole.replace(/\n/g, " · ");

  return {
    title: `${name} — ${role}`,
    description: portfolio.introQuote,
    openGraph: {
      title: `${name} — ${role}`,
      description: portfolio.introQuote,
      type: "profile",
    },
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: { slug: string };
}) {
  // Obtener portafolio directamente con Prisma (Server Component)
  const portfolio = await prisma.portfolio.findUnique({
    where: { slug: params.slug, isPublished: true },
    include: { projects: { orderBy: { order: "asc" } } },
  });

  // 404 si no existe o no está publicado
  if (!portfolio) {
    notFound();
  }

  // Construir URL de WhatsApp
  const whatsappUrl = portfolio.whatsappNumber
    ? `https://wa.me/${portfolio.whatsappNumber}${
        portfolio.whatsappMessage
          ? `?text=${encodeURIComponent(portfolio.whatsappMessage)}`
          : ""
      }`
    : "#contacto";

  const socials = portfolio.socials as unknown as Social[];
  const pillars = portfolio.servicePillars as unknown as ServicePillar[];

  return (
    <div
      className="min-h-screen font-dm"
      style={{ background: "#0A0A0A", color: "#E5E5E5" }}
    >
      {/* Fuentes de Google */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@400;500;600;700&family=Syne:wght@400;700;800&display=swap"
        rel="stylesheet"
      />

      <Navbar
        name={portfolio.heroName}
        hasProjects={portfolio.projects.length > 0}
        whatsappUrl={whatsappUrl}
      />

      <HeroSection
        name={portfolio.heroName}
        badge={portfolio.heroBadge}
        role={portfolio.heroRole}
        photoUrl={portfolio.heroPhotoUrl}
        socials={socials}
      />

      <IntroSection
        quote={portfolio.introQuote}
        tags={portfolio.introTags}
        cta1Label={portfolio.introCta1Label}
        cta2Label={portfolio.introCta2Label}
        whatsappUrl={whatsappUrl}
      />

      <ServicesSection
        label={portfolio.servicesLabel}
        title={portfolio.servicesTitle}
        description={portfolio.servicesDescription}
        pillars={pillars}
      />

      <ApproachSection
        label={portfolio.approachLabel}
        title={portfolio.approachTitle}
        description={portfolio.approachDescription}
        steps={portfolio.approachSteps}
      />

      {portfolio.projects.length > 0 && (
        <ProjectsSection projects={portfolio.projects} />
      )}

      <ContactSection
        label={portfolio.contactLabel}
        title={portfolio.contactTitle}
        description={portfolio.contactDescription}
        cta1Label={portfolio.contactCta1Label}
        cta2Label={portfolio.contactCta2Label}
        whatsappUrl={whatsappUrl}
        fullName={portfolio.heroName}
        whatsappNumber={portfolio.whatsappNumber}
        socials={socials}
      />

      <Footer
        initials={portfolio.footerInitials}
        name={portfolio.footerName}
        socials={socials}
      />
    </div>
  );
}
