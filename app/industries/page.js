import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import Icon from "@/components/ui/Icon";
import CtaBand from "@/components/ui/CtaBand";
import { industries } from "@/data/industries";

export const metadata = buildMetadata({
  title: "Industries We Serve: Education, Healthcare, Retail & More",
  description: "Technology for education, healthcare, e-commerce, real estate, finance, retail, startups, manufacturing and professional services.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Industries", path: "/industries" }]} title="Industries we build technology for" intro="Each sector has its own rules, customers and constraints. Here is where we typically help." />
      <Section className="!pt-4">
        <div className="grid gap-6 md:grid-cols-2">
          {industries.map((i) => (
            <article key={i.slug} id={i.slug} className="glass rounded-xl p-7">
              <Icon name={i.icon} className="h-7 w-7 text-royal" />
              <h2 className="mt-4 text-2xl font-bold">{i.name}</h2>
              <p className="mt-2 text-quiet">{i.text}</p>
              <ul className="mt-4 list-disc space-y-1 pl-5">{i.needs.map((n) => <li key={n}>{n}</li>)}</ul>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
