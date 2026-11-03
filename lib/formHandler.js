import { NextResponse } from "next/server";
import { sendMail, MailNotConfigured } from "./mail";

// ---- helpers --------------------------------------------------------------
const hits = new Map(); // per-instance memory limiter; use Upstash/Redis for multi-instance production
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return list.length > MAX_HITS;
}

// Remove control chars and angle brackets; collapse excessive whitespace.
export const sanitize = (v) =>
  String(v ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").replace(/[<>]/g, "").replace(/[ \t]{3,}/g, "  ").trim();

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const json = (body, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/**
 * Shared POST handler for all forms: origin check, size cap, rate limit, anti-spam,
 * Zod validation, sanitisation, then real email delivery. Never reports false success.
 */
export async function handleForm(request, { schema, subject, label }) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin) {
    try {
      if (new URL(origin).host !== host) return json({ ok: false, message: "Request origin not allowed." }, 403);
    } catch { return json({ ok: false, message: "Invalid origin." }, 403); }
  }

  const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  if (rateLimited(ip)) return json({ ok: false, message: "Too many requests. Please try again in a few minutes." }, 429);

  let raw;
  try {
    const bodyText = await request.text();
    if (bodyText.length > 20000) return json({ ok: false, message: "Request too large." }, 413);
    raw = JSON.parse(bodyText);
  } catch { return json({ ok: false, message: "Invalid request." }, 400); }

  // Honeypot filled or form submitted implausibly fast => quietly reject as spam.
  const tooFast = typeof raw.ts === "number" && Date.now() - raw.ts < 2500;
  if ((raw.hp && String(raw.hp).length > 0) || tooFast) return json({ ok: false, message: "Submission rejected." }, 400);

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors = {};
    for (const issue of parsed.error.issues) errors[issue.path.join(".") || "form"] = issue.message;
    return json({ ok: false, message: "Please check the highlighted fields.", errors }, 400);
  }

  const { hp, ts, ...data } = parsed.data;
  const clean = Object.fromEntries(Object.entries(data).map(([k, v]) => [k, sanitize(v)]));
  const rows = Object.entries(clean).filter(([, v]) => v);
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<h2>${esc(label)}</h2><table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif">${rows
    .map(([k, v]) => `<tr><td style="border:1px solid #ddd"><b>${esc(k)}</b></td><td style="border:1px solid #ddd">${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;

  try {
    await sendMail({ subject: `${subject(clean)}`, html, text, replyTo: clean.email });
    return json({ ok: true, message: "Thank you. We have received your message and will reply within one business day." });
  } catch (err) {
    if (err instanceof MailNotConfigured) {
      console.error("[forms] EMAIL_API_KEY / EMAIL_TO not configured");
      return json({ ok: false, code: "not_configured", message: "Our online form is not available right now. Please contact us by email or WhatsApp." }, 503);
    }
    console.error("[forms] send failed:", err.message);
    return json({ ok: false, message: "We could not send your message. Please try again shortly or contact us directly." }, 502);
  }
}
