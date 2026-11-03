"use client";
import { newsletterSchema } from "@/lib/validation";
import { Honeypot, FormStatus } from "./Field";
import { useLeadForm } from "./useLeadForm";

export default function NewsletterForm() {
  const f = useLeadForm({ schema: newsletterSchema, endpoint: "/api/newsletter", defaultValues: { email: "" }, successEvent: "newsletter_signup" });
  const err = f.formState.errors.email?.message;
  return (
    <form onSubmit={f.onSubmit} noValidate className="relative mt-3" aria-label="Newsletter subscription">
      <Honeypot register={f.register} />
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <div className="flex gap-2">
        <input id="nl-email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={err ? true : undefined} aria-describedby={err ? "nl-err" : undefined}
          className="min-w-0 flex-1 rounded-lg border border-white/25 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/60 focus:border-white focus:outline-none" {...f.register("email")} />
        <button type="submit" disabled={f.loading} className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-royal-deep hover:bg-mist disabled:opacity-60">{f.loading ? "…" : "Subscribe"}</button>
      </div>
      {err && <p id="nl-err" role="alert" className="mt-2 text-sm text-red-200">{err}</p>}
      <div className="mt-2 text-sm [&>p]:bg-transparent [&>p]:px-0 [&>p]:py-1 [&>p]:text-white"><FormStatus status={f.status} /></div>
    </form>
  );
}
