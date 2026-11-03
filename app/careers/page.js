import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import ContactForm from "@/components/forms/ContactForm";

export const metadata = buildMetadata({
  title: "Careers: Join Success Qube in Sikar, Rajasthan",
  description: "Careers at Success Qube: we welcome developers, designers, SEO and AI specialists in Sikar, Rajasthan. Share your details for future openings.",
  path: "/careers",
});

const looks = ["Strong JavaScript fundamentals: React, Next.js and Node.js", "Curiosity about AI tools and how to use them responsibly", "Clear written and spoken communication in English and Hindi", "Care about accessibility, performance and security", "A portfolio, GitHub profile or project you can talk through"];

export default function CareersPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Careers", path: "/careers" }]} title="Build useful technology with us" intro="There are no published openings right now. We still like hearing from capable people, and we contact candidates when a role matches." />
      <Section className="!pt-4" labelledBy="look-title">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="look-title" title="What we look for" />
            <ul className="mt-6 list-disc space-y-3 pl-5 text-lg">{looks.map((l) => <li key={l}>{l}</li>)}</ul>
          </div>
          <div id="contact-form" className="glass-strong rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold">Share your details</h2>
            <p className="mb-6 mt-2 text-quiet">Tell us about your skills and include links to your work.</p>
            <ContactForm defaultType="career" />
          </div>
        </div>
      </Section>
    </>
  );
}
