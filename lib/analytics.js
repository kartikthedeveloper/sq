// Fire GA4 events. No-op until the visitor consents and GA has loaded.
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.gtag === "function") window.gtag("event", name, params);
    else if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: name, ...params });
  } catch {}
}
export const CONSENT_KEY = "sq-consent";
