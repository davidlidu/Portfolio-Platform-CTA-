// src/app/admin/layout.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";
import SessionProvider from "@/components/admin/SessionProvider";
import { AdminProvider } from "@/contexts/AdminContext";
import MobileTopBar from "@/components/admin/MobileTopBar";

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
      <AdminProvider>
        <div className="min-h-screen bg-bg flex">
          {/* Desktop sidebar */}
          <Sidebar />

          {/* Main content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Mobile top bar (hamburger + logo) */}
            <MobileTopBar />

            <main className="flex-1 p-4 md:p-8 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </AdminProvider>
    </SessionProvider>
  );
}
