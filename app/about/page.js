import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import CtaBand from "@/components/ui/CtaBand";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Success Qube: IT Company in Sikar, Rajasthan",
  description: "Learn about Success Qube, a technology company in Sikar, Rajasthan: our vision, mission, approach and the way we build software, websites and AI solutions.",
  path: "/about",
});

const values = [
  ["Clarity over jargon", "We explain choices in plain language so you can decide with confidence."],
  ["Honest scoping", "If something is not worth building yet, we say so and suggest a smaller first step."],
  ["Craft and maintainability", "Clean code, documentation and tests so the product survives team changes."],
  ["Accountability after launch", "Launch is the start of the relationship, not the end of it."],
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: "About Success Qube", description: metadata.description, path: "/about", type: "AboutPage" })} />
      <PageHero crumbs={[{ name: "About", path: "/about" }]} title="A technology partner from Sikar, building for businesses everywhere" intro={site.description} />
      <Section className="!pt-4" labelledBy="vm-title">
        <h2 id="vm-title" className="sr-only">Vision and mission</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass rounded-xl p-8"><h3 className="text-2xl font-bold">Our vision</h3><p className="mt-3 text-lg leading-relaxed">Make dependable, modern technology normal for businesses of every size, including those outside the big metros.</p></div>
          <div className="glass rounded-xl p-8"><h3 className="text-2xl font-bold">Our mission</h3><p className="mt-3 text-lg leading-relaxed">Turn real business problems into software, websites and automation that people find simple to use and easy to trust.</p></div>
        </div>
      </Section>
      <Section tone="tint" labelledBy="how-title">
        <SectionHeading id="how-title" title="How we think about technology" text="We are a full-service team, but we do not sell every tool to every client. We start from the problem, choose the smallest effective solution, and build it so it can grow." />
        <dl className="mt-10 grid gap-6 md:grid-cols-2">{values.map(([t, d]) => (<div key={t} className="glass rounded-xl p-6"><dt className="font-display text-lg font-bold text-ink">{t}</dt><dd className="mt-2 text-body">{d}</dd></div>))}</dl>
      </Section>
      <Section labelledBy="why-about">
        <SectionHeading id="why-about" title="Why work with a Rajasthan-based team?" />
        <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed">
          <p>We understand how businesses in Sikar, Jaipur and the wider region operate: customers who browse on mobile, owners who want practical tools, and teams that are new to software. That context shapes every proposal.</p>
          <p>We also build for national and international standards. Projects are delivered with modern tooling, documented handover and remote collaboration that works for clients anywhere.</p>
          <p>Explore our <Link href="/services" className="text-royal underline underline-offset-2">services</Link>, read our <Link href="/process" className="text-royal underline underline-offset-2">process</Link>, or see structured <Link href="/company-information" className="text-royal underline underline-offset-2">company information</Link>.</p>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
