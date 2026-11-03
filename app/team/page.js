import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import Icon from "@/components/ui/Icon";
import JsonLd from "@/components/ui/JsonLd";
import CtaBand from "@/components/ui/CtaBand";
import { team, roles } from "@/data/team";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Our Team: Engineers, Designers and Growth Specialists",
  description: "Meet the disciplines behind Success Qube: engineering, design, AI and data, and growth, working together from Sikar, Rajasthan.",
  path: "/team",
});

export default function TeamPage() {
  const personSchema = team.map((p) => ({ "@context": "https://schema.org", "@type": "Person", name: p.name, jobTitle: p.role, worksFor: { "@type": "Organization", name: site.name }, ...(p.linkedin ? { sameAs: [p.linkedin] } : {}) }));
  return (
    <>
      {personSchema.length > 0 && <JsonLd data={personSchema} />}
      <PageHero crumbs={[{ name: "Team", path: "/team" }]} title="The disciplines behind every project" intro="Small, senior-led teams mean the people who plan your project are the people who build it." />
      <Section className="!pt-4" labelledBy="roles-title">
        <h2 id="roles-title" className="sr-only">Team disciplines</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((r) => (<div key={r.name} className="glass rounded-xl p-6"><Icon name={r.icon} className="h-6 w-6 text-royal" /><h3 className="mt-3 text-xl font-bold">{r.name}</h3><p className="mt-2 text-quiet">{r.text}</p></div>))}
        </div>
      </Section>
      {team.length > 0 ? (
        <Section tone="tint" labelledBy="people-title">
          <h2 id="people-title" className="text-3xl font-bold">People</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((p) => (
              <li key={p.name} className="glass rounded-xl p-6">
                {p.image && <Image src={p.image} alt={`Portrait of ${p.name}`} width={96} height={96} className="h-24 w-24 rounded-lg object-cover" />}
                <h3 className="mt-3 text-xl font-bold">{p.name}</h3><p className="text-quiet">{p.role}</p><p className="mt-2">{p.bio}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : (
        <Section tone="tint"><div className="glass max-w-3xl rounded-xl p-7"><h2 className="text-2xl font-bold">Meet us in a call</h2><p className="mt-2 text-quiet">We introduce the people on your project during the first consultation, so you know exactly who you will work with.</p></div></Section>
      )}
      <CtaBand />
    </>
  );
}
