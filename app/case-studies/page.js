import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import CtaBand from "@/components/ui/CtaBand";
import { projects } from "@/data/portfolio";

export const metadata = buildMetadata({
  title: "Case Studies and Project Approaches",
  description: "How Success Qube approaches common business problems: problem, approach and technology for each demo concept. Real client case studies will be added with permission.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Case Studies", path: "/case-studies" }]} title="How we approach real business problems" intro="These walk-throughs are demo concepts, not client results. Verified case studies with measurable outcomes will be published here once clients approve them." />
      <Section className="!pt-4">
        <div className="space-y-6">
          {projects.map((p) => (
            <article key={p.slug} id={p.slug} className="glass rounded-xl p-7">
              <div className="flex flex-wrap items-center gap-3"><h2 className="text-2xl font-bold">{p.title}</h2><span className="rounded-md bg-violet/10 px-2 py-1 text-xs font-semibold text-violet-900">Demo concept, not a client project</span></div>
              <dl className="mt-5 grid gap-6 md:grid-cols-3">
                <div><dt className="font-display font-bold text-ink">The problem</dt><dd className="mt-1 text-quiet">{p.problem}</dd></div>
                <div><dt className="font-display font-bold text-ink">Our approach</dt><dd className="mt-1 text-quiet">{p.approach}</dd></div>
                <div><dt className="font-display font-bold text-ink">Technology</dt><dd className="mt-1 text-quiet">{p.stack.join(", ")}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
