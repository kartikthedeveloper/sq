import { buildMetadata } from "@/lib/seo";
import { webPageSchema, itemListSchema } from "@/lib/schema";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import CtaBand from "@/components/ui/CtaBand";
import ServiceCard from "@/components/services/ServiceCard";
import { servicesByGroup, services } from "@/data/services";

export const metadata = buildMetadata({
  title: "IT Services: Web, Software, AI, Cloud, SEO & Marketing",
  description: "All Success Qube IT services: website and software development, mobile apps, AI, cloud, DevOps, cybersecurity, SEO, GEO and digital marketing.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[webPageSchema({ name: "Services", description: metadata.description, path: "/services", type: "CollectionPage" }), itemListSchema("Success Qube services", services.map((s) => ({ name: s.name, path: `/services/${s.slug}` })))]} />
      <PageHero crumbs={[{ name: "Services", path: "/services" }]} title="Everything you need to build, run and grow digital products" intro="Nineteen focused services, grouped by what you are trying to achieve. Pick one, or combine several in a single project." />
      {servicesByGroup().map((g) => (
        <Section key={g.id} className="!py-8" labelledBy={`g-${g.id}`}>
          <h2 id={`g-${g.id}`} className="text-2xl font-bold">{g.name}</h2>
          <p className="mt-1 text-quiet">{g.blurb}</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{g.items.map((s) => <ServiceCard key={s.slug} service={s} />)}</div>
        </Section>
      ))}
      <CtaBand />
    </>
  );
}
