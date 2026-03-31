// src/app/admin/portfolios/[id]/projects/[projectId]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string; projectId: string };
}) {
  const portfolio = await prisma.portfolio.findUnique({
    where: { id: params.id },
    select: { id: true, slug: true },
  });

  if (!portfolio) notFound();

  const project = await prisma.project.findUnique({
    where: { id: params.projectId, portfolioId: params.id },
  });

  if (!project) notFound();

  return (
    <ProjectForm
      portfolioId={portfolio.id}
      portfolioSlug={portfolio.slug}
      project={project}
    />
  );
}
