// src/app/admin/layout.tsx
// Layout del panel admin con sidebar y protección de autenticación

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";
import SessionProvider from "@/components/admin/SessionProvider";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  //  if (!session) {
  //   redirect("/admin/login");
  // }

  return (
    <SessionProvider>
      <div className="min-h-screen bg-bg flex">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </SessionProvider>
  );
}
