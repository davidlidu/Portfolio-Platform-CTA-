// src/app/admin/portfolios/new/page.tsx
import { redirect } from "next/navigation";
import PortfolioForm from "@/components/admin/PortfolioForm";
import { getSessionUser, isAdmin } from "@/lib/access";

export const dynamic = "force-dynamic";

export default async function NewPortfolioPage() {
  const user = await getSessionUser();
  // Crear portafolios es exclusivo del admin global.
  if (!isAdmin(user)) {
    redirect(user?.portfolioId ? `/admin/portfolios/${user.portfolioId}` : "/admin/login");
  }
  return <PortfolioForm isNew isAdmin />;
}
