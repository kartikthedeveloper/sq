import { site, absoluteUrl } from "@/lib/site";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { posts } from "@/data/blog";

// Optional supplementary discovery file. It is not a Google ranking requirement
// and does not guarantee inclusion in any AI product.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `Based in ${site.locality}, ${site.region}, ${site.countryName}. Serves ${site.primaryAreas.join(" and ")} closely, and clients across India and internationally.`,
    "",
    "## Key pages",
    `- [About](${absoluteUrl("/about")}): who we are, mission and approach`,
    `- [Company information](${absoluteUrl("/company-information")}): structured facts about the business`,
    `- [Services](${absoluteUrl("/services")}): all services`,
    `- [Contact](${absoluteUrl("/contact")}): how to reach us`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.name}](${absoluteUrl(`/services/${s.slug}`)}): ${s.short}`),
    "",
    "## Local pages",
    ...locations.map((l) => `- [${l.title}](${absoluteUrl(`/locations/${l.slug}`)})`),
    "",
    "## Articles",
    ...posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.excerpt}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
