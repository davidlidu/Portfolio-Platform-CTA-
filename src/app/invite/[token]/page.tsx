// src/app/invite/[token]/page.tsx
// Página pública: el invitado valida su token y crea su contraseña.

import { prisma } from "@/lib/prisma";
import AcceptInviteForm from "@/components/admin/AcceptInviteForm";

export const dynamic = "force-dynamic";

export default async function InvitePage({
  params,
}: {
  params: { token: string };
}) {
  const user = await prisma.user.findUnique({
    where: { inviteToken: params.token },
    select: {
      email: true,
      passwordHash: true,
      inviteExpires: true,
      portfolio: { select: { heroName: true } },
    },
  });

  const invalid = !user;
  const used = Boolean(user?.passwordHash);
  const expired = Boolean(
    user?.inviteExpires && user.inviteExpires.getTime() < Date.now()
  );

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4 font-dm">
      <div className="w-full max-w-md rounded-2xl border border-card-border bg-card p-7 shadow-2xl">
        {invalid || used || expired ? (
          <div className="text-center py-6">
            <h1 className="text-xl font-semibold text-text-main mb-2">
              Invitación no válida
            </h1>
            <p className="text-text-dim text-sm">
              {used
                ? "Esta invitación ya fue usada. Inicia sesión con tu cuenta."
                : expired
                  ? "La invitación caducó. Pide una nueva al administrador."
                  : "El enlace no es válido."}
            </p>
            <a
              href="/admin/login"
              className="inline-block mt-5 text-accent text-sm hover:underline"
            >
              Ir a iniciar sesión →
            </a>
          </div>
        ) : (
          <AcceptInviteForm
            token={params.token}
            email={user!.email}
            portfolioName={(user!.portfolio?.heroName || "").replace(/\n/g, " ")}
          />
        )}
      </div>
    </div>
  );
}
