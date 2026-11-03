import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { posts } from "@/data/blog";
import { quickLinks } from "@/data/navigation";

export const metadata = buildMetadata({ title: "Sitemap", description: "A complete list of pages on the Success Qube website.", path: "/site-map" });

const Group = ({ title, items }) => (
  <section className="glass rounded-xl p-6"><h2 className="text-xl font-bold">{title}</h2><ul className="mt-3 space-y-1.5">{items.map((i) => (<li key={i.href}><Link className="text-royal underline underline-offset-2" href={i.href}>{i.label}</Link></li>))}</ul></section>
);

export default function SiteMapPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Sitemap", path: "/site-map" }]} title="Sitemap" intro="Every page on the site. Search engines can also use our XML sitemap." />
      <Section className="!pt-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Group title="Company" items={[{ href: "/", label: "Home" }, ...quickLinks]} />
          <Group title="Services" items={services.map((s) => ({ href: `/services/${s.slug}`, label: s.name }))} />
          <Group title="Local pages" items={[{ href: "/locations", label: "All locations" }, ...locations.map((l) => ({ href: `/locations/${l.slug}`, label: l.title }))]} />
          <Group title="Blog" items={posts.map((p) => ({ href: `/blog/${p.slug}`, label: p.title }))} />
          <Group title="Legal" items={[{ href: "/privacy-policy", label: "Privacy Policy" }, { href: "/terms-and-conditions", label: "Terms & Conditions" }]} />
        </div>
      </Section>
    </>
  );
}
