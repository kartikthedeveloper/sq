// Central business configuration. Every value that is not known for certain
// comes from an environment variable and is hidden from the UI when blank.
const env = process.env;

export const site = {
  name: env.NEXT_PUBLIC_SITE_NAME || "Success Qube",
  url: (env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  tagline: "AI, software and web technology for growing businesses",
  description:
    "Success Qube is an IT and technology solutions company in Sikar, Rajasthan, India. We build websites, web and mobile apps, AI and automation systems, and run SEO, GEO and digital marketing for businesses across India and abroad.",
  locality: "Sikar",
  region: "Rajasthan",
  country: "IN",
  countryName: "India",
  // Only the cities named in the project brief. Add more when you genuinely serve them.
  primaryAreas: ["Sikar"],
  nearbyAreas: [],
  phone: env.NEXT_PUBLIC_BUSINESS_PHONE || "",
  whatsapp: (env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, ""),
  email: env.NEXT_PUBLIC_BUSINESS_EMAIL || "",
  address: env.BUSINESS_ADDRESS || "", // server components only
  postalCode: env.BUSINESS_POSTAL_CODE || "",
  mapsEmbedUrl: env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || "",
  gbpUrl: env.NEXT_PUBLIC_GBP_URL || "",
  gaId: env.NEXT_PUBLIC_GA_ID || "",
  gtmId: env.NEXT_PUBLIC_GTM_ID || "",
  gscVerification: env.NEXT_PUBLIC_GSC_VERIFICATION || "",
  social: {
    LinkedIn: env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "",
    Facebook: env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "",
    Instagram: env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "",
    X: env.NEXT_PUBLIC_SOCIAL_X || "",
    YouTube: env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "",
    GitHub: env.NEXT_PUBLIC_SOCIAL_GITHUB || "",
  },
  contentDate: "2026-11-01",
};

export const socialLinks = () =>
  Object.entries(site.social).filter(([, url]) => url).map(([label, url]) => ({ label, url }));

export const telHref = () => (site.phone ? `tel:${site.phone.replace(/[^\d+]/g, "")}` : "");
export const mailHref = () => (site.email ? `mailto:${site.email}` : "");
export const waHref = (text = "Hello Success Qube, I would like to discuss a project.") =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : "";
export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
