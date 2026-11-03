import { site, absoluteUrl } from "./site";

/**
 * Build a Next.js Metadata object with canonical, Open Graph and Twitter tags.
 * Titles omit the brand; the root layout title template appends " | Success Qube".
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noindex = false,
  publishedTime,
  modifiedTime,
  authors,
  absoluteTitle = false,
}) {
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : absoluteUrl("/opengraph-image");
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: "en_IN",
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${site.name} – ${title}` }],
      ...(type === "article" ? { publishedTime, modifiedTime, authors } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage] },
  };
}
