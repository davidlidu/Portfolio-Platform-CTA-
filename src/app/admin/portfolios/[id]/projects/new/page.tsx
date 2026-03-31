// src/app/admin/portfolios/[id]/projects/new/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function NewProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const portfolio = await prisma.portfolio.findUnique({
    where: { id: params.id },
    select: { id: true, slug: true },
  });

  if (!portfolio) notFound();

  return (
    <ProjectForm
      portfolioId={portfolio.id}
      portfolioSlug={portfolio.slug}
      isNew
    />
  );
}
