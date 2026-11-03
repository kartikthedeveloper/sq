import { site, absoluteUrl, socialLinks } from "./site";

const orgId = () => `${site.url}/#organization`;

export function organizationSchema() {
  const sameAs = [...socialLinks().map((s) => s.url), site.gbpUrl].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": orgId(),
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    areaServed: [
      { "@type": "City", name: "Sikar" },
      { "@type": "City", name: "Jaipur" },
      { "@type": "Country", name: "India" },
    ],
    address: {
      "@type": "PostalAddress",
      ...(site.address ? { streetAddress: site.address } : {}),
      addressLocality: site.locality,
      addressRegion: site.region,
      ...(site.postalCode ? { postalCode: site.postalCode } : {}),
      addressCountry: site.country,
    },
    ...(site.phone ? { telephone: site.phone } : {}),
    ...(site.email ? { email: site.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    knowsAbout: [
      "Website development", "Next.js", "Web application development", "Mobile app development",
      "Artificial intelligence", "Generative AI", "Chatbots", "Cloud computing", "DevOps",
      "Search engine optimization", "Generative engine optimization", "Business automation",
    ],
  };
}

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  inLanguage: "en-IN",
  publisher: { "@id": orgId() },
});

export const webPageSchema = ({ name, description, path, type = "WebPage" }) => ({
  "@context": "https://schema.org",
  "@type": type,
  "@id": `${absoluteUrl(path)}#webpage`,
  url: absoluteUrl(path),
  name,
  description,
  inLanguage: "en-IN",
  isPartOf: { "@id": `${site.url}/#website` },
  about: { "@id": orgId() },
});

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const serviceSchema = ({ name, description, path, serviceType, areaServed }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType: serviceType || name,
  url: absoluteUrl(path),
  provider: { "@id": orgId() },
  areaServed: areaServed || [{ "@type": "Country", name: "India" }],
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const articleSchema = (post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.excerpt,
  image: absoluteUrl(post.image),
  datePublished: post.published,
  dateModified: post.updated || post.published,
  mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  inLanguage: "en-IN",
  author: { "@type": "Organization", name: post.author, url: site.url },
  publisher: { "@id": orgId() },
});

export const itemListSchema = (name, items) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(it.path), name: it.name })),
});
