// src/lib/mailer.ts
// Envío de correos vía SMTP (Gmail por defecto). Requiere en el entorno:
//   SMTP_HOST (def. smtp.gmail.com), SMTP_PORT (def. 465),
//   SMTP_USER, SMTP_PASSWORD (App Password de Gmail), SMTP_FROM (opcional).

import nodemailer from "nodemailer";

// Acepta SMTP_PASSWORD o SMTP_PASS (nombres usados indistintamente en el entorno).
function getSmtpPass(): string | undefined {
  return process.env.SMTP_PASSWORD || process.env.SMTP_PASS;
}

export function isMailConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && getSmtpPass());
}

function getTransport() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  // Si SMTP_SECURE está definido, se respeta; si no, se deriva del puerto.
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === "true"
      : port === 465; // 465 = SSL, 587 = STARTTLS
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: getSmtpPass(),
    },
  });
}

interface InvitationEmailParams {
  to: string;
  inviteUrl: string;
  portfolioName: string;
}

export async function sendInvitationEmail({
  to,
  inviteUrl,
  portfolioName,
}: InvitationEmailParams): Promise<void> {
  const from =
    process.env.SMTP_FROM || `TapHub <${process.env.SMTP_USER}>`;

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#111">
      <h2 style="margin:0 0 8px;font-size:20px">Te invitaron a TapHub</h2>
      <p style="margin:0 0 20px;color:#555;font-size:15px;line-height:1.5">
        Tienes acceso para gestionar el portafolio <strong>${portfolioName}</strong>.
        Crea tu contraseña para entrar al panel.
      </p>
      <a href="${inviteUrl}"
         style="display:inline-block;background:#1DB874;color:#000;font-weight:600;text-decoration:none;padding:12px 28px;border-radius:100px;font-size:15px">
        Activar mi cuenta
      </a>
      <p style="margin:24px 0 0;color:#999;font-size:12px;line-height:1.5">
        Si el botón no funciona, copia y pega este enlace:<br>
        <span style="color:#1DB874;word-break:break-all">${inviteUrl}</span>
      </p>
      <p style="margin:16px 0 0;color:#999;font-size:12px">
        La invitación caduca en 7 días. Si no la esperabas, ignora este correo.
      </p>
    </div>
  `;

  await getTransport().sendMail({
    from,
    to,
    subject: `Invitación a TapHub — ${portfolioName}`,
    html,
    text: `Te invitaron a gestionar el portafolio "${portfolioName}" en TapHub. Activa tu cuenta: ${inviteUrl}`,
  });
}
