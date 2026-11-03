import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import Icon from "@/components/ui/Icon";
import CtaBand from "@/components/ui/CtaBand";
import { solutions } from "@/data/solutions";
import { getService } from "@/data/services";

export const metadata = buildMetadata({
  title: "Business Software Solutions and Blueprints",
  description: "Solution blueprints from Success Qube: institute management, CRM, e-commerce, AI support assistants, SaaS foundations and booking systems, customised to your business.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Solutions", path: "/solutions" }]} title="Solution blueprints we customise for your business" intro="These are proven starting points, not boxed products. We adapt modules, workflows and branding to fit how you operate." />
      <Section className="!pt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          {solutions.map((s) => (
            <article key={s.slug} id={s.slug} className="glass rounded-xl p-7">
              <Icon name={s.icon} className="h-7 w-7 text-royal" />
              <h2 className="mt-4 text-2xl font-bold">{s.name}</h2>
              <p className="mt-2 text-lg text-quiet">{s.text}</p>
              <ul className="mt-4 flex flex-wrap gap-2">{s.modules.map((m) => <li key={m} className="neu-inset rounded-md px-3 py-1.5 text-sm font-medium text-ink">{m}</li>)}</ul>
              <p className="mt-5 text-sm text-quiet">Related services: {s.services.map((sv, i) => { const x = getService(sv); return <span key={sv}>{i > 0 && ", "}<Link className="text-royal underline underline-offset-2" href={`/services/${sv}`}>{x.name}</Link></span>; })}</p>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
