import { site } from "@/lib/site";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { posts } from "@/data/blog";

export default function sitemap() {
  const last = new Date(site.contentDate);
  const u = (path, priority = 0.6, changeFrequency = "monthly", lastModified = last) => ({ url: `${site.url}${path}`, lastModified, changeFrequency, priority });
  const main = ["/about", "/services", "/solutions", "/technologies", "/industries", "/portfolio", "/case-studies", "/process", "/team", "/careers", "/blog", "/contact", "/request-a-quote", "/company-information", "/site-map", "/locations"];
  return [
    u("/", 1, "weekly"),
    ...main.map((p) => u(p, p === "/services" || p === "/contact" || p === "/request-a-quote" ? 0.9 : 0.7)),
    ...services.map((s) => u(`/services/${s.slug}`, 0.85)),
    ...locations.map((l) => u(`/locations/${l.slug}`, 0.8)),
    ...posts.map((p) => u(`/blog/${p.slug}`, 0.6, "monthly", new Date(p.updated))),
    u("/privacy-policy", 0.3, "yearly"),
    u("/terms-and-conditions", 0.3, "yearly"),
  ];
}
