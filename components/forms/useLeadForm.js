"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackEvent } from "@/lib/analytics";

/** Shared client logic: Zod validation, POST to API, real success/error states, GA4 events. */
export function useLeadForm({ schema, endpoint, defaultValues, successEvent, eventParams = {} }) {
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { hp: "", ...defaultValues }, mode: "onTouched" });
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [loadedAt, setLoadedAt] = useState(0);
  useEffect(() => setLoadedAt(Date.now()), []);

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus({ state: "loading", message: "" });
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, ts: loadedAt }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus({ state: "success", message: data.message });
        trackEvent(successEvent, eventParams);
        trackEvent("generate_lead", { form: endpoint.split("/").pop(), ...eventParams });
        form.reset({ hp: "", ...defaultValues });
        return;
      }
      if (data.errors) for (const [k, msg] of Object.entries(data.errors)) form.setError(k, { message: msg });
      setStatus({ state: "error", message: data.message || "Something went wrong. Please try again." });
    } catch {
      setStatus({ state: "error", message: "Network error. Please check your connection and try again." });
    }
  });

  return { ...form, onSubmit, status, loading: status.state === "loading" };
}
