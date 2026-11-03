import { site } from "@/lib/site";

export default function robots() {
  const isProd = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : process.env.NODE_ENV === "production";
  if (!isProd) return { rules: [{ userAgent: "*", disallow: "/" }] }; // keep previews/staging out of search
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
