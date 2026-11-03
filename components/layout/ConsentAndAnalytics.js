"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { CONSENT_KEY } from "@/lib/analytics";

/**
 * Loads Google Analytics 4 (and optional GTM) only after the visitor accepts analytics cookies.
 * Choice is stored in localStorage. If no GA/GTM id is configured, nothing is shown or loaded.
 */
export default function ConsentAndAnalytics({ gaId, gtmId }) {
  const [choice, setChoice] = useState("pending"); // pending | granted | denied | unset
  const enabled = Boolean(gaId || gtmId);

  useEffect(() => {
    try { setChoice(localStorage.getItem(CONSENT_KEY) || "unset"); } catch { setChoice("unset"); }
  }, []);

  if (!enabled) return null;
  const decide = (v) => { try { localStorage.setItem(CONSENT_KEY, v); } catch {} setChoice(v); };

  return (
    <>
      {choice === "granted" && gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied' });
            gtag('config', '${gaId}', { anonymize_ip: true });
          `}</Script>
        </>
      )}
      {choice === "granted" && gtmId && (
        <Script id="gtm-init" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
          j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');
        `}</Script>
      )}
      {choice === "unset" && (
        <div role="region" aria-label="Cookie consent" className="glass-strong fixed bottom-4 left-4 z-50 max-w-sm rounded-xl p-5">
          <p className="text-sm leading-relaxed text-body">
            We use analytics cookies to understand which pages help visitors. They load only if you accept.{" "}
            <Link href="/privacy-policy" className="font-medium text-royal underline underline-offset-2">Privacy policy</Link>
          </p>
          <div className="mt-4 flex gap-2">
            <button onClick={() => decide("granted")} className="rounded-lg bg-royal px-4 py-2 text-sm font-semibold text-white hover:bg-royal-deep">Accept</button>
            <button onClick={() => decide("denied")} className="rounded-lg border border-ink/20 px-4 py-2 text-sm font-semibold text-ink hover:bg-mist">Decline</button>
          </div>
        </div>
      )}
    </>
  );
}
