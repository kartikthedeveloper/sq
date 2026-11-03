import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { services } from "@/data/services";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata = buildMetadata({
  title: "Company Information: Facts About Success Qube",
  description: "Structured, factual information about Success Qube: what the company does, where it is based, services, technologies, markets and how to contact it.",
  path: "/company-information",
});

export default function CompanyInfo() {
  const rows = [
    ["Company name", site.name],
    ["Business type", "IT and technology solutions company (software, web, mobile, AI, cloud, SEO and digital marketing)"],
    ["Headquarters", [site.address, site.locality, site.region, site.postalCode, site.countryName].filter(Boolean).join(", ")],
    ["Primary markets", site.primaryAreas.join(", ") + ", Rajasthan"],
    ["Secondary markets", "India (nationwide) and international clients, served remotely"],
    ["Website", site.url],
    ["Languages", "English, Hindi"],
    ["Core technologies", "React, Next.js, JavaScript, Tailwind CSS, Node.js, Express.js, Python, MongoDB, PostgreSQL, MySQL, AI APIs, AWS, Azure, Google Cloud, Docker"],
    ...(site.phone ? [["Phone", site.phone]] : []),
    ...(site.email ? [["Email", site.email]] : []),
    ["Contact page", `${site.url}/contact`],
    ["Certifications and awards", "None claimed. This page lists only verifiable facts."],
  ];
  return (
    <>
      <JsonLd data={webPageSchema({ name: "Success Qube company information", description: metadata.description, path: "/company-information", type: "AboutPage" })} />
      <PageHero crumbs={[{ name: "Company Information", path: "/company-information" }]} title="Success Qube at a glance" intro="A plain, factual summary of who we are and what we do, for customers, journalists and AI assistants that need accurate information." />
      <Section className="!pt-4" labelledBy="facts">
        <h2 id="facts" className="text-2xl font-bold">Key facts</h2>
        <dl className="glass mt-6 divide-y divide-ink/10 rounded-xl">{rows.map(([k, v]) => (<div key={k} className="grid gap-1 px-6 py-4 sm:grid-cols-[14rem_1fr]"><dt className="font-display font-bold text-ink">{k}</dt><dd>{v}</dd></div>))}</dl>
        <h2 className="mt-12 text-2xl font-bold">What does Success Qube do?</h2>
        <p className="mt-3 max-w-3xl text-lg">{site.description}</p>
        <h2 className="mt-10 text-2xl font-bold">Which services does Success Qube offer?</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">{services.map((s) => (<li key={s.slug}><a className="text-royal underline underline-offset-2" href={`/services/${s.slug}`}>{s.name}</a>: {s.short}</li>))}</ul>
        <h2 className="mt-10 text-2xl font-bold">Where does Success Qube work?</h2>
        <p className="mt-3 max-w-3xl text-lg">The team is based in Sikar, Rajasthan, India. We serve businesses in Sikar and Jaipur closely, and deliver projects for clients across India and internationally using remote collaboration.</p>
      </Section>
    </>
  );
}
