"use client";
import { Send, LoaderCircle } from "lucide-react";
import { quoteSchema, serviceOptions, budgetOptions, timelineOptions } from "@/lib/validation";
import { Field, inputProps, Honeypot, FormStatus } from "./Field";
import { useLeadForm } from "./useLeadForm";

export default function QuoteForm() {
  const f = useLeadForm({
    schema: quoteSchema,
    endpoint: "/api/quote",
    defaultValues: { name: "", email: "", phone: "", company: "", service: "", budget: "", timeline: "", message: "" },
    successEvent: "quote_request",
  });
  const e = f.formState.errors;
  return (
    <form onSubmit={f.onSubmit} noValidate className="relative space-y-5" aria-label="Request a quote form">
      <Honeypot register={f.register} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="q-name" label="Full name" required error={e.name?.message}>
          <input type="text" autoComplete="name" {...inputProps("q-name", e.name)} {...f.register("name")} />
        </Field>
        <Field id="q-email" label="Email" required error={e.email?.message}>
          <input type="email" autoComplete="email" {...inputProps("q-email", e.email)} {...f.register("email")} />
        </Field>
        <Field id="q-phone" label="Phone / WhatsApp" error={e.phone?.message} hint="Optional">
          <input type="tel" autoComplete="tel" {...inputProps("q-phone", e.phone, true)} {...f.register("phone")} />
        </Field>
        <Field id="q-company" label="Company or organisation" error={e.company?.message}>
          <input type="text" autoComplete="organization" {...inputProps("q-company", e.company)} {...f.register("company")} />
        </Field>
        <Field id="q-service" label="Service needed" required error={e.service?.message}>
          <select {...inputProps("q-service", e.service)} {...f.register("service")}>
            <option value="">Select a service</option>
            {serviceOptions.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field id="q-budget" label="Approximate budget" error={e.budget?.message}>
          <select {...inputProps("q-budget", e.budget)} {...f.register("budget")}>
            <option value="">Prefer to discuss</option>
            {budgetOptions.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </div>
      <Field id="q-timeline" label="Timeline" error={e.timeline?.message}>
        <select {...inputProps("q-timeline", e.timeline)} {...f.register("timeline")}>
          <option value="">Select a timeline</option>
          {timelineOptions.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>
      <Field id="q-message" label="Project details" required error={e.message?.message} hint="What problem are you solving, who will use it, and any must-have features?">
        <textarea rows={6} {...inputProps("q-message", e.message, true)} {...f.register("message")} />
      </Field>
      <FormStatus status={f.status} />
      <button type="submit" disabled={f.loading} className="inline-flex items-center gap-2 rounded-lg bg-royal px-6 py-3.5 font-semibold text-white hover:bg-royal-deep disabled:opacity-60">
        {f.loading ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Send className="h-5 w-5" aria-hidden="true" />}
        {f.loading ? "Sending…" : "Request my quote"}
      </button>
    </form>
  );
}
