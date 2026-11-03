import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import JsonLd from "@/components/ui/JsonLd";
import Header from "@/components/navigation/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import ConsentAndAnalytics from "@/components/layout/ConsentAndAnalytics";
import MotionProvider from "@/components/ui/MotionProvider";

const display = localFont({ src: "./fonts/display.woff2", variable: "--font-display", display: "swap", weight: "200 800" });
const body = localFont({ src: "./fonts/body.woff2", variable: "--font-body", display: "swap", weight: "100 900" });

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | AI, Software & Web Development Company in Sikar, Rajasthan`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: site.url },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  verification: site.gscVerification ? { google: site.gscVerification } : undefined,
  openGraph: { type: "website", siteName: site.name, locale: "en_IN", url: site.url },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#f6f7fb" };

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen antialiased">
        <a href="#main" className="sr-only z-[100] rounded-lg bg-royal px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to main content</a>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
        <FloatingContact />
        <ConsentAndAnalytics gaId={site.gaId} gtmId={site.gtmId} />
      </body>
    </html>
  );
}
