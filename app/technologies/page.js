import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import Icon from "@/components/ui/Icon";
import CtaBand from "@/components/ui/CtaBand";
import { technologies } from "@/data/technologies";

export const metadata = buildMetadata({
  title: "Technologies: React, Next.js, Node.js, Python, AI & Cloud",
  description: "The technology stack Success Qube builds with: React, Next.js, Node.js, Python, MongoDB, PostgreSQL, AI APIs, AWS, Azure, Google Cloud and Docker.",
  path: "/technologies",
});

export default function TechnologiesPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Technologies", path: "/technologies" }]} title="The technologies we build with" intro="We choose tools for the problem, and prefer widely supported technologies so you can always find developers to maintain your product." />
      <Section className="!pt-4">
        <div className="space-y-6">
          {technologies.map((t) => (
            <section key={t.id} id={t.id} aria-labelledby={`t-${t.id}`} className="glass grid gap-6 rounded-xl p-7 md:grid-cols-[0.7fr_1.3fr]">
              <div><Icon name={t.icon} className="h-7 w-7 text-royal" /><h2 id={`t-${t.id}`} className="mt-3 text-2xl font-bold">{t.name}</h2><p className="mt-2 text-quiet">{t.note}</p></div>
              <ul className="flex flex-wrap content-start gap-3">{t.items.map((i) => (<li key={i} className="neu-raised rounded-lg px-4 py-2.5 font-semibold text-ink">{i}</li>))}</ul>
            </section>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-quiet">This list names the technologies we actively build and support. It is not a claim of vendor partnerships or certifications.</p>
      </Section>
      <CtaBand />
    </>
  );
}
