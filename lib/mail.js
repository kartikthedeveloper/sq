// Sends email through the Resend REST API (no SDK dependency).
// Required env: EMAIL_API_KEY, EMAIL_TO. Optional: EMAIL_FROM, EMAIL_API_URL (override for testing).
export class MailNotConfigured extends Error {}

export const mailConfigured = () => Boolean(process.env.EMAIL_API_KEY && process.env.EMAIL_TO);

export async function sendMail({ subject, html, text, replyTo }) {
  if (!mailConfigured()) throw new MailNotConfigured("Email delivery is not configured");
  const res = await fetch(process.env.EMAIL_API_URL || "https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.EMAIL_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "Success Qube <onboarding@resend.dev>",
      to: process.env.EMAIL_TO.split(",").map((s) => s.trim()),
      subject,
      html,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`Mail provider responded ${res.status}`);
  return true;
}
