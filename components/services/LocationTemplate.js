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
import { locations } from "@/data/locations";
import { webPageSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export default function LocationTemplate({ loc }) {
  const path = `/locations/${loc.slug}`;
  const faqs = loc.faqs.map(([q, a]) => ({ q, a }));
  const svc = loc.services.map((s) => services.find((x) => x.slug === s)).filter(Boolean);
  const others = locations.filter((l) => l.slug !== loc.slug).slice(0, 4);
  return (
    <>
      <JsonLd data={[webPageSchema({ name: loc.title, description: loc.meta, path }), serviceSchema({ name: loc.title, description: loc.meta, path, serviceType: loc.intent, areaServed: [{ "@type": "City", name: loc.city }, { "@type": "Country", name: "India" }] }), faqSchema(faqs)]} />
      <PageHero crumbs={[{ name: "Locations", path: "/locations" }, { name: loc.title, path }]} title={loc.h1} intro={loc.answer}>
        <Button href="/contact#contact-form" event="consultation_click">Free consultation</Button>
        <Button href="/request-a-quote" variant="secondary" event="quote_request_click">Request a quote</Button>
      </PageHero>

      <Section className="!pt-4" labelledBy="ctx-title">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 id="ctx-title" className="text-3xl font-bold">Technology for businesses in {loc.city}</h2>
            {loc.local.map((p) => <p key={p.slice(0, 20)} className="mt-4 text-lg leading-relaxed">{p}</p>)}
          </div>
          <aside className="glass-strong h-fit rounded-xl p-6" aria-label="Why work with us">
            <h2 className="text-xl font-bold">Why work with us</h2>
            <ul className="mt-4 space-y-3">{loc.why.map((w) => (<li key={w} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-royal" aria-hidden="true" /><span>{w}</span></li>))}</ul>
          </aside>
        </div>
      </Section>

      <Section tone="tint" labelledBy="ex-title">
        <SectionHeading id="ex-title" title={`Typical projects for ${loc.city} businesses`} />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">{loc.examples.map((e) => (<li key={e} className="glass rounded-xl p-5 font-medium text-ink">{e}</li>))}</ul>
      </Section>

      <Section labelledBy="ls-title">
        <SectionHeading id="ls-title" title="Services most requested here" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{svc.map((s) => <ServiceCard key={s.slug} service={s} />)}</div>
      </Section>

      <Section tone="tint" labelledBy="lf-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="lf-title" title={`${loc.city} questions answered`} />
          <Faq items={faqs} />
        </div>
      </Section>

      <Section labelledBy="more-title">
        <h2 id="more-title" className="text-2xl font-bold">More local pages</h2>
        <ul className="mt-4 flex flex-wrap gap-3">{others.map((l) => (<li key={l.slug}><Link className="glass inline-block rounded-lg px-4 py-2 font-medium text-royal hover:bg-white" href={`/locations/${l.slug}`}>{l.title}</Link></li>))}</ul>
        <p className="mt-6 text-quiet">{site.name} is based in {site.locality}, {site.region}. Full contact details are on our <Link href="/contact" className="text-royal underline underline-offset-2">contact page</Link>.</p>
      </Section>
      <CtaBand />
    </>
  );
}
