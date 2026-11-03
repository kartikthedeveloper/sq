import Link from "next/link";
import { Check } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Faq from "@/components/ui/Faq";
import CtaBand from "@/components/ui/CtaBand";
import JsonLd from "@/components/ui/JsonLd";
import ServiceCard from "@/components/services/ServiceCard";
import { services } from "@/data/services";
import { process as steps } from "@/data/process";
import { serviceSchema, webPageSchema, faqSchema } from "@/lib/schema";

export default function ServiceTemplate({ service }) {
  const path = `/services/${service.slug}`;
  const faqs = service.faqs.map(([q, a]) => ({ q, a }));
  const related = service.related.map((s) => services.find((x) => x.slug === s)).filter(Boolean);
  return (
    <>
      <JsonLd data={[webPageSchema({ name: service.title, description: service.meta, path }), serviceSchema({ name: service.name, description: service.meta, path }), faqSchema(faqs)]} />
      <PageHero crumbs={[{ name: "Services", path: "/services" }, { name: service.name, path }]} title={service.h1} intro={service.intro}>
        <Button href="/request-a-quote" event="quote_request_click">Request a quote</Button>
        <Button href="/contact#contact-form" variant="secondary" event="consultation_click">Free consultation</Button>
      </PageHero>

      <Section className="!pt-6" labelledBy="what-title">
        <div className="glass-strong rounded-xl p-6 sm:p-8">
          <h2 id="what-title" className="text-2xl font-bold">What is {service.name.toLowerCase()}?</h2>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed">{service.answer}</p>
        </div>
      </Section>

      <Section tone="tint" labelledBy="get-title">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="get-title" title="What you get" />
            <ul className="mt-6 space-y-4">
              {service.deliverables.map((d) => (
                <li key={d} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-royal" aria-hidden="true" /><span>{d}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Why it works</h2>
            <dl className="mt-6 space-y-5">
              {service.benefits.map(([t, d]) => (<div key={t}><dt className="font-display text-lg font-bold text-ink">{t}</dt><dd className="mt-1 text-quiet">{d}</dd></div>))}
            </dl>
            <p className="mt-8 text-sm font-semibold text-ink">Technologies we use</p>
            <ul className="mt-2 flex flex-wrap gap-2">{service.tech.map((t) => <li key={t} className="neu-inset rounded-md px-3 py-1.5 text-sm font-medium text-ink">{t}</li>)}</ul>
          </div>
        </div>
      </Section>

      <Section labelledBy="how-title">
        <SectionHeading id="how-title" title={`How a ${service.name.toLowerCase()} project runs`} text="Every project follows the same seven stages, with a written deliverable at each one." />
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {steps.map((s, i) => (<li key={s.name} className="glass rounded-lg p-4"><span className="text-sm font-bold text-royal">Step {i + 1}</span><p className="mt-1 font-display font-bold text-ink">{s.name}</p></li>))}
        </ol>
        <p className="mt-4 text-sm text-quiet"><Link href="/process" className="text-royal underline underline-offset-2">See what happens in each stage</Link></p>
      </Section>

      <Section tone="tint" labelledBy="sfaq-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="sfaq-title" title="Common questions" />
          <Faq items={faqs} />
        </div>
      </Section>

      <Section labelledBy="rel-title">
        <SectionHeading id="rel-title" title="Related services" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">{related.map((s) => <ServiceCard key={s.slug} service={s} />)}</div>
        <p className="mt-8 text-quiet">Based in Sikar? See our <Link className="text-royal underline underline-offset-2" href="/locations/it-company-in-sikar">IT services in Sikar</Link>.</p>
      </Section>
      <CtaBand />
    </>
  );
}
