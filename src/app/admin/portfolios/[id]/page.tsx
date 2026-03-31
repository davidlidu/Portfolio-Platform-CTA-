// src/app/admin/portfolios/[id]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PortfolioForm from "@/components/admin/PortfolioForm";

export const dynamic = "force-dynamic";

export default async function EditPortfolioPage({
  params,
}: {
  params: { id: string };
}) {
  const portfolio = await prisma.portfolio.findUnique({
    where: { id: params.id },
    include: { projects: { orderBy: { order: "asc" } } },
  });

  if (!portfolio) {
    notFound();
  }

  return <PortfolioForm portfolio={portfolio} />;
}
