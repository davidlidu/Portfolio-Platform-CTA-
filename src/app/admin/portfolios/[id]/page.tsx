// src/app/admin/portfolios/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PortfolioForm from "@/components/admin/PortfolioForm";
import { getSessionUser, isAdmin, canAccessPortfolio } from "@/lib/access";

export const dynamic = "force-dynamic";

export default async function EditPortfolioPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");

  // Defensa en profundidad (además del middleware): sin acceso, fuera.
  if (!canAccessPortfolio(user, params.id)) {
    redirect(user.portfolioId ? `/admin/portfolios/${user.portfolioId}` : "/admin/login");
  }

  const portfolio = await prisma.portfolio.findUnique({
    where: { id: params.id },
    include: { projects: { orderBy: { order: "asc" } } },
  });

  if (!portfolio) {
    notFound();
  }

  return <PortfolioForm portfolio={portfolio} isAdmin={isAdmin(user)} />;
}
