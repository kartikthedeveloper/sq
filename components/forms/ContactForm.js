"use client";
import { Send, LoaderCircle } from "lucide-react";
import { contactSchema, serviceOptions } from "@/lib/validation";
import { Field, inputProps, Honeypot, FormStatus } from "./Field";
import { useLeadForm } from "./useLeadForm";

export default function ContactForm({ defaultType = "consultation", defaultService = "" }) {
  const f = useLeadForm({
    schema: contactSchema,
    endpoint: "/api/contact",
    defaultValues: { name: "", email: "", phone: "", service: defaultService, message: "", type: defaultType },
    successEvent: "consultation_request",
  });
  const e = f.formState.errors;
  return (
    <form onSubmit={f.onSubmit} noValidate className="relative space-y-5" aria-label="Contact form">
      <Honeypot register={f.register} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-name" label="Full name" required error={e.name?.message}>
          <input type="text" autoComplete="name" {...inputProps("c-name", e.name)} {...f.register("name")} />
        </Field>
        <Field id="c-email" label="Email" required error={e.email?.message}>
          <input type="email" autoComplete="email" {...inputProps("c-email", e.email)} {...f.register("email")} />
        </Field>
        <Field id="c-phone" label="Phone / WhatsApp" error={e.phone?.message} hint="Optional">
          <input type="tel" autoComplete="tel" {...inputProps("c-phone", e.phone, true)} {...f.register("phone")} />
        </Field>
        <Field id="c-type" label="I am looking for" error={e.type?.message}>
          <select {...inputProps("c-type", e.type)} {...f.register("type")}>
            <option value="consultation">A free consultation</option>
            <option value="contact">General information</option>
            <option value="career">Career opportunities</option>
          </select>
        </Field>
      </div>
      <Field id="c-service" label="Service of interest" error={e.service?.message}>
        <select {...inputProps("c-service", e.service)} {...f.register("service")}>
          <option value="">Select a service (optional)</option>
          {serviceOptions.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>
      <Field id="c-message" label="How can we help?" required error={e.message?.message}>
        <textarea rows={5} {...inputProps("c-message", e.message)} {...f.register("message")} />
      </Field>
      <FormStatus status={f.status} />
      <button type="submit" disabled={f.loading} className="inline-flex items-center gap-2 rounded-lg bg-royal px-6 py-3.5 font-semibold text-white hover:bg-royal-deep disabled:opacity-60">
        {f.loading ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Send className="h-5 w-5" aria-hidden="true" />}
        {f.loading ? "Sending…" : "Send message"}
      </button>
      <p className="text-sm text-quiet">We use your details only to reply to this enquiry. See our <a className="text-royal underline" href="/privacy-policy">privacy policy</a>.</p>
    </form>
  );
}
