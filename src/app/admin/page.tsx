// src/app/admin/page.tsx
import { prisma } from "@/lib/prisma";
import DashboardContent from "@/components/admin/DashboardContent";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const portfolios = await prisma.portfolio.findMany({
    include: { projects: { select: { id: true } } },
    orderBy: { createdAt: "desc" },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return <DashboardContent portfolios={portfolios} baseUrl={baseUrl} />;
}
